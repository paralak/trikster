class FieldsPanel {
    constructor(args) {
        this.ws = args.ws;
        this.DOM = args.DOM;
        this.DOM.classList.add("fields-panel");
        this.opened = [];

        args.opened.forEach((item) => {
            let el = document.createElement("li");
            this.opened.push(new FieldsPanelItem({
                DOM: el,
                field: item,
                panel: this
            }));
            this.DOM.appendChild(el);
        });

        //this.opened[0].display();
    }


}