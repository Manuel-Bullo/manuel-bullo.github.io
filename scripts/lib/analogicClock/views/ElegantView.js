class ElegantView {
    #canvasCtx;
    #clockModel;

    constructor(canvasCtx, clockModel) {
        this.#canvasCtx = canvasCtx;
        this.#clockModel = clockModel;
    }

    #drawClockBackground() {
        let rgba = this.#clockModel.bgColor;
        this.#canvasCtx.fillStyle = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
        this.#canvasCtx.beginPath();
        this.#canvasCtx.arc(
            this.#clockModel.clockCenter.x,
            this.#clockModel.clockCenter.y,
            this.#clockModel.clockRadius,
            0, 2 * Math.PI
        );
        this.#canvasCtx.closePath();
        this.#canvasCtx.fill();
    }

    #drawHours() {
        let radius = this.#clockModel.clockRadius;
        let fontSize = this.#clockModel.fontSize;
        let rgba = this.#clockModel.fontColor;
        this.#canvasCtx.fillStyle = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
        this.#canvasCtx.font = `${fontSize}px Arial`;
        radius *= 83 / 100;
        
        for (let i = 1; i < 13; i++) {
            let textWidth = this.#canvasCtx.measureText(i).width;
            let textHeigth = fontSize * 0.72;
            this.#canvasCtx.fillText(
                i,
                this.#clockModel.clockCenter.x - textWidth / 2 + Math.cos(Math.PI / 2 - Math.PI * i / 6) * radius,
                this.#clockModel.clockCenter.y + textHeigth / 2 - Math.sin(Math.PI / 2 - Math.PI * i / 6) * radius
            );
        }
    }

    #drawAbstractLines() {
        let radius = this.#clockModel.clockRadius;
        let rgba = this.#clockModel.fontColor;
        let center = this.#clockModel.clockCenter;
        this.#canvasCtx.strokeStyle = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
        
        for (let i = 0; i < 12; i++) {
            let cos = Math.cos(Math.PI / 2 - Math.PI * i / 6);
            let sin = Math.sin(Math.PI / 2 - Math.PI * i / 6);
            this.#canvasCtx.lineWidth = radius * 0.02 * (i % 3 == 0 ? 2 : 1);
            this.#canvasCtx.beginPath();
            this.#canvasCtx.moveTo(center.x + cos * radius, center.y - sin * radius);
            this.#canvasCtx.lineTo(center.x + cos * radius * 0.8, center.y - sin * 0.8);
            this.#canvasCtx.stroke();
            this.#canvasCtx.closePath();
        }
    }

    #drawHoursLines() {
        let radius = this.#clockModel.clockRadius;
        let rgba = this.#clockModel.fontColor;
        let center = this.#clockModel.clockCenter;
        this.#canvasCtx.strokeStyle = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
        
        for (let i = 0; i < 60; i++) {
            let cos = Math.cos(Math.PI / 2 - Math.PI * i / 30);
            let sin = Math.sin(Math.PI / 2 - Math.PI * i / 30);
            this.#canvasCtx.lineWidth = radius * 0.01 * (i % 5 == 0 ? 1.3 : 1);
            this.#canvasCtx.beginPath();
            this.#canvasCtx.moveTo(center.x + cos * radius, center.y - sin * radius);
            this.#canvasCtx.lineTo(center.x + cos * radius * 0.95 * (i % 5 == 0 ? 0.98 : 1), center.y - sin * radius * 0.95 * (i % 5 == 0 ? 0.98 : 1));
            this.#canvasCtx.stroke();
            this.#canvasCtx.closePath();
        }
    }

    #drawClockHand(radians, lengthPercentage, lineWidth, rgba) {
        if (lengthPercentage <= 0)
            return;
        
        let radius = this.#clockModel.clockRadius;
        let cos = Math.cos(radians);
        let sin = Math.sin(radians);
        let center = {x: this.#clockModel.clockCenter.x, y: this.#clockModel.clockCenter.y};
    
        this.#canvasCtx.strokeStyle = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
        this.#canvasCtx.lineWidth = lineWidth;
        this.#canvasCtx.beginPath();
        this.#canvasCtx.moveTo(center.x, center.y);
        this.#canvasCtx.lineTo(center.x + cos * radius * lengthPercentage / 100, center.y - sin * radius * lengthPercentage / 100);
        this.#canvasCtx.stroke();
        this.#canvasCtx.closePath();
    }

    #drawClockCenter(clockCenterRadius, rgba) {
        this.#canvasCtx.fillStyle = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
        this.#canvasCtx.beginPath();
        this.#canvasCtx.arc(
            this.#clockModel.clockCenter.x,
            this.#clockModel.clockCenter.y,
            clockCenterRadius,
            0, 2 * Math.PI
        );
        this.#canvasCtx.closePath();
        this.#canvasCtx.fill();
    }

    drawClock() {
        this.#drawClockBackground();
        this.#drawHours();
        //this.#drawAbstractLines();
        this.#drawHoursLines();
        this.#drawClockHand(this.#clockModel.getRadiansSeconds(true), 75, this.#clockModel.clockRadius * 0.01, this.#clockModel.secondsClockHandColor);
        this.#drawClockHand(this.#clockModel.getRadiansMinutes(true), 60, this.#clockModel.clockRadius * 0.02, this.#clockModel.minutesClockHandColor);
        this.#drawClockHand(this.#clockModel.getRadiansHours(false), 45, this.#clockModel.clockRadius * 0.03, this.#clockModel.hoursClockHandColor);
        this.#drawClockCenter(this.#clockModel.clockRadius * 0.03, {r: 30, g: 30, b: 30, a: 1});
    }
}

export default ElegantView;