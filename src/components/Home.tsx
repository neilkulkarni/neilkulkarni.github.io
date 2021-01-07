import { Link } from 'react-router-dom';
import Footer from './Footer';
import profile from '../assets/Profile.jpg';
import '../styles/Home.css';

function Home() {
    return (
        <div className='Home'>
            <img src={profile} alt='Neil Kulkarni' />
            <div className='HomePageName'>NEIL KULKARNI</div>
            <div className='HomePageButtonContainer'>
                <Link to='/music'>
                    <div className='HomePageButton'>
                        MUSIC
                    </div>
                </Link>
                <Link to='/finance'>
                    <div className='HomePageButton'>
                        FINANCE
                    </div>
                </Link>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
