document.getElementById("generateButton").addEventListener("click", () => {
  const input = document.getElementById("friendInput").value;
  const pairsContainer = document.getElementById("pairsContainer");
  pairsContainer.innerHTML = ""; // Clear previous results

  const friends = input.split(",").map((friend) => friend.trim());
  if (friends.length < 2) {
    pairsContainer.innerHTML = "<p>Please enter at least two friends!</p>";
    return;
  }

  const pairs = generatePairs(friends);

  pairs.forEach((pair, index) => {
    const pairElement = document.createElement("div");
    pairElement.className = "pair";
    pairElement.textContent = `${pair[0]} & ${pair[1]}`;
    pairsContainer.appendChild(pairElement);

    // Add animation with delay
    setTimeout(() => {
      pairElement.classList.add("show");
    }, index * 300); // 300ms delay between each pair
  });
});

function generatePairs(friends) {
  const pairs = [];
  for (let i = 0; i < friends.length; i++) {
    for (let j = i + 1; j < friends.length; j++) {
      pairs.push([friends[i], friends[j]]);
    }
  }
  return pairs;
}
