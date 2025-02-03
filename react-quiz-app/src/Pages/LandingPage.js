import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css'; // Custom styles

function LandingPage() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.fade-section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>

      {/* Hero Section */}
      <section id="hero" className={`hero text-center py-5 fade-section ${activeSection === 0 ? 'active' : ''}`}>
        <div className="container">
          <h1 className="display-4 mb-4">Unlock the Joy of Science Learning</h1>
          <p className="lead mb-4">Our Intelligent Tutoring System is expertly crafted for 12-year-olds, transforming science education through interactive lessons powered by advanced LLM technology. Let your child explore science like never before!</p>
          <a href="/learn" className="btn btn-primary btn-lg">Get Started Today</a>
          <img src={`${process.env.PUBLIC_URL}/assets/public.svg`} alt="Hero" className="img-fluid mt-4" />
        </div>
      </section>

      <section id="features" className={`features-section py-5 fade-section ${activeSection === 1 ? 'active' : ''}`}>
        <div className="container">
          <h2 className="text-center mb-5">Elevate Your Child's Science Education with Our Intelligent Tutoring System</h2>
          <div className="row justify-content-center">
            <div className="col-md-4 text-center">
              <img src={`${process.env.PUBLIC_URL}/assets/public (1).svg`} alt="Interactive Learning" className="img-fluid mb-3" />
              <h3>Interactive Learning Made Fun</h3>
              <p>Our platform harnesses the latest LLM technology to make science concepts accessible and enjoyable for students.</p>
            </div>
            <div className="col-md-4 text-center">
              <img src={`${process.env.PUBLIC_URL}/assets/publicContain.svg`} alt="Adaptive Quizzes" className="img-fluid mb-3" />
              <h3>Adaptive Quizzes for Every Learner</h3>
              <p>Our quizzes adjust to each student's learning pace, ensuring comprehensive understanding of key concepts.</p>
            </div>
            <div className="col-md-4 text-center">
              <img src={`${process.env.PUBLIC_URL}/assets/publicContain (1).svg`} alt="Progress Tracking" className="img-fluid mb-3" />
              <h3>Progress Tracking for Empowered Learning</h3>
              <p>Monitor your child's development, foster engagement, and celebrate achievements in their learning journey.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="ignite" className={`ignite-passion-section py-5 fade-section ${activeSection === 2 ? 'active' : ''}`}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img src={`${process.env.PUBLIC_URL}/assets/public (2).svg`} alt="Ignite Passion" className="img-fluid" />
            </div>
            <div className="col-md-6">
              <h2>Ignite Your Child's Passion for Science</h2>
              <p>Our Intelligent Tutoring System is expertly tailored for 12-year-olds, transforming learning into an interactive and engaging experience that captivates young minds through advanced LLM technology.</p>
              <p>Our platform features personalized quizzes, ensuring that students comprehend essential science concepts while having fun. Real-time progress tracking empowers students and parents, offering insights for celebrating achievements and identifying growth areas.</p>
              <a href="/learn" className="btn btn-primary btn-lg mt-3">Join the Adventure</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
