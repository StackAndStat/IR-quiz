function Progress({ questionLen, index, answer, point, maxPoint }) {
  return (
    <header className="progress">
      <progress
        max={questionLen}
        value={answer !== null ? index + 1 : index}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {questionLen}
      </p>
      <p>
        <strong>{point}</strong> / {maxPoint}
      </p>
    </header>
  );
}

export default Progress;
