'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const FEATURE_POINTS = [
  { label: '', position: { top: '15%', left: '10%' } },
  { label: '', position: { top: '25%', right: '15%' } },
  { label: '', position: { bottom: '35%', left: '20%' } },
  { label: '', position: { top: '20%', right: '25%' } },
  { label: '', position: { bottom: '25%', right: '30%' } },
  { label: '', position: { top: '40%', left: '25%' } },
  { label: '', position: { bottom: '30%', left: '35%' } }
];

export default function Footer() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleSectionHover = (section: string | null) => {
    setActiveSection(section);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerBackground}>
        {FEATURE_POINTS.map((point, index) => (
          <div
            key={index}
            className={styles.featurePoint}
            style={point.position}
          >
            <span className={styles.featureLabel}>{point.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.logoSection}>
            <h2 className={styles.logo}>KOMISAR PIVO</h2>
            <p className={styles.slogan}>Премиальный уход за вашим автомобилем</p>
          </div>
          <div className={styles.newsletter}>
            <h3>Подпишитесь на новости</h3>
            <div className={styles.subscribeForm}>
              <input type="email" placeholder="Ваш email" />
              <button type="button">Подписаться</button>
            </div>
          </div>
        </div>

        <div className={styles.mainContent}>
          <div 
            className={`${styles.section} ${activeSection === 'about' ? styles.active : ''}`}
            onMouseEnter={() => handleSectionHover('about')}
            onMouseLeave={() => handleSectionHover(null)}
          >
            <h3>О нас</h3>
            <p>Мы предоставляем высококачественные услуги автомойки и детейлинга с 2015 года. Наша команда профессионалов заботится о каждом автомобиле как о своем собственном.</p>
            <div className={styles.social}>
              <Link href="https://facebook.com" className={styles.socialIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </Link>
              <Link href="https://instagram.com" className={styles.socialIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
              </Link>
              <Link href="https://telegram.me/username" className={styles.socialIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              </Link>
            </div>
          </div>

          <div 
            className={`${styles.section} ${activeSection === 'contacts' ? styles.active : ''}`}
            onMouseEnter={() => handleSectionHover('contacts')}
            onMouseLeave={() => handleSectionHover(null)}
          >
            <h3>Контакты</h3>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C7.802 0 4 3.403 4 7.602C4 12.604 12 24 12 24S20 12.604 20 7.602C20 3.403 16.199 0 12 0ZM12 11C10.343 11 9 9.657 9 8C9 6.343 10.343 5 12 5C13.657 5 15 6.343 15 8C15 9.657 13.657 11 12 11Z"/></svg>
                <span>ул. Тверская, 15, Москва</span>
              </div>
              <div className={styles.contactItem}>
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                <span>info@komisarpivo.ru</span>
              </div>
              <div className={styles.contactItem}>
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02c-.37-1.11-.56-2.3-.56-3.53c0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
                <span>+7 (999) 123-45-67</span>
              </div>
            </div>
          </div>

          <div 
            className={`${styles.section} ${activeSection === 'hours' ? styles.active : ''}`}
            onMouseEnter={() => handleSectionHover('hours')}
            onMouseLeave={() => handleSectionHover(null)}
          >
            <h3>Режим работы</h3>
            <div className={styles.workHours}>
              <div className={styles.workDay}>
                <span>Пн-Пт:</span>
                <span>8:00 - 22:00</span>
              </div>
              <div className={styles.workDay}>
                <span>Сб-Вс:</span>
                <span>9:00 - 21:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.links}>
            <Link href="/privacy">Политика конфиденциальности</Link>
            <Link href="/terms">Условия использования</Link>
          </div>
          <p className={styles.copyright}>© 2024 KOMISAR PIVO. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
} 