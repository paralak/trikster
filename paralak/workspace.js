class Workspace {
    grabedBlock = null
    dND = null
    dNDBlock = null
    createdArrow = null

    constructor (objInDOM) {
        this.DOM = objInDOM;
        this.programmField = new Field({
            DOM:document.createElement('canvas'),
            ws: this,
            w: window.innerWidth,
            h: window.innerHeight,
            name: "main",
        });
        this.launchField = new Field({
            DOM: document.createElement('canvas'),
            ws: this,
            w: window.innerWidth,
            h: window.innerHeight,
            name: "exect",
        });
        this.DOM.appendChild(this.programmField.DOM);
        this.DOM.appendChild(this.launchField.DOM);

        this.palette = new Palette(document.createElement('ul'), this);
        this.DOM.appendChild(this.palette.DOM);

        this.fieldsPanel = new FieldsPanel({
            ws:this,
            opened:[this.programmField, this.launchField], //должен открывать последние открытые поля, пока открывает два заданных
            DOM:document.createElement("ul")
        });
        this.DOM.appendChild(this.fieldsPanel.DOM);
    }
}
