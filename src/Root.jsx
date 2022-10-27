function Root({ quizStart, quizSettings, setQuizSettings }) {
  function handleChange(event) {
    const { name, value } = event.target;

    setQuizSettings({ ...quizSettings, [name]: value });
  }
  return (
    <>
      <div className="main-el">
        <h1 className="main-el-title">Trivia Time</h1>
        <p className="main-el-p">
          This is a fun Trivia game with challenging questions that test your
          worldly knowledge about various topics.
        </p>
        <form>
          <div className="settings-el">
            <label htmlFor="questionAmount">Number of Questions</label>
            <input
              key={quizSettings.questionAmount}
              type="text"
              name="questionAmount"
              id="questionAmount"
              className="form-el input"
              value={quizSettings.questionAmount}
              onChange={handleChange}
            />
          </div>

          <div className="settings-el">
            <label htmlFor="difficultyLevel">Level of Difficulty</label>
            <select
              key={quizSettings.difficultyLevel}
              id="difficultyLevel"
              className="form-el select"
              name="difficultyLevel"
              value={quizSettings.difficultyLevel}
              onChange={handleChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <button
            type="submit"
            className="trivia-start-btn"
            onClick={quizStart}
          >
            Start Triva
          </button>
        </form>
      </div>
      <footer class="footer-el">
        Project built by
        <a href="https://github.com/Tesha-R" target="_blank">
          {' '}
          Tesha
        </a>
      </footer>
    </>
  );
}

export default Root;
