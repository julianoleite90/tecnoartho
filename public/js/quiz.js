// Quiz JavaScript

let currentStep = 1;
const totalSteps = 3;
const answers = {};
const quizStartTime = Date.now();
const stepTimes = {};

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
});

function initializeQuiz() {
    // Set up event listeners for quiz options
    const quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            selectOption(this);
        });
    });
    
    // Initialize progress
    updateProgress();
    
    // Start quiz automatically
    startQuiz();
}

function startQuiz() {
    // Hide start screen and show quiz content
    document.getElementById('quizStartScreen').style.display = 'none';
    document.getElementById('quizMainContent').style.display = 'block';
    
    // Track quiz start
    trackQuizEvent('quiz_started', 'quiz');
    trackQuizStepView(1, 'Você sente dor constante nos joelhos?');
    
    // Record start time for step 1
    stepTimes[1] = Date.now();
}

function selectOption(option) {
    // Prevent multiple rapid clicks
    if (option.classList.contains('selected') || option.classList.contains('selecting')) {
        return;
    }
    
    // Add selecting class for visual feedback
    option.classList.add('selecting');
    
    // Remove previous selection in current step
    const currentStepElement = document.querySelector('.quiz-step.active');
    const previousSelected = currentStepElement.querySelector('.quiz-option.selected');
    if (previousSelected) {
        previousSelected.classList.remove('selected');
    }
    
    // Add selection to clicked option with animation
    setTimeout(() => {
        option.classList.remove('selecting');
        option.classList.add('selected');
        
        // Add ripple effect
        createRippleEffect(option);
        
        // Store answer
        const answer = option.getAttribute('data-answer');
        answers[`step${currentStep}`] = answer;
        
        // Get question text for tracking
        const questionElement = document.querySelector('.quiz-step.active .quiz-question');
        const questionText = questionElement ? questionElement.textContent : `Step ${currentStep}`;
        
        // Track answer selection with detailed info
        trackQuizEvent('answer_selected', `step_${currentStep}`, answer);
        trackQuizAnswer(currentStep, questionText, answer);
        
        // Calculate time spent on current step
        const stepStartTime = stepTimes[currentStep] || Date.now();
        const timeSpentOnStep = Math.round((Date.now() - stepStartTime) / 1000);
        trackQuizEvent('step_time', `step_${currentStep}`, timeSpentOnStep);
        
        // Auto advance to next step after a short delay
        setTimeout(() => {
            nextStep();
        }, 800);
    }, 150);
}

function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = rect.width / 2;
    const y = rect.height / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (x - size / 2) + 'px';
    ripple.style.top = (y - size / 2) + 'px';
    
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

function nextStep() {
    if (currentStep < totalSteps) {
        // Track completion of current step
        trackQuizEvent('step_completed', `step_${currentStep}`, answers[`step${currentStep}`]);
        
        // Hide current step
        const currentStepElement = document.getElementById(`step${currentStep}`);
        currentStepElement.classList.remove('active');
        
        // Show next step
        currentStep++;
        const nextStepElement = document.getElementById(`step${currentStep}`);
        nextStepElement.classList.add('active');
        
        // Update progress
        updateProgress();
        
        // Track view of new step
        const questionElement = nextStepElement.querySelector('.quiz-question');
        const questionText = questionElement ? questionElement.textContent : `Step ${currentStep}`;
        trackQuizStepView(currentStep, questionText);
        
        // Record start time for new step
        stepTimes[currentStep] = Date.now();
        
        // Track step transition
        trackQuizEvent('step_transition', `to_step_${currentStep}`, '');
    } else {
        // Quiz completed
        completeQuiz();
    }
}

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const currentStepSpan = document.getElementById('currentStep');
    const totalStepsSpan = document.getElementById('totalSteps');
    
    const progressPercentage = (currentStep / totalSteps) * 100;
    progressFill.style.width = `${progressPercentage}%`;
    currentStepSpan.textContent = currentStep;
    totalStepsSpan.textContent = totalSteps;
}

function completeQuiz() {
    // Calculate total time spent on quiz
    const totalTimeSpent = Math.round((Date.now() - quizStartTime) / 1000);
    
    // Track quiz completion with detailed analytics
    trackQuizEvent('quiz_completed', 'quiz', JSON.stringify(answers));
    trackQuizCompletion(answers, totalTimeSpent);
    
    // Track final step completion
    trackQuizEvent('step_completed', `step_${currentStep}`, answers[`step${currentStep}`]);
    
    // Track conversion event
    trackConversion('quiz_completed', 1);
    
    // Show completion message or redirect
    setTimeout(() => {
        // Redirect to main page with quiz completion
        const quizResults = encodeURIComponent(JSON.stringify(answers));
        window.location.href = `index.html?quiz=completed&results=${quizResults}`;
    }, 1000);
}

function closeQuiz() {
    // Calculate time spent before abandonment
    const timeSpent = Math.round((Date.now() - quizStartTime) / 1000);
    
    // Track quiz abandonment with detailed analytics
    trackQuizEvent('quiz_abandoned', 'quiz', JSON.stringify(answers));
    trackQuizAbandonment(currentStep, answers);
    
    // Track abandonment event
    trackQuizEvent('abandonment_time', `step_${currentStep}`, timeSpent);
    
    // Show start screen instead of redirecting
    document.getElementById('quizMainContent').style.display = 'none';
    document.getElementById('quizStartScreen').style.display = 'block';
    
    // Reset quiz state
    resetQuiz();
}

function resetQuiz() {
    // Reset variables
    currentStep = 1;
    answers = {};
    stepTimes = {};
    
    // Reset progress bar
    updateProgress();
    
    // Reset all steps to inactive
    document.querySelectorAll('.quiz-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Activate first step
    document.getElementById('step1').classList.add('active');
    
    // Reset all selected options
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('selected', 'selecting');
    });
    
    // Track start screen view
    trackQuizEvent('quiz_start_screen_viewed', 'start_screen');
}

// Handle page visibility change (user leaving quiz)
document.addEventListener('visibilitychange', function() {
    if (document.hidden && currentStep > 1) {
        trackQuizAbandonment(currentStep, answers);
    }
});

// Handle page unload (user closing tab/window)
window.addEventListener('beforeunload', function() {
    if (currentStep > 1) {
        trackQuizAbandonment(currentStep, answers);
    }
});
