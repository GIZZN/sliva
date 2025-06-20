'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import styles from './booking.module.css';

type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
};

const SERVICES: Service[] = [
  {
    id: 1,
    name: 'Экспресс мойка кузова ',
    description: 'Быстрая мойка кузова с шампунем и полировкой',
    price: 600,
    duration: 20,
  },
  {
    id: 2,
    name: 'Комплексная мойка',
    description: 'Мойка кузова, салона, багажника и колес',
    price: 1200,
    duration: 45,
  },
  {
    id: 3,
    name: 'Премиум мойка',
    description: 'Полная мойка с нанесением защитного покрытия',
    price: 2000,
    duration: 90,
  },
];

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carModel: '',
    carNumber: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', {
        ...formData,
        service: SERVICES.find(s => s.id === selectedService),
        date: selectedDate,
        time: selectedTime,
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 21; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };

  const handleServiceSelect = (serviceId: number) => {
    setSelectedService(serviceId);
    scrollToSection('dateTime');
  };

  return (
    <>
      <Header />
      <main className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Запись на мойку</h1>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div id="services" className={styles.services}>
              <h2>Выберите услугу</h2>
              <div className={styles.serviceCards}>
                {SERVICES.map(service => (
                  <div
                    key={service.id}
                    className={`${styles.serviceCard} ${
                      selectedService === service.id ? styles.selected : ''
                    }`}
                    onClick={() => handleServiceSelect(service.id)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleServiceSelect(service.id);
                      }
                    }}
                  >
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                    <div className={styles.serviceDetails}>
                      <span>{service.price} ₽</span>
                      <span>{service.duration} мин</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div id="dateTime" className={styles.dateTimeSection}>
              <div className={styles.inputGroup}>
                <label htmlFor="date">Дата</label>
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    scrollToSection('personalInfo');
                  }}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="time">Время</label>
                <select
                  id="time"
                  value={selectedTime}
                  onChange={(e) => {
                    setSelectedTime(e.target.value);
                    scrollToSection('personalInfo');
                  }}
                  required
                >
                  <option value="">Выберите время</option>
                  {generateTimeSlots().map(time => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div id="personalInfo" className={styles.personalInfo}>
              <h2>Контактная информация</h2>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Ваше имя</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Введите ваше имя"
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="phone">Телефон</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+7 (___) ___-__-__"
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="carModel">Модель автомобиля</label>
                <input
                  type="text"
                  id="carModel"
                  name="carModel"
                  value={formData.carModel}
                  onChange={handleInputChange}
                  required
                  placeholder="Например: Toyota Camry"
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="carNumber">Номер автомобиля</label>
                <input
                  type="text"
                  id="carNumber"
                  name="carNumber"
                  value={formData.carNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="А123БВ777"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправка...' : 'Записаться'}
            </button>

            {showSuccess && (
              <div className={styles.successMessage}>
                Запись успешно создана! Мы свяжемся с вами для подтверждения.
              </div>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
} 