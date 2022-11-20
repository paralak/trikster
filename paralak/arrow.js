class Arrow {
    startElement = null
    endElement = null

    constructor (args) {
        this.startElement = args.start;
        this.ctx = args.ctx;
    }

    drow (field) {
        if (this.endElement) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = "rgb(0, 0, 0)";
            this.ctx.moveTo(
                (this.startElement.x + 1)*field.pxW - field.startX,
                (this.startElement.y + 1)*field.pxH - field.startY
            );
            this.ctx.lineTo(
                (this.endElement.x + 1)*field.pxW - field.startX,
                (this.endElement.y + 1)*field.pxH - field.startY
            );
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }
}
