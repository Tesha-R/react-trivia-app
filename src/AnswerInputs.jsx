function AnswerInputs({
  index,
  answerText,
  isCorrect,
  quizResults,
  setQuizResults,
  score,
  setScore,
  isQuizComplete,
}) {
  function handleChange(event) {
    const { name, value, dataset, checked } = event.target;
    console.log('quizResults onChange', quizResults);

    if (checked && dataset.answer === 'true') {
      setScore(score + 1);
      console.log('score', score);
    }
    setQuizResults((prevQuizResults) => {
      return {
        ...prevQuizResults,
        [name]: {
          answerItem: value,
          data: dataset.answer,
        },
      };
    });
  }
  function highlightAnswers(answerValue, isCorrect, index) {
    if (isQuizComplete && isCorrect === true) {
      return 'right-answer';
    }
    if (
      isQuizComplete &&
      quizResults[index]?.answerItem === answerValue &&
      quizResults[index]?.data === 'true'
    ) {
      return 'right-answer';
    }
    if (
      isQuizComplete &&
      quizResults[index]?.answerItem === answerValue &&
      quizResults[index]?.data === 'false'
    ) {
      return 'wrong-answer';
    }
  }
  return (
    <>
      <input
        type="radio"
        id={answerText}
        name={index}
        value={answerText}
        onChange={handleChange}
        data-answer={isCorrect}
      />
      <label
        htmlFor={answerText}
        data-answer={isCorrect}
        className={highlightAnswers(answerText, isCorrect, index)}
      >
        {answerText}
      </label>
    </>
  );
}

export default AnswerInputs;
