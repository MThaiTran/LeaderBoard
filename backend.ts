interface Player {
  displayName: string;
  picture: string;
  score: number;
  userID: string;
}

async function fetchData() {
  const res = await fetch("https://webcdn.17app.co/campaign/pretest/data.json");
  const data = await res.json();
  return data;
}

let mockData: Player[];
(async () => {
  mockData = await fetchData();
})();

function callBack() {
  console.log(mockData);
}

setTimeout(callBack, 100);

function sortPlayersByScore(players: Player[]) {
  players.sort((a, b) => a.score - b.score);
}

function increasePointsForRandomPerson(range: number, player: Player) {
  const randomPoints = Math.floor(Math.random() * range);
  player.score += randomPoints;
  console.log(
    `Increased ${player.displayName}'s score by ${randomPoints} points.`
  );
}

const pointRangeToAdd = 1000;
function adjustLeaderBoardData() {
  const randomIndex = Math.floor(Math.random() * mockData.length);
  increasePointsForRandomPerson(pointRangeToAdd, mockData[randomIndex]);
  sortPlayersByScore(mockData);
  console.log(mockData);
}

// setInterval(adjustLeaderBoardData, 2000);

function showLeaderboard() {
  const childNodes = document.querySelectorAll("div.playerCard");
  let i = 0;
  const length = childNodes.length;
  for (i = 0; i < length; i++) {
    const picture = childNodes[i].querySelector("img");
    const displayName = childNodes[i].querySelector("h2.name");
    const score = childNodes[i].querySelector("h2.points");

    picture!.src = mockData[i].picture;
    displayName!.innerHTML = mockData[i].displayName;
    score!.innerHTML = mockData[i].score.toString();

    console.log({ picture, displayName, score });
  }
}

function test() {
  adjustLeaderBoardData();
  showLeaderboard();
}

setInterval(test, 1000);
