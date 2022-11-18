class Block {
    constructor (args) {
        this.img = args.imgURL;
        this.imgHTML = new Image();
        this.imgHTML.src = args.imgURL;
        this.name = args.name;
    }

    onDragStart (event) {
        //event.preventDefault();
        this.ws.grabedBlock = this;
    }

    onDragEnd (event) {
        if (this.ws.grabedBlock == this) this.ws.grabedBlock = null;
    }

    drowInCanvas (field, args) {
        let gCords = field.toGivenCords(args);
        field.ctx.drawImage(
            this.imgHTML,
            gCords.x,
            gCords.y,
            field.pxW * 2,
            field.pxH * 2,
        );
        if (args.selected) {
            field.ctx.strokeStyle = "rgba(255, 10, 10, 1)";
            field.ctx.strokeRect(
                gCords.x-2,
                gCords.y-2,
                field.pxW * 2+4,
                field.pxH * 2+4,
            )

        }
    }

    initDOM (parentDOM, tag, ws) {
        this.ws = ws;
        this.DOM = document.createElement(tag);
        this.DOM.innerSpan = document.createElement("span");
        this.DOM.innerSpan.innerText = this.name;
        this.DOM.innerImg = document.createElement("img");
        this.DOM.innerImg.src = this.img;
        this.DOM.draggable = 'true';
        parentDOM.appendChild(this.DOM);
        this.DOM.appendChild(this.DOM.innerSpan);
        this.DOM.appendChild(this.DOM.innerImg);
        this.DOM.addEventListener('dragstart', (event) => this.onDragStart(event));
        this.DOM.addEventListener('dragend', (event) => this.onDragEnd(event));
    }
}
