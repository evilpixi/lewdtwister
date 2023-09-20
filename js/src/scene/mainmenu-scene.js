class MainMenuScene extends Phaser.Scene 
{
    constructor() 
    {
        super("MainMenuScene")
    }

    create() 
    {
        this.add.image(g.width/2, g.height/2, "cover")

        this.input.on("pointerdown", ()=> {
            this.scene.start("GameMenuScene")
        })
    }
}