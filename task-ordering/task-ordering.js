document.addEventListener('DOMContentLoaded', () => {
  const taskContainer = document.getElementById('task-container');
  const startSortButton = document.getElementById('start-sort');
  const delay = () => new Promise(resolve => setTimeout(resolve, 500));

  const taskTitles = [
    'Ir ao Supermercado',
    'Limpar a casa',
    'Estudar JavaScript',
    'Fazer exercícios',
    'Ler um livro',
    'Cozinhar o jantar',
    'Lavar a roupa',
    'Escrever um artigo',
    'Fazer uma caminhada',
    'Assistir a um filme',
    'Fazer um bolo',
    'Ligar para um amigo',
    'Fazer um café',
  ];

  const tasks = taskTitles.map(title => ({
    priority: Math.floor((Math.random() * 10) + 1),
    title
  }));

  const renderTasks = (taskList, highlightIndices = [], mergeIndices = [], traverseIndices = [], sortedIndices = []) => {
    taskContainer.innerHTML = '';
  
    const ul = document.createElement('ul');
    ul.style.listStyleType = 'none';
    ul.style.padding = '0';
  
    const minPriority = Math.min(...taskList.map(task => task.priority));
    const maxPriority = Math.max(...taskList.map(task => task.priority));
  
    taskList.forEach((task, index) => {
      const li = document.createElement('li');
      li.style.cssText = `
        margin-bottom: var(--gap);
        padding: var(--padding-small);
        border: 1px solid var(--primary-color);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        background-color: white;
        transition: background-color var(--transition-duration) ease, transform var(--transition-duration) ease;
        display: flex;
        justify-content: space-between;
        align-items: center;
      `;
  
      if (highlightIndices.includes(index)) {
        li.style.backgroundColor = 'var(--highlight-color)';
        li.style.transform = 'scale(1.1)';
      }
  
      if (mergeIndices.includes(index)) {
        li.classList.add('move-animation');
      }
  
      if (traverseIndices.includes(index)) {
        li.style.backgroundColor = 'lightblue';
      }
  
      if (sortedIndices.includes(index)) {
        const intensity = (task.priority - minPriority) / (maxPriority - minPriority);
        const color = interpolateColor('#8ecf25', '#ff4d4d', intensity);
        li.style.backgroundColor = color;
        li.style.color = 'white';
      }
  
      li.innerHTML = `<span><strong>${task.priority}</strong> - ${task.title}</span>`;
      ul.appendChild(li);
    });
  
    taskContainer.appendChild(ul);
  };

  const interpolateColor = (color1, color2, factor) => {
    const hexToRgb = (hex) => {
      const bigint = parseInt(hex.slice(1), 16);
      return [bigint >> 16 & 255, bigint >> 8 & 255, bigint & 255];
    };
  
    const rgbToHex = (r, g, b) =>
      `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
  
    const resultRgb = rgb1.map((c, i) => Math.round(c + factor * (rgb2[i] - c)));
    return rgbToHex(resultRgb[0], resultRgb[1], resultRgb[2]);
  };

  const mergeSort = async (array, start = 0) => {
    if (array.length <= 1) return array;

    const mid = Math.floor(array.length / 2);
    const left = await mergeSort(array.slice(0, mid), start);
    const right = await mergeSort(array.slice(mid), start + mid);

    return await merge(left, right, start);
  };

  const merge = async (left, right, start) => {
    let sorted = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      renderTasks(tasks, [], [], [start + i, start + left.length + j]);
      await delay();
      if (left[i].priority > right[j].priority) {
        sorted.push(left[i++]);
      } else {
        sorted.push(right[j++]);
      }
      renderTasks(tasks, sorted.map((_, idx) => start + idx), sorted.map((_, idx) => start + idx));
      await delay();
    }

    sorted = [...sorted, ...left.slice(i), ...right.slice(j)];
    tasks.splice(start, sorted.length, ...sorted);
    renderTasks(tasks, [], Array.from({ length: sorted.length }, (_, idx) => start + idx), [], Array.from({ length: sorted.length }, (_, idx) => start + idx));
    await delay();
    renderTasks(tasks, [], [], [], Array.from({ length: sorted.length }, (_, idx) => start + idx));
    return sorted;
  };

  renderTasks(tasks);

  startSortButton.addEventListener('click', async () => {
    startSortButton.disabled = true;
    await mergeSort(tasks);
    startSortButton.disabled = false;
  });
});
