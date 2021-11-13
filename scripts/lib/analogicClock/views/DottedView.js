class DottedView {
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
        radius *= 88 / 100;
        
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

    #drawClockHand(radians, segmentCount, rgba) {
        if (segmentCount <= 0)
            return;
        
        let radius = this.#clockModel.clockRadius;
        let cos = Math.cos(radians);
        let sin = Math.sin(radians);
        let center = {x: this.#clockModel.clockCenter.x, y: this.#clockModel.clockCenter.y};
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
            this.#canvasCtx.fillStyle = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
            this.#canvasCtx.beginPath();
            this.#canvasCtx.arc(
                segments[i][0],
                segments[i][1],
                radius / 40,
                0, 2 * Math.PI
            );
            this.#canvasCtx.closePath();
            this.#canvasCtx.fill();
        }
    }

    drawClock() {
        this.#drawClockBackground();
        this.#drawHours();
        this.#drawClockHand(this.#clockModel.getRadiansSeconds(true), 6, this.#clockModel.secondsClockHandColor);
        this.#drawClockHand(this.#clockModel.getRadiansMinutes(true), 5, this.#clockModel.minutesClockHandColor);
        this.#drawClockHand(this.#clockModel.getRadiansHours(false), 4, this.#clockModel.hoursClockHandColor);
    }
}

export default DottedView;