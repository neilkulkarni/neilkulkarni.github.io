import appleMusicLogo from '../assets/Apple Music.png';
import spotifyLogo from '../assets/Spotify.png';
import youtubeLogo from '../assets/YouTube.png';
import youtubeMusicLogo from '../assets/YouTube Music.png';
import amazonMusicLogo from '../assets/Amazon Music.png';

type PlatformContainerProps = {
  amazonMusic?: string;
  appleMusic?: string;
  spotify?: string;
  youtube?: string;
  youtubeMusic?: string;
}

function PlatformContainer(props: PlatformContainerProps) {
  const { amazonMusic, appleMusic, spotify, youtube, youtubeMusic } = props;

  return (
    <div className='PlatformContainer'>
      <a title='Apple Music' href={appleMusic ? appleMusic : 'https://geo.music.apple.com/us/album/_/1438697319?mt=1&app=music&ls=1&at=1000lHKX'} >
        <img alt='Apple Music' src={appleMusicLogo} />
      </a>
      <a title='Spotify' href={spotify ? spotify : 'https://open.spotify.com/album/3JIRL5wQlHjmhkUw7xsSjM'} >
        <img alt='Spotify' src={spotifyLogo} />
      </a>
      <a title='YouTube' href={youtube ? youtube : 'https://www.youtube.com/channel/UCxswvb5K2ZSoUzZhM3E5-wg'} >
        <img alt='YouTube' src={youtubeLogo} />
      </a>
      <a title='YouTube Music' href={youtubeMusic ? youtubeMusic : 'https://music.youtube.com/playlist?list=OLAK5uy_mezEXMOGC2e436ONP3Vbn7DPQg7eDsMa0'} >
        <img alt='YouTube Music' src={youtubeMusicLogo} />
      </a>
      <a title='Amazon Music' href={amazonMusic ? amazonMusic : 'https://music.amazon.com/albums/B07J9PP4YS?do=play'} >
        <img alt='Amazon Music' src={amazonMusicLogo} />
      </a>
    </div>
  );
}

export default PlatformContainer;
