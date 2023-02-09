class FieldsPanelItem {
    constructor(args) {
        this.DOM = args.DOM;
        this.field = args.field
        this.DOM.innerText = this.field.name;
    }
}
