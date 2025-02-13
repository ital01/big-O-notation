document.addEventListener('DOMContentLoaded', () => {
  const platesContainer = document.getElementById('plates-container');
  const permutationsContainer = document.getElementById('permutations-container');
  const generateButton = document.getElementById('generate-permutations');
  const addButton = document.getElementById('add-plate');
  const removeButton = document.getElementById('remove-plate');
  const totalPermutationsElement = document.getElementById('total-permutations');

  const plates = ['Prato 1', 'Prato 2', 'Prato 3', 'Prato 4', 'Prato 5', 'Prato 6', 'Prato 7', 'Prato 8', 'Prato 9', 'Prato 10'];
  const plateColors = ['plate-red', 'plate-blue', 'plate-green', 'plate-yellow', 'plate-purple', 'plate-orange', 'plate-pink', 'plate-brown', 'plate-gray', 'plate-black'];

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

  function addPlate() {
    if (plates.length < 10) {
      plates.push(`Prato ${plates.length + 1}`);
      renderPlates();
    }
  }

  function removePlate() {
    if (plates.length > 0) {
      plates.pop();
      renderPlates();
    }
  }

  function displayPermutations() {
    const permutations = generatePermutations(plates);
    permutationsContainer.innerHTML = '';
    permutations.forEach((permutation, index) => {
      const permutationCard = document.createElement('div');
      permutationCard.classList.add('permutation-card');
      
      const permutationTitle = document.createElement('div');
      permutationTitle.classList.add('permutation-title');
      permutationTitle.textContent = 'Permutação: ' + (index + 1);
      
      const permutationRow = document.createElement('div');
      permutationRow.classList.add('permutation-row');
      permutation.forEach(plate => {
        const plateIndex = plates.indexOf(plate);
        const plateColor = plateColors[plateIndex];
        const plateElement = document.createElement('span');
        plateElement.classList.add('plate-card', plateColor);
        plateElement.textContent = plate;
        permutationRow.appendChild(plateElement);
      });

      permutationCard.appendChild(permutationTitle);
      permutationCard.appendChild(permutationRow);
      permutationsContainer.appendChild(permutationCard);
    });

    totalPermutationsElement.textContent = `Total de Permutações: ${permutations.length}`;
  }

  addButton.addEventListener('click', addPlate);
  removeButton.addEventListener('click', removePlate);
  generateButton.addEventListener('click', displayPermutations);

  renderPlates();
});