const reducer = (
  state = { duration: 0, isRunning: false, play: false },
  { type, payload }
) => {
  if (type === "update_duration") {
    return { ...state, duration: payload };
  }
  if (type === "update_play") {
    return { ...state, play: payload };
  }
  return state;
};

export default reducer;
