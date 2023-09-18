class GameplayScene extends Phaser.Scene {
    constructor() {
        super("GameplayScene")
    }

    create() 
    {
        let ARROW_CENTER = { x: g.height / 2, y: g.height /2 }

        this.cameras.main.setBackgroundColor('#eeeeee');
        this.colorButtons = []
        this.colors = []
        this.colorCircles = []

        //this.board = new Board
        this.add.circle(ARROW_CENTER.x, ARROW_CENTER.y, 78, 0xaaaaaa)
        this.add.circle(ARROW_CENTER.x, ARROW_CENTER.y, 75, 0xeeeeee)

        this.arrow = new Arrow(this, ARROW_CENTER.x, ARROW_CENTER.y)

        for (let i=0; i<12; i++)
        {
            if (i%2 == 0)
            {
                this.colors.push("ORANGE")
            }
            else {
                this.colors.push("LIGHTGREEN")
            }
        }

        this.addCirclesAround(ARROW_CENTER.x, ARROW_CENTER.y, 12, 110, this.colors)
        //this.createButtons()
    }

    addCirclesAround(x, y, amount, radius, colorList) 
    {
        let angInc = (2 * Math.PI) / amount

        for (let i = 0; i < amount; i++)
        {
            let ang = i * angInc

            let newCircle = this.add.circle(
                x + radius * Math.cos(ang),
                y + radius * Math.sin(ang),
                24,
                ColorUtil.parseHex(Colors[colorList[i]])
            )

            //newCircle.alp
            this.colorCircles.push(newCircle)
        }
    }

    createButtons() 
    {
        let colorList = Object.entries(Colors)
        let j = 0
        let buttons_x = 20
        let buttons_y = 40
        for (let i = 0; i < colorList.length; i++)
        {
            let newButton = new ColorButton(
                this, 
                buttons_x, 
                buttons_y, 
                colorList[i][1], 
                () => {
                    console.log(colorList[i][0] + ": " + colorList[i][1])
                }
            )
            newButton.name = "color_" + 
            
            this.colorButtons.push(newButton)
            
            buttons_x += 40
            j++
            if (j > 12)
            {
                j = 0
                buttons_y += 40
                buttons_x = 20
            }
        }
    }

    update(t, d) 
    {
        this.arrow.angle += d/2
    }
}
