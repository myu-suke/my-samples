// コンポーネント内部の状態管理を外部から制御
import React, { useReducer } from "react";

type Action = { type: "toggle" };
type State = { on: boolean };
type Reducer = (state: State, action: Action) => State;

type Props = {
  reducer?: Reducer;
};

const defaultReducer: Reducer = (state, action) => {
  switch (action.type) {
    case "toggle":
      return { on: !state.on };
    default:
      return state;
  }
};

export const Toggle: React.FC<Props> = ({ reducer = defaultReducer }) => {
  const [state, dispatch] = useReducer(reducer, { on: false });

  return (
    <button onClick={() => dispatch({ type: "toggle" })}>
      {state.on ? "ON" : "OFF"}
    </button>
  );
};
