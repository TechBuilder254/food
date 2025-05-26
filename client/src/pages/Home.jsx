import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CategoryCard from '../components/CategoryCard';
import '../styles/style.css';

function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const counters = document.querySelectorAll('.counter');
    let animated = false;

    const animateCounters = () => {
      if (animated) return;
      counters.forEach(counter => {
        const updateCount = () => {
          const target = +counter.getAttribute('data-target');
          const current = +counter.innerText;
          const increment = Math.ceil(target / 100);

          if (current < target) {
            counter.innerText = current + increment;
            setTimeout(updateCount, 30);
          } else {
            counter.innerText = target.toLocaleString();
          }
        };
        updateCount();
      });
      animated = true;
    };

    const onScroll = () => {
      const section = document.querySelector('.why-best');
      if (!section) return;
      const sectionTop = section.getBoundingClientRect().top;
      const triggerPoint = window.innerHeight * 0.8;

      if (sectionTop < triggerPoint) {
        animateCounters();
        window.removeEventListener('scroll', onScroll);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const categories = [
    { title: 'Fast Foods', image: '/images/burger-frenchfries.png' },
    { title: 'Vegetables', image: '/images/gallery-2.jpg' },
    { title: 'Meats', image: '/images/nyama choma.jpg' },
    { title: 'Sweets', image: '/images/desserts.png' }
  ];

  // ✅ Check if user is logged in
  const isLoggedIn = () => {
    return localStorage.getItem('auth') === 'true';
  };

  // ✅ Navigation helpers
  const handleGetStarted = () => {
    if (isLoggedIn()) {
      navigate('/menu');
    } else {
      navigate('/login');
    }
  };

  const handleSearch = () => {
    if (isLoggedIn()) {
      if (searchTerm.trim()) {
        navigate(`/menu?search=${encodeURIComponent(searchTerm.trim())}`);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section" data-aos="fade-up">
        <div className="main-content">
          <div className="search-bar" data-aos="fade-right">
            <input
              type="text"
              placeholder="Search Product..."
              aria-label="Search food products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch}>
              <span role="img" aria-label="search">🔍</span>
            </button>
          </div>
          <h1 className="title" data-aos="fade-left">
            Food that <span>makes you happy.</span>
          </h1>
          <p data-aos="fade-up">
            We offer delicious meals made with fresh ingredients. Enjoy great taste and quality with every bite. Our mission is to bring you happiness through food.
          </p>

          <button onClick={handleGetStarted} data-aos="zoom-in">
            Get Started
          </button>
        </div>

        <div className="hero-image" data-aos="fade-left">
          <img src="/images/special-combo.png" alt="Special Combo Meal" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories" data-aos="fade-up">
        <h2>Our Best Categories For You</h2>
        <div className="category-grid">
          {categories.map((category) => (
            <div data-aos="zoom-in" key={category.title}>
              <CategoryCard title={category.title} image={category.image} />
            </div>
          ))}
        </div>
      </section>

      {/* Why We Are Best Section */}
      <section className="why-best" data-aos="fade-up">
        <h2>Why we are best for you?</h2>
        <div className="why-best-content">
          <div className="why-text" data-aos="fade-right">
            <p>
              We deliver fresh, high-quality meals made from handpicked ingredients. Our mission is to make sure every bite brings you joy and satisfaction.
            </p>
            <button>Read More</button>
          </div>
          <div className="stats" data-aos="fade-left">
            <div className="stat-box">
              <h3 className="counter" data-target="1200">0</h3>
              <p>Food Products</p>
            </div>
            <div className="stat-box">
              <h3 className="counter" data-target="8500">0</h3>
              <p>Happy Clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Banner Section */}
      <section className="offer-banner" data-aos="zoom-in">
        <div className="offer-content">
          <h2>Get 25% OFF on Your First Order!</h2>
          <p>Enjoy delicious meals at a discounted price. Order now and experience the taste of freshness!</p>
          <button onClick={handleGetStarted} data-aos="zoom-in">
            Order Now
          </button>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-card">
            <img src="/images/about-us.jpg" alt="John Doe" />
            <h3>John Doe</h3>
            <p>Head Chef</p>
          </div>
          <div className="team-card">
            <img src="/images/user-2.jpg" alt="Jane Smith" />
            <h3>Jane Smith</h3>
            <p>Nutritionist</p>
          </div>
          <div className="team-card">
            <img src="/images/user-3.jpg" alt="Mike Brown" />
            <h3>Mike Brown</h3>
            <p>Delivery Manager</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" data-aos="fade-up">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card" data-aos="fade-right">
            <img src="/images/user-4.jpg" alt="Alice W." />
            <p>"Absolutely delicious and super fast delivery!"</p>
            <h4>Alice W.</h4>
          </div>
          <div className="testimonial-card" data-aos="fade-up">
            <img src="/images/user-5.jpg" alt="James K." />
            <p>"The best food ordering experience I've had."</p>
            <h4>James K.</h4>
          </div>
          <div className="testimonial-card" data-aos="fade-left">
            <img src="/images/user-1.jpg" alt="Maria L." />
            <p>"Fresh, tasty, and delivered on time every time."</p>
            <h4>Maria L.</h4>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section" data-aos="zoom-in">
        <h2>Ready to Taste the Best?</h2>
        <p>Order your favorite meal now and enjoy fast delivery right to your door!</p>
        <button className="cta-button" onClick={handleGetStarted} data-aos="zoom-in">
          Order Now
        </button>
      </section>
    </main>
  );
}

export default Home;