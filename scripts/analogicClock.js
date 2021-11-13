import ClockModel from "./lib/analogicClock/ClockModel.js";
import DottedView from "./lib/analogicClock/views/DottedView.js";
import ElegantView from "./lib/analogicClock/views/ElegantView.js";

const container = document.getElementById("container");
const canvas = document.getElementById("analogicClock");
const canvasCtx = canvas.getContext("2d");

canvas.width = container.clientWidth;
canvas.height = container.clientHeight;

let deltaTime = 1000;
let clockModel = new ClockModel({x: canvas.width / 2, y: canvas.height / 2}, getClockRadius());
let clockView = new ElegantView(canvasCtx, clockModel);

clockModel.setBgColor({r: 0, g: 0, b: 0, a: 1});
clockModel.setSecondsClockHandColor({r: 154, g: 154, b: 154, a: 1});
clockModel.setMinutesClockHandColor({r: 255, g: 0, b: 0, a: 1});
clockModel.setHoursClockHandColor({r: 255, g: 255, b: 255, a: 1});
//clockModel.setFontSize(clockModel.clockRadius / 5);
clockModel.setFontColor({r: 255, g: 255, b: 255, a: 1});

defaultConfig();
//backwardsConfig();
//fastForwardConfig();
//fastBackwardsConfig();

function defaultConfig() {
    clockModel.setLocalTime();
    drawClock();
    window.addEventListener("resize", resizeContainer);
    setInterval(() => clockModel.setLocalTime(), deltaTime);
    setInterval(drawClock, deltaTime);
}

function backwardsConfig() {
    clockModel.setLocalTime();
    drawClock();
    window.addEventListener("resize", resizeContainer);
    setInterval(() => clockModel.incrementTime(-1000), deltaTime);
    setInterval(drawClock, deltaTime);
}

function fastForwardConfig() {
    clockModel.setLocalTime();
    drawClock();
    window.addEventListener("resize", resizeContainer);
    setInterval(() => clockModel.incrementTime(1000), 10);
    setInterval(drawClock, 10);
}

function fastBackwardsConfig() {
    clockModel.setLocalTime();
    drawClock();
    window.addEventListener("resize", resizeContainer);
    setInterval(() => clockModel.incrementTime(-1000), 10);
    setInterval(drawClock, 10);
}

function getClockRadius() {
    return canvas.width > canvas.height ? canvas.height / 2 : canvas.width / 2;
}

function resizeContainer() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    clockModel.setClockCenter({x: canvas.width / 2, y: canvas.height / 2});
    clockModel.setClockRadius(getClockRadius());
    clockModel.setFontSize(getClockRadius() / 5);
    drawClock();
}

function drawClock() {
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    clockView.drawClock();
}