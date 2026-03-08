import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const navCls = ['navbar', scrolled ? 'scrolled' : ''].join(' ');
  const menuCls = ['mobile-menu', menuOpen ? 'show' : ''].join(' ');
  const hamCls = ['hamburger', menuOpen ? 'open' : ''].join(' ');

  return (
    <nav className={navCls}>
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          <div className='logo-icon'>
            <img src='/images/logo-header.jpg' alt='RSHI Logo' style={{width:'100%',height:'100%',objectFit:'contain',borderRadius:'50%'}} />
          </div>
          RSHI
        </Link>
        <div className='navbar-links'>
          <Link to='/' className={location.pathname === '/' ? 'active' : ''}>Beranda</Link>
          <Link to='/tentang-kami' className={location.pathname === '/tentang-kami' ? 'active' : ''}>Tentang Kami</Link>
          <Link to='/terapis' className={location.pathname === '/terapis' ? 'active' : ''}>Daftar Terapis</Link>
        </div>
        {/* Grup kanan: Booking + Hamburger selalu berdampingan */}
        <div className='navbar-right'>
          <Link to='/booking' className='btn btn-accent-outline navbar-cta'>Booking</Link>
          <button className={hamCls} onClick={() => setMenuOpen(!menuOpen)} aria-label='Menu'>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <div className={menuCls}>
        <Link to='/'>Beranda</Link>
        <Link to='/tentang-kami'>Tentang Kami</Link>
        <Link to='/terapis'>Daftar Terapis</Link>
      </div>
    </nav>
  );
}
