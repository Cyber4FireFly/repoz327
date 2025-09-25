import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';

const initialItems = [];

const CartPage = () => {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('cart_items');
      return raw ? JSON.parse(raw) : initialItems;
    } catch (e) {
      return initialItems;
    }
  });
  const navigate = useNavigate();
  const [spendBonus, setSpendBonus] = useState(false);
  const accumulated = 200; // накоплено на карте

  const syncHeaderCount = (list) => {
    const count = list.filter((i) => i.selected && i.price > 0).reduce((acc, i) => acc + i.qty, 0);
    localStorage.setItem('cart_count', String(count));
    localStorage.setItem('cart_items', JSON.stringify(list));
    window.dispatchEvent(new Event('cart:updated'));
  };

  useMemo(() => {
    // первичная синхронизация
    syncHeaderCount(items);
  }, []);

  const allSelected = useMemo(() => items.every((i) => i.selected || i.price === 0), [items]);

  const totals = useMemo(() => {
    let subtotal = 0;
    let discount = 0;
    let count = 0;

    items.forEach((item) => {
      if (!item.selected || item.price === 0) return;
      const itemPrice = item.price;
      const itemQty = item.qty;
      subtotal += itemPrice * itemQty;
      if (item.discountPercent) {
        discount += (itemPrice * (item.discountPercent / 100)) * itemQty;
      }
      count += itemQty;
    });

    let total = subtotal - discount;
    const bonusApplied = spendBonus ? Math.min(accumulated, total) : 0;
    total = total - bonusApplied;

    return {
      count,
      subtotal,
      discount: +(discount.toFixed(2)),
      bonusApplied,
      total: +(total.toFixed(2)),
    };
  }, [items, spendBonus]);

  const toggleSelectAll = (value) => {
    setItems((prev) => {
      const next = prev.map((i) => (i.price === 0 ? i : { ...i, selected: value }));
      syncHeaderCount(next);
      return next;
    });
  };

  const removeSelected = () => {
    setItems((prev) => {
      const next = prev.filter((i) => !i.selected);
      syncHeaderCount(next);
      return next;
    });
  };

  const changeQty = (id, delta) => {
    setItems((prev) => {
      const next = prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
      syncHeaderCount(next);
      return next;
    });
  };

  const minOrder = 1000;
  const belowMin = totals.total < minOrder && totals.total > 0;

  return (
    <div className="min-h-screen bg-bgcolor font-rubik">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 text-sm text-gray-500">
          <button
            type="button"
            className="text-primary-green hover:underline"
            onClick={() => navigate('/')}
          >
            Главная
          </button>
          <span> / Корзина</span>
        </div>
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-4xl font-rubik-bold text-gray-900">Корзина</h1>
          <span className="inline-flex h-6 px-2 items-center justify-center text-sm bg-primary-green text-white rounded-md">{items.filter(i=>i.selected && i.price>0).length}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl mb-3">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-primary-green"
                  checked={allSelected}
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                />
                <span className="text-gray-700">Выделить всё</span>
              </label>
              <button onClick={removeSelected} className="text-red-500 hover:text-red-600">Удалить выбранные</button>
            </div>

            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div key={item.id} className={`bg-white rounded-xl p-4 ${item.note ? 'opacity-60' : ''}`}>
                  <div className="grid grid-cols-12 items-center gap-4">
                    <div className="col-span-1">
                      <input
                        type="checkbox"
                        className="w-5 h-5 accent-primary-green"
                        checked={!!item.selected}
                        disabled={item.price === 0}
                        onChange={(e) => setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, selected: e.target.checked } : i)))}
                      />
                    </div>
                    <div className="col-span-1">
                      <img src={item.image} alt={item.title} className="w-12 h-12 object-contain" />
                    </div>
                    <div className="col-span-6">
                      <div className="text-gray-800">{item.title}</div>
                      {item.note ? (
                        <div className="text-sm text-gray-500 mt-1">{item.note}</div>
                      ) : (
                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                          <span>44,50 ₽</span>
                          <span>за шт.</span>
                          {item.discountPercent ? (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded bg-orange-100 text-orange-600 text-xs">-{item.discountPercent}%</span>
                          ) : null}
                        </div>
                      )}
                    </div>
                    <div className="col-span-2">
                      <div className="inline-flex items-center gap-2 border rounded-lg">
                        <button className="px-3 py-2 text-lg" onClick={() => changeQty(item.id, -1)}>-</button>
                        <div className="px-3 py-2 min-w-8 text-center">{item.qty}</div>
                        <button className="px-3 py-2 text-lg text-primary-green" onClick={() => changeQty(item.id, 1)}>+</button>
                      </div>
                    </div>
                    <div className="col-span-2 text-right">
                      <div className="text-gray-900 font-rubik-bold">
                        {item.price === 0 ? '—' : (item.price * item.qty).toFixed(2).replace('.', ',')} ₽
                      </div>
                      {item.oldPrice ? (
                        <div className="text-xs text-gray-400 line-through">{(item.oldPrice * item.qty).toFixed(2).replace('.', ',')} ₽</div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-primary-green"
                  checked={spendBonus}
                  onChange={(e) => setSpendBonus(e.target.checked)}
                />
                <span className="text-gray-800">Списать {accumulated} ₽</span>
              </label>
              <div className="text-sm text-gray-500 mt-2">На карте накоплено {accumulated} ₽</div>

              <div className="h-px bg-gray-100 my-4" />

              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Товары</span>
                <span>{totals.count}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Сумма</span>
                <span>{totals.subtotal.toFixed(2).replace('.', ',')} ₽</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Скидка</span>
                <span className="text-red-500">- {totals.discount.toFixed(2).replace('.', ',')} ₽</span>
              </div>
              {spendBonus && totals.bonusApplied > 0 ? (
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Бонусы</span>
                  <span className="text-red-500">- {totals.bonusApplied.toFixed(2).replace('.', ',')} ₽</span>
                </div>
              ) : null}

              <div className="h-px bg-gray-100 my-4" />

              <div className="flex items-center justify-between">
                <span className="text-gray-800">Итог</span>
                <div className="text-xl font-rubik-bold text-gray-900">{totals.total.toFixed(2).replace('.', ',')} ₽</div>
              </div>

              <div className="text-xs text-green-600 mt-2">Вы получите 100 бонусов</div>

              {belowMin ? (
                <div className="mt-3 text-xs inline-flex items-center bg-red-100 text-red-600 px-3 py-1 rounded">
                  Минимальная сумма заказа {minOrder}₽
                </div>
              ) : null}

              <button
                className={`w-full mt-4 py-3 rounded-lg text-white ${belowMin || totals.total === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary-green hover:opacity-90'}`}
                disabled={belowMin || totals.total === 0}
              >
                Оформить заказ
              </button>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;


