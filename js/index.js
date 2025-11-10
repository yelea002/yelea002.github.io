// elements
const starElem = document.querySelector(".star-cost");
const avgCpsElem = document.querySelector(".avg-cps");
const clickCountElem = document.getElementById("click-count");
const nextLevelBtn = document.getElementById("next-level-btn");
const starImg = document.querySelector(".star-img");

let star = 0;
let clicks = 0;

// Clicker
let clickerLevel = 0;
let clickerCost = 10;

//mini auto  taping
let autoLevel = 0;
let autoCost = 100;
let autoMultiplier = 1;
let autoInterval = null;

// Miner
let minerLevel = 0;
let minerCost = 500;
let minerMultiplier = 10;
let minerInterval = null;

// upgr
const clickerCostElem = document.querySelector(".clicker-cost");
const clickerLevelElem = document.querySelector(".clicker-level");
const clickerIncreaseElem = document.querySelector(".clicker-increase");

const autoCostElem = document.querySelector(".auto-cost");
const autoLevelElem = document.querySelector(".auto-level");
const autoIncreaseElem = document.querySelector(".auto-increase");

const minerCostElem = document.querySelector(".miner-cost");
const minerLevelElem = document.querySelector(".miner-level");
const minerIncreaseElem = document.querySelector(".miner-increase");

// hvordan clicker jobber
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

// click star
function clickStar() {
  star += getClickerGPC();
  clicks++;
  starElem.innerHTML = star.toFixed(1);
  clickCountElem.innerHTML = clicks;
  clickerIncreaseElem.innerHTML = getClickerGPC().toFixed(1);

  //  btn Next Level her vi ser en if(clicks >= 50 ) betyr hvis du har clicke mer en 50 ganger du kan go på neste lvl.På neste lever
  if (clicks >= 50) {
    nextLevelBtn.disabled = false;
  }

  updateAvgCPS();
}

// buy upg
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

// hvordan funker aut clicker  miner
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
  }, 100); // du får hver 0.1 sec 1 click det jeg har lagt for det blir som slow som det ser bedre ut en hver 1 sek 10 klick med en gang
}

// event
starImg.addEventListener("click", clickStar);

// next lvl(index1.html)
nextLevelBtn.addEventListener("click", () => {
  window.location.href = "../html/level2.html";
});
