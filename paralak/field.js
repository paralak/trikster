class Field {
    pxH = 20
    pxW = 20
    markupStyle = "rgba(40,40,40,0.1)"
    #leftX = 0
    #topY = 0

    constructor (args) {
        this.ws = args.ws;
        this.DOM = args.DOM;
        this.DOM.width = args.w;
        this.DOM.height = args.h;
        this.ctx = this.DOM.getContext('2d');
        this.DOM.addEventListener('drop', (event) => this.onDrop(event));
        this.DOM.addEventListener('dragover', (event) => this.onDragOver(event));
        this.blocks = [];
        this.arrows = [];
        this.middleCords = {x:0,y:0};
        this.DOM.addEventListener('mousedown', (e)=>this.onMouseDown(e));
        this.DOM.addEventListener('mouseup', (e)=>this.onMouseUp(e));
        this.DOM.addEventListener('mousemove', (e)=>this.onMouseMove(e));
        this.DOM.addEventListener('contextmenu', (e)=>{e.preventDefault()});
        this.DOM.addEventListener('wheel', (e)=>this.onWheel(e), {passive: false});
        window.addEventListener('keyup', (e)=>this.onKeyRelease(e));
    }

    onKeyRelease (event) {
        if (event.key == "Delete") this.onKeyDelete(event);
    }

    onKeyDelete (event) {
        this.deleteItems(this.selected);
        this.selected = [];
    }

    deleteItems (items) {
        this.blocks = this.blocks.filter(i => !items.includes(i));
        this.update();
    }

    onWheel (event) {

        if (event.altKey && event.wheelDelta > 0) {
            event.preventDefault();
            this.scaleTo(this.pxW + 1);
        }
        if (event.altKey && event.wheelDelta < 0) {
            event.preventDefault();
            this.scaleTo(this.pxW - 1);
        }
    }

    onMouseDown (event) {
        if (event.altKey && event.button == 0)
            return this.ws.dND = {
                x:event.x,
                y:event.y,
                c:this.middleCords
            };
        let t = this.checkSelectionBoxes(event);
        if (event.button == 0 && !this.selected.includes(t))
            this.changeSelected([t], event.ctrlKey);
        if (event.button == 0 && t) {
            this.ws.dNDBlock = {
                blocks:this.selected,
                x:event.x,
                y:event.y,
            };
            this.ws.dNDBlock.blocks.forEach((item, i) => {
                item.savePos();
            });
        }
        console.log(event);
        if (event.button == 2 && t)
            this.arrows.push(this.ws.createdArrow = new Arrow({start: t, ctx:this.ctx}));
        }

    onMouseUp (event) {
        if (this.ws.createdArrow)
            this.update(this.ws.createdArrow.endElement = this.checkSelectionBoxes(event));
        this.ws.createdArrow = null;
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
            t.blocks.forEach((item, i) => {
                let gCords = this.toGivenCords({
                    x:item.savedX + 1/2,
                    y:item.savedY + 1/2
                })
                item.pixelCords = this.toPixelCords({
                    x:gCords.x - t.x + event.x,
                    y:gCords.y - t.y + event.y
                });
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
        let lastItem = null;
        this.blocks.forEach((item, i) => {
            if (item.checkSelectionBox(pCords))
                lastItem = item;
        });
        return lastItem;
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
        this.pxH = (pxH || pxW);
        this.pxW = pxW;
        this.update();
    }

    update () {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drowMarkup();
        this.arrows.forEach((item, i) => {
            item.drow(this);
        });
        this.blocks.forEach((item, i) => {
            if (!item.selected) item.block.drowInCanvas(this, item);
        });
        this.blocks.forEach((item, i) => {
            if (item.selected) item.block.drowInCanvas(this, item);
        });
    }

    changeSelected (newSelects, ctrl = false) {
        let allSelects = []
        if (ctrl)
            allSelects = allSelects.concat(this.selected);
        allSelects = allSelects.concat(newSelects);
        this.selected = allSelects;
        this.update();
    }

    get selected () {
        let els = [];
        this.blocks.forEach((item, i) => {
            if (item.selected)
                els.push(item);
        });
        return els;
    }

    set selected (newSelects) {
        this.blocks.forEach((item, i) => {
            item.selected = newSelects.includes(item);
        });
    }

    get startY () {return this.#topY}
    get startX () {return this.#leftX}
    set middleCords (cords) {
        this.#leftX = parseInt(cords.x - this.width / 2);
        this.#topY = parseInt(cords.y - this.height / 2);
        this.update()
    }
    get middleCords () {
        return {
            x:this.#leftX + this.width / 2,
            y:this.#topY + this.height / 2
    }}
    get height () {return this.DOM.height;}
    get width () {return this.DOM.width;}
}
