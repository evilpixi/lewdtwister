class ColorButton extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, color, callback, config)
    {
        super(scene, x, y, "colorbutton")
        scene.add.existing(this)

        this.creationScale = config?.scale || 1
        this.scale = this.creationScale

        this.isClicked = false

        this.setTint(ColorUtil.parseHex(color))

        this.setInteractive()
        this.on("pointerover", (pointer) => {
            this.scale = this.creationScale * 1.1
        })
        this.on("pointerout", (pointer) => {
            this.scale = this.creationScale

            if (this.isClicked)
            {

            }
        })
        this.on("pointerdown", (pointer) => {
            this.setFrame(1)
            this.isClicked = true
        })
        
        this.on("pointerup", (pointer) => {
            if (this.isClicked) 
            {
                this.setFrame(0)
                this.isClicked = false
                
                callback()
            }
        })

        scene.input.on("pointerup", (pointer) => {
            if (this.isClicked)
            {
                this.setFrame(0)
                this.isClicked = false
            }
        })
    }
}