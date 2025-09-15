function NextButton({ answer, dispatch, index, questionLen }) {
  if (answer === null) return;

  if (index < questionLen - 1) {
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "next" })}
        >
          Next
        </button>
      </div>
    );
  }

  if (index === questionLen - 1) {
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finished" })}
        >
          Finish
        </button>
      </div>
    );
  }
}

export default NextButton;
