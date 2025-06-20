'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, updateUserProfile, logout, User } from '@/app/utils/auth';
import styles from './profile.module.css';
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/Footer';

const Icons = {
  Profile: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
    </svg>
  ),
  Stats: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="currentColor"/>
    </svg>
  ),
  History: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 3C8.03 3 4 7.03 4 12H1L4.89 15.89L4.96 16.03L9 12H6C6 8.13 9.13 5 13 5C16.87 5 20 8.13 20 12C20 15.87 16.87 19 13 19C11.07 19 9.32 18.21 8.06 16.94L6.64 18.36C8.27 19.99 10.51 21 13 21C17.97 21 22 16.97 22 12C22 7.03 17.97 3 13 3ZM12 8V13L16.28 15.54L17 14.33L13.5 12.25V8H12Z" fill="currentColor"/>
    </svg>
  ),
  Settings: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.14 12.94C19.18 12.64 19.2 12.33 19.2 12C19.2 11.68 19.18 11.36 19.13 11.06L21.16 9.48C21.34 9.34 21.39 9.07 21.28 8.87L19.36 5.55C19.24 5.33 18.99 5.26 18.77 5.33L16.38 6.29C15.88 5.91 15.35 5.59 14.76 5.35L14.4 2.81C14.36 2.57 14.16 2.4 13.92 2.4H10.08C9.84 2.4 9.65 2.57 9.61 2.81L9.25 5.35C8.66 5.59 8.12 5.92 7.63 6.29L5.24 5.33C5.02 5.25 4.77 5.33 4.65 5.55L2.74 8.87C2.62 9.08 2.66 9.34 2.86 9.48L4.89 11.06C4.84 11.36 4.8 11.69 4.8 12C4.8 12.31 4.82 12.64 4.87 12.94L2.84 14.52C2.66 14.66 2.61 14.93 2.72 15.13L4.64 18.45C4.76 18.67 5.01 18.74 5.23 18.67L7.62 17.71C8.12 18.09 8.65 18.41 9.24 18.65L9.6 21.19C9.65 21.43 9.84 21.6 10.08 21.6H13.92C14.16 21.6 14.36 21.43 14.39 21.19L14.75 18.65C15.34 18.41 15.88 18.09 16.37 17.71L18.76 18.67C18.98 18.75 19.23 18.67 19.35 18.45L21.27 15.13C21.39 14.91 21.34 14.66 21.15 14.52L19.14 12.94ZM12 15.6C10.02 15.6 8.4 13.98 8.4 12C8.4 10.02 10.02 8.4 12 8.4C13.98 8.4 15.6 10.02 15.6 12C15.6 13.98 13.98 15.6 12 15.6Z" fill="currentColor"/>
    </svg>
  ),
  Logout: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="currentColor"/>
    </svg>
  ),
  Car: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5C5.84 5 5.29 5.42 5.08 6.01L3 12V20C3 20.55 3.45 21 4 21H5C5.55 21 6 20.55 6 20V19H18V20C18 20.55 18.45 21 19 21H20C20.55 21 21 20.55 21 20V12L18.92 6.01ZM6.5 16C5.67 16 5 15.33 5 14.5C5 13.67 5.67 13 6.5 13C7.33 13 8 13.67 8 14.5C8 15.33 7.33 16 6.5 16ZM17.5 16C16.67 16 16 15.33 16 14.5C16 13.67 16.67 13 17.5 13C18.33 13 19 13.67 19 14.5C19 15.33 18.33 16 17.5 16ZM5 11L6.5 6.5H17.5L19 11H5Z" fill="currentColor"/>
    </svg>
  ),
  Calendar: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM19 8H5V6H19V8Z" fill="currentColor"/>
    </svg>
  ),
  Star: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="currentColor"/>
    </svg>
  ),
  Gift: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6H17.82C17.93 5.69 18 5.35 18 5C18 3.34 16.66 2 15 2C13.95 2 13.04 2.54 12.5 3.35L12 4.02L11.5 3.34C10.96 2.54 10.05 2 9 2C7.34 2 6 3.34 6 5C6 5.35 6.07 5.69 6.18 6H4C2.89 6 2.01 6.89 2.01 8L2 19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM15 4C15.55 4 16 4.45 16 5C16 5.55 15.55 6 15 6C14.45 6 14 5.55 14 5C14 4.45 14.45 4 15 4ZM9 4C9.55 4 10 4.45 10 5C10 5.55 9.55 6 9 6C8.45 6 8 5.55 8 5C8 4.45 8.45 4 9 4ZM20 19H4V17H20V19ZM20 14H4V8H9.08L7 10.83L8.62 12L11 8.76L12 7.4L13 8.76L15.38 12L17 10.83L14.92 8H20V14Z" fill="currentColor"/>
    </svg>
  ),
  Timer: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 1H9V3H15V1ZM11 14H13V8H11V14ZM19.03 7.39L20.45 5.97C20.02 5.46 19.55 4.98 19.04 4.56L17.62 5.98C16.07 4.74 14.12 4 12 4C7.03 4 3 8.03 3 13C3 17.97 7.02 22 12 22C16.98 22 21 17.97 21 13C21 10.88 20.26 8.93 19.03 7.39ZM12 20C8.13 20 5 16.87 5 13C5 9.13 8.13 6 12 6C15.87 6 19 9.13 19 13C19 16.87 15.87 20 12 20Z" fill="currentColor"/>
    </svg>
  ),
  Money: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.8 10.9C9.53 10.31 8.8 9.7 8.8 8.75C8.8 7.66 9.81 6.9 11.5 6.9C13.28 6.9 13.94 7.75 14 9H16.21C16.14 7.28 15.09 5.7 13 5.19V3H10V5.16C8.06 5.58 6.5 6.84 6.5 8.77C6.5 11.08 8.41 12.23 11.2 12.9C13.7 13.5 14.2 14.38 14.2 15.31C14.2 16 13.71 17.1 11.5 17.1C9.44 17.1 8.63 16.18 8.52 15H6.32C6.44 17.19 8.08 18.42 10 18.83V21H13V18.85C14.95 18.48 16.5 17.35 16.5 15.3C16.5 12.46 14.07 11.49 11.8 10.9Z" fill="currentColor"/>
    </svg>
  ),
  Worker: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
    </svg>
  ),
  Calendar2: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM9 14H7V12H9V14ZM13 14H11V12H13V14ZM17 14H15V12H17V14ZM9 18H7V16H9V18ZM13 18H11V16H13V18ZM17 18H15V16H17V18Z" fill="currentColor"/>
    </svg>
  ),
  User: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
    </svg>
  )
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/');
      return;
    }
    setUser(currentUser);
    setFormData({
      name: currentUser.name,
      email: currentUser.email
    });
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const response = updateUserProfile(user.id, {
        name: formData.name.trim(),
        email: formData.email.trim()
      });
      
      if (response.success && response.user) {
        setMessage({ type: 'success', text: 'Профиль успешно обновлен' });
        setUser(response.user);
        setFormData({
          name: response.user.name,
          email: response.user.email
        });
        setIsEditing(false);
      } else {
        setMessage({ type: 'error', text: response.message || 'Ошибка при обновлении профиля' });
      }
    } catch (err: unknown) {
      console.error('Error updating profile:', err);
      setMessage({ type: 'error', text: 'Произошла ошибка при обновлении профиля' });
    }

    setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 3000);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) {
    return null;
  }

  const renderProfileSection = () => (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>Основная информация</h2>
      </div>
      <form onSubmit={handleSubmit} className={styles.profileForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Имя</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={!isEditing}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            required
          />
        </div>

        {isEditing && (
          <button type="submit" className={styles.saveButton}>
            Сохранить изменения
          </button>
        )}
      </form>
    </div>
  );

  const renderStatsSection = () => (
    <div className={styles.section}>
      <h2>Статистика</h2>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Icons.Car />
          </div>
          <span className={styles.statValue}>12</span>
          <span className={styles.statLabel}>Посещений</span>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Icons.Calendar />
          </div>
          <span className={styles.statValue}>5</span>
          <span className={styles.statLabel}>Записей</span>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Icons.Star />
          </div>
          <span className={styles.statValue}>3</span>
          <span className={styles.statLabel}>Отзывов</span>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Icons.Gift />
          </div>
          <span className={styles.statValue}>8</span>
          <span className={styles.statLabel}>Бонусов</span>
        </div>
      </div>
    </div>
  );

  const renderHistorySection = () => (
    <div className={styles.section}>
      <h2>История посещений</h2>
      <div className={styles.timeline}>
        <div className={styles.timelineItem}>
          <div className={styles.timelineDate}>15 марта 2024</div>
          <div className={styles.timelineContent}>
            <div className={styles.timelineHeader}>
              <h3>Комплексная мойка</h3>
              <span className={styles.timelineStatus}>Выполнено</span>
            </div>
            <div className={styles.timelineDetails}>
              <p><span><Icons.Timer /></span> Длительность: 2 часа</p>
              <p><span><Icons.Money /></span> Стоимость: 3000₽</p>
              <p><span><Icons.Worker /></span> Мастер: Александр</p>
            </div>
          </div>
        </div>
        <div className={styles.timelineItem}>
          <div className={styles.timelineDate}>1 марта 2024</div>
          <div className={styles.timelineContent}>
            <div className={styles.timelineHeader}>
              <h3>Химчистка салона</h3>
              <span className={styles.timelineStatus}>Выполнено</span>
            </div>
            <div className={styles.timelineDetails}>
              <p><span><Icons.Timer /></span> Длительность: 3 часа</p>
              <p><span><Icons.Money /></span> Стоимость: 5000₽</p>
              <p><span><Icons.Worker /></span> Мастер: Михаил</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsSection = () => (
    <div className={styles.section}>
      <h2>Настройки</h2>
      <div className={styles.settingsGrid}>
        <div className={styles.settingCard}>
          <div className={styles.settingHeader}>
            <h3>Уведомления</h3>
            <label className={styles.switch}>
              <input type="checkbox" defaultChecked />
              <span className={styles.slider}></span>
            </label>
          </div>
          <p>Email-уведомления о новых акциях и спецпредложениях</p>
        </div>
        <div className={styles.settingCard}>
          <div className={styles.settingHeader}>
            <h3>Тема</h3>
            <label className={styles.switch}>
              <input type="checkbox" />
              <span className={styles.slider}></span>
            </label>
          </div>
          <p>Тёмная тема интерфейса</p>
        </div>
        <div className={styles.settingCard}>
          <div className={styles.settingHeader}>
            <h3>SMS-оповещения</h3>
            <label className={styles.switch}>
              <input type="checkbox" defaultChecked />
              <span className={styles.slider}></span>
            </label>
          </div>
          <p>Получать SMS о статусе записи</p>
        </div>
        <div className={styles.settingCard}>
          <div className={styles.settingHeader}>
            <h3>Напоминания</h3>
            <label className={styles.switch}>
              <input type="checkbox" defaultChecked />
              <span className={styles.slider}></span>
            </label>
          </div>
          <p>Напоминать о предстоящих записях</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className={`${styles.profileContainer} ${prefersReducedMotion ? styles.reducedMotion : ''}`}>
        <div className={styles.dotBackground}>
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className={styles.dot}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        <div className={styles.contentWrapper}>
          <aside className={`${styles.sidebar} ${!prefersReducedMotion ? styles.float : ''}`}>
            <div className={`${styles.userCard} ${!prefersReducedMotion ? styles.gradientBG : ''}`}>
              <div className={`${styles.userAvatar} ${!prefersReducedMotion ? styles.pulse : ''}`}>
                {user.name.charAt(0)}
              </div>
              <div className={styles.userInfo}>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
              </div>
              <div className={styles.userMeta}>
                <p>
                  <Icons.Calendar2 />
                  <span>Клиент с марта 2024</span>
                </p>
                <p>
                  <Icons.User />
                  <span>Постоянный клиент</span>
                </p>
              </div>
            </div>

            <nav className={styles.nav}>
              <button
                className={`${styles.navButton} ${activeSection === 'profile' ? styles.active : ''}`}
                onClick={() => setActiveSection('profile')}
              >
                <Icons.Profile />
                Профиль
              </button>
              <button
                className={`${styles.navButton} ${activeSection === 'stats' ? styles.active : ''}`}
                onClick={() => setActiveSection('stats')}
              >
                <Icons.Stats />
                Статистика
              </button>
              <button
                className={`${styles.navButton} ${activeSection === 'history' ? styles.active : ''}`}
                onClick={() => setActiveSection('history')}
              >
                <Icons.History />
                История
              </button>
              <button
                className={`${styles.navButton} ${activeSection === 'settings' ? styles.active : ''}`}
                onClick={() => setActiveSection('settings')}
              >
                <Icons.Settings />
                Настройки
              </button>
              <button
                className={styles.navButton}
                onClick={handleLogout}
              >
                <Icons.Logout />
                Выйти
              </button>
            </nav>
          </aside>

          <main className={styles.mainContent}>
            {message.text && (
              <div className={`${styles.message} ${styles[message.type]} ${!prefersReducedMotion ? styles.float : ''}`}>
                {message.text}
              </div>
            )}

            {activeSection === 'profile' && renderProfileSection()}
            {activeSection === 'stats' && renderStatsSection()}
            {activeSection === 'history' && renderHistorySection()}
            {activeSection === 'settings' && renderSettingsSection()}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
} 