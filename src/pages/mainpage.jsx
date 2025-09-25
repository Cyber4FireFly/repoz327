import React from 'react';
import Header from '../components/header';
import ProductCard from '../components/ProductCard';
import NewsCard from '../components/NewsCard';
import Footer from '../components/footer';
import SpecialOffer from '../components/SpecialOffer';
import StoreMap from '../components/StoreMap';
import Banner from '../components/banner';

// Изображения товаров, предложений и новостей
import good1 from '../assets/img/good1.png';
import good2 from '../assets/img/good2.png';
import good3 from '../assets/img/good3.png';
import good5 from '../assets/img/good5.png';
import food from '../assets/img/food.png';
import offer1 from '../assets/img/offer1.png';
import offer2 from '../assets/img/offer2.png';
import news1 from '../assets/img/news1.png';
import news2 from '../assets/img/news2.png';
import news3 from '../assets/img/news3.png';

const Mainpage = () => {
  // Данные для акций
  const promotions = [
    {
      id: 101,
      name: "Блины",
      price: "44,50",
      originalPrice: "50,50",
      rating: 4,
      description: "Свежие блины с начинкой",
      discount: 50,
      buttonColor: 'green',
      image: good1
    },
    {
      id: 102,
      name: "Молоко 3.2%",
      price: "44,50",
      originalPrice: "50,50",
      rating: 4,
      description: "Свежее молоко высшего качества",
      discount: 50,
      buttonColor: 'green',
      image: good2
    },
    {
      id: 103,
      name: "Колбаса",
      price: "159,99",
      originalPrice: "200,00",
      rating: 3,
      description: "Колбаса вареная высшего сорта",
      discount: 50,
      buttonColor: 'red',
      image: good3
    },
    {
      id: 104,
      name: "Сыр",
      price: "299,99",
      originalPrice: "350,00",
      rating: 5,
      description: "Сыр твердый российский",
      discount: 50,
      buttonColor: 'green',
      image: good5
    }
  ];

  // Данные для новинок
  const newArrivals = [
    {
      id: 201,
      name: "Колбаса сырокопченая",
      price: "599,99",
      rating: 4,
      description: "Колбаса сырокопченая премиум класса",
      buttonColor: 'green',
      image: good3
    },
    {
      id: 202,
      name: "Молоко 2.5%",
      price: "44,50",
      rating: 4,
      description: "Молоко пастеризованное",
      buttonColor: 'green',
      image: good2
    },
    {
      id: 203,
      name: "Колбаса вареная",
      price: "159,99",
      rating: 3,
      description: "Колбаса вареная высшего сорта",
      buttonColor: 'green',
      image: food
    },
    {
      id: 204,
      name: "Молоко 1%",
      price: "49,39",
      rating: 4,
      description: "Молоко обезжиренное",
      buttonColor: 'green',
      image: good1
    }
  ];

  // Данные для ранее купленных
  const previouslyPurchased = [
    {
      id: 301,
      name: "Колбаса нарезка",
      price: "77,99",
      rating: 4,
      description: "Колбаса вареная в нарезке",
      buttonColor: 'green',
      image: good5
    },
    {
      id: 302,
      name: "Колбаса копченая",
      price: "159,99",
      rating: 3,
      description: "Колбаса копченая высшего сорта",
      buttonColor: 'green',
      image: good3
    },
    {
      id: 303,
      name: "Колбаса сырокопченая",
      price: "599,99",
      rating: 4,
      description: "Колбаса сырокопченая премиум класса",
      buttonColor: 'green',
      image: good1
    },
    {
      id: 304,
      name: "Молоко 3.2%",
      price: "49,39",
      rating: 4,
      description: "Молоко пастеризованное",
      buttonColor: 'green',
      image: good2
    }
  ];

  // Специальные предложения
  const specialOffers = [
    {
      id: 1,
      title: "Оформите карту «Северяночка»",
      description: "Получайте бонусы за каждую покупку и экономьте на следующих покупках",
      buttonText: "Оформить карту",
      backgroundColor: "bg-[#FCD5BA]",
      textColor: "text-black",
      image: offer1
    },
    {
      id: 2,
      title: "Покупайте акционные товары",
      description: "Получайте двойные бонусы за покупку товаров по акции",
      buttonText: "Смотреть акции",
      backgroundColor: "bg-[#E5FFDE]",
      textColor: "text-black",
      image: offer2
    }
  ];

  // Данные для статей
  const articles = [
    {
      id: 1,
      date: "05.03.2021",
      title: "Режим использования масок и перчаток на территории магазинов",
      description: "Подробная информация о режимах использования масок и перчаток на территории магазинов \"ЛЕНТА\". Информация обновляется каждый будний день.",
      image: news1
    },
    {
      id: 2,
      date: "10.03.2021",
      title: "Весенние продукты для здоровья",
      description: "Какие продукты стоит включить в рацион весной для поддержания иммунитета и хорошего самочувствия.",
      image: news2
    },
    {
      id: 3,
      date: "15.03.2021",
      title: "Здоровое питание vs фастфуд",
      description: "Сравнение пользы здорового питания и вреда фастфуда для организма человека.",
      image: news3
    }
  ];

  return (
    <div className="min-h-screen bg-bgcolor font-rubik ">
      <Header />

      {/* Главный баннер */}
      <Banner 
        title="Доставка бесплатно от 1000 ₽"
        image="/src/assets/img/BackBanner.png"
        className="mb-8 font-rubik-bold bg-white"
      />

      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        {/* Секция Акции */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-rubik-bold text-gray-800">Акции</h2>
            <a href="#" className="text-primary-black hover:text-gray-600">Все акции</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {promotions.map(product => (
              <ProductCard key={product.id} product={product} showInCartLabel={true} />
            ))}
          </div>
        </section>

        {/* Секция Новинки */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-rubik-bold text-gray-800">Новинки</h2>
            <a href="#" className="text-primary-black hover:text-gray-600">Все новинки</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Секция Покупали раньше */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-rubik-bold text-gray-800">Покупали раньше</h2>
            <a href="#" className="text-primary-black hover:text-gray-600">Все покупки</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previouslyPurchased.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Секция Специальные предложения */}
        <section className="mb-12">
          <h2 className="text-3xl font-rubik-bold text-gray-800 mb-8">Специальные предложения</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {specialOffers.map(offer => (
              <SpecialOffer key={offer.id} offer={offer} />
            ))}
          </div>
        </section>

        {/* Секция Наши магазины */}
        <section className="mb-12">
          <StoreMap />
        </section>

        {/* Секция Статьи */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-rubik-bold text-gray-800">Статьи</h2>
            <a href="#" className="text-primary-black hover:text-gray-600">Все статьи</a>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {articles.map(article => (
              <NewsCard key={article.id} news={article} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Mainpage;