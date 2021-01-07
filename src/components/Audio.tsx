import { Backdrop, Popover } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { AudioType } from "../types/AudioType";
import PlatformContainer from './PlatformContainer';
import albumCover from '../assets/Album Cover.jpg';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

type AudioProps = {
  audio: AudioType;
}

function Audio(props: AudioProps) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(isOpen => !isOpen);
  }

  return (
    <div className='Audio'>
      <img onClick={handleClose} src={albumCover} />
      <Popover
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
      >
        <div className='AudioPopover'>
          <img src={albumCover} />
          <PlatformContainer youtube={props.audio.youtube} />
        </div>
      </Popover>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose} />
    </div>
  );
}

export default Audio;
