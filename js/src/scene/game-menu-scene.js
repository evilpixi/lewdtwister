class GameMenuScene extends Phaser.Scene 
{
    constructor() 
    {
        super("GameMenuScene")
    }

    create() 
    {
        this.cameras.main.setBackgroundColor('#eeeeee');
        this.playerAmount = g.players.elements.length
        this.playerCardList = []

        this.playButton = new Button(this, g.width, g.height/2, "button-play", ()=> {
            this.scene.start("GameplayScene")
        }).setOrigin(1, 0.5)

        this.add.text(g.width/2, 6, "CHARACTER CREATION", {
            fontSize: 20,
            resolution: 8,
            fontFamily: "arial",
            color: "#000000",
            stroke: "#000000",
            strokeThickness: 2
        }).setOrigin(0.5, 0)
        
        this.grid = new Grid(this, 8, 36, {
            width: 412,
            height: 240-12,
            columns: 3,
            rows: 2,
            padding: 1
        })

        this.addButton = new Button(this, 0, 0, "button-add", ()=> {this.addPlayer()})
        this.grid.placeObjectAtIndex(this.addButton, this.playerAmount)
        this.updateCharacterList()
    }

    updateCharacterList()
    {
        // clean old list
        for (let oldChar of this.playerCardList)
        {
            oldChar.destroy()
        }
        this.playerCardList = []

        // create new elements
        for (let i = 0; i < g.players.elements.length; i++)
        {
            let newPlayerCard = new CharacterCard(this, 0, 0, 
                this.grid.cellWidth, 
                this.grid.cellHeight,
                g.players.elements[i])

            this.grid.placeObjectAtIndex(newPlayerCard, i)
            this.playerCardList.push(newPlayerCard)
        }

        this.updateUIElements()
    }

    addPlayer()
    {
        g.game.scene.start("PlayerCreationScene", this)
        this.scene.pause()
    }

    updateUIElements() 
    {
        let maxPlayersAmount = this.grid.rows * this.grid.cols
        if (this.playerAmount >= maxPlayersAmount)
        {
            this.addButton.setVisible(false)
        }
        else
        {
            this.grid.placeObjectAtIndex(this.addButton, this.playerAmount)
            this.addButton.setVisible(true)
        }

        this.playButton.setVisible(this.playerAmount > 0)
    }
}
