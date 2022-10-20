import { useState, useEffect } from 'react';
import AnswerInputs from './AnswerInputs';
// API - https://opentdb.com/api.php?amount=5&category=11&type=multiple
function App() {
  // create state to hold my quiz data
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);
  const [formData, setFormData] = useState();
  const [newQuiz, setNewQuiz] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetch('data.json')
      .then((res) => res.json())
      .then((data) => setQuizData(data.results));
  }, []);

  function handleSubmit(event) {
    console.log('event', event);
    event.preventDefault();
    console.log('formData', formData);
    setIsSubmitted(true);
  }

  // Reformat quiz data to randomize answers
  // TODO: randomize answers
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

  //map over quiz data to get questions
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
        <form onSubmit={handleSubmit}>
          {quizLayout}
          {isSubmitted ? (
            <>
              <button className="play-again-btn">Play Again</button>
              <h3 className="title">You scored {score}/5 correct answers</h3>
            </>
          ) : (
            <button type="submit" className="quiz-submit-btn">
              Check Answers
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default App;
