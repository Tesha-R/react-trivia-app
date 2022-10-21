import { useState, useEffect } from 'react';
import AnswerInputs from './AnswerInputs';
// API - https://opentdb.com/api.php?amount=5&category=11&type=multiple
function App() {
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);
  const [formData, setFormData] = useState(true);
  const [newQuiz, setNewQuiz] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetch('data.json')
      .then((res) => res.json())
      .then((data) => setQuizData(data.results));
    return () => {
      setFormData(true);
    };
  }, [newQuiz]);

  function handleSubmit(event) {
    event.preventDefault();
    console.log('formData', formData);
    setIsSubmitted(true);
  }

  function handleNewQuiz() {
    setNewQuiz(true);
  }
  // Randomize answers
  function shuffleAnswers(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[random];
      arr[random] = temp;
    }
    return arr;
  }

  // Reformat quiz data and randomize answers
  const newQuizData = quizData.map((data) => {
    return {
      question: data.question,
      answerOptions: [
        { answerText: data.correct_answer, isCorrect: true },
        {
          answerText: data.incorrect_answers[0],
          isCorrect: false,
        },
        {
          answerText: data.incorrect_answers[1],
          isCorrect: false,
        },
        {
          answerText: data.incorrect_answers[2],
          isCorrect: false,
        },
      ],
    };
  });

  //Map over quiz data and render form
  const quizLayout = newQuizData.map((data, index) => {
    return (
      <div className="question-el">
        <h3 className="question-item">{data.question}</h3>
        <AnswerInputs
          answer={data.answerOptions}
          index={index}
          correct={data.answerOptions}
          score={score}
          setScore={setScore}
          formData={formData}
          setFormData={setFormData}
          setIsSubmitted={setIsSubmitted}
          isSubmitted={isSubmitted}
        />
      </div>
    );
  });

  return (
    <>
      <h1 className="page-title">Trivia Time</h1>
      <div className="quiz-el">
        <form>
          {quizLayout}
          {isSubmitted ? (
            <>
              <button className="play-again-btn" onClick={handleNewQuiz}>
                Play Again
              </button>
              <h3 className="title">You scored {score}/5 correct answers</h3>
            </>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className="quiz-submit-btn"
            >
              Check Answers
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default App;
