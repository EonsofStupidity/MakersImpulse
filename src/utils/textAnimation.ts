const splitTextIntoLetters = (element: HTMLElement) => {
  // Skip if already processed
  if (element.closest('.landing-letter-hover') || element.classList.contains('landing-letter-span')) {
    return;
  }
  
  const text = element.textContent || '';
  if (!text.trim()) return;
  
  // Create wrapper
  const wrapper = document.createElement('span');
  wrapper.className = 'landing-letter-hover';
  
  // Create spans for each letter
  const letters = text.split('').map((char, index) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.className = 'landing-letter-span';
    span.style.setProperty('--letter-index', index.toString());
    return span;
  });
  
  // Clear and append
  element.textContent = '';
  letters.forEach(span => wrapper.appendChild(span));
  element.appendChild(wrapper);

  // Add mousemove handler
  wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    
    letters.forEach((span, index) => {
      const spanRect = span.getBoundingClientRect();
      const spanCenter = spanRect.left + spanRect.width / 2 - rect.left;
      const distance = Math.abs(mouseX - spanCenter);
      
      if (distance < 30) {
        span.classList.add('active');
        const intensity = 1 - (distance / 30);
        span.style.setProperty('--intensity', intensity.toString());
      } else {
        span.classList.remove('active');
      }
    });
  });

  // Reset on mouse leave with transition
  wrapper.addEventListener('mouseleave', () => {
    letters.forEach((span, index) => {
      setTimeout(() => {
        span.classList.remove('active');
        span.style.removeProperty('--intensity');
      }, index * 50);
    });
  });
};

// Initialize on DOM content loaded
const initializeLetterEffects = () => {
  const selectors = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    '.animate-text', '.hero-text', '.feature-text'
  ].join(',');
  
  const elements = document.querySelectorAll(selectors);
  elements.forEach(element => {
    if (element instanceof HTMLElement) {
      splitTextIntoLetters(element);
    }
  });
};

// Set up observers for dynamic content
const setupObservers = () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node instanceof HTMLElement) {
          const elements = node.querySelectorAll('h1, h2, h3, h4, h5, h6, .animate-text, .hero-text, .feature-text');
          elements.forEach(element => {
            if (element instanceof HTMLElement) {
              splitTextIntoLetters(element);
            }
          });
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  return () => observer.disconnect();
};

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initializeLetterEffects();
    setupObservers();
  }, 500);
});

export {};