class Workspace {
    grabedBlock = null
    DOM = null
    dND = null

    constructor (objInDOM) {
        this.DOM = objInDOM;
        this.field = new Field(document.createElement('canvas'), this);
        this.DOM.appendChild(this.field.DOM);
        this.palette = new Palette(document.createElement('ul'), this);
        this.DOM.appendChild(this.palette.DOM);
    }
}
