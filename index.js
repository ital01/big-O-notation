const problems = [
  { id: 1, name: "Problema das luzes", link: "./lights/lights.html" },
  { id: 2, name: "Problema dos alunos", link: "./students/students.html" },
  { id: 3, name: "Problema do livro", link: "./book/book.html" },
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
