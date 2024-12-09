const splitTextIntoLetters = (element: HTMLElement) => {
  // Skip if already processed or if it's a child of a processed element
  if (element.closest('.letter-hover') || element.classList.contains('letter-span')) {
    return;
  }
  
  console.log('Processing text element:', element.textContent);
  const text = element.textContent || '';
  if (!text.trim()) return;
  
  // Create a wrapper
  const wrapper = document.createElement('span');
  wrapper.className = 'letter-hover';
  
  // Create spans for each letter
  const letters = text.split('').map((char, index) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.className = 'letter-span';
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
      
      if (distance < 100) {
        span.classList.add('active');
        const intensity = 1 - (distance / 100);
        span.style.setProperty('--intensity', intensity.toString());
      } else {
        span.classList.remove('active');
      }
    });
  });

  // Reset on mouse leave
  wrapper.addEventListener('mouseleave', () => {
    letters.forEach(span => {
      span.classList.remove('active');
      span.style.removeProperty('--intensity');
    });
  });
  
  console.log('Successfully processed text element');
};

// Initialize on page load and route changes
const initializeLetterEffects = () => {
  console.log('Initializing letter effects');
  
  // Target specific elements that should have the effect
  const selectors = [
    '.nav-text', // Navigation text
    '.menu-item', // Menu items
    '.heading-text', // Headings
    '.animate-text', // Elements with specific class
    'h1:not(.no-animate)', // Headings that don't have .no-animate
    'h2:not(.no-animate)',
    'h3:not(.no-animate)',
    '.hero-text', // Hero section text
    '.feature-text' // Feature text
  ];
  
  const elements = document.querySelectorAll(selectors.join(','));
  console.log('Found elements to process:', elements.length);
  
  elements.forEach(element => {
    if (element instanceof HTMLElement) {
      splitTextIntoLetters(element);
    }
  });
};

// Set up observers for dynamic content and route changes
const setupObservers = () => {
  // Mutation Observer for dynamic content
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node instanceof HTMLElement) {
          const elements = node.querySelectorAll(
            '.nav-text, .menu-item, .heading-text, .animate-text, h1:not(.no-animate), h2:not(.no-animate), h3:not(.no-animate), .hero-text, .feature-text'
          );
          elements.forEach(element => {
            if (element instanceof HTMLElement) {
              splitTextIntoLetters(element);
            }
          });
        }
      });
    });
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Handle route changes
  const handleRouteChange = () => {
    console.log('Route changed, reinitializing effects');
    setTimeout(initializeLetterEffects, 100); // Small delay to ensure DOM is updated
  };

  // Listen for route changes
  window.addEventListener('popstate', handleRouteChange);
  
  // Clean up function
  return () => {
    observer.disconnect();
    window.removeEventListener('popstate', handleRouteChange);
  };
};

// Initialize when the document is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initializeLetterEffects();
    setupObservers();
  });
} else {
  initializeLetterEffects();
  setupObservers();
}

export {};