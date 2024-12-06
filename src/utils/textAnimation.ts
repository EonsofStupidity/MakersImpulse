document.addEventListener('DOMContentLoaded', () => {
  const letterHoverElements = document.querySelectorAll('.letter-hover');

  letterHoverElements.forEach(element => {
    const text = element.textContent || '';
    element.textContent = '';
    
    [...text].forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.setProperty('--letter-index', index.toString());
      element.appendChild(span);
    });
  });
});