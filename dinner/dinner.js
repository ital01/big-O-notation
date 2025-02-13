document.addEventListener('DOMContentLoaded', () => {
  const platesContainer = document.getElementById('plates-container');
  const permutationsContainer = document.getElementById('permutations-container');
  const generateButton = document.getElementById('generate-permutations');

  const plates = ['Prato 1', 'Prato 2', 'Prato 3', 'Prato 4'];
  const plateColors = ['plate-red', 'plate-blue', 'plate-green', 'plate-yellow'];

  function renderPlates() {
    platesContainer.innerHTML = '';
    plates.forEach((plate, index) => {
      const plateCard = document.createElement('div');
      plateCard.classList.add('plate-card', plateColors[index]);
      plateCard.textContent = plate;
      platesContainer.appendChild(plateCard);
    });
  }

  function generatePermutations(array) {
    const result = [];

    function permute(arr, currentPermutation = []) {
      if (arr.length === 0) {
        result.push([...currentPermutation]);
      } else {
        for (let i = 0; i < arr.length; i++) {
          const newArr = [...arr];
          const item = newArr.splice(i, 1);
          permute(newArr, [...currentPermutation, ...item]);
        }
      }
    }

    permute(array);
    return result;
  }
  function displayPermutations(permutations) {
    permutationsContainer.innerHTML = '';
    permutations.forEach((permutation, index) => {
      const permutationCard = document.createElement('div');
      permutationCard.classList.add('permutation-card');
      permutationCard.style.animationDelay = `${index * 0.1}s`;

      const permutationTitle = document.createElement('h2');
      permutationTitle.classList.add('permutation-title');
      permutationTitle.textContent = `Permutação ${index + 1}`;
      permutationCard.appendChild(permutationTitle);

      const platesContainer = document.createElement('div');
      platesContainer.classList.add('plates-container');

      permutation.forEach((plate, plateIndex) => {
        const plateCard = document.createElement('div');
        plateCard.classList.add('plate-card', plateColors[plates.indexOf(plate)]);
        plateCard.textContent = plate;
        platesContainer.appendChild(plateCard);
      });

      permutationCard.appendChild(platesContainer);
      permutationsContainer.appendChild(permutationCard);
    });
  }

  generateButton.addEventListener('click', () => {
    const permutations = generatePermutations(plates);
    displayPermutations(permutations);
  });

  generateButton.addEventListener('click', () => {
    const permutations = generatePermutations(plates);
    displayPermutations(permutations);
  });

  renderPlates();
});