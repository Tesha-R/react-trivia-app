import { useState, useEffect } from 'react';
import { decode } from 'html-entities';
import AnswerInputs from './AnswerInputs';

function App() {
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);
  const [formData, setFormData] = useState('');
  const [newQuiz, setNewQuiz] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&category=11&type=multiple')
      .then((res) => res.json())
      .then((data) => {
        //    Reformat data and randomize answers
        const newQuizData = data.results.map((data) => {
          return {
            question: decode(data.question),
            answerOptions: shuffleAnswers([
              { answerText: decode(data.correct_answer), isCorrect: true },
              {
                answerText: decode(data.incorrect_answers[0]),
                isCorrect: false,
              },
              {
                answerText: decode(data.incorrect_answers[1]),
                isCorrect: false,
              },
              {
                answerText: decode(data.incorrect_answers[2]),
                isCorrect: false,
              },
            ]),
          };
        });
        // console.log('data', newQuizData);
        setQuizData(newQuizData);
      });

    return () => {
      setFormData(true);
    };
  }, [newQuiz]);

  function handleSubmit(event) {
    event.preventDefault();
    console.log('formData', formData);
    setIsSubmitted(true);
  }

  function handleNewQuiz(event) {
    //event.preventDefault();
    setNewQuiz(true);
  }
  // Randomize order of answers displayed
  function shuffleAnswers(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[random];
      arr[random] = temp;
    }
    return arr;
  }
  //Map over quiz data and render data
  const quizLayout = quizData.map((data, index) => {
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
