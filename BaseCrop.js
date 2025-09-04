export default class BaseCrop
{
    constructor(farmLand, growthTime)
    {
        this.status = 'growing';
        this.farmLand = farmLand;
        //seconds hopefully
        this.growthTime = growthTime;
        this.growthTimeLeft = growthTime;
    }
    async update(deltaTime)
    {
        this.growthTimeLeft = Math.max(this.growthTimeLeft-deltaTime, 0);
        if(this.growthTimeLeft <= 0 && this.status == 'growing')
        {
            this.status = 'ripe';
        }
        
    }
}