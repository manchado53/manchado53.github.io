/* ===================================
   SOCCER MINI-GAME EASTER EGG
   Adrian Manchado Portfolio - 2025
   Press 'G' to start the game!
   =================================== */

(function() {
    'use strict';

    let gameActive = false;
    let score = 0;
    let timeLeft = 30;
    let gameInterval;
    let timerInterval;

    document.addEventListener('DOMContentLoaded', function() {
        
        // Listen for 'G' key to start game
        document.addEventListener('keydown', function(e) {
            if (e.key.toLowerCase() === 'g' && !gameActive) {
                startGame();
            } else if (e.key === 'Escape' && gameActive) {
                endGame();
            }
        });

        // Create game container
        function createGameContainer() {
            const gameContainer = document.createElement('div');
            gameContainer.id = 'soccer-game';
            gameContainer.innerHTML = `
                <div class="game-header">
                    <div class="game-title">⚽ PENALTY SHOOTOUT ⚽</div>
                    <div class="game-stats">
                        <span class="score">Score: <span id="game-score">0</span></span>
                        <span class="timer">Time: <span id="game-timer">30</span>s</span>
                    </div>
                    <button class="close-game" onclick="window.endSoccerGame()">✕</button>
                </div>
                <div class="game-field">
                    <div class="goal">
                        <div class="goal-section" data-section="top-left">
                            <span class="goal-label">Top Left</span>
                        </div>
                        <div class="goal-section" data-section="top-center">
                            <span class="goal-label">Top Center</span>
                        </div>
                        <div class="goal-section" data-section="top-right">
                            <span class="goal-label">Top Right</span>
                        </div>
                        <div class="goal-section" data-section="bottom-left">
                            <span class="goal-label">Bottom Left</span>
                        </div>
                        <div class="goal-section" data-section="bottom-center">
                            <span class="goal-label">Bottom Center</span>
                        </div>
                        <div class="goal-section" data-section="bottom-right">
                            <span class="goal-label">Bottom Right</span>
                        </div>
                    </div>
                    <div class="ball" id="game-ball">⚽</div>
                    <div class="goalkeeper" id="goalkeeper">🧤</div>
                </div>
                <div class="game-instructions">
                    <p>Click on the goal sections to shoot! Avoid the goalkeeper!</p>
                    <p class="small-text">Press ESC to exit</p>
                </div>
                <div class="game-message" id="game-message"></div>
            `;
            document.body.appendChild(gameContainer);

            // Add click handlers to goal sections
            const sections = document.querySelectorAll('.goal-section');
            sections.forEach(section => {
                section.addEventListener('click', function() {
                    shootBall(this.dataset.section);
                });
            });
        }

        function startGame() {
            if (gameActive) return;
            
            gameActive = true;
            score = 0;
            timeLeft = 30;

            createGameContainer();
            
            // Start goalkeeper movement
            gameInterval = setInterval(moveGoalkeeper, 800);
            
            // Start timer
            timerInterval = setInterval(updateTimer, 1000);

            // Show start message
            showMessage('🎮 Game Started! Click to shoot!', 'success');

            console.log('%c⚽ SOCCER GAME STARTED!', 'color: #1a8754; font-size: 20px; font-weight: bold;');
            console.log('%cClick on goal sections to score!', 'color: #00ff41; font-size: 14px;');
        }

        function endGame() {
            if (!gameActive) return;
            
            gameActive = false;
            clearInterval(gameInterval);
            clearInterval(timerInterval);

            const gameContainer = document.getElementById('soccer-game');
            if (gameContainer) {
                // Show final score
                showMessage(`🏆 Game Over! Final Score: ${score}`, 'info', 3000);
                
                setTimeout(() => {
                    gameContainer.remove();
                }, 3000);
            }

            console.log(`%c⚽ FINAL SCORE: ${score} goals!`, 'color: #1a8754; font-size: 18px; font-weight: bold;');
        }

        // Make endGame available globally
        window.endSoccerGame = endGame;

        function shootBall(targetSection) {
            if (!gameActive) return;

            const ball = document.getElementById('game-ball');
            const goalkeeper = document.getElementById('goalkeeper');
            const goalSections = document.querySelectorAll('.goal-section');
            
            // Get goalkeeper position
            const goalkeeperSection = goalkeeper.dataset.position;
            
            // Animate ball
            ball.style.transition = 'all 0.5s ease-out';
            
            // Get target section element
            const targetElement = document.querySelector(`[data-section="${targetSection}"]`);
            const rect = targetElement.getBoundingClientRect();
            const gameRect = document.getElementById('soccer-game').getBoundingClientRect();
            
            // Calculate ball position
            const ballX = rect.left - gameRect.left + rect.width / 2;
            const ballY = rect.top - gameRect.top + rect.height / 2;
            
            ball.style.left = ballX + 'px';
            ball.style.top = ballY + 'px';
            ball.style.transform = 'scale(0.5) rotate(720deg)';

            // Check if goal or save
            setTimeout(() => {
                if (targetSection === goalkeeperSection) {
                    // Goalkeeper saved it!
                    showMessage('🧤 SAVED! Try again!', 'error');
                    targetElement.classList.add('saved');
                    setTimeout(() => targetElement.classList.remove('saved'), 500);
                } else {
                    // GOAL!
                    score++;
                    document.getElementById('game-score').textContent = score;
                    showMessage('⚽ GOAL! +1', 'success');
                    targetElement.classList.add('goal');
                    setTimeout(() => targetElement.classList.remove('goal'), 500);
                }

                // Reset ball
                setTimeout(() => {
                    ball.style.transition = 'none';
                    ball.style.left = '50%';
                    ball.style.top = '80%';
                    ball.style.transform = 'translate(-50%, -50%) scale(1)';
                }, 600);
            }, 500);
        }

        function moveGoalkeeper() {
            if (!gameActive) return;

            const goalkeeper = document.getElementById('goalkeeper');
            const positions = [
                'top-left', 'top-center', 'top-right',
                'bottom-left', 'bottom-center', 'bottom-right'
            ];
            
            const randomPosition = positions[Math.floor(Math.random() * positions.length)];
            goalkeeper.dataset.position = randomPosition;

            const targetElement = document.querySelector(`[data-section="${randomPosition}"]`);
            const rect = targetElement.getBoundingClientRect();
            const gameRect = document.getElementById('soccer-game').getBoundingClientRect();
            
            const gkX = rect.left - gameRect.left + rect.width / 2;
            const gkY = rect.top - gameRect.top + rect.height / 2;
            
            goalkeeper.style.left = gkX + 'px';
            goalkeeper.style.top = gkY + 'px';
        }

        function updateTimer() {
            if (!gameActive) return;

            timeLeft--;
            document.getElementById('game-timer').textContent = timeLeft;

            if (timeLeft <= 0) {
                endGame();
            } else if (timeLeft <= 10) {
                document.getElementById('game-timer').style.color = '#ff4444';
            }
        }

        function showMessage(text, type = 'info', duration = 1500) {
            const messageEl = document.getElementById('game-message');
            if (!messageEl) return;

            messageEl.textContent = text;
            messageEl.className = 'game-message show ' + type;

            setTimeout(() => {
                messageEl.classList.remove('show');
            }, duration);
        }

        // Console Easter Egg hint
        console.log('%c🎮 EASTER EGG HINT:', 'color: #1a8754; font-size: 16px; font-weight: bold;');
        console.log('%cPress "G" to play the Soccer Mini-Game!', 'color: #00ff41; font-size: 14px;');
        console.log('%c⚽ Can you score 10 goals in 30 seconds?', 'color: #0066ff; font-size: 12px;');
    });

})();
