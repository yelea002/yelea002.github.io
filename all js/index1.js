const starElem = document.querySelector(".star-cost");
const avgCpsElem = document.querySelector(".avg-cps");
const clickCountElem = document.getElementById("click-count");
const nextLevelBtn = document.getElementById("next-level-btn");
const starImg = document.querySelector(".star-img");

10;

let star = 0;
let clicks = 0;

let clickerLevel = 0;
let clickerCost = 10;

let autoLevel = 0;
let autoCost = 100;
let autoMultiplier = 1;
let autoInterval = null;

let minerLevel = 0;
let minerCost = 500;
let minerMultiplier = 10;
let minerInterval = null;

const clickerCostElem = document.querySelector(".clicker-cost");
const clickerLevelElem = document.querySelector(".clicker-level");
const clickerIncreaseElem = document.querySelector(".clicker-increase");

const autoCostElem = document.querySelector(".auto-cost");
const autoLevelElem = document.querySelector(".auto-level");
const autoIncreaseElem = document.querySelector(".auto-increase");

const minerCostElem = document.querySelector(".miner-cost");
const minerLevelElem = document.querySelector(".miner-level");
const minerIncreaseElem = document.querySelector(".miner-increase");

function getClickerGPC() {
  return 1 + clickerLevel * 0.1;
}
function getAutoGPC() {
  return autoLevel * autoMultiplier;
}
function getMinerCPS() {
  return minerLevel * minerMultiplier;
}

function updateAvgCPS() {
  const cps = getAutoGPC() + getMinerCPS();
  avgCpsElem.innerHTML = cps.toFixed(2);
}

function clickStar() {
  star += getClickerGPC();
  clicks++;
  starElem.innerHTML = star.toFixed(1);
  clickCountElem.innerHTML = clicks;
  clickerIncreaseElem.innerHTML = getClickerGPC().toFixed(1);

  if (clicks >= 1000) {
    nextLevelBtn.disabled = false;
  }

  updateAvgCPS();
}

function BuyClicker() {
  if (star >= clickerCost) {
    star -= clickerCost;
    clickerLevel++;
    clickerCost += 10;
    starElem.innerHTML = star.toFixed(1);
    clickerLevelElem.innerHTML = clickerLevel;
    clickerCostElem.innerHTML = clickerCost;
    clickerIncreaseElem.innerHTML = getClickerGPC().toFixed(1);
    updateAvgCPS();
  }
}

function BuyAuto() {
  if (star >= autoCost) {
    star -= autoCost;
    autoLevel++;
    autoCost = Math.round(autoCost * 1.5);
    starElem.innerHTML = star.toFixed(1);
    autoLevelElem.innerHTML = autoLevel;
    autoCostElem.innerHTML = autoCost;
    autoIncreaseElem.innerHTML = getAutoGPC().toFixed(1);
    startAutoClicker();
    updateAvgCPS();
  }
}

function BuyMiner() {
  if (star >= minerCost) {
    star -= minerCost;
    minerLevel++;
    minerCost = Math.round(minerCost * 1.5);
    starElem.innerHTML = star.toFixed(1);
    minerLevelElem.innerHTML = minerLevel;
    minerCostElem.innerHTML = minerCost;
    minerIncreaseElem.innerHTML = getMinerCPS();
    startMiner();
    updateAvgCPS();
  }
}

function startAutoClicker() {
  if (autoInterval) return;
  autoInterval = setInterval(() => {
    star += getAutoGPC();
    starElem.innerHTML = star.toFixed(1);
    updateAvgCPS();
  }, 1000);
}

function startMiner() {
  if (minerInterval) return;
  minerInterval = setInterval(() => {
    star += getMinerCPS();
    starElem.innerHTML = star.toFixed(1);
    updateAvgCPS();
  }, 100);
}

starImg.addEventListener("click", clickStar);

nextLevelBtn.addEventListener("click", () => {
  window.location.href = "index1 copy.html";
});
