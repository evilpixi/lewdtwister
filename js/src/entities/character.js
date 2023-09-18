class Character extends Phaser.GameObjects.Container
{
    constructor(scene, x, y, config)
    {
        super(scene, x, y, [])
        scene.add.existing(this)

        this.setConfig(config)

        this.ears = scene.add.sprite(0, 0, "ears-" + this.specie)
        this.ears.setTint(this.skincolor)
        this.face = scene.add.sprite(0, 0, "face")
        this.face.setTint(this.skincolor)

        this.eyes = scene.add.sprite(0, 0, `eyes-${this.specie}-${this.gender}`)
        this.pupils = scene.add.sprite(0, 0, "pupils")
        this.pupils.setTint(this.eyescolor)
        this.eyebrows = scene.add.sprite(0, 0, "eyebrows-" + this.gender)
        this.eyebrows.setTint(this.color)

        this.hair = scene.add.sprite(0, 0, "hair")
        this.hair.setFrame(this.hairstyle)
        this.hair.setTint(this.color)

        this.add(this.ears)
        this.add(this.face)

        this.add(this.hair)
        this.add(this.eyebrows)
        this.add(this.eyes)
        this.add(this.pupils)
    }

    setConfig(config)
    {
        this.specie = config?.specie || "squid"
        this.gender = config?.gender || "f"
        this.sex = config?.sex || "f"
        this.name = config?.name || "Player"
        this.skincolor = config?.skincolor || ColorUtil.parseHex(SkinColors.WHITE)
        this.color = config?.color || ColorUtil.parseHex(Colors.GREEN)
        this.eyescolor = config?.eyescolor || ColorUtil.parseHex(Colors.PURPLE)
        this.hairstyle = config?.hairstyle || 0

        this.sexualorientation = config?.sexualorientation || {
            likesMale: false,
            likesFemale: false,
            likesPenis: false,
            likesVagina: false
        }
    }

    getConfig()
    {
        return {
            specie: this.specie,
            gender: this.gender,
            sex: this.sex,
            name: this.name,
            skincolor: this.skincolor,
            color: this.color,
            eyescolor: this.eyescolor,
            sexualorientation: this.sexualorientation
        }
    }

    updateSprites()
    {
        this.ears.setTexture("ears-" + this.specie)
        this.ears.setTint(this.skincolor)
        this.face.setTint(this.skincolor)

        this.eyes.setTexture(`eyes-${this.specie}-${this.gender}`)

        this.hair.setFrame(this.hairstyle)
        this.hair.setTint(this.color)
        this.eyebrows.setTexture("eyebrows-" + this.gender)
        this.eyebrows.setTint(this.color)
        this.pupils.setTint(this.eyescolor)
    }
}

class CharacterCard extends Phaser.GameObjects.Container
{
    constructor(scene, x, y, width, height, characterConfig)
    {
        super(scene, x, y, [])
        scene.add.existing(this)
        this.width = width
        this.height = height
        this.anchors = {
            x: 2,
            y: 2
        }

        this.brightRect = scene.add.rectangle(
            0,
            0,
            width - 12,
            height - 12,
            0xffffff,
            1
        )
        this.rect = scene.add.rectangle(
            0.5,
            0.5,
            width - 13,
            height - 13,
            0xeeeeee,
            //ColorUtil.parseHex(character.color),
            1
        )
        
        this.character = new Character(scene, 0, 0, characterConfig)
        this.character.x = - this.width * 0.2
        this.character.y = this.anchors.y

        this.textName = scene.add.text(0, -this.height/2 + 21, this.character.name, {
            fontFamily: "ps2p",
            fontSize: "12px",
            color: ColorUtil.parseString(this.character.color),
            stroke: "#000000",
            strokeThickness: 2
        })
        this.textName.setOrigin(0.5, 0.5)
        if (this.textName.displayWidth >= this.width)
        {
            this.textName.scaleX = 0.5
        }

        let gender = "m"
        if (this.character.gender == "f")
        {
            gender = this.character.sex == "f" ? "f" : "i"
        }
        this.sex = scene.add.sprite(this.width * 0.25, this.height * 0.1, "gender-" + gender)
        this.sex.setScale(2)

        this.add(this.brightRect)
        this.add(this.rect)
        this.add(this.character)
        this.add(this.textName)
        this.add(this.sex)
    }
}

class CharacterInfo
{

}