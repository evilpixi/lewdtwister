class Button extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, callback, customScale)
    {
        super(scene, x, y, texture)
        scene.add.existing(this)

        this.isClicked = false

        this.customScale = customScale || 1
        this.scale = this.customScale

        this.setInteractive()
        this.on("pointerover", (pointer) => {
            this.scale = this.customScale * 1.05
        })
        this.on("pointerout", (pointer) => {
            this.scale = this.customScale

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