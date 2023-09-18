class Utils {
    static getTitleTextFormat(fontSize, color) {
        return {
            fontFamily: "lubalin-graph",
            align: "center",
            fontSize: fontSize || 40,
            color: color || "#000"
        }
    }
}

// remove from array
Array.prototype.removeIndex = function(index) {
    if (index > -1) {
        this.splice(index, 1);
    }
    return this
}
Array.prototype.removeElement = function(element) {
    return this.removeIndex(this.indexOf(element))
}

/* TEMPLATE
button1 = 
new ButtonImage({
    scene: this,
    x:100,
    y:100,
    image: "button-left",
    clickFunction: ()=> { console.log("clicked!")}
})
*/
class ButtonImage extends Phaser.GameObjects.Image {    
    constructor({scene, x=0, y=0, image, 
        text="", 
        textConfig={},
         scale=1, 
         clickFunction = ()=>{}
        }) 
    {
        super(scene, x, y, image)
        scene.add.existing(this)
        
        this.startScale = scale
        this.setScale(this.startScale)

        this.text
        if (text) {
            this.text = scene.add.text(x, y, text, textConfig)
            this.text.setOrigin(0.5)
            this.text.setScale(this.startScale)
        }

        this.setInteractive()
        this.setScrollFactor(0)

        this.isDown = false
        this.on("pointerover", ()=>{
            scene.tweens.add({
                targets: this.text? [this, this.text] : this,
                duration: DATA.animationTime,
                scale: this.startScale*1.1,
                ease: 'Back'
            })
        })
        this.on("pointerout", ()=>{
            scene.tweens.add({
                targets: this.text? [this, this.text] : this,
                duration: DATA.animationTime,
                scale: this.startScale,
                ease: 'Back'
            })
        })
        this.on("pointerdown", ()=>{
            this.isDown = true
            scene.tweens.add({
                targets: this.text? [this, this.text] : this,
                duration: DATA.animationTime,
                scale: this.startScale*0.8,
                ease: 'Back'
            })
        })
        this.on("pointerup", ()=>{
            this.isDown = false
            scene.tweens.add({
                targets: this.text? [this, this.text] : this,
                duration: DATA.animationTime,
                scale: this.startScale,
                ease: 'Back',
                onComplete: clickFunction
            })
        })
    }
}

class Carousel {
    constructor({elements = [], 
        nameList = [], 
        updateFunction = ()=>{}, 
        prevFunction = ()=>{},
        nextFunction = ()=>{},
        autoInitialize = true
    }) {
        this.list = elements
        this.nameList = nameList
        this.active = 0
        this.max = this.list.length-1
        this.prevFunction = prevFunction
        this.nextFunction = nextFunction
        this.updateFunction = updateFunction

        //this.

        if (autoInitialize) this.initialize()
    }
    initialize() {
        for(var i=1; i<this.list.length; i++) {
            this.list[i].forEach(e => {
                e.active = false
                e.alpha = 0
            })
        }
        this.setActive(0)
    }

    add(element, name = null, prevFunction=undefined, nextFunction=undefined) {
        this.list.push(element)
        this.max++
        if (name) {
            this.nameList.push(name)
        }
        this.prevFunction = prevFunction? prevFunction : () => {}
        this.nextFunction = nextFunction? nextFunction : () => {}
    }

    prev() {
        if (this.active == 0) {
            this.setActive(this.max)
        }
        else {
            this.setActive(this.active-1)
        }
        this.prevFunction.call()
    }

    next() {
        if (this.active == this.max) {
            this.setActive(0)
        }
        else {
            this.setActive(this.active+1)
        }
        this.nextFunction.call()
    }

    setActive(index) {
        this.list[this.active].forEach(e => {
            e.active = false
            e.alpha = 0
        })
        this.list[index].forEach(e => {
            e.active = true
            e.alpha = 1
        })
        this.active = index
        this.updateFunction.call()
    }

    setActiveByName(name) {
        this.setActive(this.nameList.indexOf(name))
    }
}

class Dialog extends Phaser.GameObjects.Rectangle {
    constructor(data) {
        //if (!data.margin) data.margin = 20
        super(data.scene, 
            data.margin, 
            gHeight - data.height - data.margin, 
            gWidth - 2 * data.margin, 
            data.height, 
            data.color || 0x000000, 
            data.alpha || 0.9)
        this.scene = data.scene
        this.scene.add.existing(this)

        this.corners = {
            left: this.x + (data.padding || data.margin), 
            up: this.y + (data.padding || data.margin),
            right: gWidth - data.margin - (data.padding || data.margin),
            down: gHeight - data.margin - (data.padding || data.margin)
        }
        this.setOrigin(0)
        
        this.textIndex = 0
        this.textList = data.textList
        this.textStyle = data.textStyle
        this.showText = ()=> {
            console.log(this.textList[this.textIndex])
            return this.scene.add.text(this.corners.left, this.corners.up, this.textList[this.textIndex], this.textStyle)
        }
        this.text = this.showText()

        this.nextButton
        if (data.nextButton) {
            console.log(data.nextButton)
            this.nextButton = this.scene.add.sprite(this.corners.right, this.corners.down, data.nextButton.key)
            this.nextButton.play(data.nextButton.animation)
        }
    }

    advanceText() {
        this.textIndex++
        if (this.textIndex == this.textList.length) {
            this.text.destroy()
            if (this.nextButton) this.nextButton.destroy()
            this.destroy()
        } 
        else {
            this.text.setText(this.textList[this.textIndex])
        }
    }
}

class Box {
    constructor(scene, width, height, config) {
        this.width = width
        this.height = height
        let pos = {
            centerX: gWidth/2,
            centerY: gHeight/2,
            left: gWidth/2 - width/2,
            right: gWidth/2 + width/2,
            up: gHeight/2 - height/2,
            down: gHeight/2 + height/2,
            bl: 61,
            br: 50,
            bu: 50,
            bd: 57
        }
        this.pos = pos
        this.components = {
            ul: scene.add.tileSprite(pos.left, pos.up, pos.bl, pos.bu, "box", "up-left"),
            ur: scene.add.tileSprite(pos.right, pos.up, pos.br, pos.bu, "box", "up-right"),
            dl: scene.add.tileSprite(pos.left, pos.down, pos.bl, pos.bd, "box", "down-left"),
            dr: scene.add.tileSprite(pos.right, pos.down, pos.br, pos.bd, "box", "down-right"),
            su: scene.add.tileSprite(pos.centerX, pos.up, width, pos.bu, "box", "up-side"),
            sd: scene.add.tileSprite(pos.centerX, pos.down, width, pos.bd, "box", "down-side"),
            sl: scene.add.tileSprite(pos.left, pos.centerY, pos.bl, height, "box", "left-side"),
            sr: scene.add.tileSprite(pos.right, pos.centerY, pos.br, height, "box", "right-side"),
            c: scene.add.tileSprite(pos.centerX, pos.centerY, width, height, "box", "center")
        }

        if (config.title) {
            let t = scene.add.text(pos.centerX, 
                pos.up - 15, 
                config.title, 
                Utils.getTitleTextFormat(config.titleSize))
            
            t.setOrigin(0.5)
            t.y += t.height/2 
            scene.add.image(t.x - t.width/2 - 30, t.y, "title-decoration-left")
            scene.add.image(t.x + t.width/2 + 30, t.y, "title-decoration-right")
        }

        if (config.close) {
            new ButtonImage({
                scene: scene,
                x: pos.right + 20,
                y: pos.up - 20,
                image: "button-close",
                scale: 1.3,
                clickFunction: ()=> {
                    scene.scene.stop()
                    scene.scene.resume(scene.parentScene)
                }
            })
        }
        /*this.components.su.setScale(width/100, 1)
        this.components.sd.setScale(width/100, 1)
        this.components.sl.setScale(1, height/100)
        this.components.sr.setScale(1, height/100)
        this.components.c.setScale(width/100, height/100)*/
    }
}