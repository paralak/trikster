let el = null;
window.addEventListener('load', ()=>{
    Palette.blocks = [
        new Block({
            name:'start',
            imgURL:'paralak/sources/block-1.png',
        }),
        new Block({
            imgURL:'paralak/sources/block-2.png',
            name:'end',
        }),
        new Block({
            imgURL:'paralak/sources/block-3.png',
            name:'block-3',
        }),
        new Block({
            imgURL:'paralak/sources/block-4.png',
            name:'block-4',
        }),
    ];

    el = new Workspace(document.getElementById('ws'));




});
