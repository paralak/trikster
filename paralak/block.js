class Block {
    constructor (imgURL) {
        this.img = imgURL;
        this.imgHTML = new Image();
        this.imgHTML.src = imgURL;
    }

    onDragStart (event) {
        this.ws.grabedBlock = this;
    }

    onDragEnd (event) {
        if (this.ws.grabedBlock == this) this.ws.grabedBlock = null;
    }

    drowInCanvas (field, args) {
        field.ctx.drawImage(
            this.imgHTML,
            args.x * field.pxW + field.startX,
            args.y * field.pxH + field.startY,
            field.pxW * 2,
            field.pxH * 2,
        );
    }

    initDOM (parentDOM, tag, ws) {
        this.ws = ws;
        this.DOM = document.createElement(tag);
        this.DOM.style.setProperty('--imgsrc', 'url(' + this.img + ')');
        this.DOM.draggable = 'true';
        parentDOM.appendChild(this.DOM);
        this.DOM.addEventListener('dragstart', (event) => this.onDragStart(event));
        this.DOM.addEventListener('dragend', (event) => this.onDragEnd(event));
    }
}
