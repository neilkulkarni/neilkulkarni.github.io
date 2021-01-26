import assignIn from 'lodash/assign';
import Header from './Header';
import MediaContainer from './MediaContainer';
import PlatformContainer from './PlatformContainer';
import SectionBreak from './SectionBreak';
import data from '../data/media.json'
import { Media } from '../types/Media';
import { AudioType } from '../types/AudioType';
import { VideoType } from '../types/VideoType';
import '../styles/Music.css';

const getMediaType = (type: string) => {
  if (type == 'AUDIO') {
    return new AudioType();
  } else if (type == 'VIDEO') {
    return new VideoType();
  }
  return null;
}

function Music() {
  const originals: Media[] = []
  data?.originals.forEach((m: Media) => {
    const media = getMediaType(m.__type);
    assignIn(media, m);
    media && originals.push(media);
  });

  const arrangements: Media[] = []
  data?.arrangements.forEach((m: Media) => {
    const media = getMediaType(m.__type);
    assignIn(media, m);
    media && arrangements.push(media);
  });

  const covers: Media[] = []
  data?.covers.forEach((m: Media) => {
    const media = getMediaType(m.__type);
    assignIn(media, m);
    media && covers.push(media);
  });

  return (
    <div>
      <Header />
      <div className='MusicWrapper'>
        <div className='SectionHeader'>ORIGINALS</div>
        <MediaContainer className={'CenteredContainer'} media={originals} />
        <SectionBreak />
        <div className='SectionHeader'>ARRANGEMENTS</div>
        <MediaContainer className={'CenteredContainer'} media={arrangements} />
        <SectionBreak />
        <div className='SectionHeader'>COVERS</div>
        <MediaContainer className={'Container'} media={covers} />
        <SectionBreak />
        <div className='SectionHeader'>Listen more on</div>
        <PlatformContainer />
      </div>
    </div>
  );
}

export default Music;
