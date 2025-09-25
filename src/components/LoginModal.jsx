import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Backdrop = ({ onClose }) => (
  <div
    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
    onClick={onClose}
    aria-hidden="true"
  />
);

const ModalContainer = ({ children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
      {children}
    </div>
  </div>
);

const CloseButton = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
    aria-label="Закрыть модальное окно"
  >
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
);

const initialErrors = { login: '', password: '', form: '' };

const LoginModal = ({ isOpen, onClose, onSuccess }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(initialErrors);
  const loginRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setErrors(initialErrors);
      setPassword('');
      setTimeout(() => loginRef.current && loginRef.current.focus(), 0);
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const next = { ...initialErrors };
    if (!login.trim()) next.login = 'Введите логин';
    if (!password) next.password = 'Введите пароль';
    setErrors(next);
    return !next.login && !next.password;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const user = { username: login.trim() };
      localStorage.setItem('auth_user', JSON.stringify(user));
      window.dispatchEvent(new Event('auth:updated'));
      onSuccess && onSuccess(user);
      onClose && onClose();
    } catch (err) {
      setErrors((prev) => ({ ...prev, form: 'Не удалось выполнить вход' }));
    }
  };

  return (
    <>
      <Backdrop onClose={onClose} />
      <ModalContainer>
        <div className="relative p-6">
          <CloseButton onClick={onClose} />
          <h2 className="text-2xl font-bold text-center mb-6">Вход</h2>
          {errors.form ? (
            <div className="mb-4 text-sm text-red-600">{errors.form}</div>
          ) : null}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1" htmlFor="login">Логин</label>
              <input
                id="login"
                ref={loginRef}
                type="text"
                autoComplete="username"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green ${errors.login ? 'border-red-500' : 'border-primary-green'}`}
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Введите логин"
              />
              {errors.login ? <div className="mt-1 text-xs text-red-600">{errors.login}</div> : null}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1" htmlFor="password">Пароль</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green ${errors.password ? 'border-red-500' : 'border-primary-green'}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
              />
              {errors.password ? <div className="mt-1 text-xs text-red-600">{errors.password}</div> : null}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-200 text-orange-700 font-semibold py-3 rounded-lg hover:bg-orange-300 transition-colors"
            >
              Вход
            </button>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                className="px-4 py-2 border border-primary-green text-primary-green rounded-lg hover:bg-green-50"
                onClick={() => {
                  onClose && onClose();
                  navigate('/register');
                }}
              >
                Регистрация
              </button>
              <div className="text-sm text-gray-500">Забыли пароль?</div>
            </div>
          </form>
        </div>
      </ModalContainer>
    </>
  );
};

export default LoginModal;


