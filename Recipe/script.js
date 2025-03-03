document.querySelectorAll('.toggle-btn[data-target]').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const content = document.getElementById(targetId);
        content.classList.toggle('show');
    });
});

let currentStep = -1;
const steps = document.querySelectorAll('.steps li');
const progress = document.querySelector('.progress');
const startBtn = document.getElementById('start-cooking');
const nextBtn = document.getElementById('next-step');
const timerDisplay = document.getElementById('timer');

function updateSteps() {
    steps.forEach((step, index) => {
        step.classList.toggle('active', index === currentStep);
    });
    const progressWidth = currentStep >= 0 ? ((currentStep + 1) / steps.length * 100) : 0;
    progress.style.width = `${progressWidth}%`;
}

function startCooking() {
    currentStep = 0;
    document.getElementById('steps').classList.add('show');
    updateSteps();
    
    let timeRemaining = 30 * 60; // 30 minutes in seconds
    timerDisplay.textContent = 'Time Remaining: 30:00';
    
    const timer = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerDisplay.textContent = `Time Remaining: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        timeRemaining--;
        
        if (timeRemaining < 0 || currentStep === steps.length - 1) {
            clearInterval(timer);
            timerDisplay.textContent = 'Cooking Complete!';
        }
    }, 1000);
}

function nextStep() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateSteps();
    }
}

startBtn.addEventListener('click', startCooking);
nextBtn.addEventListener('click', nextStep);