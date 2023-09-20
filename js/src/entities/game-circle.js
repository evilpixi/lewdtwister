class GameCircle extends Phaser.GameObjects.Container
{
    constructor(scene, innerCircleRadius, color)
    {
        super(scene, 0, 0, [])
        scene.add.existing(this)

        this.innerCircle = scene.add.circle(0, 0, innerCircleRadius, 0xffffff)
        this.currentRotation = 0
        this.currentQuarter = 0

        this.text = scene.add.text(0, 0, "name", {
            fontSize: 16,
            resolution: 16,
            strokeThickness: 4,
            stroke: "#000000",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5, 0.5)

        
        this.add(this.innerCircle)
        this.add(this.text)
    }

    setData(posibility)
    {
        this.innerCircle.setFillStyle(posibility.player.color, 1)
        this.text.setText((posibility.part + " to\n" + posibility.name).toUpperCase())
    }

    updateRotation(extraInc)
    {
        this.rotation = this.currentInc - (Math.PI * 0.5 + extraInc) * this.currentQuarter - Math.PI * 0.5
    }
}