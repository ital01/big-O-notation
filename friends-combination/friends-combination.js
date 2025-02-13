// Mock de amigos
const friends = ["Alice", "Bob", "Charlie", "Daisy", "Eve", "Frank"];

// Exibir os amigos como cards
const friendsContainer = document.getElementById("friends-container");
friends.forEach((friend, index) => {
  const friendCard = document.createElement("div");
  friendCard.classList.add("card");
  friendCard.innerText = friend;
  friendCard.style.animationDelay = `${index * 0.1}s`; // Adiciona delay na animação
  friendsContainer.appendChild(friendCard);
});

// Gerar pares
function generatePairs(friends) {
  const pairs = [];
  for (let i = 0; i < friends.length; i++) {
    for (let j = i + 1; j < friends.length; j++) {
      pairs.push(`${friends[i]} & ${friends[j]}`);
    }
  }
  return pairs;
}

// Exibir os pares
const generateButton = document.getElementById("generate-button");
const pairsContainer = document.getElementById("pairs-container");

generateButton.addEventListener("click", () => {
  pairsContainer.innerHTML = ""; // Limpa os pares anteriores
  const pairs = generatePairs(friends);
  pairs.forEach((pair, index) => {
    const pairCard = document.createElement("div");
    pairCard.classList.add("pair-card");
    pairCard.innerText = pair;
    pairCard.style.animationDelay = `${index * 0.1}s`; // Adiciona delay na animação
    pairsContainer.appendChild(pairCard);
  });
});
