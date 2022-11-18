class Workspace {
    grabedBlock = null
    dND = null
    dNDBlock = null

    constructor (objInDOM) {
        this.DOM = objInDOM;
        this.field = new Field({
            DOM:document.createElement('canvas'),
            ws:this,
            w:window.innerWidth,
            h:window.innerHeight,
        });
        this.DOM.appendChild(this.field.DOM);
        this.palette = new Palette(document.createElement('ul'), this);
        this.DOM.appendChild(this.palette.DOM);
    }
}
