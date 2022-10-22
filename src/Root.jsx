import { Link } from 'react-router-dom';

function Root() {
  return (
    <div className="main-el">
      <h1 className="main-el-title">Triva Time</h1>
      <button className="trivia-start-btn">
        <Link to={'App'}>Start Triva</Link>
      </button>
    </div>
  );
}

export default Root;
