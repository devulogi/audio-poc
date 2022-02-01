const reducer = (state = { start: false, done: false }, { type, payload }) => {
  if (type === "start_timer") {
    return { ...state, start: payload };
  }
  if (type === "done") {
    return { ...state, done: payload };
  }
  return state;
};

export default reducer;
