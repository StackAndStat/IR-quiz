function Option({ options, dispatch, answer, correctOption }) {
  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          className={`btn btn-option
          ${index === answer ? "answer" : ""}
          ${answer !== null && index === correctOption ? "correct" : ""}
          ${
            answer !== null && index === answer && answer !== correctOption
              ? "wrong"
              : ""
          }
          `}
          key={index}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={answer !== null}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Option;
