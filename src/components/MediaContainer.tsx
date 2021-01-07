import { Media } from '../types/Media';
import { AudioType } from '../types/AudioType';
import { VideoType } from '../types/VideoType';
import Audio from './Audio';
import Video from './Video';

type MediaProps = {
  className: string;
  media: Media[];
}

function MediaContainer(props: MediaProps) {
  const { className, media } = props;

  return (
    <div className={className}>
      {media.map((m: Media, index: number) => {
        return (
          (m instanceof AudioType && <Audio audio={m} />)
          || (m instanceof VideoType && <Video video={m} />)
        )
      })}
    </div>
  );
}

export default MediaContainer;
