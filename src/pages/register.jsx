import React, { useRef, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

const initialErrors = { name: '', login: '', password: '', email: '', avatar: '' };

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [errors, setErrors] = useState(initialErrors);
  const fileInputRef = useRef(null);

  const validate = () => {
    const next = { ...initialErrors };
    if (!name.trim()) next.name = 'Введите имя';
    if (!login.trim()) next.login = 'Введите логин';
    if (!password) next.password = 'Введите пароль';
    if (!email.trim()) next.email = 'Укажите почту';
    setErrors(next);
    return !next.name && !next.login && !next.password && !next.email;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      name: name.trim(),
      login: login.trim(),
      email: email.trim(),
      avatar: avatarFile ? avatarFile.name : null,
    };
    try {
      localStorage.setItem('pending_registration', JSON.stringify(payload));
      alert('Регистрация отправлена (демо). Можно реализовать отправку на сервер.');
    } catch (err) {
      // no-op
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h1 className="text-2xl font-bold mb-6">Регистрация</h1>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-gray-600 mb-1" htmlFor="name">Имя</label>
                <input
                  id="name"
                  type="text"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green ${errors.name ? 'border-red-500' : 'border-primary-green'}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван"
                />
                {errors.name ? <div className="mt-1 text-xs text-red-600">{errors.name}</div> : null}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1" htmlFor="login">Логин</label>
                <input
                  id="login"
                  type="text"
                  autoComplete="username"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green ${errors.login ? 'border-red-500' : 'border-primary-green'}`}
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder="user123"
                />
                {errors.login ? <div className="mt-1 text-xs text-red-600">{errors.login}</div> : null}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1" htmlFor="password">Пароль</label>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green ${errors.password ? 'border-red-500' : 'border-primary-green'}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                {errors.password ? <div className="mt-1 text-xs text-red-600">{errors.password}</div> : null}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1" htmlFor="email">Почта</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green ${errors.email ? 'border-red-500' : 'border-primary-green'}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                />
                {errors.email ? <div className="mt-1 text-xs text-red-600">{errors.email}</div> : null}
              </div>

              <button type="submit" className="w-full bg-primary-green text-white py-3 rounded-lg hover:bg-green-600">Зарегистрироваться</button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;


