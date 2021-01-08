import BeforeValues from './beforeValues.js'

class Game{
    constructor(){
        this.run = {
            start: null,
            walk: null
        }
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.x = 10;
        this.y = 10;
        this.velX = 10;
        this.velY = 0;
        this.ctx.width = this.canvas.width
        this.ctx.height = this.canvas.height
        this.randomPoint = {
            x: null,
            y: null
        }
        this.history = []
        this.tail = []
    }

    testCanvas = (f) => {
        f(this.canvas)
    }

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

    snakeRunAndEvent = (x,y) => {
        if(!this.checkLegalMovement(x,y)){
            return false
        }

        this.velX = x
        this.velY = y
    }

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

    randomPointFunction = (ctx) => {
        if(!this.randomPoint.x || !this.randomPoint.y){
            this.changePoint()
        }
        
        ctx.fillRect(this.randomPoint.x,this.randomPoint.y,10,10)

        if(this.x == this.randomPoint.x && this.y == this.randomPoint.y){
            this.changePoint()
        }
        
    }

    checkColapse = () => {
        switch (this.x) {
            case 400:
                alert("collapse")
                clearInterval(this.run)    
            break;
        
            case -10:
                alert("collapse")
                clearInterval(this.run)
            break;
        }

        switch (this.y) {
            case 400:
                alert("collapse")
                clearInterval(this.run)    
            break;
        
            case -10:
                alert("collapse")
                clearInterval(this.run)
            break;
        }
    }

    snake = (x,y) => {
        this.ctx.fillStyle = "purple"
        this.ctx.fillRect(x,y,10,10)
    }

    animation = () => {
       this.run.start = setInterval(() => {
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
            this.tailFunction(this.ctx)
            this.snake(this.x,this.y)
            this.checkColapse()
            this.randomPointFunction(this.ctx)
        },1000/60)

        this.run.walk = setInterval(() => {
            this.history = BeforeValues.getValues()
            BeforeValues.pushValues(this.x,this.y)
            this.x += this.velX
            this.y += this.velY
        },1000/5)
    }

    start = () => {
        this.animation()
        console.log("Hello World")
    }
}

/* const btn = document.querySelector("#btn")
const stop = document.querySelector("#stop")
const test = document.querySelector("#test") */

const Main = new Game()

/* stop.addEventListener('click', e => {
    clearInterval(Main.run.start)
    clearInterval(Main.run.walk)
})

test.addEventListener('click', e => {
    console.log(Main.history)
})

btn.addEventListener("click", e => {
    Main.start()
}) */

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