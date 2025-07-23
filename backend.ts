interface Player {
  displayName: string;
  picture: string;
  score: number;
  userID: string;
}

let mockData: Player[];
let data;
const pointRangeToAdd = 1000;

async function fetchData() {
  const res = await fetch("https://webcdn.17app.co/campaign/pretest/data.json");
  const data = await res.json();
  return data;
}

(async () => {
  mockData = await fetchData();
})();

function increasePointsForRandomPerson(range: number, player: Player) {
  const randomPoints = Math.floor(Math.random() * range);
  player.score += randomPoints;
}

function adjustLeaderBoardData() {
  const randomIndex = Math.floor(Math.random() * mockData.length);
  increasePointsForRandomPerson(pointRangeToAdd, mockData[randomIndex]);
  mockData.sort((a, b) => b.score - a.score);
}

function showLeaderboard() {
  adjustLeaderBoardData();

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
  }
}

function test() {
  showLeaderboard();
}
setInterval(test, 500);
