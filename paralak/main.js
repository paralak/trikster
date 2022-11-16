let el = null;
window.addEventListener('load', ()=>{
    Palette.blocks = [
        new Block('paralak/sources/block-1.png'),
        new Block('paralak/sources/block-2.png'),
    ];

    el = new Workspace(document.getElementById('ws'));




    console.log(el);
});
