document.addEventListener('DOMContentLoaded', function() {
    // --- Quiz Data ---
    const questions = [
        {
            question: "What is the capital of France?",
            answers: [
                { text: "Berlin", correct: false },
                { text: "Madrid", correct: false },
                { text: "Paris", correct: true },
                { text: "Rome", correct: false }
            ]
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: [
                { text: "Earth", correct: false },
                { text: "Mars", correct: true },
                { text: "Jupiter", correct: false },
                { text: "Venus", correct: false }
            ]
        },
        {
            question: "What is 2 + 2?",
            answers: [
                { text: "3", correct: false },
                { text: "4", correct: true },
                { text: "5", correct: false },
                { text: "6", correct: false }
            ]
        },
        {
            question: "What is the largest ocean on Earth?",
            answers: [
                { text: "Atlantic Ocean", correct: false },
                { text: "Indian Ocean", correct: false },
                { text: "Arctic Ocean", correct: false },
                { text: "Pacific Ocean", correct: true }
            ]
        }
    ];

    // --- DOM Elements ---
    const questionTextElement = document.getElementById('question-text');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const feedbackMessageElement = document.getElementById('feedback-message');
    const nextButton = document.getElementById('next-btn');
    const questionArea = document.getElementById('question-area');
    const scoreArea = document.getElementById('score-area');
    const finalScoreElement = document.getElementById('final-score');
    const restartButton = document.getElementById('restart-btn');

    // --- Quiz State Variables ---
    let currentQuestionIndex = 0;
    let score = 0;
    let answerSelected = false; // To prevent multiple answers per question

    // --- Functions ---

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        answerSelected = false;
        questionArea.classList.remove('hide'); // Show question area
        scoreArea.classList.add('hide'); // Hide score area
        nextButton.classList.add('hide'); // Hide next button initially
        feedbackMessageElement.textContent = ''; // Clear feedback
        showQuestion();
    }

    function showQuestion() {
        resetState(); // Clear previous answers and styles

        let currentQuestion = questions[currentQuestionIndex];
        questionTextElement.textContent = currentQuestion.question;

        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                // Store whether the answer is correct as a data attribute
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }

    function resetState() {
        // Clear previous feedback and hide next button
        feedbackMessageElement.textContent = '';
        nextButton.classList.add('hide');
        
        // Remove all previous answer buttons
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
        answerSelected = false; // Reset selection state for new question
    }

    function selectAnswer(e) {
        if (answerSelected) return; // Prevent selecting multiple answers
        answerSelected = true;

        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true"; // Check data attribute

        // Add correct/incorrect classes to the selected button
        if (isCorrect) {
            selectedBtn.classList.add('correct');
            feedbackMessageElement.textContent = "Correct!";
            feedbackMessageElement.style.color = '#27ae60'; // Green text
            score++;
        } else {
            selectedBtn.classList.add('incorrect');
            feedbackMessageElement.textContent = "Incorrect. Try again!"; // Changed to a more engaging message
            feedbackMessageElement.style.color = '#e74c3c'; // Red text
            
            // Find and highlight the correct answer
            Array.from(answerButtonsElement.children).forEach(button => {
                if (button.dataset.correct === "true") {
                    button.classList.add('correct-after-incorrect'); // Highlight correct answer
                }
            });
        }

        // Disable all answer buttons after one is selected
        Array.from(answerButtonsElement.children).forEach(button => {
            button.classList.add('btn-disabled'); // Optional: visually dim
            button.removeEventListener('click', selectAnswer); // Prevent further clicks
            button.style.pointerEvents = 'none'; // Ensure no more clicks
        });

        // Show the next button
        nextButton.classList.remove('hide');
    }

    function handleNextButton() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }

    function showScore() {
        questionArea.classList.add('hide'); // Hide question area
        scoreArea.classList.remove('hide'); // Show score area
        finalScoreElement.textContent = `You scored ${score} out of ${questions.length} questions.`;
    }

    // --- Event Listeners ---
    nextButton.addEventListener('click', handleNextButton);
    restartButton.addEventListener('click', startQuiz);

    // --- Initialize Quiz ---
    startQuiz();
});