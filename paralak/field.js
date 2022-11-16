class Field {
    pxH = 20
    pxW = 20
    markupStyle = "rgba(50,50,50,0.2)"

    constructor (canvasDOM, ws) {
        this.ws = ws;
        this.DOM = canvasDOM;
        this.DOM.width = 800;
        this.DOM.height = 600;
        this.ctx = this.DOM.getContext('2d');
        this.DOM.addEventListener('drop', (event) => this.onDrop(event));
        this.DOM.addEventListener('dragover', (event) => this.onDragOver(event));
        this.blocks = [];
        this.update();
    }

    onDragOver (event) {
        event.preventDefault();
    }

    onDrop (event) {
        this.placeBlockNotGivenCords(this.ws.grabedBlock, {x:event.x, y:event.y})
        console.log(this.blocks);
        console.log(event)
    }

    toPixelCords (cords) {
        return {
            x:(cords.x - cords.x % this.pxW) / this.pxW,
            y:(cords.y - cords.y % this.pxH) / this.pxH
        };
    }

    placeBlockNotGivenCords (block, cords) {
        let pCords = this.toPixelCords(cords);
        this.placeBlock(block, pCords)
    }

    placeBlock (block, cords) {
        this.blocks.push(new BlockOnField({
            block: block,
            x: cords.x,
            y: cords.y
        }));
        this.update();
    }

    drowMarkup () {
        this.ctx.fillStyle = this.markupStyle;
        for (let i = 0; i<=this.width/this.pxW; ++i) this.ctx.fillRect(i*this.pxW-1, 0, 2, this.height);
        for (let i = 0; i<=this.height/this.pxH; ++i) this.ctx.fillRect(0, i*this.pxH-1, this.width, 2);
    }

    update () {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drowMarkup();
        this.blocks.forEach((item, i) => {
            item.block.drowInCanvas(this, item);
        });
    }



    get height () {return this.DOM.height;}
    get width () {return this.DOM.width;}
}
