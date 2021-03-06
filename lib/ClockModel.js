class ClockModel {
    #millis;
    #clockCenter; // {x, y}
    #clockRadius;
    #fontSize;
    #bgColor;               // {r, g, b, a}
    #fontColor;             // {r, g, b, a}
    #secondsClockHandColor; // {r, g, b, a}
    #minutesClockHandColor; // {r, g, b, a}
    #hoursClockHandColor;   // {r, g, b, a}
    #doFloorSecondsRadians;
    #doFloorMinutesRadians;
    #doFloorHoursRadians;

    constructor(clockCenter, clockRadius) {
        this.#millis = 0;
        this.#clockCenter = (typeof clockCenter !== "undefined") ? clockCenter : {x: 0, y: 0};
        this.#clockRadius = (typeof clockRadius !== "undefined") ? clockRadius : 100;
        this.#fontSize = this.#clockRadius / 5;
        this.#bgColor = {r: 0, g: 0, b: 0, a: 1};
        this.#fontColor = {r: 255, g: 255, b: 255, a: 1};
        this.#secondsClockHandColor = {r: 255, g: 0, b: 0, a: 1};
        this.#minutesClockHandColor = {r: 0, g: 255, b: 0, a: 1};
        this.#hoursClockHandColor = {r: 0, g: 0, b: 255, a: 1};
        this.#doFloorSecondsRadians = true;
        this.#doFloorMinutesRadians = true;
        this.#doFloorHoursRadians = false;
    }

    get millis() {
        return this.#millis;
    }

    get time() {
        return this.#millis;
    }

    get clockCenter() {
        return this.#clockCenter;
    }

    get clockRadius() {
        return this.#clockRadius;
    }

    get fontSize() {
        return this.#fontSize;
    }

    get bgColor() {
        return this.#bgColor;
    }

    get fontColor() {
        return this.#fontColor;
    }

    get secondsClockHandColor() {
        return this.#secondsClockHandColor;
    }

    get minutesClockHandColor() {
        return this.#minutesClockHandColor;
    }

    get hoursClockHandColor() {
        return this.#hoursClockHandColor;
    }

    get doFloorSecondsRadians() {
        return this.#doFloorSecondsRadians;
    }

    get doFloorMinutesRadians() {
        return this.#doFloorMinutesRadians;
    }

    get doFloorHoursRadians() {
        return this.#doFloorHoursRadians;
    }

    set doFloorSecondsRadians(doFloor) {
        this.#doFloorSecondsRadians = doFloor;
    }

    set doFloorMinutesRadians(doFloor) {
        this.#doFloorMinutesRadians = doFloor;
    }

    set doFloorHoursRadians(doFloor) {
        this.#doFloorHoursRadians = doFloor;
    }

    getRadiansSeconds(doFloor) {
        return Math.PI / 2 - this.#getRadians(this.#millis, 1, 1000, doFloor);
    }

    getRadiansMinutes(doFloor) {
        return Math.PI / 2 - this.#getRadians(this.#millis, 1, 60000, doFloor);
    }

    getRadiansHours(doFloor) {
        return Math.PI / 2 - this.#getRadians(this.#millis, 5, 3600000, doFloor);
    }

    #getRadians(millis, multiplier, scale, doFloor) {
        return Math.PI / 30 * multiplier * (doFloor ? Math.floor(millis / scale) : millis / scale);
    }

    setTime(millis) {
        this.#millis = millis;
    }

    setClockCenter(xy) {
        this.#clockCenter = xy;
    }

    setClockRadius(pixels) {
        if (pixels <= 0)
            return;

        this.#clockRadius = pixels;
    }

    setFontSize(pixels) {
        if (pixels <= 0)
            return;

        this.#fontSize = pixels;
    }

    setBgColor(rgba) {
        this.#bgColor = rgba;
    }

    setFontColor(rgba) {
        this.#fontColor = rgba;
    }

    setSecondsClockHandColor(rgba) {
        this.#secondsClockHandColor = rgba;
    }

    setMinutesClockHandColor(rgba) {
        this.#minutesClockHandColor = rgba;
    }

    setHoursClockHandColor(rgba) {
        this.#hoursClockHandColor = rgba;
    }

    setDoFloorSecondsRadians(doFloor) {
        this.#doFloorSecondsRadians = doFloor;
    }

    setDoFloorMinutesRadians(doFloor) {
        this.#doFloorMinutesRadians = doFloor;
    }

    setDoFloorHoursRadians(doFloor) {
        this.#doFloorHoursRadians = doFloor;
    }

    setToLocalTime() {
        let date = new Date();
        this.setTime(date.getTime() - date.getTimezoneOffset() * 60000);
    }

    setTimeUTC(utcOffset) {
        let date = new Date();
        this.setTime(date.getTime() + utcOffset * 3600000);
    }

    incrementTime(millis) {
        this.#millis += millis;
    }
}

export default ClockModel;