'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';
import AuthModal from './AuthModal';
import { getCurrentUser, logout, User } from '@/app/utils/auth';

const NAV_LINKS = [
  { href: '/pricing', text: 'Цены' },
  { href: '/services', text: 'Услуги' },
  { href: '/about', text: 'Расположение' },
  { href: '/contact', text: 'Контакты' }
];

export default function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Omit<User, 'password'> | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleBooking = () => {
    router.push('/booking');
    handleLinkClick();
  };

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
    setIsMenuOpen(false);
    document.body.style.overflow = 'hidden';
  };

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    router.push('/');
    handleLinkClick();
    window.location.reload();
  };

  const renderNavLinks = (className: string) => (
    NAV_LINKS.map(link => (
      <Link 
        key={link.href} 
        href={link.href} 
        className={className}
        onClick={handleLinkClick}
      >
        {link.text}
      </Link>
    ))
  );

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.dotGrid}>
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i} 
              className={styles.dot}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <Link href="/" className={styles.logo}>
          KOMISAR PIVO
        </Link>

        <nav className={styles.nav}>
          {renderNavLinks(styles.navLink)}
        </nav>

        <button 
          className={`${styles.burgerButton} ${isMenuOpen ? styles.active : ''}`}
          onClick={toggleMenu}
          aria-label="Меню"
        >
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
        </button>
      </header>

      {isMenuOpen && typeof window === 'object' && createPortal(
        <div className={styles.menuOverlay} onClick={toggleMenu}>
          <div 
            className={styles.menuPopup} 
            onClick={e => e.stopPropagation()}
          >
            <button 
              className={styles.closeButton}
              onClick={toggleMenu}
              aria-label="Закрыть меню"
            />
            <div className={styles.menuContent}>
              <nav className={styles.menuNav}>
                <div className={styles.menuNavLinks}>
                  {renderNavLinks(styles.menuNavLink)}
                </div>
              </nav>
              <div className={styles.menuButtons}>
                {currentUser ? (
                  <>
                    <div className={styles.userInfo}>
                      <span className={styles.userName}>{currentUser.name}</span>
                      <span className={styles.userEmail}>{currentUser.email}</span>
                    </div>
                    <Link 
                      href="/profile" 
                      className={styles.profileButton}
                      onClick={handleLinkClick}
                    >
                      Личный кабинет
                    </Link>
                    <Link
                      href="/booking"
                      className={styles.bookingButton}
                      onClick={handleLinkClick}
                    >
                      Записаться на мойку
                    </Link>
                    <button 
                      className={styles.logoutButton}
                      onClick={handleLogout}
                    >
                      Выйти
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      className={styles.loginButton}
                      onClick={handleAuthClick}
                    >
                      Войти
                    </button>
                    <button 
                      className={styles.signupButton}
                      onClick={handleBooking}
                    >
                      Записаться
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {typeof window === 'object' && createPortal(
        <AuthModal 
          isOpen={isAuthModalOpen}
          onClose={handleAuthModalClose}
        />,
        document.body
      )}
    </>
  );
} 