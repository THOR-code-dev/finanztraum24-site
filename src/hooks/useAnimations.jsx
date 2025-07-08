import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLocation } from 'react-router-dom';

export const usePageTransition = () => {
  const [isExiting, setIsExiting] = useState(false);
  const [isEntering, setIsEntering] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Sayfa değiştiğinde giriş animasyonunu başlat
    setIsEntering(true);

    // Çıkış animasyonu için bir zamanlayıcı ayarla
    const exitTimer = setTimeout(() => {
      setIsEntering(false);
    }, 600); // Animasyon süresi + biraz fazlası

    return () => {
      clearTimeout(exitTimer);
      setIsExiting(true);
    };
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsExiting(false);
      setIsEntering(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { isExiting, isEntering };
};

export const useScrollAnimation = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return { ref, inView };
};

export const useStaggerAnimation = (index, totalItems) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const delay = (index / totalItems) * 0.3; // 0.3s max delay

  return { ref, inView, delay };
};

export const useFormTransition = () => {
  const [isExiting, setIsExiting] = useState(false);
  const [isEntering, setIsEntering] = useState(true);

  const handleTransition = (direction) => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      setIsEntering(true);
    }, 300);
  };

  return { isExiting, isEntering, handleTransition };
};
