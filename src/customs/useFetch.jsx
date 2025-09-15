import { useEffect, useReducer } from "react";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  point: 0,
  time: null,
};

const SECS_PER_QUESTION = 12;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "active":
      return {
        ...state,
        status: "active",
        time: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        point:
          action.payload === question.correctOption
            ? state.point + question.points
            : state.point,
      };
    }
    case "next":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return { ...state, status: "finished" };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    // case "tick":
    //   return {
    //     ...state,
    //     time: state.time - 1,
    //     status: state.time === 0 ? "finished" : state.status,
    //   };
    case "tick": {
      if (state.time <= 1) {
        return {
          ...state,
          time: 0,
          status: "finished",
        };
      }

      return {
        ...state,
        time: state.time - 1,
      };
    }

    default:
      throw new Error("Unknown action");
  }
}

function useFetch() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const response = await fetch("/api/api/quiz");
        const data = await response.json();
        dispatch({ type: "dataReceived", payload: data.questions });
      } catch (err) {
        dispatch({ type: "dataFailed" });
        console.error("Failed to fetch questions:", err.message);
      }
    }

    fetchQuestion();
  }, []);

  return [state, dispatch];
}

export { useFetch };
