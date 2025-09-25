import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';

const Header = () => {
  const navigate = useNavigate();
  const getInitialCount = () => {
    const raw = localStorage.getItem('cart_count');
    const parsed = raw ? parseInt(raw, 10) : 0;
    return Number.isNaN(parsed) ? 0 : parsed;
  };
  const [cartCount, setCartCount] = useState(getInitialCount());
  const getInitialUser = () => {
    try {
      const raw = localStorage.getItem('auth_user');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  };
  const [authUser, setAuthUser] = useState(getInitialUser());
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'cart_count') {
        const value = e.newValue ? parseInt(e.newValue, 10) : 0;
        setCartCount(Number.isNaN(value) ? 0 : value);
      }
    };
    const onCustom = () => {
      setCartCount(getInitialCount());
    };
    const onAuth = () => setAuthUser(getInitialUser());
    window.addEventListener('storage', onStorage);
    window.addEventListener('cart:updated', onCustom);
    window.addEventListener('auth:updated', onAuth);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('cart:updated', onCustom);
      window.removeEventListener('auth:updated', onAuth);
    };
  }, []);
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      {/* Основная навигация */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Логотип и название */}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center space-x-3 group cursor-pointer"
            aria-label="Перейти на главную"
          >
            <img src="/src/assets/img/logo.png" alt="logo" className="w-10 h-10" />
            <span className="text-2xl font-bold text-gray-800 group-hover:text-primary-green transition-colors">СЕВЕРЯНОЧКА</span>
          </button>

          {/* Каталог и поиск */}
          <div className="flex items-center space-x-4 flex-1 max-w-2xl mx-8">
            <button className="bg-primary-green text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>Каталог</span>
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Найти товар"
                className="w-full px-4 py-3 border border-primary-green rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
              />
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Правая часть - избранное, заказы, корзина, профиль */}
          <div className="flex items-center space-x-6">
            {/* Избранное */}
            <div className="flex flex-col items-center space-y-1">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-xs text-gray-600">Избранное</span>
            </div>

            {/* Заказы */}
            <div className="flex flex-col items-center space-y-1">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span className="text-xs text-gray-600">Заказы</span>
            </div>

            {/* Корзина */}
            <button
              type="button"
              onClick={() => navigate('/cart')}
              className="flex flex-col items-center space-y-1 relative"
              aria-label="Открыть корзину"
            >
              <div className="relative">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                {cartCount > 0 ? (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">
                    {cartCount}
                  </div>
                ) : null}
              </div>
              <span className="text-xs text-gray-600">Корзина</span>
            </button>

            {/* Профиль / Авторизация */}
            {authUser ? (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800">{authUser.username}</span>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="text-sm text-primary-green border border-primary-green px-3 py-1 rounded-lg hover:bg-green-50"
                >
                  Регистрация
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setIsLoginOpen(true)}
                  className="px-4 py-2 border border-primary-green text-primary-green rounded-lg hover:bg-green-50"
                >
                  Войти
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-600"
                >
                  Регистрация
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={(user) => setAuthUser(user)}
      />
    </header>
  );
};

export default Header;
