class BootScene extends Phaser.Scene 
{
    constructor() 
    {
        super("BootScene")
    }

    preload() 
    {
        this.load.image("cover", "assets/images/cover.png")
        this.load.image("arrow", "assets/images/arrow.png")

        // UI
        this.load.spritesheet("colorbutton", "assets/ui/button.png", {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet("button-add", "assets/ui/button-add.png", {
            frameWidth: 64,
            frameHeight: 64
        })
        this.load.spritesheet("button-play", "assets/ui/button-play.png", {
            frameWidth: 32,
            frameHeight: 200
        })
        this.load.spritesheet("button-ok", "assets/ui/button-ok.png", {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet("button-close", "assets/ui/button-close.png", {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet("button-edit", "assets/ui/button-edit.png", {
            frameWidth: 32,
            frameHeight: 32
        })

        this.load.spritesheet("button-squid", "assets/ui/button-squid.png", {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet("button-octo", "assets/ui/button-octo.png", {
            frameWidth: 32,
            frameHeight: 32
        })

        this.load.spritesheet("button-male", "assets/ui/button-male.png", {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet("button-female", "assets/ui/button-female.png", {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet("button-futa", "assets/ui/button-futa.png", {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet("button-penis", "assets/ui/button-penis.png", {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet("button-vagina", "assets/ui/button-vagina.png", {
            frameWidth: 32,
            frameHeight: 32
        })

        this.load.spritesheet("button-left", "assets/ui/button-left.png", {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet("button-right", "assets/ui/button-right.png", {
            frameWidth: 32,
            frameHeight: 32
        })

        // character stuff
        this.load.spritesheet("hair", "assets/char/hair.png", {
            frameWidth: 64,
            frameHeight: 64
        })

        

        this.load.image("icon-eye", "assets/ui/icon-eye.png")
        this.load.image("icon-hair", "assets/ui/icon-hair.png")
        
        this.load.image("ears-octo", "assets/char/octoear.png")
        this.load.image("ears-squid", "assets/char/squidear.png")
        this.load.image("face", "assets/char/face.png")
        this.load.image("eyes-octo-f", "assets/char/octoeye-f.png")
        this.load.image("eyes-octo-m", "assets/char/octoeye-m.png")
        this.load.image("eyes-squid-f", "assets/char/squideye-f.png")
        this.load.image("eyes-squid-m", "assets/char/squideye-m.png")
        this.load.image("pupils", "assets/char/pupils.png")
        this.load.image("eyebrows-f", "assets/char/eyebrow-f.png")
        this.load.image("eyebrows-m", "assets/char/eyebrow-m.png")
        this.load.image("gender-f", "assets/char/gender-f.png")
        this.load.image("gender-m", "assets/char/gender-m.png")
        this.load.image("gender-i", "assets/char/gender-i.png")
    }

    create() 
    {
        if (g.debugMode)
        {
            this.scene.start("GameMenuScene")
        }
        else
        {
            this.scene.start("MainMenuScene")
        }

        g.players = new PlayerList()
    }

    update() 
    {
        
    }
}

let Colors = {
    BLACK:      "#1f2021",
    GRAY:       "#6d7175",
    WHITE:      "#dfe4eb",
    BROWN:      "#522507",
    BRUNETTE:   "#ad5b24",
    CREAM:      "#dbb997",
    RED:        "#f50707",
    ORANGE:     "#fa6d07",
    GOLD:       "#fcc80d",
    YELLOW:     "#fff700",
    LIME:       "#aaff00",
    LIGHTGREEN: "#08ff13",
    GREEN:      "#0db522",
    DARKGREEN:  "#02520c",
    TEAL:       "#0ac4a5",
    CYAN:       "#05eeff",
    LIGHTBLUE:  "#11a2cf",
    BLUE:       "#0b59bf",
    DARKBLUE:   "#062f96",
    DARKPURPLE: "#390785",
    PURPLE:     "#5400c9",
    PLUM:       "#8050bf",
    VIOLET:     "#710e9c",
    FUSCIA:     "#a8137b",
    MAGENTA:    "#eb106b",
    PINK:       "#e84ac6",
    SAKURA:     "#ffb0e5"
}

let SkinColors = {
    PALE:       "#f0e2dd",
    WHITE:      "#f2cdc4",
    TAN:        "#d98c73",
    DARK:       "#a86d45",
    BLACK:      "#6e4224",
    BASSIST:    "#3d200c"
}

let ColorUtil = {}

ColorUtil.parseHex = (colorname) => {
    let hexcolor = colorname.slice(1)
    return parseInt(hexcolor, 16)
}
ColorUtil.parseString = (colorhex) => {
    return '#' + colorhex.toString(16).padStart(6, '0')
}

class PlayerList {
    constructor()
    {
        this.elements = []
    }

    add(element)
    {
        this.elements.push(element)
    }

    clean()
    {
        this.elements = []
    }
}