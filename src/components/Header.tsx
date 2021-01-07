import { Link, NavLink, useLocation } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import profile from '../assets/Profile.jpg';
import '../styles/Header.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

function Header() {
  const activePath = useLocation().pathname;
  const classes = useStyles();

  return (
    <div className='HeaderContainer'>
      <div className='PageHeader'>
        <NavLink className='PageHeaderItem' activeClassName={activePath == '/music' ? ' ActivePage' : ''} to='/music'>MUSIC</NavLink>
        <NavLink className='PageHeaderItem' activeClassName={activePath == '/finance' ? ' ActivePage' : ''} to='/finance'>FINANCE</NavLink>
      </div>
      <Link className='HomeHeader' to='/'>
        <div className='NameHeader'>NEIL KULKARNI</div>
        <Avatar alt='Neil Kulkarni' src={profile} className={classes.large} />
      </Link>
    </div>
  );
}

export default Header;
