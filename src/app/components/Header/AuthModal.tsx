'use client';

import { useState } from 'react';
import styles from './Header.module.css';
import { register, login, AuthResponse } from '@/app/utils/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    let response: AuthResponse;

    if (isLogin) {
      response = login(formData.email, formData.password);
    } else {
      response = register(formData.name, formData.email, formData.password);
    }

    if (response.success) {
      setSuccess(response.message);
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
      });
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1500);
    } else {
      setError(response.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className={styles.authOverlay} onClick={onClose}>
      <div className={styles.authModal} onClick={e => e.stopPropagation()}>
        <button 
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрыть"
        />
        
        <div className={styles.authHeader}>
          <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
          <div className={styles.authTabs}>
            <button 
              className={`${styles.authTab} ${isLogin ? styles.active : ''}`}
              onClick={() => {
                setIsLogin(true);
                setError('');
                setSuccess('');
              }}
            >
              Вход
            </button>
            <button 
              className={`${styles.authTab} ${!isLogin ? styles.active : ''}`}
              onClick={() => {
                setIsLogin(false);
                setError('');
                setSuccess('');
              }}
            >
              Регистрация
            </button>
          </div>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && <div className={styles.successMessage}>{success}</div>}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          {!isLogin && (
            <div className={styles.formGroup}>
              <input
                type="text"
                name="name"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          
          <div className={styles.formGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {!isLogin && (
            <div className={styles.formGroup}>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Подтвердите пароль"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          <button type="submit" className={styles.authSubmitButton}>
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>

        <div className={styles.authFooter}>
          <p>
            {isLogin ? (
              <>
                Нет аккаунта?{' '}
                <button 
                  className={styles.authToggleButton}
                  onClick={() => {
                    setIsLogin(false);
                    setError('');
                    setSuccess('');
                  }}
                >
                  Зарегистрироваться
                </button>
              </>
            ) : (
              <>
                Уже есть аккаунт?{' '}
                <button 
                  className={styles.authToggleButton}
                  onClick={() => {
                    setIsLogin(true);
                    setError('');
                    setSuccess('');
                  }}
                >
                  Войти
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
} 