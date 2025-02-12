const lightsRow = document.getElementById('lights-row');
const lightIndexInput = document.getElementById('light-index');
const checkLightButton = document.getElementById('check-light');
const result = document.getElementById('result');

const lights = Array.from({ length: 10 }, (_, i) => ({
  index: i,
  isOn: Math.random() > 0.5,
}));

function renderLights() {
  result.textContent = 'Escolha uma luz para verificar.';
  lightsRow.innerHTML = '';
  lights.forEach((light, index) => {
    const lightContainer = document.createElement('div');
    lightContainer.classList.add('light-container');

    const lightIndex = document.createElement('div');
    lightIndex.classList.add('light-index');
    lightIndex.textContent = index + 1;
    lightContainer.appendChild(lightIndex);

    const lightElement = document.createElement('div');
    lightElement.classList.add('light');
    if (light.isOn) {
      lightElement.classList.add('on');
    }
    lightElement.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    lightElement.setAttribute('data-index', index);
    lightContainer.appendChild(lightElement);

    lightsRow.appendChild(lightContainer);
  });
}

function checkLight() {
  const index = parseInt(lightIndexInput.value, 10);

  if (isNaN(index) || index < 1 || index >= lights.length) {
    result.textContent = 'Luz inválida! Digite um número entre 1 e 10.';
    return;
  }

  const lightElement = lightsRow.children[index];
  lightElement.classList.add('highlight');
  setTimeout(() => {
    lightElement.classList.remove('highlight');
  }, 500);

  result.textContent = `A luz no índice ${index} está ${
    lights[index-1].isOn ? 'ACESA' : 'APAGADA'
  }.`;
}

checkLightButton.addEventListener('click', checkLight);

renderLights();
