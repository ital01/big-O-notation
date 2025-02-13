document.addEventListener('DOMContentLoaded', () => {
  const taskContainer = document.getElementById('task-container');
  const startSortButton = document.getElementById('start-sort');

  const taskTitles = [
    "Ir ao Supermercado",
    "Limpar a casa",
    "Estudar JavaScript",
    "Fazer exercícios",
    "Ler um livro",
    "Cozinhar o jantar",
    "Lavar a roupa",
    "Escrever um artigo",
    "Fazer uma caminhada",
    "Assistir a um filme",
    "Fazer um bolo",
    "Ligar para um amigo",
    "Fazer um café",
  ];

  const tasks = taskTitles.map(title => ({
    priority: Math.floor((Math.random() * 10)+1),
    title
  }));

  function renderTasks(taskList, highlightIndices = [], sortedIndices = [], mergeIndices = []) {
    taskContainer.innerHTML = '';
  
    const ul = document.createElement('ul');
    ul.style.listStyleType = 'none';
    ul.style.padding = '0';
  
    taskList.forEach((task, index) => {
      const li = document.createElement('li');
      li.style.marginBottom = 'var(--gap)';
      li.style.padding = 'var(--padding-small)';
      li.style.border = '1px solid var(--primary-color)';
      li.style.borderRadius = 'var(--border-radius)';
      li.style.boxShadow = 'var(--box-shadow)';
      li.style.backgroundColor = 'white';
      li.style.transition = `background-color var(--transition-duration) ease, transform var(--transition-duration) ease`;
      li.style.display = 'flex';
      li.style.justifyContent = 'space-between';
      li.style.alignItems = 'center';
  
      if (highlightIndices.includes(index)) {
        li.style.backgroundColor = 'var(--highlight-color)';
        li.style.transform = 'scale(1.1)';
      }
  
      if (mergeIndices.includes(index)) {
        li.classList.add('move-animation');
      }

    li.innerHTML = `<span><strong>${task.priority}</strong> - ${task.title}</span>`;

    ul.appendChild(li);
  });

  taskContainer.appendChild(ul);
}

  async function mergeSort(array, start = 0) {
    if (array.length <= 1) return array;

    const mid = Math.floor(array.length / 2);
    const left = await mergeSort(array.slice(0, mid), start);
    const right = await mergeSort(array.slice(mid), start + mid);

    return await merge(left, right, start);
  }

  async function merge(left, right, start) {
    let sorted = [];
    let i = 0, j = 0;
  
    while (i < left.length && j < right.length) {
      if (left[i].priority > right[j].priority) {
        sorted.push(left[i]);
        i++;
      } else {
        sorted.push(right[j]);
        j++;
      }

      renderTasks(tasks, sorted.map((_, idx) => start + idx), [], sorted.map((_, idx) => start + idx));
      await new Promise(resolve => setTimeout(resolve, 1000)); // Aumentar o tempo de espera para 1 segundo
    }

    sorted = [...sorted, ...left.slice(i), ...right.slice(j)];
    tasks.splice(start, sorted.length, ...sorted);
    renderTasks(tasks, [], Array.from({ length: sorted.length }, (_, idx) => start + idx));
    return sorted;
  }

  renderTasks(tasks);

  startSortButton.addEventListener('click', async () => {
    startSortButton.disabled = true;
    await mergeSort(tasks);
    startSortButton.disabled = false;
  });
});