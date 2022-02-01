import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Video = ({ src }) => {
  const [isMetadataLoaded, setIsMetadataLoaded] = React.useState(null);
  const videoRef = React.useRef();
  const dispatch = useDispatch();
  const { video } = useSelector(state => state);

  React.useEffect(() => {
    if (isMetadataLoaded) {
      const duration = (
        Math.round(videoRef.current.duration * 100) / 100
      ).toFixed(2);
      dispatch({ type: "update_duration", payload: duration });
    }
  }, [isMetadataLoaded, dispatch]);

  React.useEffect(() => {
    if (video.play) {
      videoRef.current.play();
    }
  }, [video.play]);

  const handleMetadata = event => {
    setIsMetadataLoaded(event.currentTarget);
  };

  return (
    <>
      <video
        onLoadedMetadata={handleMetadata}
        onEnded={() => dispatch({ type: "update_play", payload: false })}
        ref={videoRef}
        width={450}
        controls
      >
        <source src={src} />
      </video>
    </>
  );
};

export default Video;
