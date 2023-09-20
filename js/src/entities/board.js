class Board extends Phaser.GameObjects.Container
{
    constructor(scene, x, y)
    {
        super(scene, x, y)
        scene.add.existing(this)

        
        this.posibilities = []
        this.nextPosibility = 0
        this.colorCircles = []
        this.radius = 240
        this.circlesRadius = 45
        this.currentInc = 0

        let totalCirclesAmount = 16
        this.angInc = (2 * Math.PI) / totalCirclesAmount
        this.currentIndex = 0
        this.maxIndex = totalCirclesAmount / 4 +1

        this.circleBorderOut = scene.add.circle(0, 0, this.radius + this.circlesRadius + 6, 0xaaaaaa)
        this.circleInnerOut = scene.add.circle(0, 0, this.radius + this.circlesRadius + 3, 0xeeeeee)

        this.circleBorderIn = scene.add.circle(0, 0, this.radius - this.circlesRadius - 3, 0xaaaaaa)
        this.circleInnerIn = scene.add.circle(0, 0, this.radius - this.circlesRadius - 6, 0xeeeeee)

        this.arrow = scene.add.image(0, 0, "arrow")
        this.arrow.setOrigin(0.5, 65/70)
        this.arrow.setScale(3.5)
        this.arrow.angle = 325
        this.angle = -10

        this.add(this.circleBorderOut)
        this.add(this.circleInnerOut)
        this.add(this.circleBorderIn)
        this.add(this.circleInnerIn)
        this.add(this.arrow)
    }

    updatePosibilities(posibilities)
    {
        for (let circle of this.colorCircles)
        {
            circle?.destroy()
        }
        this.colorCircles = []

        this.posibilities = posibilities
        console.log(this.posibilities)
        this.nextPosibility = 0
        this.addCirclesAround(16, this.radius)
    }
    
    addCirclesAround(amount) 
    {
        let angInc = (2 * Math.PI) / amount
        this.angInc = angInc
        this.circleAmount = amount

        let posibs = this.posibilities.length
        if (posibs <= amount)
        {
            for (let i = 0; i < posibs; i++)
            {
                this.posibilities.push(this.posibilities[i])
            }
        }

        for (let i = 0; i < amount/4 + 1; i++)
        {
            let newCircle = new GameCircle(this.scene, this.circlesRadius)

            this.colorCircles.push(newCircle)
            this.add(newCircle)

            newCircle.setData(this.posibilities[this.nextPosibility])
            this.nextPosibility++
        }
        
        this.bringToTop(this.arrow)
        this.updateCircles(0)
    }

    getCirclesSubArray(start, subArrayLength)
    {
        let newArray = []

        for (let i = start; i < subArrayLength; i++)
        {
            let index = i % this.posibilities.length
            newArray.push(this.posibilities[index])
        }
        return newArray
    }

    updateCircles(inc)
    {
        for (let [i, circle] of this.colorCircles.entries())
        {
            circle.currentInc = this.getIndexRotation(i) + inc

            let extraInc = +Math.PI * (1 / 8)
            if (circle.currentInc > (Math.PI * 0.5 + extraInc) * (circle.currentQuarter + 1))
            {
                circle.currentQuarter++
                this.updateCurrentPossibility(circle)
            }

            circle.updateRotation(extraInc)

            let pos = this.getPos(circle.currentInc - ((Math.PI * 0.5 + extraInc) * circle.currentQuarter))
            circle.x = pos.x
            circle.y = pos.y
        }
        
    }

    updateCurrentPossibility(circle)
    {
        circle.setData(this.posibilities[this.nextPosibility])

        this.nextPosibility++
        if (this.nextPosibility >= this.posibilities.length)
        {
            this.nextPosibility = 0
        }
    }

    getPos(rotation)
    {
        let pos = {
            x: -(Math.cos(rotation) * this.radius),
            y: -(Math.sin(rotation) * this.radius)
        }
        return pos
    }

    getIndexRotation(index)
    {
        let rot = this.angInc * index
        return rot
    }

    update(t, d, speed)
    {
        this.currentInc += d * speed
        this.updateCircles(this.currentInc)
    }
}