class Palette {
    constructor (objInDOM, ws) {
        this.ws = ws;
        this.DOM = objInDOM;
        this.DOM.classList.add('palette');
        this.initBlocks();
    }

    initBlocks () {
        if (!Palette.blocks) throw "пустой список блоков";//в будущем тут будет запрос на список блоков
        Palette.blocks.forEach((item, i) => {
            item.initDOM(this.DOM, 'li', this.ws);
        });
    }
}
