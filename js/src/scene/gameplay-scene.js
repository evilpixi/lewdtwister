class GameplayScene extends Phaser.Scene {
    constructor() {
        super("GameplayScene")
    }

    create() 
    {
        this.cameras.main.setBackgroundColor('#eeeeee');
        this.board = new Board(this, g.width - 16, g.height)

        this.gameinfo = {
            players: g.players.elements.lenght,
            currentTurn: 0,
            nextTurn: 0,
            isSpinning: false,
            startRotationSpeed: 0.006,
            rotationSpeed: 0,
            breakSpeed: 0.000045,
            rotationTime: 1000,
            extraTime: 0,
            currentRotationTime: 0
        }
        this.gameinfo.nextTurn = this.getNext()

        this.currentTurnText = this.add.text(128, 8, "#############'s turn", {
            fontFamily: "ps2p",
            fontSize: 18,
            resolution: 18,
            color: "#000000"
        })
        this.currentTurnText.setScale(0.5, 1)

        
        this.spinButton = new Button(this, 64, 240, "button-spin", () => {
            this.spin()
        }, 2)
        this.spinButton.setTint(ColorUtil.parseHex(Colors.GREEN))

        this.playButton = new Button(this, 134, 240, "button-right", () => {
            this.play()
        }, 1.5)
        this.playButton.setTint(ColorUtil.parseHex(Colors.GREEN))
        this.playButton.visible = false

        this.updateCurrentPlayer()
        this.prepareTurn()

        // --- lines ---
        let show = false
        if (show)
        {
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
        }
    }

    prepareTurn()
    {
        let posibilities = []
        let bodyParts = ["cum", "oral", "hands", "tongue", "grope", "spank", "be creative"]

        let currentPlayer = g.players.elements[this.gameinfo.currentTurn]
        if (currentPlayer.sex == "m")
        {
            bodyParts.push("penis")
            bodyParts.push("anal")
        }
        if (currentPlayer.sex == "f")
        {
            bodyParts.push("strap-on")
        }
        if (currentPlayer.gender == "f")
        {
            bodyParts.push("tits")
        }

        for (let part of bodyParts)
        {
            let candidates = this.getCandidates()
            console.log(candidates)
            if (candidates.length == 0)
            {
                candidates.push(currentPlayer)
                candidates.push(currentPlayer)
            }
            console.log(candidates)
            for (let candidate of candidates)
            {
                posibilities.push({
                    part: part,
                    name: candidate.name,
                    player: candidate
                })
            }
        }


        this.board.updatePosibilities(posibilities)
    }

    play()
    {
        this.playButton.visible = false
        this.spinButton.visible = true
        this.updateCurrentPlayer()
        this.prepareTurn()
    }

    spin()
    {
        this.spinButton.visible = false

        // spin
        this.gameinfo.isSpinning = true
        this.gameinfo.rotationSpeed = this.gameinfo.startRotationSpeed
        this.gameinfo.extraTime = Math.random() * 1500
        this.gameinfo.currentRotationTime = 0

    }

    endSpin()
    {
        this.playButton.visible = true
        this.spinButton.visible = true
        this.gameinfo.currentTurn = this.getNext()
        this.gameinfo.nextTurn = this.getNext()
    }

    getNext()
    {
        let next = this.gameinfo.currentTurn
        next++
        if (next >= g.players.elements.length)
        {
            next = 0
        }
        return next
    }

    getCandidates()
    {
        let players = g.players.elements
        let candidates = []
        let turnPlayer = players[this.gameinfo.currentTurn]

        for (let i = 0; i < players.length; i++)
        {
            if (i == this.gameinfo.currentTurn) continue

            let currentPlayer = players[i]

            if (Character.likes(turnPlayer, currentPlayer) && Character.likes(currentPlayer, turnPlayer))
            {
                candidates.push(currentPlayer)
            }
        }

        return candidates
    }

    updateCurrentPlayer()
    {
        this.nextChar?.destroy()
        this.nextChar = new Character(this, 150, 96, g.players.elements[this.gameinfo.nextTurn])

        this.transparentRect?.destroy()
        this.transparentRect = this.add.rectangle(150, 96, 70, 70, 0xeeeeee, 0.5)

        this.currentChar?.destroy()
        this.currentChar = new Character(this, 86, 80, g.players.elements[this.gameinfo.currentTurn])
        this.currentChar.scale = 2

        this.currentTurnText.setText(g.players.elements[this.gameinfo.currentTurn].name + "'s turn")
    }

    update(t, d) 
    {
        if (this.gameinfo.isSpinning)
        {
            this.board.update(t, d, this.gameinfo.rotationSpeed)
            this.gameinfo.currentRotationTime += d

            if (this.gameinfo.currentRotationTime > this.gameinfo.rotationTime + this.gameinfo.extraTime)
            {
                this.gameinfo.rotationSpeed -= this.gameinfo.breakSpeed
            }

            if (this.gameinfo.rotationSpeed < 0) 
            {
                this.gameinfo.rotationSpeed = 0
                this.gameinfo.isSpinning = false
                this.endSpin()
            }
        }
    }
}
