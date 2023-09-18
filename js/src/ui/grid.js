class Grid extends Phaser.GameObjects.Container 
{
    constructor(scene, x, y, config) {
        super(scene, x, y, [])

        this.coords = []

        let cfg = {
            width: config?.width || g.width,
            height: config?.height || g.height,
            columns: config?.columns || 1,
            rows: config?.rows || 1,
            padding: config?.padding || 0
        }

        this.cellWidth = cfg.width / cfg.columns
        this.cellHeight = cfg.height / cfg.rows

        this.cols = cfg.columns
        this.rows = cfg.rows

        this.graphics = scene.add.graphics()
        this.add(this.graphics)

        for (let row = 0; row < cfg.rows; row++)
        {
            for (let col = 0; col < cfg.columns; col++)
            {
                this.graphics.fillStyle(0xffffff, 1)
                this.graphics.fillRect(
                    col * this.cellWidth + cfg.padding,
                    row * this.cellHeight + cfg.padding,
                    this.cellWidth - cfg.padding * 2,
                    this.cellHeight - cfg.padding * 2
                )

                this.graphics.fillStyle(0xbfc3c9, 1)
                this.graphics.fillRect(
                    col * this.cellWidth + cfg.padding + 1,
                    row * this.cellHeight + cfg.padding + 1,
                    this.cellWidth - cfg.padding * 2 - 1,
                    this.cellHeight - cfg.padding * 2 - 1
                )

                this.graphics.fillStyle(0xffffff, 1)
                this.graphics.fillRect(
                    col * this.cellWidth + cfg.padding + 4,
                    row * this.cellHeight + cfg.padding + 4,
                    this.cellWidth - cfg.padding * 2 - 7,
                    this.cellHeight - cfg.padding * 2 - 7
                )

                this.graphics.fillStyle(0xa1a6ad, 1)
                this.graphics.fillRect(
                    col * this.cellWidth + cfg.padding + 4,
                    row * this.cellHeight + cfg.padding + 4,
                    this.cellWidth - cfg.padding * 2 - 8,
                    this.cellHeight - cfg.padding * 2 - 8
                )
                
                this.coords.push({
                    x: col * this.cellWidth + this.cellWidth / 2, 
                    y: row * this.cellHeight + this.cellHeight / 2
                })
            }
        }

        scene.add.existing(this);
    }

    placeObjectAtIndex(targetObject, index)
    {
        let pos = this.indexToPosition(index)
        this.placeObject(targetObject, pos.col, pos.row)
    }

    placeObject(targetObject, col, row)
    {
        let pos = this.positionToIndex(col, row)
        targetObject.x = this.x + this.coords[pos].x
        targetObject.y = this.y + this.coords[pos].y
    }

    positionToIndex(col, row)
    {
        let pos = row * this.cols + col
        return pos
    }

    indexToPosition(index)
    {
        let col = index % this.cols
        let row = Math.floor(index / this.cols)
        return { col: col, row: row }
    }
}