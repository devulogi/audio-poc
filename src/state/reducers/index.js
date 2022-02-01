import { combineReducers } from "redux";
import videoReducer from "./videoReducer";
import audioReducer from "./audioReducer";
import timerReducer from "./timerReducer";

const reducers = combineReducers({
  video: videoReducer,
  audio: audioReducer,
  timer: timerReducer,
});

export default reducers;
