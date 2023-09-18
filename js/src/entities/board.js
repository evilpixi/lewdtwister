class Arrow extends Phaser.GameObjects.Image {
    constructor(scene, x, y)
    {
        super(scene, x, y, "arrow")
        scene.add.existing(this)

       this.setOrigin(0.5, 65/70)
    }
}