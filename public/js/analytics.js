// Google Analytics Tracking Functions

// Track page views
function trackPageView(pageName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: pageName,
            page_location: window.location.href,
            page_path: window.location.pathname
        });
    }
}

// Track popup events
function trackPopupEvent(action, step) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'popup_interaction', {
            event_category: 'Popup',
            event_label: `${action}_${step}`,
            value: 1
        });
    }
}

// Track CTA clicks
function trackCTAClick(ctaName, location) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', {
            event_category: 'CTA',
            event_label: ctaName,
            custom_parameter_1: location,
            value: 1
        });
    }
}

// Track form interactions
function trackFormEvent(action, formName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_interaction', {
            event_category: 'Form',
            event_label: `${action}_${formName}`,
            value: 1
        });
    }
}

// Track scroll depth
function trackScrollDepth(depth) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'scroll', {
            event_category: 'Engagement',
            event_label: `${depth}%`,
            value: Math.round(depth)
        });
    }
}

// Track time on page
function trackTimeOnPage(timeInSeconds) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'timing_complete', {
            name: 'time_on_page',
            value: timeInSeconds
        });
    }
}

// Track mobile fixed CTA
function trackMobileFixedCTA(action) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'mobile_fixed_cta', {
            event_category: 'Mobile CTA',
            event_label: action,
            value: 1
        });
    }
}

// Track video interactions
function trackVideoEvent(action, videoId) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'video_interaction', {
            event_category: 'Video',
            event_label: `${action}_${videoId}`,
            value: 1
        });
    }
}

// Track carousel interactions
function trackCarouselEvent(action, carouselName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'carousel_interaction', {
            event_category: 'Carousel',
            event_label: `${action}_${carouselName}`,
            value: 1
        });
    }
}

// Track FAQ interactions
function trackFAQEvent(action, question) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'faq_interaction', {
            event_category: 'FAQ',
            event_label: `${action}_${question}`,
            value: 1
        });
    }
}

// Track external link clicks
function trackExternalLink(url) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            event_category: 'External Link',
            event_label: url,
            value: 1
        });
    }
}

// Track conversion events
function trackConversion(eventName, value) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            event_category: 'Conversion',
            event_label: eventName,
            value: value || 1
        });
    }
}

// Track quiz events
function trackQuizEvent(action, step, answer) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'quiz_interaction', {
            event_category: 'Quiz',
            event_label: `${action}_${step}`,
            custom_parameter_1: answer || '',
            custom_parameter_2: step || '',
            value: 1
        });
    }
}

// Track quiz step views
function trackQuizStepView(stepNumber, stepName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'quiz_step_view', {
            event_category: 'Quiz Steps',
            event_label: `Step_${stepNumber}_${stepName}`,
            custom_parameter_1: stepNumber,
            custom_parameter_2: stepName,
            value: 1
        });
    }
}

// Track quiz answer selection
function trackQuizAnswer(stepNumber, question, answer) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'quiz_answer', {
            event_category: 'Quiz Answers',
            event_label: `Step_${stepNumber}_${answer}`,
            custom_parameter_1: stepNumber,
            custom_parameter_2: question,
            custom_parameter_3: answer,
            value: 1
        });
    }
}

// Track quiz completion
function trackQuizCompletion(answers, timeSpent) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'quiz_completion', {
            event_category: 'Quiz Completion',
            event_label: 'Quiz_Completed',
            custom_parameter_1: JSON.stringify(answers),
            custom_parameter_2: timeSpent,
            value: 1
        });
    }
}

// Track quiz abandonment
function trackQuizAbandonment(stepAbandoned, answers) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'quiz_abandonment', {
            event_category: 'Quiz Abandonment',
            event_label: `Abandoned_Step_${stepAbandoned}`,
            custom_parameter_1: stepAbandoned,
            custom_parameter_2: JSON.stringify(answers),
            value: 1
        });
    }
}

// Initialize tracking for current page
function initializePageTracking() {
    // Track page view
    const pageName = document.title;
    trackPageView(pageName);
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            if (scrollPercent >= 25 && scrollPercent < 50) {
                trackScrollDepth(25);
            } else if (scrollPercent >= 50 && scrollPercent < 75) {
                trackScrollDepth(50);
            } else if (scrollPercent >= 75 && scrollPercent < 90) {
                trackScrollDepth(75);
            } else if (scrollPercent >= 90) {
                trackScrollDepth(90);
            }
        }
    });
    
    // Track time on page
    const startTime = Date.now();
    window.addEventListener('beforeunload', function() {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        trackTimeOnPage(timeOnPage);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePageTracking();
});
