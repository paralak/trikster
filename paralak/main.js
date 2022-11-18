let el = null;
window.addEventListener('load', ()=>{
    Palette.blocks = [
        new Block({
            name:'start',
            imgURL:'paralak/sources/block-1.png',
        }),
        new Block({
            imgURL:'paralak/sources/block-2.png',
            name:'stop',
        }),
    ];

    el = new Workspace(document.getElementById('ws'));




});
