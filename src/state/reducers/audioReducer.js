const reducer = (state = { recording: null }, { type, payload }) => {
  if (type === "update_audio") {
    return { ...state, recording: payload };
  }
  return state;
};

export default reducer;
