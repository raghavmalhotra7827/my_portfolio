"use client"

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';

// Import Lottie with ssr disabled and ensure it's only loaded client-side
const Lottie = dynamic(() => import('lottie-react'), { 
  ssr: false,
  loading: () => <div style={{ minHeight: '200px' }}></div>
});

const AnimationLottie = ({ animationPath, width }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: '100px 0px'
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationPath,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      progressiveLoad: true,
    },
    style: {
      width: width || '95%',
    }
  };

  // Return placeholder during SSR and initial client render
  if (!isMounted) {
    return <div style={{ width: width || '95%', minHeight: '200px' }}></div>;
  }

  return (
    <div ref={ref}>
      {inView ? (
        <Lottie {...defaultOptions} />
      ) : (
        <div style={{ width: width || '95%', minHeight: '200px' }}></div>
      )}
    </div>
  );
};

export default AnimationLottie;