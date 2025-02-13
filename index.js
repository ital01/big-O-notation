const problems = [
  { id: 0, name: "Problema das luzes", link: "./lights/lights.html" },
  { id: 1, name: "Problema dos alunos", link: "./students/students.html" },
  { id: 2, name: "Problema do livro", link: "./book/book.html" },
  { id: 3, name: "Problema da lista de tarefas", link: "./task-ordering/task-ordering.html" },
  { id: 4, name: "Problema das Duplas de Amigos", link: "./friends-combination/friends-combination.html" },
  { id: 5, name: "Problema do Jantar", link: "./dinner/dinner.html" },
];

const container = document.getElementById("problems-container");

problems.forEach((problem) => {
  const card = document.createElement("div");
  card.className = "problem-card";
  card.innerHTML = `
    <h2>${problem.name}</h2>
    <button>Ver Cenário</button>
  `;

  card.addEventListener("click", () => {
    window.location.href = problem.link;
  });

  container.appendChild(card);
});
