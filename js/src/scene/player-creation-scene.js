class PlayerCreationScene extends Phaser.Scene 
{
    constructor() 
    {
        super("PlayerCreationScene")
    }

    create(prevScene) 
    {
        this.colorButtons = []
        this.animTime = 500

        this.bg = this.add.rectangle(g.width/2, g.height/2, g.width, g.height, 0x000000, 0.9)
        this.bg.alpha = 0

        this.panel = this.add.container(0, -g.height, [])
        this.panel.alpha = 0

        
        // ----------------- panel -------------------
        this.rect = this.add.rectangle(g.width/2, g.height/2, g.width - 48, g.height - 48, 0xeeeeee, 1)

        this.closeButton = new Button(this, g.width - 22, 22, "button-close", ()=> {
            this.animateOut(()=> {
                this.scene.stop()
                prevScene.scene.resume()
            })
        })
        this.closeButton.setTint(0xe31021)

        this.acceptButton = new Button(this, g.width - 48, g.height - 70, "button-ok", () => {
            this.animateOut(()=> {
                g.players.add(this.charConfig)

                prevScene.playerAmount++
                prevScene.scene.resume()
                prevScene.updateCharacterList()

                this.scene.stop()
            })
        }, 2)
        this.acceptButton.setTint(0x40ff30)

        this.panel.add(this.rect)
        this.panel.add(this.closeButton)
        this.panel.add(this.acceptButton)



        // ---------- player -----------
        this.currentHair = 0

        this.hairdo = this.add.sprite(272, 80, "hair")

        this.char = new Character(this, 96, 88, {})
        this.char.setScale(2)
        this.charConfig = this.char.getConfig()

        //console.log(this)

        let hairdoAmount = this.textures.get("hair").frameTotal - 1
        this.prevHairButton = new Button(this, 224, 80, "button-left", () => {
            this.currentHair--
            console.log(this.currentHair)
            if (this.currentHair < 0) this.currentHair = hairdoAmount - 1
            console.log(this.currentHair)
            this.charConfig.hairstyle = this.currentHair
            this.char.setConfig(this.charConfig)
            this.char.updateSprites()
            this.hairdo.setFrame(this.currentHair)
        })
        this.nextHairButton = new Button(this, 320, 80, "button-right", () => {
            this.currentHair++
            console.log(this.currentHair)
            if (this.currentHair == hairdoAmount) this.currentHair = 0
            console.log(this.currentHair)
            this.charConfig.hairstyle = this.currentHair
            this.char.setConfig(this.charConfig)
            this.char.updateSprites()
            this.hairdo.setFrame(this.currentHair)
        })
        this.panel.add(this.prevHairButton)
        this.panel.add(this.nextHairButton)
        this.panel.add(this.char)
        this.panel.add(this.hairdo)

        
        // ----------------- player name -------------------
        this.textFieldBorder = this.add.rectangle(31, 168, 130, 30, 0x999999).setOrigin(0, 0.5)
        this.textField = this.add.rectangle(33, 168, 130 - 4, 26, 0xffffff).setOrigin(0, 0.5)
        this.textField.setInteractive()
        this.textField.on("pointerdown", ()=> {
            this.editText()
        })

        this.playerName = this.add.text(33, 168, "< click to rename! >", {
            fontFamily: "ps2p",
            fontSize: "12px",
            color: "#000000",
            resolution: 10
        }).setOrigin(0, 0.5).setScale(0.5, 1)
        
        this.panel.add(this.textFieldBorder)
        this.panel.add(this.textField)
        this.panel.add(this.playerName)

        // --------------- selectors ----------------------
        this.specieSwitch = new MultipleSwitchButton(this, 34, 32*6, 29, true, 
            ["button-squid", "button-octo"], ["squid", "octo"])
        this.specieSwitch.eventEmitter.on("activechange", (index) => {
            this.charConfig.specie = this.specieSwitch.valueList[index]
            this.char.setConfig(this.charConfig)
            this.char.updateSprites()
        })

        this.genderSwitch = new MultipleSwitchButton(this, 82, 32*6, 29, true, 
            ["button-female", "button-male"], ["f", "m"])
        this.genderSwitch.eventEmitter.on("activechange", (index) => {
            this.charConfig.gender = this.genderSwitch.valueList[index]
            this.char.setConfig(this.charConfig)
            this.char.updateSprites()
        })

        this.sexSwitch = new MultipleSwitchButton(this, 130, 32*6, 29, true, 
            ["button-vagina", "button-penis"], ["f", "m"])
        this.sexSwitch.eventEmitter.on("activechange", (index) => {
            this.charConfig.sex = this.sexSwitch.valueList[index]
            this.char.setConfig(this.charConfig)
            this.char.updateSprites()
        })

        this.panel.add(this.genderSwitch)
        this.panel.add(this.sexSwitch)
        this.panel.add(this.specieSwitch)

        
        // ----------------- color palettes -------------------
        this.colorPalette = new ColorPalette(this, 222, 128, {
            colorList: Colors,
            buttonScale: 0.5,
            spacing: 1,
            columns: 9
        })
        this.colorPalette.eventEmitter.on("colorchange", (color)=> {
            this.charConfig.color = color

            this.char.setConfig(this.charConfig)
            this.char.updateSprites()
        })

        this.eyesColorPalette = new ColorPalette(this, 222, g.height - 93, {
            colorList: Colors,
            buttonScale: 0.5,
            spacing: 1,
            columns: 9
        })
        this.eyesColorPalette.eventEmitter.on("colorchange", (color)=> {
            this.charConfig.eyescolor = color

            this.char.setConfig(this.charConfig)
            this.char.updateSprites()
        })

        this.panel.add(this.add.image(208, 160, "icon-hair"))
        this.panel.add(this.add.image(208, 224, "icon-eye"))

        this.skinColorPalette = new ColorPalette(this, 170, 36, {
            colorList: SkinColors,
            buttonScale: 0.5,
            spacing: 1,
            columns: 1
        })
        this.skinColorPalette.eventEmitter.on("colorchange", (color)=> {
            this.charConfig.skincolor = color

            this.char.setConfig(this.charConfig)
            this.char.updateSprites()
        })

        this.panel.add(this.skinColorPalette)
        this.panel.add(this.colorPalette)
        this.panel.add(this.eyesColorPalette)

        // ---------- sexual orientation -----------
        this.likesFemaleSwitch = new SwitchButton(this, 396, 60, "button-female")
        this.likesMaleSwitch = new SwitchButton(this, 432, 60, "button-male")
        this.likesPenisSwitch = new SwitchButton(this, 396, 96, "button-penis")
        this.likesVaginaSwitch = new SwitchButton(this, 432, 96, "button-vagina")

        this.likesFemaleSwitch.eventEmitter.on("activechange", (value) => {
            this.charConfig.sexualorientation.likesFemale = value
            this.char.setConfig(this.charConfig)
            this.char.updateSprites()
        })
        this.likesMaleSwitch.eventEmitter.on("activechange", (value) => {
            this.charConfig.sexualorientation.likesMale = value
            this.char.setConfig(this.charConfig)
            this.char.updateSprites()
        })
        this.likesPenisSwitch.eventEmitter.on("activechange", (value) => {
            this.charConfig.sexualorientation.likesPenis = value
            this.char.setConfig(this.charConfig)
            this.char.updateSprites()
        })
        this.likesVaginaSwitch.eventEmitter.on("activechange", (value) => {
            this.charConfig.sexualorientation.likesVagina = value
            this.char.setConfig(this.charConfig)
            this.char.updateSprites()
        })

        this.panel.add(this.likesFemaleSwitch)
        this.panel.add(this.likesMaleSwitch)
        this.panel.add(this.likesPenisSwitch)
        this.panel.add(this.likesVaginaSwitch)

        
        let graphics = this.add.graphics()
        const gridSize = 32; // Tamaño de cada celda
        graphics.lineStyle(1, 0x00ff00);
        for (let x = 0; x <= g.width; x += gridSize) {
            graphics.beginPath();
            graphics.moveTo(x, 0);
            graphics.lineTo(x, g.height);
            graphics.closePath();
            graphics.strokePath();

            graphics.beginPath();
            graphics.moveTo(0, x);
            graphics.lineTo(g.width, x);
            graphics.closePath();
            graphics.strokePath();
        }
        this.panel.add(graphics)

        this.animateIn()
    }

    editText()
    {
        let newName = window.prompt("add name, max 16")

        if (!newName) newName = ""

        newName = newName.trim()
        newName = newName.slice(0, 20)

        if (!newName) newName = "click to rename"

        this.playerName.setText(newName)

        this.charConfig.name = newName
        this.char.setConfig(this.charConfig)
    }

    animateIn()
    {
        this.tweens.add({
            targets: [this.bg, this.panel],
            duration: this.animTime,
            ease: "quad",
            alpha: 1,
        })
        this.tweens.add({
            targets: this.panel,
            duration: this.animTime,
            ease: "quad",
            y: 0,
        })
    }

    animateOut(callback)
    {
        this.tweens.add({
            targets: [this.bg, this.panel],
            duration: this.animTime,
            ease: "quad",
            alpha: 0,
        })
        this.tweens.add({
            targets: this.panel,
            duration: this.animTime,
            ease: "quad",
            y: -g.height,
            onComplete: callback
        })
    }

    update() 
    {
        
    }
}