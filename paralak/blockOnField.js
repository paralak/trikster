class BlockOnField {
    constructor(args) {
        this.block = args.block;
        this.x = args.x;
        this.y = args.y;
    }

    checkSelectionBox (cords) {
        return ((cords.x==this.x)||(cords.x==this.x+1))
            && ((cords.y==this.y)||(cords.y==this.y+1))
    }

    set pixelCords (pCords) {
        this.x = pCords.x;
        this.y = pCords.y;
    }
}
