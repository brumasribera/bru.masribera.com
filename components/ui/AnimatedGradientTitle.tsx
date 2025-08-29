import { useState, useEffect } from 'react';

interface AnimatedGradientTitleProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  autoAnimate?: boolean;
  alternateText?: string;
}

export function AnimatedGradientTitle({ 
  children, 
  className = '', 
  size = 'lg',
  autoAnimate = false,
  alternateText = ''
}: AnimatedGradientTitleProps) {
  const sizeClasses = {
    sm: 'text-xl max-[400px]:text-lg',
    md: 'text-2xl max-[400px]:text-xl sm:text-3xl sm:max-[400px]:text-2xl sm:text-4xl',
    lg: 'text-3xl max-[400px]:text-2xl sm:text-4xl sm:max-[400px]:text-3xl lg:text-5xl lg:max-[400px]:text-4xl lg:text-6xl',
    xl: 'text-5xl max-[400px]:text-2xl sm:text-6xl sm:max-[400px]:text-3xl lg:text-7xl lg:max-[400px]:text-4xl xl:text-8xl'
  };

  const [hackProgress, setHackProgress] = useState(0);
  const [isForward, setIsForward] = useState(true);

  useEffect(() => {
    if (!autoAnimate || !alternateText) return;

    const startAnimation = () => {
      if (isForward) {
        // Animate forward to target text
        const hackDuration = 1000; // 1 second for the hack effect
        const steps = 20; // Fewer steps for faster animation
        const stepDuration = hackDuration / steps;
        
        let currentStep = 0;
        const hackInterval = setInterval(() => {
          currentStep++;
          const progress = currentStep / steps;
          setHackProgress(progress);
          
          if (currentStep >= steps) {
            clearInterval(hackInterval);
            // Keep the final text for 2 seconds, then reverse
            setTimeout(() => {
              setIsForward(false);
            }, 2000);
          }
        }, stepDuration);
      } else {
        // Animate backward to original text
        const hackDuration = 1000; // 1 second for the reverse hack effect
        const steps = 20; // Fewer steps for faster animation
        const stepDuration = hackDuration / steps;
        
        let currentStep = 0;
        const hackInterval = setInterval(() => {
          currentStep++;
          const progress = 1 - (currentStep / steps);
          setHackProgress(progress);
          
          if (currentStep >= steps) {
            clearInterval(hackInterval);
            // Keep the original text for 2 seconds, then forward again
            setTimeout(() => {
              setIsForward(true);
            }, 2000);
          }
        }, stepDuration);
      }
    };

    // Start the animation immediately
    startAnimation();

    // Cleanup function
    return () => {
      // Clear any remaining timeouts/intervals if needed
    };
  }, [autoAnimate, alternateText, isForward]);

  const updateHackText = (progress: number) => {
    const originalText = children as string;
    const targetText = alternateText;
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    
    if (progress <= 0) {
      return originalText;
    }
    
    if (progress >= 1) {
      return (
        <>
          {targetText}
          <span className="text-cyan-500 dark:text-cyan-300 animate-cursor-blink font-mono" style={{ fontSize: '1.2em', fontWeight: '900', letterSpacing: '0.1em' }}>|</span>
        </>
      );
    }

    // Create character-by-character transformation with symbols
    const totalChars = Math.max(originalText.length, targetText.length);
    const charsToTransform = Math.floor(progress * totalChars);
    
    let transformedText = '';
    
    for (let i = 0; i < totalChars; i++) {
      if (i < charsToTransform) {
        // This character has been transformed
        if (i < targetText.length) {
          transformedText += targetText[i];
        }
      } else {
        // This character is still in transition - show intermediate symbols
        const transitionProgress = (progress * totalChars) - i;
        if (transitionProgress > 0) {
          // Show cool symbols before the final transformation
          const symbolIndex = Math.floor((progress * 20 + i * 3) % symbols.length);
          transformedText += symbols[symbolIndex];
        } else {
          // Keep original character
          transformedText += i < originalText.length ? originalText[i] : '';
        }
      }
    }

    return transformedText;
  };

  return (
    <span 
      className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-300 ${sizeClasses[size]} ${className}`}
      style={{ 
        backgroundSize: '200% 200%',
        animation: 'flowing-gradient 8s ease-in-out infinite'
      }}
    >
      {autoAnimate ? updateHackText(hackProgress) : children}
    </span>
  );
}
