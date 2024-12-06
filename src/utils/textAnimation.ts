const initializeTextAnimation = () => {
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, button, span');
  
  textElements.forEach(element => {
    if (element instanceof HTMLElement) {
      const text = element.textContent || '';
      element.textContent = '';
      element.classList.add('text-gradient-hover');
      
      [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.setProperty('--char-index', index.toString());
        element.appendChild(span);
      });

      // Track mouse position for hover effect
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const centerIndex = Math.floor((x / rect.width) * text.length);
        
        const spans = element.querySelectorAll('span');
        spans.forEach((span, index) => {
          const distance = Math.abs(index - centerIndex);
          span.style.setProperty('--char-index', distance.toString());
        });
      });
    }
  });
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeTextAnimation);

// Initialize when new content is added (for dynamic content)
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      initializeTextAnimation();
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});