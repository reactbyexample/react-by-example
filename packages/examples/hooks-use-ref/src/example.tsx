import React, { FC, useRef } from 'react'

const UseRef: FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playPause = async () => {
    const video = videoRef.current as HTMLVideoElement
    if (video.paused) {
      await video.play()
    } else {
      video.pause()
    }
  }

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        loop
        src="https://media.tenor.com/videos/632c96bbc411d8baa3f7f43692474808/webm"
      />
      <br />
      <button type="button" onClick={playPause}>
        ⏯
      </button>
    </>
  )
}

export default <UseRef />
