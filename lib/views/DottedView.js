import ClockView from "../ClockView.js";

class DottedView extends ClockView {
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

    #drawHours() {
        let radius = this._clockModel.clockRadius;
        let fontSize = this._clockModel.fontSize;
        let rgba = this._clockModel.fontColor;
        this._canvasCtx.fillStyle = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
        this._canvasCtx.font = `${fontSize}px Arial`;
        radius *= 88 / 100;
        
        for (let i = 1; i < 13; i++) {
            let textWidth = this._canvasCtx.measureText(i).width;
            let textHeigth = fontSize * 0.72;
            this._canvasCtx.fillText(
                i,
                this._clockModel.clockCenter.x - textWidth / 2 + Math.cos(Math.PI / 2 - Math.PI * i / 6) * radius,
                this._clockModel.clockCenter.y + textHeigth / 2 - Math.sin(Math.PI / 2 - Math.PI * i / 6) * radius
            );
        }
    }

    #drawClockHand(radians, segmentCount, rgba) {
        if (segmentCount <= 0)
            return;
        
        let radius = this._clockModel.clockRadius;
        let cos = Math.cos(radians);
        let sin = Math.sin(radians);
        let center = {x: this._clockModel.clockCenter.x, y: this._clockModel.clockCenter.y};
        let segments = [];
    
        segments[0] = [];
        segments[0][0] = center.x;
        segments[0][1] = center.y;
    
        for (let i = 1; i < segmentCount; i++) {
            segments[i] = [];
            segments[i][0] = center.x + cos * i * radius / 5.7;
            segments[i][1] = center.y - sin * i * radius / 5.7;
        }
    
        for (let i = 0; i < segmentCount; i++) {
            this._canvasCtx.fillStyle = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
            this._canvasCtx.beginPath();
            this._canvasCtx.arc(
                segments[i][0],
                segments[i][1],
                radius / 40,
                0, 2 * Math.PI
            );
            this._canvasCtx.closePath();
            this._canvasCtx.fill();
        }
    }

    drawClock() {
        this.#drawClockBackground();
        this.#drawHours();
        this.#drawClockHand(this._clockModel.getRadiansSeconds(this._clockModel.doFloorSecondsRadians), 6, this._clockModel.secondsClockHandColor);
        this.#drawClockHand(this._clockModel.getRadiansMinutes(this._clockModel.doFloorSecondsRadians), 5, this._clockModel.minutesClockHandColor);
        this.#drawClockHand(this._clockModel.getRadiansHours(this._clockModel.doFloorSecondsRadians), 4, this._clockModel.hoursClockHandColor);
    }
}

export default DottedView;