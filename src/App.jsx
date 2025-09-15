import { useFetch } from "./customs/useFetch";

import Header from "./components/Header";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Question from "./components/Question";
import Footer from "./components/Footer";
import NextButton from "./components/NextButton";
import FinishedScreen from "./components/FinishedScreen";
import Progress from "./components/Progress";
import Timer from "./components/Timer";

const initialValue = 0;

function App() {
  const [{ questions, status, index, answer, point, time }, dispatch] =
    useFetch();

  const questionLen = questions.length;
  const maxPoint = questions.reduce(
    (acc, curVal) => acc + curVal.points,
    initialValue
  );

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "error" && <Error />}
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen questionLen={questionLen} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              questionLen={questionLen}
              index={index}
              answer={answer}
              point={point}
              maxPoint={maxPoint}
            />
            <Question
              question={questions.at(index)}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} time={time} />
              <NextButton
                answer={answer}
                dispatch={dispatch}
                index={index}
                questionLen={questionLen}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            point={point}
            maxPoints={maxPoint}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
