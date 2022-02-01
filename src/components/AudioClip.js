import React from "react";
import { useDispatch } from "react-redux";

function AudioClip({ label, src }) {
  const [isMetadataLoaded, setIsMetadataLoaded] = React.useState(null);
  const audioRef = React.useRef();
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log("audio metadata is loaded");
  }, [isMetadataLoaded]);

  const handleMetadata = event => {
    setIsMetadataLoaded(event.currentTarget);
  };

  return (
    <article className='clip'>
      <audio
        onLoadedMetadata={handleMetadata}
        onPlay={() => {
          dispatch({ type: "update_play", payload: true });
        }}
        ref={audioRef}
        controls
        src={src}
      ></audio>
    </article>
  );
}

export default AudioClip;
