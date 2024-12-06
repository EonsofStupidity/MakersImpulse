const splitTextIntoLetters = (element: HTMLElement) => {
  const text = element.textContent || '';
  element.textContent = ''; // Clear the element
  
  // Create spans for each letter
  [...text].forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for actual spaces
    span.style.setProperty('--letter-index', index.toString());
    element.appendChild(span);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  // Initial setup
  const letterHoverElements = document.querySelectorAll('.letter-hover');
  letterHoverElements.forEach(splitTextIntoLetters);

  // Setup mutation observer to handle dynamically added elements
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          const newLetterHoverElements = node.querySelectorAll('.letter-hover');
          newLetterHoverElements.forEach(splitTextIntoLetters);
        }
      });
    });
  });

  // Start observing the document with the configured parameters
  observer.observe(document.body, { 
    childList: true, 
    subtree: true 
  });
});

export {};