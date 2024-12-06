const splitTextIntoLetters = (element: HTMLElement) => {
  // Don't process elements that have already been processed
  if (element.querySelector('.letter-span')) return;
  
  const text = element.textContent || '';
  element.textContent = ''; // Clear the element
  
  // Create spans for each letter
  [...text].forEach((char) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces
    span.className = 'letter-span';
    element.appendChild(span);
  });
};

// Initialize on page load
const initializeLetterEffects = () => {
  // Select all text elements
  const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button');
  textElements.forEach(element => {
    if (element instanceof HTMLElement) {
      splitTextIntoLetters(element);
    }
  });
};

// Setup mutation observer for dynamically added elements
const setupObserver = () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          splitTextIntoLetters(node);
          const newElements = node.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button');
          newElements.forEach(element => {
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
};

// Run initialization
document.addEventListener('DOMContentLoaded', () => {
  initializeLetterEffects();
  setupObserver();
});

// Also run initialization now in case the DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeLetterEffects);
} else {
  initializeLetterEffects();
}

export {};