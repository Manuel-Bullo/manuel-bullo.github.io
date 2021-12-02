import ClockView from "../ClockView.js";

class ElegantView extends ClockView {
    constructor(canvasCtx, clockModel) {
        super(canvasCtx, clockModel);
    }

    #drawClockBackground() {
        let rgba = this._clockModel.bgColor;
        this._canvasCtx.fillStyle = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
        this._canvasCtx.beginPath();
        this._canvasCtx.arc(
            this._clockModel.clockCenter.x,
            this._clockModel.clockCenter.y,
            this._clockModel.clockRadius,
            0, 2 * Math.PI
        );
        this._canvasCtx.closePath();
        this._canvasCtx.fill();
    }

    #drawHours(rgba) {
        let radius = this._clockModel.clockRadius;
        let fontSize = this._clockModel.fontSize;
        this._canvasCtx.fillStyle = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
        this._canvasCtx.font = `${fontSize}px Arial`;
        radius *= 83 / 100;
        
        for (let i = 1; i < 13; i++) {
            let textWidth = this._canvasCtx.measureText(i).width;
            let textHeigth = fontSize * 0.72;
            this._canvasCtx.fillText(
                i,
                this._clockModel.clockCenter.x - textWidth / 2 + Math.cos(Math.PI / 2 - Math.PI * i / 6) * radius * 0.95,
                this._clockModel.clockCenter.y + textHeigth / 2 - Math.sin(Math.PI / 2 - Math.PI * i / 6) * radius * 0.95
            );
        }
    }

    #drawAbstractLines() {
        let radius = this._clockModel.clockRadius;
        let rgba = this._clockModel.fontColor;
        let center = this._clockModel.clockCenter;
        this._canvasCtx.strokeStyle = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
        
        for (let i = 0; i < 12; i++) {
            let cos = Math.cos(Math.PI / 2 - Math.PI * i / 6);
            let sin = Math.sin(Math.PI / 2 - Math.PI * i / 6);
            this._canvasCtx.lineWidth = radius * 0.02 * (i % 3 == 0 ? 2 : 1);
            this._canvasCtx.beginPath();
            this._canvasCtx.moveTo(center.x + cos * radius, center.y - sin * radius);
            this._canvasCtx.lineTo(center.x + cos * radius * 0.8, center.y - sin * 0.8);
            this._canvasCtx.stroke();
            this._canvasCtx.closePath();
        }
    }

    #drawHoursLines() {
        let radius = this._clockModel.clockRadius;
        let rgba = this._clockModel.fontColor;
        let center = this._clockModel.clockCenter;
        this._canvasCtx.strokeStyle = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
        
        for (let i = 0; i < 60; i++) {
            let cos = Math.cos(Math.PI / 2 - Math.PI * i / 30);
            let sin = Math.sin(Math.PI / 2 - Math.PI * i / 30);
            this._canvasCtx.lineWidth = radius * 0.01 * (i % 5 == 0 ? 1.3 : 1);
            this._canvasCtx.beginPath();
            this._canvasCtx.moveTo(center.x + cos * radius, center.y - sin * radius);
            this._canvasCtx.lineTo(center.x + cos * radius * 0.95 * (i % 5 == 0 ? 0.98 : 1), center.y - sin * radius * 0.95 * (i % 5 == 0 ? 0.98 : 1));
            this._canvasCtx.stroke();
            this._canvasCtx.closePath();
        }
    }

    #drawClockHand(radians, lengthPercentage, lineWidth, rgba) {
        if (lengthPercentage <= 0 || lineWidth <= 0)
            return;
        
        let radius = this._clockModel.clockRadius;
        let cos = Math.cos(radians);
        let sin = Math.sin(radians);
        let center = {x: this._clockModel.clockCenter.x, y: this._clockModel.clockCenter.y};
    
        this._canvasCtx.strokeStyle = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
        this._canvasCtx.lineWidth = lineWidth;
        this._canvasCtx.beginPath();
        this._canvasCtx.moveTo(center.x, center.y);
        this._canvasCtx.lineTo(center.x + cos * radius * lengthPercentage / 100, center.y - sin * radius * lengthPercentage / 100);
        this._canvasCtx.stroke();
        this._canvasCtx.closePath();
    }

    #drawClockCenter(clockCenterRadius, rgba) {
        this._canvasCtx.fillStyle = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
        this._canvasCtx.beginPath();
        this._canvasCtx.arc(
            this._clockModel.clockCenter.x,
            this._clockModel.clockCenter.y,
            clockCenterRadius,
            0, 2 * Math.PI
        );
        this._canvasCtx.closePath();
        this._canvasCtx.fill();
    }

    drawClock() {
        this.#drawClockBackground();
        //this.#drawAbstractLines();
        this.#drawHours(this._clockModel.fontColor);
        this.#drawHoursLines();
        this.#drawClockHand(this._clockModel.getRadiansSeconds(this._clockModel.doFloorSecondsRadians), 75, this._clockModel.clockRadius * 0.01, this._clockModel.secondsClockHandColor);
        this.#drawClockHand(this._clockModel.getRadiansMinutes(this._clockModel.doFloorSecondsRadians), 60, this._clockModel.clockRadius * 0.02, this._clockModel.minutesClockHandColor);
        this.#drawClockHand(this._clockModel.getRadiansHours(this._clockModel.doFloorSecondsRadians), 45, this._clockModel.clockRadius * 0.03, this._clockModel.hoursClockHandColor);
        this.#drawClockCenter(this._clockModel.clockRadius * 0.03, {r: 30, g: 30, b: 30, a: 1});
    }
}

export default ElegantView;