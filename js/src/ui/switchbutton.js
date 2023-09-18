class SwitchButton extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        scene.add.existing(this);

        this.textureName = texture
        this.isActive = false
        this.isClicked = false
        
        this.eventEmitter = new Phaser.Events.EventEmitter()

        this.setInteractive()
        this.on("pointerover", (pointer) => {
            this.scale = 1.05
        })
        this.on("pointerout", (pointer) => {
            this.scale = 1
        })
        this.on("pointerdown", (pointer) => {
            this.setFrame(1)
            this.isClicked = true
        })
        
        this.on("pointerup", (pointer) => {
            if (this.isClicked) 
            {
                this.switchState()
                this.eventEmitter.emit("activechange", this.isActive)
                this.isClicked = false
            }
        })

        scene.input.on("pointerup", (pointer) => {
            if (this.isClicked)
            {
                this.updateSprite()
                this.isClicked = false
            }
        })
    }

    switchState()
    {
        this.isActive = !this.isActive
        this.updateSprite()
    }

    updateSprite()
    {
        if (this.isActive) this.setFrame(1)
        else this.setFrame(0)
    }
}

class MultipleSwitchButton extends Phaser.GameObjects.Container 
{
    constructor(scene, x, y, buttonSize, isVertical, nameList, valueList) {
        super(scene, x, y, [])
        scene.add.existing(this);

        this.nameList = nameList
        this.valueList = valueList
        this.buttonsList = []
        this.buttonSize = buttonSize
        this.isVertical = isVertical || false
        this.currentActive = 0
        
        this.eventEmitter = new Phaser.Events.EventEmitter()

        let incX = this.isVertical ? 0 : buttonSize
        let incY = this.isVertical ? buttonSize : 0

        for (let i = 0; i < this.nameList.length; i++)
        {
            let name = this.nameList[i]
            let button = scene.add.sprite(i * incX + buttonSize/2, i * incY + buttonSize/2, name)
            
            button.index = i
            button.isActive = false
            button.isClicked = false


            button.updateSprite = () => {
                if (button.isActive) button.setFrame(1)
                else button.setFrame(0)
            }
            button.switchState = () => {
                button.isActive = !button.isActive
                button.updateSprite()
            }
            
            button.setInteractive()
            button.on("pointerover", (pointer) => {
                if (!button.isActive) button.scale = 1.05
            })
            button.on("pointerout", (pointer) => {
                button.scale = 1
            })
            button.on("pointerdown", (pointer) => {
                button.setFrame(1)
                button.isClicked = true
            })

            button.on("pointerup", (pointer) => {
                if (button.isClicked) 
                {
                    button.switchState()
                    this.setActive(i)
                    button.isClicked = false
                }
            })
    
            scene.input.on("pointerup", (pointer) => {
                if (button.isClicked)
                {
                    button.updateSprite()
                    button.isClicked = false
                }
            })

            this.buttonsList.push(button)
            this.add(button)
        }

        this.setActive(0)
    }

    setActive(index)
    {
        for (let i = 0; i < this.nameList.length; i++)
        {
            let button = this.buttonsList[i]

            let newValue = i == index
            button.isActive = newValue
            button.updateSprite()
        }

        this.currentActive = index
        this.eventEmitter.emit("activechange", index)
    }

}