const algebraQuizPackage1 = {
    questions: [
        //question 1
        {
            question: 'Solve the equation: 5(- 3x - 2) - (x - 3) = -4(4x + 5) + 13',
            choices: [
                'x = undefined',
                'x = 4',
                'x = 2',
                'x = 0',
                'x = -1'
            ],
            answer: 'x = 0'
        },
        //question 2
        {
            question: 'Simplify the expression: 2(a -3) + 4b - 2(a -b -3) + 5',
            choices: [
                '6b + 5',
                '5a + 6',
                6,
                '6a + 5',
                '5b + 6'
            ],
            answer: '6b + 5'
        },
        //question 3
        {
            question: 'Find the x intercept of the equation: 2x - 4y = 9',
            choices: [
                1.5,
                3.5,
                4.5,
                5.5,
                9
            ],
            answer: 4.5
        },
        //question 4
        {
            question: 'Evaluate f(2) - f(1). f(x) = 6x + 1',
            choices: [
                -6,
                2,
                4,
                6,
                10
            ],
            answer: 6
        },
        //question 5
        {
            question: 'Find the slope of the line passing through the points (-1, -1) and (2 , 2)',
            choices: [
                -1,
                0,
                1,
                2,
                4
            ],
            answer: 1
        }
    ],
    status: 0,
    score: 0
}

//creates the question HTML for use
function questionCreator(item) {
    const codeGen = 
    `<form class="quiz-form">  
    <fieldset class ="question">
        <legend>${item.question}</legend>
        <input type="radio" name="algebra-1" id="id1" value="${item.choices[0]}">
        <label for="algebra-1">${item.choices[0]}</label>
        <br>
        <input type="radio" name="algebra-1" id="id1" value="${item.choices[1]}">
        <label for="algebra-1">${item.choices[1]}</label>
        <br>
        <input type="radio" name="algebra-1" id="id1" value="${item.choices[2]}">
        <label for="algebra-1">${item.choices[2]}</label>
        <br>
        <input type="radio" name="algebra-1" id="id1" value="${item.choices[3]}">
        <label for="algebra-1">${item.choices[3]}</label>
        <br>
        <input type="radio" name="algebra-1" id="id1" value="${item.choices[4]}">
        <label for="algebra-1">${item.choices[4]}</label>
    </fieldset>
    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
    </form>
    `;
    return codeGen;
}

//beings the quiz upon click on button
function startAlgebraQuiz() {
    $('#start-quiz').on('click', function(event){
        $('.start-quiz').hide();
        handleQuestions();
    })
}

//updates the progress as the user proceed through the quiz
function updateStatus(){
    const statusNum = algebraQuizPackage1.status + 1;
    const statusMax = algebraQuizPackage1.questions.length;
    $('.status').text(`Status: ${statusNum}/${statusMax}`);
}

//updates the score as the user proceed through the quiz
function updateScore(){
    const scoreNum = algebraQuizPackage1.score;
    const scoreMax = algebraQuizPackage1.questions.length;
    $('.score').text(`Score: ${scoreNum}/${scoreMax}`);
}

//updates the HTML to show the question
function handleQuestions() {
    // console.log(algebraQuizPackage1.status);
    // console.log(algebraQuizPackage1.questions.length);
    if (algebraQuizPackage1.status < algebraQuizPackage1.questions.length){
        const questionObj = algebraQuizPackage1.questions[algebraQuizPackage1.status];
        const questionMaker = questionCreator(questionObj);
        $('.main-section').html(questionMaker);
        updateStatus();
    } else {
        handleEndOfQuiz();
    }
}

//listens for the submitted answer and tells the user whether s/he got it right/wrong
function handleAnswers() {
    $('.main-section').on('submit', function(event){
        event.preventDefault();
        $('.quiz-form button').hide();
        const submittedAnswer = $('input[name=algebra-1]:checked').val();
        // console.log("the submitted answer is " + submittedAnswer);
        const correctAnswer = algebraQuizPackage1.questions[algebraQuizPackage1.status].answer;
        // console.log("the correct answer is " + correctAnswer);
        if (submittedAnswer === correctAnswer) {
            handleCorrectAnswer();
        } else {
            handleIncorrectAnswer(correctAnswer);
        }
        algebraQuizPackage1.status++;
    })
}

//creates the code for confirming that the correct answer has been chosen
function handleCorrectAnswer() {
    const correctAnswerCode = 
        `<form>  
        <fieldset>
            <legend>You are correct!</legend>
        </fieldset>
        <button type="button">Next</button>`;
    $('.response-action').html(correctAnswerCode);
    algebraQuizPackage1.score++;
    updateScore();
}

//creates the code to tell the user the wrong answer has been chosen
function handleIncorrectAnswer(answer) {
    const incorrectAnswerCode = 
    `<form>  
    <fieldset>
        <legend>That's a bummer. The correct answer is ${answer}</legend>
    </fieldset>
    <button type="button">Next</button>`;
    $('.response-action').html(incorrectAnswerCode);
}

//listesn for when the user clicks next to move on to the next question.
function handleNext() {
    $('.response-action').on('click', 'button', function(event){
        $('.response-action form').hide();
        handleQuestions();
    })
}

//functions that addresses the end of the quiz
function handleEndOfQuiz() {
    console.log('handle the end of quiz');
    $('.quiz-form').hide();
    const endOfQuizMessage = 
    `<form>  
    <fieldset>
        <legend>Congrats on finishing the quiz! See your score below</legend>
    </fieldset>
    <button type="button" id="restartButton">Restart</button>`;
    $('.restart-form').html(endOfQuizMessage); 
}

//allows for the quiz to be restarted as directed by the user
function restartQuiz() {
    $('.restart-form').on('click', function(event){
        algebraQuizPackage1.status = 0;
        algebraQuizPackage1.score = 0;
        $('.restart-form').hide();
        updateStatus();
        updateScore();
        handleQuestions();
    })
}

function handleAlgebraQuiz() {
    startAlgebraQuiz();
    handleAnswers();
    handleNext();
    restartQuiz();
}

$(handleAlgebraQuiz);