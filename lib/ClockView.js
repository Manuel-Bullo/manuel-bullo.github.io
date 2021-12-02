class ClockView {
    _canvasCtx;
    _clockModel;

    constructor(canvasCtx, clockModel) {
        this._canvasCtx = canvasCtx;
        this._clockModel = clockModel;
    }

    initialize(canvasCtx, clockModel) {
        this._canvasCtx = canvasCtx;
        this._clockModel = clockModel;
    }
}

export default ClockView;