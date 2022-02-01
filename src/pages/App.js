import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "../components/Header";
import Button from "../components/Button";
import VideoPlayer from "../components/VideoPlayer";
import AudioClip from "../components/AudioClip";
import Timer from "../components/Timer";

import videoSource from "../assets/videos/count-down.mp4";

function App() {
  const [audioClipLabel, setAudioClipLabel] = React.useState("");
  const [mediaRecorder, setMediaRecorder] = React.useState();
  const { video, audio, timer } = useSelector(state => state);
  const dispatch = useDispatch();

  let chunks = [];

  React.useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia supported.");
      console.log({ video, audio });

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(onSuccess, onError);
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  }, [video, audio]);

  React.useEffect(() => {
    if (timer.done) {
      onStopButtonClick();
    }
  }, [timer.done]);

  const onSuccess = function (stream) {
    let mr = new MediaRecorder(stream);

    mr.onstop = function (e) {
      console.log("data available after MediaRecorder.stop() called.");

      // const clipName = prompt(
      //   "Enter a name for your sound clip?",
      //   "My unnamed clip"
      // );

      // if (clipName === null) {
      //   setAudioClipLabel("My unnamed clip");
      // } else {
      //   setAudioClipLabel(clipName);
      // }

      const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
      chunks = [];
      const audioURL = window.URL.createObjectURL(blob);
      dispatch({ type: "update_audio", payload: audioURL });
    };

    mr.ondataavailable = function (e) {
      chunks.push(e.data);
    };
    setMediaRecorder(mr);
  };

  const onError = function (err) {
    console.log("The following error occured: " + err);
  };

  const dispatchTimer = function () {
    dispatch({ type: "start_timer", payload: true });
  };

  const onRecordButtonClick = () => {
    mediaRecorder.start();
    console.log(mediaRecorder.state);
    console.log("recorder started");
    // record.style.background = "red";
    // stop.disabled = false;
    // record.disabled = true;
    dispatchTimer();
  };

  const onStopButtonClick = () => {
    mediaRecorder.stop();
    console.log(mediaRecorder.state);
    console.log("recorder stopped");
    // record.style.background = "";
    // record.style.color = "";
    // mediaRecorder.requestData();

    // stop.disabled = true;
    // record.disabled = false;
  };

  return (
    <div>
      <Header text='Web dictaphone' />

      <section>
        <VideoPlayer src={videoSource} />
        <Timer duration={video.duration} />
      </section>

      <section className='main-controls'>
        <canvas className='visualizer' height='60px'></canvas>
        <div id='buttons'>
          <Button
            text='Record'
            className='record'
            onClick={onRecordButtonClick}
          />
          <Button text='Stop' className='stop' onClick={onStopButtonClick} />
        </div>
      </section>

      <section className='sound-clips'>
        <AudioClip label={audioClipLabel} src={audio.recording} />
      </section>
    </div>
  );
}

export default App;
