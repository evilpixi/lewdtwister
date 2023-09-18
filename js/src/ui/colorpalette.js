class ColorPalette extends Phaser.GameObjects.Container 
{
    constructor(scene, x, y, config) {
        super(scene, x, y, [])
        scene.add.existing(this);

        this.eventEmitter = new Phaser.Events.EventEmitter()

        this.colorButtons = []
        let colorList = Object.entries(config.colorList)
        let j = 0
        let buttons_x = 0
        let buttons_y = 0
        let buttonSize = 32 * config.buttonScale + config.spacing * 2

        let rows = Math.ceil(colorList.length / config.columns)
        let backRect = scene.add.rectangle(0, 0, buttonSize * config.columns, buttonSize * rows, 0xd0d0d0)
        backRect.setOrigin(0, 0)
        this.add(backRect)

        for (let i = 0; i < colorList.length; i++)
        {
            let newButton = new ColorButton(
                scene, 
                buttons_x + buttonSize/2, 
                buttons_y + buttonSize /2, 
                colorList[i][1], 
                () => {
                    //console.log("clicked!" + colorList[i][0] + ": " + colorList[i][1])
                    this.eventEmitter.emit("colorchange", ColorUtil.parseHex(colorList[i][1]))
                },
                {
                    scale: config.buttonScale
                }
            )
            
            buttons_x += buttonSize
            j++

            if (j >= config.columns)
            {
                j = 0
                buttons_y += buttonSize
                buttons_x = 0
            }

            this.add(newButton)
            this.colorButtons.push(newButton)
        }

        this.columnsAmount = config.columns
        this.rowsAmount = rows
    }
}