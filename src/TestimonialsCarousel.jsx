import React, { useState, useEffect, useCallback, useRef } from 'react';

const testimonials = [
  {
    quote: "Zaki brings dual perspectives to his work — connecting technical feasibility with user needs and business viability. Grounded in human centricity, he is strategic and collaborative in leading teams to execute meaningful experiences.",
    name: "DeAndre Hutton",
    title: "UX Director",
    company: "Avanade (Microsoft & Accenture JV)",
    context: "Managed Zaki directly",
  },
  {
    quote: "Zaki is an excellent leader and facilitator. He fosters open idea sharing and creates a goal-driven team environment where perspectives are respected, ideas are challenged, and growth is encouraged.",
    name: "Jared Thayer",
    title: "UX Manager",
    company: "Optym",
    context: "Reported directly to Zaki",
  },
  {
    quote: "Zaki combines curiosity, empathy, and technical fluency. His front-end background gives him a clear understanding of what it takes to bring designs to life.",
    name: "Wally Hitchcock",
    title: "Experience Director",
    company: null,
    context: "Managed Zaki directly",
  },
  {
    quote: "Zaki bridges the gap between development and design, bringing both technical understanding and user-focused thinking to every team he joins.",
    name: "Erin Jasmine",
    title: "UX Designer",
    company: null,
    context: "Worked on the same team",
  },
];

const INTERVAL_MS = 6000;
const TRANSITION_MS = 500;

const TestimonialsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const transitionTimeoutRef = useRef(null);

  const goTo = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    transitionTimeoutRef.current = setTimeout(() => {
      setActiveIndex(index);
      setTimeout(() => setIsTransitioning(false), 50);
    }, TRANSITION_MS / 2);
  }, [isTransitioning]);

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % testimonials.length);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo((activeIndex - 1 + testimonials.length) % testimonials.length);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(goNext, INTERVAL_MS);
    return () => clearInterval(intervalRef.current);
  }, [goNext, isPaused]);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  const current = testimonials[activeIndex];

  return (
    <div
      className="testimonials-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Testimonials"
      aria-roledescription="carousel"
    >
      <div className="testimonials-carousel__track">
        <button
          className="testimonials-carousel__arrow testimonials-carousel__arrow--prev"
          onClick={goPrev}
          aria-label="Previous testimonial"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div
          className="testimonials-carousel__slide"
          style={{ opacity: isTransitioning ? 0 : 1 }}
          role="group"
          aria-roledescription="slide"
          aria-label={`Testimonial ${activeIndex + 1} of ${testimonials.length}`}
        >
          <blockquote className="testimonials-carousel__quote">
            "{current.quote}"
          </blockquote>
          <div className="testimonials-carousel__attribution">
            <span className="testimonials-carousel__name">{current.name}</span>
            <span className="testimonials-carousel__role">
              {current.title}{current.company ? `, ${current.company}` : ''}
            </span>
            <span className="testimonials-carousel__context">{current.context}</span>
          </div>
        </div>

        <button
          className="testimonials-carousel__arrow testimonials-carousel__arrow--next"
          onClick={goNext}
          aria-label="Next testimonial"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="testimonials-carousel__dots" role="tablist" aria-label="Testimonial navigation">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`testimonials-carousel__dot${i === activeIndex ? ' testimonials-carousel__dot--active' : ''}`}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
