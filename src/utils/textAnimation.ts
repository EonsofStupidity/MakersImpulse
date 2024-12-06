const splitTextIntoLetters = (element: HTMLElement) => {
  console.log('Attempting to split text for element:', element);
  
  // Skip if already processed or if it's a child of a processed element
  if (element.closest('.letter-hover')) {
    console.log('Element already processed or child of processed element, skipping');
    return;
  }
  
  const text = element.textContent || '';
  console.log('Processing text:', text);
  
  // Only process if there's actual text content
  if (!text.trim()) return;
  
  // Create a wrapper if needed
  const wrapper = document.createElement('span');
  wrapper.className = 'letter-hover';
  
  // Create spans for each letter
  const letters = text.split('').map(char => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.className = 'letter-span';
    return span;
  });
  
  // Clear and append
  element.textContent = '';
  letters.forEach(span => wrapper.appendChild(span));
  element.appendChild(wrapper);
  
  console.log('Successfully split text into letters');
};

// Initialize on page load
const initializeLetterEffects = () => {
  console.log('Initializing letter effects');
  const elements = document.querySelectorAll('h1:not(.letter-hover), h2:not(.letter-hover), p:not(.letter-hover)');
  console.log('Found elements to process:', elements.length);
  
  elements.forEach(element => {
    if (element instanceof HTMLElement) {
      splitTextIntoLetters(element);
    }
  });
};

// Wait for React to finish rendering
setTimeout(initializeLetterEffects, 100);

// Also set up a mutation observer for dynamic content
const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node instanceof HTMLElement) {
        const elements = node.querySelectorAll('h1:not(.letter-hover), h2:not(.letter-hover), p:not(.letter-hover)');
        elements.forEach(element => {
          if (element instanceof HTMLElement) {
            splitTextIntoLetters(element);
          }
        });
      }
    });
  });
});

// Start observing once the document is ready
if (document.readyState !== 'loading') {
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

export {};