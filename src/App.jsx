import { useState, useEffect } from 'react';
import { decode } from 'html-entities';
import AnswerInputs from './AnswerInputs';
import Root from './Root';

const initialValues = {
  difficultyLevel: 'easy',
  questionAmount: '5',
};
function App() {
  const [quizData, setQuizData] = useState([]); // Quiz data from API
  const [score, setScore] = useState(0); // Quiz score
  const [quizResults, setQuizResults] = useState(''); // Results from quiz
  const [isQuizLoaded, setIsQuizLoaded] = useState(false); // Generate new quiz from API
  const [isQuizComplete, setIsQuizComplete] = useState(false); // Track if quiz is over
  const [quizSettings, setQuizSettings] = useState(initialValues); // Apply quiz url parameters

  //https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple

  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=${quizSettings.questionAmount}&difficulty=${quizSettings.difficultyLevel}&type=multiple`
    )
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
        setQuizData(newQuizData);
      });
  }, [isQuizLoaded]);

  function handleStartQuiz() {
    setIsQuizLoaded(false);
  }

  function handleSubmitQuiz(event) {
    event.preventDefault();
    setIsQuizComplete(true);
    console.log('quizResults', quizResults);
    console.log('isQuizLoaded', isQuizLoaded);
  }

  function handleLoadQuiz(event) {
    setIsQuizComplete(false);
    setIsQuizLoaded(true);
    setScore(0);
    console.log('isQuizLoaded', isQuizLoaded);
    console.log('isQuizComplete', isQuizComplete);
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
        <h3 className="question-item" key={data.question}>
          {data.question}
        </h3>
        {data.answerOptions.map((answer) => {
          return (
            <div className="answer-item">
              <AnswerInputs
                key={answer.answerText}
                index={index}
                answerText={answer.answerText}
                isCorrect={answer.isCorrect}
                quizResults={quizResults}
                setQuizResults={setQuizResults}
                score={score}
                setScore={setScore}
                isQuizComplete={isQuizComplete}
              />
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <>
      {!isQuizLoaded ? (
        <Root
          quizStart={handleLoadQuiz}
          quizSettings={quizSettings}
          setQuizSettings={setQuizSettings}
        />
      ) : (
        <>
          <div>
            <h1 className="page-title">
              Trivia Time
              <button className="settings-btn" onClick={handleStartQuiz}>
                Settings
              </button>
            </h1>
            <div className="quiz-el">
              <form>
                {quizLayout}
                {!isQuizComplete ? (
                  <button
                    type="submit"
                    className="quiz-submit-btn"
                    onClick={handleSubmitQuiz}
                  >
                    Check Answers
                  </button>
                ) : (
                  <>
                    <button
                      type="reset"
                      className="play-again-btn"
                      onClick={handleLoadQuiz}
                    >
                      Play Again
                    </button>
                    <h3 className="title">
                      You scored {score}/{quizData.length} correct answers
                    </h3>
                  </>
                )}
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
