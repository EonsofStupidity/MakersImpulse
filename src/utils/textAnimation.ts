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
  const elements = document.querySelectorAll('.letter-hover');
  elements.forEach(element => {
    if (element instanceof HTMLElement) {
      splitTextIntoLetters(element);
    }
  });

  // Setup mutation observer for dynamically added elements
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          const newElements = node.querySelectorAll('.letter-hover');
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
});

export {};