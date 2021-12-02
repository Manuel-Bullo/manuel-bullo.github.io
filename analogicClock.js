import ClockModel from "./lib/ClockModel.js";
import ClockView from "./lib/ClockView.js";
import DottedView from "./lib/views/DottedView.js";
import ElegantView from "./lib/views/ElegantView.js";
import ElegantView2 from "./lib/views/ElegantView2.js";

/*
* Manuel Bulletti 5AIA 2021/2022
* マヌエルはバカです
*/

drawClock(new DottedView(), "container1", "analogicClock1", configClock1, defaultConfig, 0);
drawClock(new ElegantView(), "container2", "analogicClock2", configClock2, defaultConfig, 1);
drawClock(new ElegantView2(), "container3", "analogicClock3", configClock3, defaultConfig, 9);
drawClock(new DottedView(), "container4", "analogicClock4", configClock4, defaultConfig, -5);

function drawClock(clockView, containerId, canvasId, initializeClock, speedConfig, utc) {
    const container = document.getElementById(containerId);
    const canvas = document.getElementById(canvasId);
    const canvasCtx = canvas.getContext("2d");

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    let clockModel = new ClockModel({x: canvas.clientWidth / 2, y: canvas.clientHeight / 2}, getClockRadius());
    clockView.initialize(canvasCtx, clockModel);

    let deltaTime = initializeClock(clockModel);

    drawClock();
    window.addEventListener("resize", resizeContainer);
    speedConfig(clockModel, deltaTime, drawClock, utc);

    function getClockRadius() {
        return canvas.clientWidth > canvas.clientHeight ? canvas.clientHeight / 2 : canvas.clientWidth / 2;
    }

    function resizeContainer() {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        clockModel.setClockCenter({x: canvas.clientWidth / 2, y: canvas.clientHeight / 2});
        clockModel.setClockRadius(getClockRadius());
        clockModel.setFontSize(getClockRadius() / 5);
        drawClock();
    }

    function drawClock() {
        canvasCtx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        clockView.drawClock();
    }
}

function configClock1(clockModel) {
    clockModel.setBgColor({r: 0, g: 0, b: 0, a: 1});
    clockModel.setSecondsClockHandColor({r: 154, g: 154, b: 154, a: 1});
    clockModel.setMinutesClockHandColor({r: 255, g: 0, b: 0, a: 1});
    clockModel.setHoursClockHandColor({r: 255, g: 255, b: 255, a: 1});
    clockModel.setFontSize(clockModel.clockRadius / 5);
    clockModel.setFontColor({r: 255, g: 255, b: 255, a: 1});
    clockModel.doFloorSecondsRadians = true;
    clockModel.doFloorMinutesRadians = true;
    clockModel.doFloorHoursRadians = false;

    return 1000;
}

function configClock2(clockModel) {
    clockModel.setBgColor({r: 0, g: 0, b: 0, a: 1});
    clockModel.setSecondsClockHandColor({r: 154, g: 154, b: 154, a: 1});
    clockModel.setMinutesClockHandColor({r: 255, g: 0, b: 0, a: 1});
    clockModel.setHoursClockHandColor({r: 255, g: 255, b: 255, a: 1});
    clockModel.setFontSize(clockModel.clockRadius / 4);
    clockModel.setFontColor({r: 255, g: 255, b: 255, a: 1});
    clockModel.doFloorSecondsRadians = true;
    clockModel.doFloorMinutesRadians = true;
    clockModel.doFloorHoursRadians = false;

    return 1000;
}

function configClock3(clockModel) {
    clockModel.setBgColor({r: 0, g: 0, b: 0, a: 1});
    clockModel.setSecondsClockHandColor({r: 104, g: 125, b: 174, a: 1});
    clockModel.setMinutesClockHandColor({r: 255, g: 255, b: 255, a: 1});
    clockModel.setHoursClockHandColor({r: 255, g: 255, b: 255, a: 1});
    clockModel.setFontSize(clockModel.clockRadius / 5);
    clockModel.setFontColor({r: 255, g: 255, b: 255, a: 1});
    clockModel.doFloorSecondsRadians = false;
    clockModel.doFloorMinutesRadians = false;
    clockModel.doFloorHoursRadians = false;

    return 10;
}

function configClock4(clockModel) {
    clockModel.setBgColor({r: 0, g: 0, b: 0, a: 1});
    clockModel.setSecondsClockHandColor({r: 154, g: 154, b: 154, a: 1});
    clockModel.setMinutesClockHandColor({r: 255, g: 0, b: 0, a: 1});
    clockModel.setHoursClockHandColor({r: 255, g: 255, b: 255, a: 1});
    clockModel.setFontSize(clockModel.clockRadius / 5);
    clockModel.setFontColor({r: 255, g: 255, b: 255, a: 1});
    clockModel.doFloorSecondsRadians = true;
    clockModel.doFloorMinutesRadians = true;
    clockModel.doFloorHoursRadians = false;

    return 1000;
}

function defaultConfig(clockModel, deltaTime, drawClock, utc) {
    clockModel.setTimeUTC(utc)
    drawClock();
    setInterval(() => { clockModel.setTimeUTC(utc); drawClock()}, deltaTime);
}

function highRefreshRate(clockModel, deltaTime, drawClock, utc) {
    clockModel.setTimeUTC(utc)
    drawClock();
    setInterval(() => { clockModel.setTimeUTC(utc); drawClock() }, 10);
}

function backwardsConfig(clockModel, deltaTime, drawClock, utc) {
    clockModel.setTimeUTC(utc)
    drawClock();
    setInterval(() => { clockModel.incrementTime(-deltaTime); drawClock() }, deltaTime);
}

function fastForwardConfig(clockModel, deltaTime, drawClock, utc) {
    clockModel.setTimeUTC(utc)
    drawClock();
    setInterval(() => { clockModel.incrementTime(1000); drawClock() }, 10);
}

function fastBackwardsConfig(clockModel, deltaTime, drawClock, utc) {
    clockModel.setTimeUTC(utc)
    drawClock();
    setInterval(() => { clockModel.incrementTime(-1000); drawClock() }, 10);
}