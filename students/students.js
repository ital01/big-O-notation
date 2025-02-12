document.addEventListener('DOMContentLoaded', () => {
  const classroom = document.getElementById('classroom');
  const startCountingButton = document.getElementById('start-counting');
  const result = document.getElementById('result');
  result.textContent = 'Clique no botão para começar a contagem.';

  const numStudents = 30;
  for (let i = 1; i <= numStudents; i++) {
    const person = document.createElement('div');
    person.classList.add('person');
    person.textContent = i;
    classroom.appendChild(person);
  }

  startCountingButton.addEventListener('click', () => {
    const students = document.querySelectorAll('.person');
    let count = 0;
    result.textContent = 'Contando...';

    students.forEach((student, index) => {
      setTimeout(() => {
        student.classList.add('counted');
        count++;
        if (count === students.length) {
          result.textContent = `Número total de alunos: ${count}`;
        }
      }, index * 500);
    });
  });
});
