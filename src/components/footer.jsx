import React from 'react';
import footerBg from '../assets/img/footerbg.png';
import instagramIcon from '../assets/img/instagram.png';
import vkIcon from '../assets/img/vkontakte.png';
import facebookIcon from '../assets/img/facebook.png';
import okIcon from '../assets/img/ok.png';

const Footer = () => {
  return (
    <footer 
      className=" bg-center bg-cover bg-no-repeat w-full h-[126px] flex items-center justify-center"
      style={{ backgroundImage: `url(${footerBg})` }}
    >
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 relative w-full h-[126px] flex items-center justify-center flex-col">
        <div className="flex flex-col w-full lg:flex-row justify-between items-start lg:items-center space-y-8 lg:space-y-0 gap-[40px]">
          
          {/* Логотип */}
          <div className="flex flex-col items-center lg:items-start">
            <img src="/src/assets/img/logotext.png" alt="logo" className="w-full h-full" />
          </div>  

          {/* Навигационные ссылки */}
          <div className="flex flex-wrap justify-center lg:justify-start space-x-6 lg:space-x-8 text-[12px]">
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors  font-medium">
              О компании
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors  font-medium">
              Контакты
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors  font-medium">
              Вакансии
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors  font-medium">
              Статьи
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              Политика обработки персональных данных
            </a>
          </div>

        {/* Социальные сети и контакты */}
        <div className="flex flex-col items-center lg:items-end space-y-4">
          <div className="flex items-center space-x-4">
            {/* Порядок: Instagram, VK, Facebook, OK */}
            <a href="#" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
              <img src={instagramIcon} alt="Instagram" className="w-5 h-5" />
            </a>
            <a href="#" aria-label="VK" className="hover:opacity-80 transition-opacity">
              <img src={vkIcon} alt="VK" className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
              <img src={facebookIcon} alt="Facebook" className="w-5 h-5" />
            </a>
            <a href="#" aria-label="OK" className="hover:opacity-80 transition-opacity">
              <img src={okIcon} alt="OK" className="w-5 h-5" />
            </a>
            {/* Телефон справа от иконок */}
            <div className="flex items-center space-x-2 pl-4">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-gray-700 text-[16px] font-medium">8 800 777 33 33</span>
            </div>
          </div>
        </div>
        </div>

        {/* Дизайн кредит */}
        <div className="mt-[20px] flex justify-end">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Дизайн</span>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span className="font-bold">ZASOVSKIY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
