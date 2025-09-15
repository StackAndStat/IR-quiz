import Option from "./Option";

function Question({ question, dispatch, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Option
        dispatch={dispatch}
        answer={answer}
        options={question.options}
        correctOption={question.correctOption}
      />
    </div>
  );
}

export default Question;
