const splitTextIntoLetters = (element: HTMLElement) => {
  const text = element.textContent || '';
  element.textContent = ''; // Clear the element
  
  // Create spans for each letter with index for transition delay
  [...text].forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.setProperty('--index', index.toString());
    
    // Add mouseover and mouseout events for each letter
    span.addEventListener('mouseover', () => {
      span.style.color = '#ff0abe';
      span.style.transform = 'translateY(-2px)';
    });
    
    span.addEventListener('mouseout', () => {
      span.style.color = '';
      span.style.transform = 'translateY(0)';
    });
    
    element.appendChild(span);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const letterHoverElements = document.querySelectorAll('.letter-hover');
  letterHoverElements.forEach(splitTextIntoLetters);

  // Setup mutation observer for dynamically added elements
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

  observer.observe(document.body, { 
    childList: true, 
    subtree: true 
  });
});

export {};