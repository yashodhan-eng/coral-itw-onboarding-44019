import { useState, useEffect } from "react";
import { TopNav } from "@/components/TopNav";
import { LandingScreen } from "@/components/LandingScreen";
import { QuestionScreen } from "@/components/QuestionScreen";
import { MultiSelectScreen } from "@/components/MultiSelectScreen";
import { InputScreen } from "@/components/InputScreen";
import { ThankYouScreen } from "@/components/ThankYouScreen";
import { BackgroundTheme } from "@/components/BackgroundTheme";
import { contentSchema, OnboardingAnswers } from "@/data/contentSchema";
import { adCampaignService } from "@/lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import q1Hero from "@/assets/mbs-hero.jpg";
import screen2Hero from "@/assets/mbs-hero-2.jpg";
import screen4Hero from "@/assets/mbs-hero-3.jpg";
import screen5Hero from "@/assets/mbs-hero-4.jpg";
import { trackPageView, trackEvent, trackButtonClick, trackFormEvent, identifyUser } from "@/lib/mixpanel";

const STORAGE_KEY = "coralOnboardingAnswers";
const SUBMISSION_KEY = "coralOnboardingSubmission";

const emailValidator = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return null;
};

// Map quiz answers to backend format
const mapHowSoon = (answer: string): string => {
  const mapping: Record<string, string> = {
    'Right away': 'Right Away',
    'In 1–2 weeks': '1-2 Weeks',
    'Next month': 'next month',
    'Just exploring': 'just exploring'
  };
  return mapping[answer] || answer;
};

const mapSchoolingMode = (answer: string): string => {
  const mapping: Record<string, string> = {
    'Public/Private schooling': 'Public/private schooling',
    'Homeschooling': 'homeschooling'
  };
  return mapping[answer] || answer;
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<OnboardingAnswers>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');

  // Track page view on mount
  useEffect(() => {
    trackPageView("Home Page", {
      page_path: window.location.pathname,
      page_title: document.title,
    });
  }, []);

  // Track step progression
  useEffect(() => {
    if (currentStep > 0) {
      trackEvent("Step Viewed", {
        step: currentStep,
        total_steps: 4,
        has_answers: Object.keys(answers).length > 0,
      });
    }
  }, [currentStep]);

  // Clear storage and start fresh for preview
  useEffect(() => {
    localStorage.removeItem(SUBMISSION_KEY);
    localStorage.removeItem(STORAGE_KEY);
    setCurrentStep(0);
    setAnswers({});
    setIsSubmitted(false);
  }, []);

  // Save answers to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    }
  }, [answers]);

  const handleQuestionSelect = (questionKey: string, value: string) => {
    const newAnswers = { ...answers, [questionKey]: value };
    setAnswers(newAnswers);
    
    // Track question selection
    trackEvent("Question Answered", {
      question_key: questionKey,
      question_value: value,
      step: currentStep,
      total_answers: Object.keys(newAnswers).length,
    });
    
    // Auto-advance after a brief delay for visual feedback
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 200);
  };

  const handleMultiSelect = (questionKey: string, values: string[]) => {
    const newAnswers = { ...answers, [questionKey]: values.join(', ') };
    setAnswers(newAnswers);
    
    // Track multi-select question
    trackEvent("Question Answered", {
      question_key: questionKey,
      question_values: values,
      question_value: values.join(', '),
      step: currentStep,
      total_answers: Object.keys(newAnswers).length,
      selection_count: values.length,
    });
    
    // Auto-advance after a brief delay for visual feedback
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 200);
  };

  const handleBack = () => {
    const previousStep = Math.max(0, currentStep - 1);
    trackButtonClick("Back Button", {
      from_step: currentStep,
      to_step: previousStep,
    });
    setCurrentStep(previousStep);
  };

  const handleNameSubmit = (name: string) => {
    const newAnswers = { ...answers, name };
    setAnswers(newAnswers);
    
    // Track name submission
    trackFormEvent("submitted", "name_form", {
      step: 3,
      field_name: "name",
      has_name: !!name,
    });
    
    setCurrentStep(4);
  };

  const handleEmailSubmit = async (email: string, recaptchaToken?: string | null) => {
    const finalAnswers = { 
      ...answers, 
      email,
      timestamp: Date.now()
    };
    setAnswers(finalAnswers);
    
    // Track email form submission started
    trackFormEvent("submitted", "email_form", {
      step: 4,
      field_name: "email",
      has_email: !!email,
      has_recaptcha: !!recaptchaToken,
    });
    
    // Save submission locally
    localStorage.setItem(SUBMISSION_KEY, JSON.stringify(finalAnswers));
    
    // Submit to backend API
    setIsSubmitting(true);
    try {
      await submitToBackend(finalAnswers, recaptchaToken);
      
      // Track signin attempt
      trackEvent("Signin Started", {
        email: email,
        step: 4,
      });
      
      const response = await adCampaignService.signin({ email, recaptchaToken });
      console.log('Signin response:', response);
      const navlink = response.magicLink || response.magic_link;
      if (navlink) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        // window.location.href = navlink;
        contentSchema.redirectUrl = navlink;
        setRedirectUrl(navlink);
        console.log('Redirecting to:', contentSchema.redirectUrl);
        
        // Track successful signin
        trackEvent("Signin Successful", {
          email: email,
          user_id: response.user_id,
          has_magic_link: true,
        });
        
        // Track successful completion
        trackEvent("Onboarding Completed", {
          step: 4,
          email: email,
          has_magic_link: true,
          redirect_url: navlink,
        });
        
        return;
      }
      if (!response.success) {
        setIsSubmitting(false);
        let errorMessage = 'Registration failed. Please try again.';
        toast.error(errorMessage);
        
        // Track signin failure
        trackEvent("Signin Failed", {
          step: 4,
          error_type: "signin_failed",
          error_message: errorMessage,
        });
      }
      setIsSubmitted(true);
      
    } catch (error: any) {
      setIsSubmitting(false);
      console.error('Submission error:', error);
      
      // Show error message
      let errorMessage = 'Registration failed. Please try again.';
      let errorType = 'unknown_error';
      if (error.errorType === 'duplicate_email') {
        errorMessage = 'Email already registered. Please use a different email address.';
        errorType = 'duplicate_email';
      } else if (error.message) {
        errorMessage = error.message;
        errorType = error.errorType || 'api_error';
      }
      
      // Track error event
      trackEvent("Onboarding Error", {
        step: 4,
        error_type: errorType,
        error_message: errorMessage,
        has_email: !!email,
      });
      
      toast.error(errorMessage);
    }
  };

  const submitToBackend = async (finalAnswers: OnboardingAnswers, recaptchaToken?: string | null) => {
    // Validate required fields before sending
    if (!finalAnswers.name || !finalAnswers.email) {
      throw new Error('Name and email are required');
    }

    if (!recaptchaToken) {
      throw new Error('reCAPTCHA verification is required. Please complete the verification.');
    }

    console.log('Submitting to backend with:', {
      name: finalAnswers.name,
      email: finalAnswers.email,
      source: 'ITW_Quiz_Page',
      how_soon: finalAnswers.q1 ? mapHowSoon(finalAnswers.q1) : null,
      preferred_topics: finalAnswers.q2 ? mapSchoolingMode(finalAnswers.q2) : null,
      hasRecaptchaToken: !!recaptchaToken,
    });

    // Track registration attempt
    trackEvent("Registration Started", {
      email: finalAnswers.email,
      source: 'ITW_Quiz_Page',
      how_soon: finalAnswers.q1 ? mapHowSoon(finalAnswers.q1) : null,
      preferred_topics: finalAnswers.q2 ? mapSchoolingMode(finalAnswers.q2) : null,
    });

    const response = await adCampaignService.register({
      name: finalAnswers.name,
      email: finalAnswers.email,
      source: 'ITW_Quiz_Page',
      how_soon: finalAnswers.q1 ? mapHowSoon(finalAnswers.q1) : null,
      preferred_topics: finalAnswers.q2 ? mapSchoolingMode(finalAnswers.q2) : null,
      recaptchaToken: recaptchaToken,
    });

    if (!response.success) {
      // Track registration failure
      trackEvent("Registration Failed", {
        email: finalAnswers.email,
        error: response.error || 'Registration failed',
        error_type: response.error_type || 'unknown',
      });
      throw new Error(response.error || 'Registration failed');
    }

    // Track successful registration
    trackEvent("Registration Successful", {
      email: finalAnswers.email,
      user_id: response.user_id,
      account_created: response.account_created,
      how_soon: finalAnswers.q1 ? mapHowSoon(finalAnswers.q1) : null,
      preferred_topics: finalAnswers.q2 ? mapSchoolingMode(finalAnswers.q2) : null,
    });

    // Identify user in Mixpanel after successful registration
    if (response.user_id) {
      identifyUser(response.user_id, {
        email: finalAnswers.email,
        name: finalAnswers.name,
        how_soon: finalAnswers.q1 ? mapHowSoon(finalAnswers.q1) : null,
        preferred_topics: finalAnswers.q2 ? mapSchoolingMode(finalAnswers.q2) : null,
        source: 'ITW_Quiz_Page',
        account_created: response.account_created,
      });
    }
  };

  if (isSubmitted && redirectUrl) {
    return (
      <div className="min-h-screen bg-background relative">
        <BackgroundTheme />
        <ThankYouScreen
          title={contentSchema.thankyou.title}
          subtext={contentSchema.thankyou.subtext}
          delayMs={contentSchema.thankyou.delayMs}
          redirectUrl={redirectUrl}
        />
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-background relative flex items-center justify-center">
        <BackgroundTheme />
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 md:w-16 md:h-16 text-primary animate-spin mx-auto" />
          <p className="text-lg text-muted-foreground">Submitting your information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundTheme />
      
      {currentStep > 0 && (
        <TopNav 
          currentStep={currentStep} 
          totalSteps={4}
        />
      )}

      <main className="pb-8">
        {currentStep === 0 && (
          <LandingScreen onContinue={() => {
            trackButtonClick("Try for Free", {
              step: 0,
              action: "landing_screen_continue",
            });
            setCurrentStep(1);
          }} />
        )}

        {currentStep === 1 && (
          <div className="animate-fade-in">
            <div className="w-full max-w-[900px] mx-auto px-4 pt-4 md:pt-6">
              <div className="mb-2 md:mb-4">
                <img 
                  src={q1Hero} 
                  alt="Parent and child discovering business class" 
                  className="w-full h-auto max-h-[30vh] md:max-h-[35vh] object-cover rounded-2xl shadow-lg"
                  loading="eager"
                />
              </div>
            </div>

            <QuestionScreen
              step={1}
              title={contentSchema.q1.title}
              subtext={contentSchema.q1.subtext}
              options={contentSchema.q1.options}
              onSelect={(option, index) => handleQuestionSelect("q1", option)}
              onBack={handleBack}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="animate-fade-in">
            <div className="w-full max-w-[900px] mx-auto px-4 pt-4 md:pt-6">
              <div className="mb-2 md:mb-4">
                <img 
                  src={screen2Hero} 
                  alt="Kids learning about business" 
                  className="w-full h-auto max-h-[30vh] md:max-h-[35vh] object-cover rounded-2xl shadow-lg"
                  loading="eager"
                />
              </div>
            </div>

            <MultiSelectScreen
              step={2}
              title={contentSchema.q2.title}
              subtext={contentSchema.q2.subtext}
              options={contentSchema.q2.options}
              onSubmit={(selectedOptions) => handleMultiSelect("q2", selectedOptions)}
              onBack={handleBack}
            />
          </div>
        )}

        {currentStep === 3 && (
          <InputScreen
            step={3}
            title={contentSchema.name.title}
            label={contentSchema.name.label}
            type="text"
            buttonText={contentSchema.name.button}
            onSubmit={handleNameSubmit}
            onBack={handleBack}
            heroImage={screen4Hero}
          />
        )}

        {currentStep === 4 && (
          <InputScreen
            step={4}
            title={contentSchema.email.title}
            label={contentSchema.email.label}
            type="email"
            buttonText={contentSchema.email.button}
            onSubmit={handleEmailSubmit}
            validator={emailValidator}
            onBack={handleBack}
            heroImage={screen5Hero}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
