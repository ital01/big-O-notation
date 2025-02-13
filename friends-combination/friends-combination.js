const friends = ["Carlos", "Ana", "Yuri", "Fernando", "Vinicius", "Thaiane", "Monan", "Renzzo", "Pamela", "Larissa"];

const colorSchemes = [
  { background: "#FFB3BA", color: "#000000" },
  { background: "#FFDFBA", color: "#000000" },
  { background: "#FFFFBA", color: "#000000" },
  { background: "#BAFFC9", color: "#000000" },
  { background: "#BAE1FF", color: "#000000" },
  { background: "#E6E6FA", color: "#000000" },
  { background: "#FFDAB9", color: "#000000" },
  { background: "#FFE4E1", color: "#000000" },
  { background: "#F0E68C", color: "#000000" },
  { background: "#E0FFFF", color: "#000000" }
];

const friendsContainer = document.getElementById("friends-container");
friends.forEach((friend, index) => {
  const friendCard = document.createElement("div");
  friendCard.classList.add("card");
  friendCard.innerText = friend;
  friendCard.style.backgroundColor = colorSchemes[index % colorSchemes.length].background;
  friendCard.style.color = colorSchemes[index % colorSchemes.length].color;
  friendCard.style.animationDelay = `${index * 0.1}s`;
  friendsContainer.appendChild(friendCard);
});

function generatePairs(friends) {
  const pairs = [];
  for (let i = 0; i < friends.length; i++) {
    for (let j = i + 1; j < friends.length; j++) {
      pairs.push({
        pair: `${friends[i]} & ${friends[j]}`,
        colorScheme: colorSchemes[i % colorSchemes.length]
      });
    }
  }
  return pairs;
}

const generateButton = document.getElementById("generate-button");
const pairsContainer = document.getElementById("pairs-container");
const resultTitle = document.createElement("h2");
pairsContainer.before(resultTitle);

generateButton.addEventListener("click", () => {
  pairsContainer.innerHTML = "";
  const pairs = generatePairs(friends);
  resultTitle.innerText = `Total de Resultados: ${pairs.length}`;
  pairs.forEach((pairObj, index) => {
    const pairCard = document.createElement("div");
    pairCard.classList.add("pair-card");
    pairCard.innerText = pairObj.pair;
    pairCard.style.backgroundColor = pairObj.colorScheme.background;
    pairCard.style.color = pairObj.colorScheme.color;
    pairCard.style.animationDelay = `${index * 0.1}s`;
    pairsContainer.appendChild(pairCard);
  });
  pairsContainer.lastElementChild.scrollIntoView({ behavior: "smooth" });
});
