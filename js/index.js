import BeforeValues from './beforeValues.js'

class Game{
    constructor(btn){
        //SCORE
        this.score = 0
        this.run = {
            start: null,
            walk: null
        }

        //RUN Velocity
        this.runVelocity = 5

        //CANVAS & CONTEXT
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")

        //POS X & POS Y
        this.x = 10;
        this.y = 10;

        //VEL X % VEL Y
        this.velX = 10;
        this.velY = 0;

        //RANDOM POINT FOR THE POINT SCORE
        this.randomPoint = {
            x: null,
            y: null
        }

        //HISTORY OF THE VALUES X & Y
        this.history = []

        //TAIL
        this.tail = []

        //LIGHT
        this.light = document.getElementById("light")
        this.btn = btn
    }

    //RESET PROPERTIES
    reset = () => {
        this.score = 0
        this.run = {
            start: null,
            walk: null
        }
        this.runVelocity = 5
        this.x = 10;
        this.y = 10;
        this.velX = 10;
        this.velY = 0;
        this.randomPoint = {
            x: null,
            y: null
        }
        this.history = []
        this.tail = []
    }

    //PUT THE GAME MORE HARD WHIT "RUN VELOCITY"
    pushDificult = () => {
        clearInterval(this.run.walk)
        this.runVelocity += 1
        this.run.walk = setInterval(() => {
            this.light.classList.toggle("light_red")
            this.history = BeforeValues.getValues()
            BeforeValues.pushValues(this.x,this.y)
            this.x += this.velX
            this.y += this.velY
        },1000/this.runVelocity)
    }

    //SCORE FUNCTION
    scoreFunction = (ctx) => {
        if(this.randomPoint.x == this.x && this.randomPoint.y == this.y){
            this.score += 1
            if(this.score % 2 == 0){
                this.pushDificult()
                console.log(this.runVelocity)
            }
        }

        ctx.font= "30px Helvetica"
        ctx.fillText(this.score, 360,30)
    }

    //CHECK TO THE SNAKE DONT MOVE FROM RIGHT TO LEFT OR VICEVERSA
    checkLegalMovement = (x,y) => {
        switch (x) {
            case 10:
                if(this.velX == -10){
                    return false
                }
            break;
        
            case -10:
                if(this.velX == 10){
                    return false
                }
            break;
        }

        switch (y) {
            case 10:
                if(this.velY == -10){
                    return false
                }
            break;
        
            case -10:
                if(this.velY == 10){
                    return false
                }
            break;
        }

        return true
    }

    //MOVE THE SNAKE
    snakeRunAndEvent = (x,y) => {
        if(!this.checkLegalMovement(x,y)){
            return false
        }

        this.velX = x
        this.velY = y
    }

    //TAIL FUNTION TO ENLARGE IT
    tailFunction = (ctx) => {
        if(this.randomPoint.x == this.x && this.randomPoint.y == this.y){
            this.tail.push(this.tail.length + 1)
            console.log(this.tail)
        }

        this.tail.forEach((v,i) => {
            ctx.beginPath()
            ctx.fillStyle = "purple"
            ctx.fillRect(this.history[i].x,this.history[i].y,10,10)
        })
    }

    //CHANGE THE POINT TO OTHER POINT
    changePoint = () => {
        let posX = '';
        let posY = '';
        const x = String(Math.round(Math.random() * (300-100) + 100))
        const y = String(Math.round(Math.random() * (300-100) + 100))
        for(let i = 0;i < x.length; i++){
            if(i == x.length - 1){
                posX += '0'
            }else{
                posX += x[i]
            }
        }

        for(let i = 0;i < y.length; i++){
            if(i == y.length - 1){
                posY += '0'
            }else{
                posY += y[i]
            }
        }

        this.randomPoint.x = Number(posX)
        this.randomPoint.y = Number(posY)
    }

    //WRITE THE POINT
    randomPointFunction = (ctx) => {
        if(!this.randomPoint.x || !this.randomPoint.y){
            this.changePoint()
        }
        
        ctx.fillRect(this.randomPoint.x,this.randomPoint.y,10,10)

        if(this.x == this.randomPoint.x && this.y == this.randomPoint.y){
            this.changePoint()
        }
        
    }

    //GAME OVER FUNCTION
    gameOver = (ctx,canvas,score) => {
        clearInterval(this.run.start)    
        clearInterval(this.run.walk)

        if(this.light.classList.contains("light_red")){
            this.light.classList.remove("light_red")
        }

        this.ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.beginPath()
        ctx.font = "30px Helvetica"
        ctx.fillStyle = "purple"
        ctx.textAlign = "center"
        ctx.fillText("Game Over", canvas.width/2, canvas.height/2)

        ctx.beginPath()
        ctx.font = "15px Helvetica"
        ctx.fillStyle = "purple"
        ctx.textAlign = "center"
        ctx.fillText(`Your Score: ${score}`, canvas.width/2, (canvas.height/2) + 20)
        this.reset()
        this.btn.removeAttribute("disabled")
    }

    //CHECK SNAKE COLLAPSE
    checkColapse = () => {
        switch (this.x) {
            case 400:
                this.gameOver(this.ctx,this.canvas,this.score)    
            break;
        
            case -10:
                this.gameOver(this.ctx,this.canvas,this.score)
            break;
        }

        switch (this.y) {
            case 400:
                this.gameOver(this.ctx,this.canvas,this.score)    
            break;
        
            case -10:
                this.gameOver(this.ctx,this.canvas,this.score)
            break;
        }

        this.tail.forEach((v,i) => {
            if(this.history[i].x && this.history[i].y){
                if(this.history[i].x == this.x && this.history[i].y == this.y){
                    this.gameOver(this.ctx,this.canvas,this.score)
                }
            }
        })
    }

    //WRITE THE SNAKE
    snake = (x,y) => {
        this.ctx.fillStyle = "purple"
        this.ctx.fillRect(x,y,10,10)
    }

    //ANIMATE THE GAME
    animation = () => {
       this.run.start = setInterval(() => {
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
            this.scoreFunction(this.ctx)
            this.tailFunction(this.ctx)
            this.snake(this.x,this.y)
            this.randomPointFunction(this.ctx)
            this.checkColapse()
        },1000/60)

        this.run.walk = setInterval(() => {
            this.light.classList.toggle("light_red")
            //GET LAST VALUES
            this.history = BeforeValues.getValues()
            //PUSH CURRENTLY VALUES
            BeforeValues.pushValues(this.x,this.y)
            this.x += this.velX
            this.y += this.velY
        },1000/this.runVelocity)
    }

    //START THE GAME
    start = () => {
        this.animation()
        console.log("Hello World")
    }
}

const btn = document.getElementById("start")

//GAME CLASS
const Main = new Game(btn)

//BUTTON TO START THE GAME
btn.addEventListener("click", e => {
    Main.start()
    e.currentTarget.disabled = true
}) 

//GAME HOTKEYS
window.addEventListener("keyup", e => {
    switch (e.key) {
        case "w":
            Main.snakeRunAndEvent(0,-10)
        break;

        case "s":
            Main.snakeRunAndEvent(0,10)
        break;

        case "a":
            Main.snakeRunAndEvent(-10,0)
        break;

        case "d":
            Main.snakeRunAndEvent(10,0)
        break;
    }
})