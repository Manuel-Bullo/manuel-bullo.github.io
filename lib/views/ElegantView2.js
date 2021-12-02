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
        let fontSize = this._clockModel.fontSize * 1.4;
        this._canvasCtx.fillStyle = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
        this._canvasCtx.font = `${fontSize}px Arial`;
        radius *= 83 / 100;
        
        for (let i = 1; i < 13; i++) {
            let textWidth = this._canvasCtx.measureText(i).width;
            let textHeigth = fontSize * 0.72;
            this._canvasCtx.fillText(
                i,
                this._clockModel.clockCenter.x - textWidth / 2 + Math.cos(Math.PI / 2 - Math.PI * i / 6) * radius * 0.93,
                this._clockModel.clockCenter.y + textHeigth / 2 - Math.sin(Math.PI / 2 - Math.PI * i / 6) * radius * 0.93
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

    #drawHoursLines(rgba, rgbaIntegers) {
        let radius = this._clockModel.clockRadius;
        let center = this._clockModel.clockCenter;
        
        for (let i = 0; i < 60; i++) {
            let cos = Math.cos(Math.PI / 2 - Math.PI * i / 30);
            let sin = Math.sin(Math.PI / 2 - Math.PI * i / 30);
            this._canvasCtx.strokeStyle = (i % 5 == 0 ? `rgba(${rgbaIntegers.r}, ${rgbaIntegers.g}, ${rgbaIntegers.b}, ${rgbaIntegers.a})` : `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`);
            this._canvasCtx.lineWidth = radius * 0.01 * (i % 5 == 0 ? 3.5 : 1);
            this._canvasCtx.beginPath();
            this._canvasCtx.moveTo(center.x + cos * radius, center.y - sin * radius);
            this._canvasCtx.lineTo(center.x + cos * radius * 0.94, center.y - sin * radius * 0.94);
            this._canvasCtx.stroke();
            this._canvasCtx.closePath();
        }
    }

    #drawClockHand(radians, lengthPercentage, lineWidth, rgba, type) {
        switch (type) {
            case "seconds":
                this.#drawThinClockHand(radians, lengthPercentage, 15, lineWidth, rgba);
                break;
            case "minutes":
                this.#drawThickClockHand(radians, lengthPercentage, lineWidth, this._clockModel.clockRadius / 14, rgba);
                break;
            case "hours":
                this.#drawThickClockHand(radians, lengthPercentage, lineWidth, this._clockModel.clockRadius / 14, rgba);
                break;
        }
    }

    #drawThinClockHand(radians, lengthPercentage, backClockHandLengthPercentage, lineWidth, rgba) {
        if (lengthPercentage <= 0 || backClockHandLengthPercentage <= 0 || lineWidth <= 0)
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
        this._canvasCtx.moveTo(center.x, center.y);
        this._canvasCtx.lineTo(center.x -(cos * radius * lengthPercentage * backClockHandLengthPercentage / 10000), center.y + (sin * radius * lengthPercentage * backClockHandLengthPercentage / 10000));
        this._canvasCtx.stroke();
        this._canvasCtx.closePath();
    }

    #drawThickClockHand(radians, lengthPercentage, lineWidth, lineWidthThin, rgba) {
        if (lengthPercentage <= 0 || lineWidth <= 0 || lineWidthThin <= 0)
            return;
        
        let radius = this._clockModel.clockRadius;
        let cos = Math.cos(radians);
        let sin = Math.sin(radians);
        let center = {x: this._clockModel.clockCenter.x, y: this._clockModel.clockCenter.y};
    
        this._canvasCtx.strokeStyle = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
        this._canvasCtx.lineWidth = radius * 0.02;

        this._canvasCtx.beginPath();
        this._canvasCtx.moveTo(center.x, center.y);
        this._canvasCtx.lineTo(center.x + cos * (lineWidthThin + lineWidth / 2), center.y - sin * (lineWidthThin + lineWidth / 2));
        this._canvasCtx.closePath();
        this._canvasCtx.stroke();
        
        this._canvasCtx.fillStyle = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
        this._canvasCtx.beginPath();
        this._canvasCtx.arc(
            center.x + cos * (lineWidthThin + lineWidth / 2),
            center.y - sin * (lineWidthThin + lineWidth / 2),
            lineWidth / 2,
            0, 2 * Math.PI
        );
        this._canvasCtx.closePath();
        this._canvasCtx.fill();

        this._canvasCtx.beginPath();
        this._canvasCtx.arc(
            center.x + cos * (radius * lengthPercentage / 100 - lineWidth / 2),
            center.y - sin * (radius * lengthPercentage / 100 - lineWidth / 2),
            lineWidth / 2,
            0, 2 * Math.PI
        );
        this._canvasCtx.closePath();
        this._canvasCtx.fill();

        this._canvasCtx.lineWidth = lineWidth;
        this._canvasCtx.beginPath();
        this._canvasCtx.moveTo(center.x + cos * (lineWidthThin + lineWidth / 2), center.y - sin * (lineWidthThin + lineWidth / 2));
        this._canvasCtx.lineTo(center.x + cos * (radius * lengthPercentage / 100 - lineWidth / 2), center.y - sin * (radius * lengthPercentage / 100 - lineWidth / 2));
        this._canvasCtx.closePath();
        this._canvasCtx.stroke();
    }

    #drawClockCenter(clockCenterRadius, rgba, rgbaCore) {
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

        this._canvasCtx.fillStyle = `rgba(${rgbaCore.r}, ${rgbaCore.g}, ${rgbaCore.b}, ${rgbaCore.a})`;
        this._canvasCtx.beginPath();
        this._canvasCtx.arc(
            this._clockModel.clockCenter.x,
            this._clockModel.clockCenter.y,
            clockCenterRadius / 2,
            0, 2 * Math.PI
        );
        this._canvasCtx.closePath();
        this._canvasCtx.fill();
    }

    drawClock() {
        this.#drawClockBackground();
        //this.#drawAbstractLines();
        this.#drawHours(this._clockModel.fontColor);
        this.#drawHoursLines({r: 90, g: 90, b: 90, a: 1}, this._clockModel.fontColor);
        this.#drawClockHand(this._clockModel.getRadiansHours(this._clockModel.doFloorHoursRadians), 60, this._clockModel.clockRadius * 0.07, this._clockModel.hoursClockHandColor, "hours");
        this.#drawClockHand(this._clockModel.getRadiansMinutes(this._clockModel.doFloorMinutesRadians), 85, this._clockModel.clockRadius * 0.07, this._clockModel.minutesClockHandColor, "minutes");
        this.#drawClockCenter(this._clockModel.clockRadius * 0.03, this._clockModel.minutesClockHandColor, this._clockModel.secondsClockHandColor);
        this.#drawClockHand(this._clockModel.getRadiansSeconds(this._clockModel.doFloorSecondsRadians), 100, this._clockModel.clockRadius * 0.01, this._clockModel.secondsClockHandColor, "seconds");
    }
}

export default ElegantView;