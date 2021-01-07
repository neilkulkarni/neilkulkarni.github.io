import { VideoType } from '../types/VideoType';

type VideoProps = {
  video: VideoType;
}

function Video(props: VideoProps) {
  const { link } = props.video;
  return (
    <div className='Video'>
      <iframe className='frame' src={link} allowFullScreen></iframe>
    </div>
  );
}

export default Video;
