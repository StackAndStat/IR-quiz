function StartScreen({ questionLen, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the IR quiz</h2>
      <h3>{questionLen} questions to test your IR mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "active" })}
      >
        Let's get started
      </button>
    </div>
  );
}

export default StartScreen;
