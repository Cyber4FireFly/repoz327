import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { id, name, price, originalPrice, rating, image, description, discount} = product;
  const navigate = useNavigate();

  const readIsInCart = () => {
    try {
      const raw = localStorage.getItem('cart_items');
      const items = raw ? JSON.parse(raw) : [];
      return items.some((i) => i.id === id && (i.qty || 1) > 0);
    } catch (e) {
      return false;
    }
  };

  const readQty = () => {
    try {
      const raw = localStorage.getItem('cart_items');
      const items = raw ? JSON.parse(raw) : [];
      const item = items.find((i) => i.id === id);
      return item ? Math.max(1, item.qty || 1) : 0;
    } catch (e) {
      return 0;
    }
  };

  const [isInCart, setIsInCart] = useState(readIsInCart);
  const [qty, setQty] = useState(readQty);

  useEffect(() => {
    const onUpdate = () => {
      setIsInCart(readIsInCart());
      setQty(readQty());
    };
    window.addEventListener('cart:updated', onUpdate);
    return () => window.removeEventListener('cart:updated', onUpdate);
  }, [id]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'text-orange-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  const getButtonClasses = () => {
    return 'w-full bg-white border-2 border-primary-green text-primary-green py-2 px-4 rounded-lg hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors duration-200 font-medium';
  };

  const addToCart = () => {
    try {
      const raw = localStorage.getItem('cart_items');
      const items = raw ? JSON.parse(raw) : [];
      const priceNumber = typeof price === 'number' ? price : parseFloat(String(price).replace(',', '.')) || 0;
      const existingIndex = items.findIndex((i) => i.id === id);
      let newQty = 1;
      if (existingIndex >= 0) {
        items[existingIndex].qty = Math.max(1, (items[existingIndex].qty || 1) + 1);
        items[existingIndex].selected = true;
        newQty = items[existingIndex].qty;
      } else {
        items.push({ id, title: name, price: priceNumber, image, qty: 1, selected: true });
        newQty = 1;
      }
      localStorage.setItem('cart_items', JSON.stringify(items));
      const count = items.filter((i) => i.selected && i.price > 0).reduce((acc, i) => acc + (i.qty || 1), 0);
      localStorage.setItem('cart_count', String(count));
      window.dispatchEvent(new Event('cart:updated'));
      setIsInCart(true);
      setQty(newQty);
    } catch (e) {
      // no-op
    }
  };

  const syncStorage = (nextQty) => {
    try {
      const raw = localStorage.getItem('cart_items');
      const items = raw ? JSON.parse(raw) : [];
      const priceNumber = typeof price === 'number' ? price : parseFloat(String(price).replace(',', '.')) || 0;
      const existingIndex = items.findIndex((i) => i.id === id);
      if (nextQty <= 0) {
        if (existingIndex >= 0) {
          items.splice(existingIndex, 1);
        }
      } else if (existingIndex >= 0) {
        items[existingIndex].qty = nextQty;
        items[existingIndex].selected = true;
      } else {
        items.push({ id, title: name, price: priceNumber, image, qty: nextQty, selected: true });
      }
      localStorage.setItem('cart_items', JSON.stringify(items));
      const count = items.filter((i) => i.selected && i.price > 0).reduce((acc, i) => acc + (i.qty || 1), 0);
      localStorage.setItem('cart_count', String(count));
      window.dispatchEvent(new Event('cart:updated'));
    } catch (e) {
      // no-op
    }
  };

  const increment = () => {
    const next = Math.max(1, (qty || 0) + 1);
    setQty(next);
    setIsInCart(true);
    syncStorage(next);
  };

  const decrement = () => {
    const next = Math.max(0, (qty || 0) - 1);
    setQty(next);
    setIsInCart(next > 0);
    syncStorage(next);
  };

  const handleButtonClick = () => {
    if (isInCart) {
      navigate('/cart');
      return;
    }
    addToCart();
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
      {/* Кнопка избранного */}
      <button className="absolute top-3 right-3 z-10 p-2 bg-white rounded-[4px] shadow-md hover:bg-gray-50 transition-colors opacity-50 group-hover:opacity-100">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Изображение товара */}
      <div className="h-[272px] bg-white relative flex items-center justify-center p-4">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-contain" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {discount && (
          <div className="absolute bottom-3 left-3 z-10 bg-orange-500 text-white text-sm font-bold px-2 py-1 rounded-[10px]">
            -{discount}%
          </div>
        )}
      </div>

      {/* Информация о товаре */}
      <div className="p-4">
        {/* Цена */}
        <div className="mb-2 flex items-baseline justify-between">
          <div>
            <div className="text-2xl font-bold text-gray-800">{price} ₽</div>
            <div className="text-xs text-gray-400">С картой</div>
          </div>
          {originalPrice && (
            <div className="text-right">
              <div className="text-sm text-gray-500 line-through">{originalPrice} ₽</div>
              <div className="text-xs text-gray-400">Обычная</div>
            </div>
          )}
        </div>

        {/* Название товара */}
        <h3 className="text-sm text-gray-600 mb-1 line-clamp-2">
          {name}
        </h3>

        {/* Описание */}
        {description && (
          <p className="text-xs text-gray-500 mb-3 line-clamp-2">
            {description}
          </p>
        )}

        {/* Рейтинг */}
        <div className="flex items-center space-x-1 mb-4">
          {renderStars(rating)}
        </div>

        {/* Управление корзиной для этого товара */}
        {isInCart ? (
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 border rounded-lg">
              <button className="px-3 py-2 text-lg" onClick={decrement}>-</button>
              <div className="px-3 py-2 min-w-8 text-center">{qty}</div>
              <button className="px-3 py-2 text-lg text-primary-green" onClick={increment}>+</button>
            </div>
            <button className={getButtonClasses()} onClick={handleButtonClick}>К заказу</button>
          </div>
        ) : (
          <button className={getButtonClasses()} onClick={handleButtonClick}>В корзину</button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
