"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let mockData;
let data;
const pointRangeToAdd = 1000;
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("https://webcdn.17app.co/campaign/pretest/data.json");
        const data = yield res.json();
        return data;
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    mockData = yield fetchData();
}))();
function increasePointsForRandomPerson(range, player) {
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
        picture.src = mockData[i].picture;
        displayName.innerHTML = mockData[i].displayName;
        score.innerHTML = mockData[i].score.toString();
    }
}
function test() {
    showLeaderboard();
}
setInterval(test, 500);
