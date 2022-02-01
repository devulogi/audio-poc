import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

const useIsMount = function () {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

function useInterval(duration) {
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  const { start } = useSelector(state => state.timer);
  const dispatch = useDispatch();
  const isMount = useIsMount();

  useEffect(() => {
    setTimer(Math.floor(duration));
  }, [duration]);

  useEffect(() => {
    if (!isMount && timer === 0) {
      callback();
      return clearInterval(intervalId);
    }
  }, [timer]);

  useEffect(() => {
    if (start) {
      computeTimeLeft();
    }
  }, [start]);

  const callback = function () {
    dispatch({ type: "start_timer", payload: false });
    dispatch({ type: "done", payload: true });
  };

  const computeTimeLeft = function () {
    clearInterval(intervalId);
    let id = setInterval(() => {
      setTimer(prevTime => prevTime - 1);
    }, 1000);
    setIntervalId(id);
  };

  return timer;
}

function Timer({ duration }) {
  const { start } = useSelector(state => state.timer);
  const timer = useInterval(duration);

  if (start) {
    return <div>Duration: {timer}</div>;
  }

  return <div>Not recording yet</div>;
}

export default Timer;
