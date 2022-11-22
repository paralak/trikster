class Arrow {
    #startElement = null
    #endElement = null
    lineStyle = "rgba(0,0,200,0.6)"

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
            let stGCords = field.toGivenCords(this.startElement.mCords);
            let endGCords = field.toGivenCords(this.endElement.mCords);
            this.ctx.beginPath();
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = this.lineStyle;
            this.ctx.moveTo(
                stGCords.x,
                stGCords.y
            );
            this.ctx.lineTo(
                endGCords.x,
                endGCords.y
            );
            let angle = Math.atan((stGCords.y - endGCords.y)/(stGCords.x - endGCords.x));
            if ((stGCords.x - endGCords.x)<0) angle += Math.PI;
            let angle1 = angle + Math.PI/12;
            let angle2 = angle - Math.PI/12;
            this.ctx.moveTo(
                stGCords.x/2 + endGCords.x/2 - (Math.cos(angle) * field.pxW * .4),
                stGCords.y/2 + endGCords.y/2 - (Math.sin(angle) * field.pxW * .4)
            );
            this.ctx.lineTo(
                stGCords.x/2 + endGCords.x/2 - (Math.cos(angle) * field.pxW * .4) + (Math.cos(angle1) * field.pxW * .8),
                stGCords.y/2 + endGCords.y/2 - (Math.sin(angle) * field.pxW * .4) + (Math.sin(angle1) * field.pxW * .8)
            );
            this.ctx.moveTo(
                stGCords.x/2 + endGCords.x/2 - (Math.cos(angle) * field.pxW * .4),
                stGCords.y/2 + endGCords.y/2 - (Math.sin(angle) * field.pxW * .4)
            );
            this.ctx.lineTo(
                stGCords.x/2 + endGCords.x/2 - (Math.cos(angle) * field.pxW * .4) + (Math.cos(angle2) * field.pxW * .8),
                stGCords.y/2 + endGCords.y/2 - (Math.sin(angle) * field.pxW * .4) + (Math.sin(angle2) * field.pxW * .8)
            );
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }
}
