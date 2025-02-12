document.addEventListener('DOMContentLoaded', () => {
  const book = document.getElementById('book');
  const targetPageInput = document.getElementById('target-page');
  const startSearchButton = document.getElementById('start-search');
  const result = document.getElementById('result');

  const numPages = 300;
  for (let i = 1; i <= numPages; i++) {
    const page = document.createElement('div');
    page.classList.add('page');
    page.textContent = i;
    book.appendChild(page);
  }

  startSearchButton.addEventListener('click', () => {
    const targetPage = parseInt(targetPageInput.value);
    if (isNaN(targetPage) || targetPage < 1 || targetPage > numPages) {
      result.textContent = `Por favor, insira um número de página válido entre 1 e ${numPages}.`;
      return;
    }

    const pages = document.querySelectorAll('.page');
    let low = 0;
    let high = pages.length - 1;
    let steps = 0;

    result.textContent = 'Buscando...';
    pages.forEach(page => page.classList.remove('checked', 'found'));

    const binarySearchAnimation = () => {
      if (low > high) return;

      steps++;
      const mid = Math.floor((low + high) / 2);
      const currentPage = pages[mid];
      currentPage.classList.add('checked');

      setTimeout(() => {
        const pageNumber = parseInt(currentPage.textContent);
        if (pageNumber === targetPage) {
          currentPage.classList.add('found');
          result.textContent = `Página encontrada! Número: ${targetPage} (em ${steps} passos).`;
          return;
        } else if (pageNumber < targetPage) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }
        binarySearchAnimation();
      }, 500);
    };

    binarySearchAnimation();
  });
});
