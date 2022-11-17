class Field {
    pxH = 20
    pxW = 20
    markupStyle = "rgba(50,50,50,0.1)"
    #leftX = 0
    #topY = 0

    constructor (canvasDOM, ws) {
        this.ws = ws;
        this.DOM = canvasDOM;
        this.DOM.width = 800;//DNF
        this.DOM.height = 600;//DNF
        this.ctx = this.DOM.getContext('2d');
        this.DOM.addEventListener('drop', (event) => this.onDrop(event));
        this.DOM.addEventListener('dragover', (event) => this.onDragOver(event));
        this.blocks = [];
        this.middleCords = {x:0,y:0};
        this.DOM.addEventListener('mousedown', (e)=>this.onMouseDown(e));
        this.DOM.addEventListener('mouseup', (e)=>this.onMouseUp(e));
        this.DOM.addEventListener('mousemove', (e)=>this.onMouseMove(e));
    }

    onMouseDown (event) {
        console.log(this.toPixelCords(event));
        if (event.ctrlKey && event.button == 0)
            return this.ws.dND = {
                x:event.x,
                y:event.y,
                c:this.middleCords
            };
        let t;
        if (event.button == 0 && (t = this.checkSelectionBoxes(event)))
            this.ws.dNDBlock = {
                block:t,
                x:event.x,
                y:event.y,
                c:this.toGivenCords(t)
            };
    }

    onMouseUp (event) {
        this.ws.dND = null;
        this.ws.dNDBlock = null;
    }

    onMouseMove (event) {
        let t = this.ws.dND;
        if (t)
            this.middleCords = {
                x:t.c.x + t.x - event.x,
                y:t.c.y + t.y - event.y
            }
        t = this.ws.dNDBlock;
        if (t) {
            t.block.pixelCords = this.toPixelCords({
                x:t.c.x - t.x + event.x,
                y:t.c.y - t.y + event.y
            });
            this.update();
        }
    }


    onDragOver (event) {
        event.preventDefault();
    }

    onDrop (event) {
        this.placeBlockNotGivenCords(this.ws.grabedBlock, {x:event.x, y:event.y})
    }

    checkSelectionBoxes (cords) {
        let pCords = this.toPixelCords(cords);
        let selected = null;
        this.blocks.forEach((item, i) => {
            if (item.checkSelectionBox(pCords))
                selected = item;
        });
        return selected;
    }

    toPixelCords (cords) {
        return {
            x:((cords.x + this.startX) -(((cords.x+this.startX) % this.pxW) + this.pxW) % this.pxW) / this.pxW,
            y:((cords.y + this.startY) -(((cords.y+this.startY) % this.pxH) + this.pxH) % this.pxH) / this.pxH
        };
    }

    toGivenCords (pCords) {
        return {
            y:pCords.y * this.pxH - this.startY,
            x:pCords.x * this.pxW - this.startX
        }
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
        for (let i = 0; i<=this.width/this.pxW; ++i)
            this.ctx.fillRect(i*this.pxW-1 - this.startX%this.pxW, 0, 2, this.height);
        for (let i = 0; i<=this.height/this.pxH; ++i)
            this.ctx.fillRect(0, i*this.pxH-1 - this.startY%this.pxH, this.width, 2);
    }

    scaleTo (pxW, pxH = null) {
        pxH = pxH && pxW;
        this.pxH = pxH;
        this.pxW = pxW;
        this.update();
    }

    update () {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drowMarkup();
        this.blocks.forEach((item, i) => {
            item.block.drowInCanvas(this, item);
        });
    }

    get startY () {return this.#topY}
    get startX () {return this.#leftX}
    set middleCords (cords) {
        this.#leftX = parseInt(cords.x - this.width / 2);
        this.#topY = parseInt(cords.y - this.height / 2);
        this.update()
    }
    get middleCords () {return {
        x:this.#leftX + this.width / 2,
        y:this.#topY + this.height / 2
    }}
    get height () {return this.DOM.height;}
    get width () {return this.DOM.width;}
}
