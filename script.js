// PostureGotchi Game Logic
let characterStats = {
    hunger: 80,
    happiness: 75,
    posture: 70,
    health: 85
};

const messages = [
    "Sit up straight! I'm watching! 🐾",
    "Great posture! Keep it up! ⭐",
    "You're doing amazing! 💪",
    "Remember to take breaks! 🎮",
    "Your back will thank you! 🦴",
    "Level up your posture! 📈",
    "I'm so proud of you! 🌟",
    "Let's keep improving! 🚀"
];

const goodPostureMessages = [
    "Perfect! Your posture is amazing! ⭐⭐⭐",
    "Wow! You're sitting so straight! 💪",
    "Excellent! Keep that back straight! 🎉",
    "You're a posture champion! 🏆",
    "This is what I'm talking about! 🌟"
];

const badPostureMessages = [
    "Hmm, let's sit up a bit straighter! 📏",
    "Try adjusting your position! 🔄",
    "Remember: back straight, shoulders back! 💪",
    "You can do better! I believe in you! 🌟",
    "Let's fix that posture together! 🤝"
];

// Initialize character display
function updateCharacterDisplay() {
    const characterDisplay = document.getElementById('characterDisplay');
    const deviceMessage = document.getElementById('deviceMessage');
    
    // Update stats bars
    updateStatBars();
    
    // Change character emoji based on stats
    let characterEmoji = "🐾";
    if (characterStats.posture >= 80 && characterStats.happiness >= 80) {
        characterEmoji = "🌟";
    } else if (characterStats.posture >= 60 && characterStats.happiness >= 60) {
        characterEmoji = "😊";
    } else if (characterStats.posture < 50 || characterStats.happiness < 50) {
        characterEmoji = "😟";
    }
    
    characterDisplay.innerHTML = `<div class="pixel-character">${characterEmoji}</div>`;
    
    // Random message
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    deviceMessage.textContent = `"${randomMessage}"`;
}

function updateStatBars() {
    const stats = document.querySelectorAll('.device-stat');
    if (stats.length >= 3) {
        // Update Hunger
        const hungerBar = stats[0].querySelector('.fill');
        if (hungerBar) hungerBar.style.width = characterStats.hunger + '%';
        
        // Update Happiness
        const happinessBar = stats[1].querySelector('.fill');
        if (happinessBar) happinessBar.style.width = characterStats.happiness + '%';
        
        // Update Posture
        const postureBar = stats[2].querySelector('.fill');
        if (postureBar) postureBar.style.width = characterStats.posture + '%';
    }
}

// Game Functions
function feedCharacter() {
    if (characterStats.hunger < 100) {
        characterStats.hunger = Math.min(100, characterStats.hunger + 10);
        characterStats.happiness = Math.min(100, characterStats.happiness + 5);
        showNotification("Yum! Thanks for the good posture energy! 🍎");
        updateCharacterDisplay();
    } else {
        showNotification("I'm full! But keep that good posture! 💪");
    }
}

function playWithCharacter() {
    characterStats.happiness = Math.min(100, characterStats.happiness + 15);
    characterStats.posture = Math.min(100, characterStats.posture + 5);
    showNotification("That was fun! Posture breaks are the best! 🎮");
    updateCharacterDisplay();
}

function checkPosture() {
    // Simulate posture check - in real app, this would use camera/ML
    const isGoodPosture = Math.random() > 0.3; // 70% chance of good posture
    
    if (isGoodPosture) {
        characterStats.posture = Math.min(100, characterStats.posture + 10);
        characterStats.happiness = Math.min(100, characterStats.happiness + 10);
        const message = goodPostureMessages[Math.floor(Math.random() * goodPostureMessages.length)];
        showNotification(message, 'success');
        
        // Celebration animation
        celebrate();
    } else {
        characterStats.posture = Math.max(0, characterStats.posture - 5);
        const message = badPostureMessages[Math.floor(Math.random() * badPostureMessages.length)];
        showNotification(message, 'warning');
    }
    
    updateCharacterDisplay();
}

function cleanCharacter() {
    characterStats.hunger = Math.max(0, characterStats.hunger - 5);
    characterStats.happiness = Math.min(100, characterStats.happiness + 10);
    characterStats.posture = Math.min(100, characterStats.posture + 5);
    showNotification("Fresh start! Let's maintain that perfect posture! ✨");
    updateCharacterDisplay();
}

function celebrate() {
    const characterDisplay = document.getElementById('characterDisplay');
    characterDisplay.style.animation = 'none';
    setTimeout(() => {
        characterDisplay.style.animation = 'bounce 0.5s ease 3';
    }, 10);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 200px;
        right: 20px;
        background: ${type === 'success' ? '#2ed573' : type === 'warning' ? '#ffa502' : '#667eea'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-family: 'VT323', monospace;
        font-weight: 500;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll function
function scrollToGame() {
    document.getElementById('game').scrollIntoView({ behavior: 'smooth' });
}

// Posture Game Functions
let selectedCharacter = null;

function selectCharacter(charType, charName) {
    selectedCharacter = { type: charType, name: charName };
    
    // Hide selection, show game interface
    document.getElementById('characterSelection').style.display = 'none';
    document.getElementById('gameInterface').style.display = 'block';
    
    // Update character display
    const charImg = document.getElementById('selectedCharacterImg');
    const charNameEl = document.getElementById('selectedCharacterName');
    
    charImg.src = `images/${charType}.png`;
    charImg.alt = charName;
    charNameEl.textContent = charName;
    
    // Reset checkboxes
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`check${i}`).checked = false;
    }
    
    // Reset score
    updatePostureScore();
    
    // Scroll to game interface
    document.getElementById('gameInterface').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function toggleCheckbox(checkId) {
    const checkbox = document.getElementById(checkId);
    checkbox.checked = !checkbox.checked;
    updatePostureScore();
}

function updatePostureScore() {
    let checkedCount = 0;
    for (let i = 1; i <= 5; i++) {
        if (document.getElementById(`check${i}`).checked) {
            checkedCount++;
        }
    }
    
    const score = (checkedCount / 5) * 100;
    const scoreEl = document.getElementById('postureScore');
    const scoreBar = document.getElementById('scoreBar');
    const messageEl = document.getElementById('postureMessage');
    const challengeButton = document.getElementById('challengeButton');
    const challengeText = document.getElementById('challengeText');
    
    scoreEl.textContent = Math.round(score) + '%';
    scoreBar.style.width = score + '%';
    
    // Update message based on score
    if (score === 0) {
        messageEl.textContent = 'Check off the items above to improve your posture score!';
    } else if (score < 60) {
        messageEl.textContent = 'Keep going! You\'re making progress! 💪';
    } else if (score < 100) {
        messageEl.textContent = 'Great job! Almost perfect posture! ⭐';
    } else {
        messageEl.textContent = 'Perfect! Your posture is amazing! Your PosturePal is so happy! 🌟';
        // Unlock challenge when all items are checked
        if (challengeButton && challengeButton.style.display === 'none') {
            challengeButton.style.display = 'block';
            challengeText.textContent = 'Amazing! You\'ve unlocked today\'s challenge! Click below to start!';
        }
    }
    
    // Track challenge progress if active
    if (typeof window.trackChallengeProgress === 'function') {
        window.trackChallengeProgress();
    }
}

function resetGame() {
    selectedCharacter = null;
    document.getElementById('characterSelection').style.display = 'block';
    document.getElementById('gameInterface').style.display = 'none';
    
    // Reset checkboxes
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`check${i}`).checked = false;
    }
    
    // Reset timer
    resetPostureTimer();
    
    // Reset challenge
    const challengeButton = document.getElementById('challengeButton');
    const challengeProgress = document.getElementById('challengeProgress');
    const challengeText = document.getElementById('challengeText');
    if (challengeButton) challengeButton.style.display = 'none';
    if (challengeProgress) challengeProgress.style.display = 'none';
    if (challengeText) challengeText.textContent = 'Complete all 5 checklist items to unlock today\'s challenge!';
    
    // Scroll to selection
    document.getElementById('characterSelection').scrollIntoView({ behavior: 'smooth' });
}

// Posture Timer Functions
let timerInterval = null;
let timerSeconds = 30 * 60; // 30 minutes in seconds

function startPostureTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    const timerButton = document.getElementById('timerButton');
    const resetButton = document.getElementById('resetTimerButton');
    const timerMessage = document.getElementById('timerMessage');
    
    timerButton.style.display = 'none';
    resetButton.style.display = 'inline-block';
    timerMessage.textContent = 'Timer is running! Take a break when it reaches 0:00';
    
    timerInterval = setInterval(() => {
        timerSeconds--;
        
        const minutes = Math.floor(timerSeconds / 60);
        const seconds = timerSeconds % 60;
        const timerText = document.getElementById('timerText');
        timerText.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timerSeconds <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            timerText.textContent = '00:00';
            timerMessage.textContent = '⏰ Time for a posture break! Stand up, stretch, and move around!';
            timerMessage.style.color = '#ffd700';
            timerMessage.style.fontWeight = 'bold';
            
            // Show notification
            if (Notification.permission === 'granted') {
                new Notification('Posture Break Time!', {
                    body: 'Take a break and stretch! Your PosturePal needs you!',
                    icon: 'images/posgotchi.png'
                });
            }
            
            // Reset timer after 5 seconds
            setTimeout(() => {
                resetPostureTimer();
            }, 5000);
        }
    }, 1000);
}

function resetPostureTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    timerSeconds = 30 * 60;
    const timerText = document.getElementById('timerText');
    const timerButton = document.getElementById('timerButton');
    const resetButton = document.getElementById('resetTimerButton');
    const timerMessage = document.getElementById('timerMessage');
    
    if (timerText) timerText.textContent = '30:00';
    if (timerButton) timerButton.style.display = 'inline-block';
    if (resetButton) resetButton.style.display = 'none';
    if (timerMessage) {
        timerMessage.textContent = 'Click to start a 30-minute posture break reminder!';
        timerMessage.style.color = '';
        timerMessage.style.fontWeight = '';
    }
}

// Request notification permission on page load
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

// Challenge Functions
let challengeActive = false;
let challengeProgress = 0;
let challengeCheckCount = 0;
const challengeGoal = 5; // Complete 5 posture checks

function startChallenge() {
    challengeActive = true;
    challengeProgress = 0;
    challengeCheckCount = 0;
    window.lastAllChecked = false;
    
    const challengeButton = document.getElementById('challengeButton');
    const challengeProgressEl = document.getElementById('challengeProgress');
    const challengeGoalEl = document.getElementById('challengeGoal');
    const challengeBar = document.getElementById('challengeBar');
    const challengeText = document.getElementById('challengeText');
    
    challengeButton.style.display = 'none';
    challengeProgressEl.style.display = 'block';
    challengeGoalEl.textContent = `Complete ${challengeGoal} perfect posture checks`;
    challengeText.textContent = 'Challenge started! Check off all items 5 times to complete!';
    challengeBar.style.width = '0%';
    
    // Create challenge tracking function
    window.trackChallengeProgress = function() {
        if (!challengeActive) return;
        
        let allChecked = true;
        for (let i = 1; i <= 5; i++) {
            if (!document.getElementById(`check${i}`).checked) {
                allChecked = false;
                break;
            }
        }
        
        if (allChecked) {
            // Only increment if this is a new complete check (not already counted)
            if (!window.lastAllChecked) {
                challengeCheckCount++;
                window.lastAllChecked = true;
                challengeProgress = (challengeCheckCount / challengeGoal) * 100;
                challengeBar.style.width = Math.min(challengeProgress, 100) + '%';
                
                if (challengeCheckCount >= challengeGoal) {
                    challengeActive = false;
                    challengeText.textContent = '🎉 Challenge Complete! You\'re a posture master!';
                    challengeText.style.color = '#ffd700';
                    challengeText.style.fontWeight = 'bold';
                } else {
                    challengeText.textContent = `Great! ${challengeCheckCount}/${challengeGoal} perfect checks completed!`;
                }
            }
        } else {
            window.lastAllChecked = false;
        }
    };
}


// Auto-update stats (gradual decrease over time)
setInterval(() => {
    if (characterStats.hunger > 0) {
        characterStats.hunger = Math.max(0, characterStats.hunger - 0.1);
    }
    if (characterStats.happiness > 0) {
        characterStats.happiness = Math.max(0, characterStats.happiness - 0.05);
    }
    if (characterStats.posture > 0) {
        characterStats.posture = Math.max(0, characterStats.posture - 0.05);
    }
    updateCharacterDisplay();
}, 5000); // Update every 5 seconds

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCharacterDisplay();
    
    // Add smooth scroll to nav links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.info-card, .example-card, .character-card, .data-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add parallax effect to hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

