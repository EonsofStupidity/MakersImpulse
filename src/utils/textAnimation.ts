const splitTextIntoLetters = (element: HTMLElement) => {
  // Skip if already processed
  if (element.classList.contains('text-processed')) {
    return;
  }

  console.log('Processing text element:', element.textContent);
  const text = element.textContent || '';
  if (!text.trim()) return;

  // Mark as processed
  element.classList.add('text-processed');
  
  // Create wrapper
  const wrapper = document.createElement('span');
  wrapper.className = 'letter-hover-wrapper';
  
  // Create spans for each letter
  const letters = text.split('').map((char, index) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.className = 'letter-span';
    span.style.setProperty('--delay', `${index * 50}ms`);
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
      const maxDistance = 30; // Smaller radius for more gradual spread
      
      if (distance < maxDistance) {
        const delay = Math.abs(mouseX - spanCenter) * 20; // Slower spread
        span.style.setProperty('--delay', `${delay}ms`);
        span.classList.add('letter-active');
      } else if (distance < maxDistance * 2) {
        // Create a fade out effect for letters just outside the immediate range
        const delay = distance * 15;
        span.style.setProperty('--delay', `${delay}ms`);
        span.classList.remove('letter-active');
      }
    });
  });

  // Reset on mouse leave with staggered delay
  wrapper.addEventListener('mouseleave', () => {
    letters.forEach((span, index) => {
      const delay = index * 30; // Slower retreat
      span.style.setProperty('--delay', `${delay}ms`);
      span.classList.remove('letter-active');
    });
  });
};

// Initialize on page load and route changes
const initializeLetterEffects = () => {
  console.log('Initializing letter effects');
  const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, span');
  console.log('Found text elements:', textElements.length);
  
  textElements.forEach(element => {
    if (element instanceof HTMLElement && 
        !element.classList.contains('text-processed') && 
        !element.closest('.letter-hover-wrapper')) {
      splitTextIntoLetters(element);
    }
  });
};

// Set up observers for dynamic content
const setupObservers = () => {
  console.log('Setting up mutation observers');
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node instanceof HTMLElement) {
          if (!node.classList.contains('text-processed') && 
              !node.closest('.letter-hover-wrapper')) {
            splitTextIntoLetters(node);
          }
          
          const textElements = node.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, span');
          textElements.forEach(element => {
            if (element instanceof HTMLElement && 
                !element.classList.contains('text-processed') && 
                !element.closest('.letter-hover-wrapper')) {
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
};

// Initialize when document is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - initializing effects');
    initializeLetterEffects();
    setupObservers();
  });
} else {
  console.log('Document already loaded - initializing effects');
  initializeLetterEffects();
  setupObservers();
}

export {};