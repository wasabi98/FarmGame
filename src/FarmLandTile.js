import  BaseTile  from "./BaseTile.js";

export default class FarmLandTile extends BaseTile
{
    constructor(x, y)
    {
        super(x, y);
        this.crop = null;
        this.isBarren = true
    }
    setCrop(crop)
    {
        if(this.isBarren)
            return false;

        this.crop = crop;
        return true;            
    }
    deleteCrop()
    {
        if(!this.isBarren)
            return false;

        this.crop = null;
        return true;
    }
}