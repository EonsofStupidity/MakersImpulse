const splitTextIntoLetters = (element: HTMLElement) => {
  const text = element.textContent || '';
  element.textContent = ''; // Clear the element
  
  // Create spans for each letter
  [...text].forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces
    span.style.setProperty('--index', `${index * 0.05}s`);
    span.className = 'letter-span';
    element.appendChild(span);
  });
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Select all text elements
  const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button');
  textElements.forEach(element => {
    if (element instanceof HTMLElement && !element.querySelector('.letter-span')) {
      splitTextIntoLetters(element);
    }
  });

  // Setup mutation observer for dynamically added elements
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          const newElements = node.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button');
          newElements.forEach(element => {
            if (element instanceof HTMLElement && !element.querySelector('.letter-span')) {
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
});

export {};