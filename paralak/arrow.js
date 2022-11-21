class Arrow {
    #startElement = null
    #endElement = null

    constructor (args) {
        this.startElement = args.start;
        this.ctx = args.ctx;
    }

    deleteSelf () {
        this.startElement = null;
        this.endElement = null;
    }

    set endElement (el) {
        if (this.#endElement)
            this.#endElement.unitedArrows = this.#endElement.unitedArrows.filter(e => e != this.#endElement)
        this.#endElement = el;
        if (el) el.unitedArrows.push(this);
    }
    get endElement () {
        return this.#endElement;
    }
    set startElement (el) {
        if (this.#startElement)
            this.#startElement.unitedArrows = this.#startElement.unitedArrows.filter(e => e != this.#startElement)
        this.#startElement = el;
        if (el) el.unitedArrows.push(this);
    }
    get startElement () {
        return this.#startElement;
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
