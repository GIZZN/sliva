'use client';
import styles from "./page.module.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useEffect, useState, useCallback } from "react";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerStyle, setHeaderStyle] = useState({
    transform: 'translateY(0)',
    transition: 'transform 0.3s ease-in-out'
  });

  const controlHeader = useCallback(() => {
    if (typeof window === 'undefined') return;

    const currentScrollY = window.scrollY;
    
    if (currentScrollY < lastScrollY || currentScrollY < 100) {
      setHeaderStyle({
        transform: 'translateY(0)',
        transition: 'transform 0.3s ease-in-out'
      });
    } else {
      setHeaderStyle({
        transform: 'translateY(-100%)',
        transition: 'transform 0.3s ease-in-out'
      });
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    setIsLoaded(true);

    if (typeof window === 'undefined') return;

    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [controlHeader]);

  return (
    <div className={`${styles.page} ${isLoaded ? styles.loaded : ''}`}>
      <div style={headerStyle}>
        <Header />
      </div>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroBackground}>
            <div className={styles.gradientOverlay}></div>
            <div className={styles.carImageWrapper}>
              <div className={styles.carImage}></div>
              <div className={styles.featurePoint} style={{ top: '20%', left: '15%' }}>
                <span className={styles.featureLabel}>Керамическое покрытие</span>
              </div>
              <div className={styles.featurePoint} style={{ top: '35%', right: '20%' }}>
                <span className={styles.featureLabel}>Защита кузова</span>
              </div>
              <div className={styles.featurePoint} style={{ bottom: '35%', left: '25%' }}>
                <span className={styles.featureLabel}>Полировка</span>
              </div>
              <div className={styles.featurePoint} style={{ top: '25%', left: '45%' }}>
                <span className={styles.featureLabel}>Химчистка салона</span>
              </div>
              <div className={styles.featurePoint} style={{ bottom: '45%', right: '30%' }}>
                <span className={styles.featureLabel}>Нанокерамика</span>
              </div>
              <div className={styles.featurePoint} style={{ bottom: '25%', right: '15%' }}>
                <span className={styles.featureLabel}>Детейлинг</span>
              </div>
              <div className={styles.featurePoint} style={{ top: '40%', left: '30%' }}>
                <span className={styles.featureLabel}>Антидождь</span>
              </div>
              <div className={styles.featurePoint} style={{ bottom: '30%', left: '45%' }}>
                <span className={styles.featureLabel}>Озонирование</span>
              </div>
              <div className={styles.featurePoint} style={{ top: '30%', right: '40%' }}>
                <span className={styles.featureLabel}>Защитная пленка</span>
              </div>
            </div>
          </div>
          
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <span className={styles.badgeText}>Новинка 2025</span>
            </div>
            <h1 className={styles.heroTitle}>
              <span className={styles.titleLine}>Премиальный</span>
              <span className={styles.titleLine}>уход за вашим</span>
              <span className={styles.titleLine}>автомобилем</span>
            </h1>
            <p className={styles.heroText}>
              Инновационные технологии и профессиональный подход к каждой детали
            </p>
            
            <div className={styles.heroCta}>
              <button className={styles.ctaButton}>
                Записаться онлайн
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              
              <div className={styles.heroStats}>
                <div className={styles.statItem}>
                  <div className={styles.statValue}>
                    <span className={styles.statNumber}>5+</span>
                    <span className={styles.statLabel}>лет опыта</span>
                  </div>
                  <div className={styles.statProgress}></div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statValue}>
                    <span className={styles.statNumber}>10k+</span>
                    <span className={styles.statLabel}>клиентов</span>
                  </div>
                  <div className={styles.statProgress}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className={styles.services}>
          <div className={styles.sectionHeader}>
            <h2>Наши услуги</h2>
            <p>Выберите подходящий вариант обслуживания вашего автомобиля</p>
          </div>
          <div className={styles.serviceGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3>Экспресс-мойка</h3>
              <p>Быстрая и качественная мойка кузова с использованием премиальной химии</p>
              <span className={styles.serviceTime}>30 минут</span>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3>Комплексная мойка</h3>
              <p>Полная мойка снаружи и внутри с обработкой всех поверхностей</p>
              <span className={styles.serviceTime}>1.5 часа</span>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.7519 11.1679L11.5547 9.03647M16.8104 8.02647L7.18973 15.9735M12.4477 14.9635L9.25052 12.8321M7.89758 9.97706C7.89758 12.0927 9.21858 13.1297 9.21858 13.1297C9.21858 13.1297 10.5396 14.1667 10.5396 16.2824C10.5396 18.3981 8.58858 20 8.58858 20C8.58858 20 6.63758 18.3981 6.63758 16.2824C6.63758 14.1667 7.95858 13.1297 7.95858 13.1297C7.95858 13.1297 9.27958 12.0927 9.27958 9.97706C9.27958 7.86141 11.2306 6.25953 11.2306 6.25953C11.2306 6.25953 13.1816 4.65765 13.1816 7.51835C13.1816 10.379 15.1326 8.77712 15.1326 8.77712C15.1326 8.77712 17.0836 7.17524 17.0836 10.0359C17.0836 12.8966 15.1326 11.2947 15.1326 11.2947" />
                </svg>
              </div>
              <h3>Химчистка</h3>
              <p>Глубокая очистка салона с удалением любых загрязнений</p>
              <span className={styles.serviceTime}>4-6 часов</span>
            </div>
          </div>
        </section>

        <section id="prices" className={styles.prices}>
          <div className={styles.sectionHeader}>
            <h2>Тарифы и цены</h2>
            <p>Прозрачная система ценообразования без скрытых платежей</p>
          </div>
          <div className={styles.priceCards}>
            <div className={styles.priceCard}>
              <div className={styles.glowEffect}></div>
              <div className={styles.cardContent}>
                <div className={styles.priceHeader}>
                  <h3>Стандарт</h3>
                  <div className={styles.price}>
                    <span className={styles.currency}>₽</span>
                    <span className={styles.amount}>600</span>
                    <span className={styles.period}>/мойка</span>
                  </div>
                </div>
                <ul>
                  <li>
                    <svg className={styles.checkIcon} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Мойка кузова
                  </li>
                  <li>
                    <svg className={styles.checkIcon} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Чистка колес
                  </li>
                  <li>
                    <svg className={styles.checkIcon} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Сушка
                  </li>
                </ul>
                <button className={styles.priceButton}>
                  <span>Выбрать</span>
                  <div className={styles.buttonGlow}></div>
                </button>
              </div>
            </div>

            <div className={`${styles.priceCard} ${styles.featured}`}>
              <div className={styles.glowEffect}></div>
              <div className={styles.cardContent}>
                <div className={styles.featuredBadge}>Популярный выбор</div>
                <div className={styles.priceHeader}>
                  <h3>Премиум</h3>
                  <div className={styles.price}>
                    <span className={styles.currency}>₽</span>
                    <span className={styles.amount}>1500</span>
                    <span className={styles.period}>/мойка</span>
                  </div>
                </div>
                <ul>
                  <li>
                    <svg className={styles.checkIcon} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Комплексная мойка
                  </li>
                  <li>
                    <svg className={styles.checkIcon} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Химчистка салона
                  </li>
                  <li>
                    <svg className={styles.checkIcon} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Полировка кузова
                  </li>
                  <li>
                    <svg className={styles.checkIcon} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Чернение шин
                  </li>
                </ul>
                <button className={styles.priceButton}>
                  <span>Выбрать</span>
                  <div className={styles.buttonGlow}></div>
                </button>
              </div>
            </div>

            <div className={styles.priceCard}>
              <div className={styles.glowEffect}></div>
              <div className={styles.cardContent}>
                <div className={styles.priceHeader}>
                  <h3>VIP</h3>
                  <div className={styles.price}>
                    <span className={styles.currency}>₽</span>
                    <span className={styles.amount}>3000</span>
                    <span className={styles.period}>/мойка</span>
                  </div>
                </div>
                <ul>
                  <li>
                    <svg className={styles.checkIcon} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Детейлинг
                  </li>
                  <li>
                    <svg className={styles.checkIcon} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Нанокерамика
                  </li>
                  <li>
                    <svg className={styles.checkIcon} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Защитное покрытие
                  </li>
                  <li>
                    <svg className={styles.checkIcon} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Озонирование
                  </li>
                </ul>
                <button className={styles.priceButton}>
                  <span>Выбрать</span>
                  <div className={styles.buttonGlow}></div>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.sectionHeader}>
            <h2>Почему выбирают нас</h2>
            <p>Мы предлагаем лучший сервис для вашего автомобиля</p>
          </div>
          
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <div className={styles.featureIconBg}></div>
                <svg className={styles.featureIcon} width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Гарантия качества</h3>
              <p>100% удовлетворение или бесплатная повторная мойка</p>
              <div className={styles.featureHighlight}></div>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <div className={styles.featureIconBg}></div>
                <svg className={styles.featureIcon} width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Быстрый сервис</h3>
              <p>Экспресс-мойка за 30 минут</p>
              <div className={styles.featureHighlight}></div>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <div className={styles.featureIconBg}></div>
                <svg className={styles.featureIcon} width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Современное оборудование</h3>
              <p>Используем передовые технологии мойки</p>
              <div className={styles.featureHighlight}></div>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <div className={styles.featureIconBg}></div>
                <svg className={styles.featureIcon} width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Довольные клиенты</h3>
              <p>Более 10,000 положительных отзывов</p>
              <div className={styles.featureHighlight}></div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
