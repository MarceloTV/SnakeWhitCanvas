class BeforeValues{
    vectors = []

    pushValues = (x,y) => {
        if(this.vectors.length === 2000){
            this.vectors.forEach((v,i) => {
                if(i >= 1000){
                    this.vectors.splice(i,1)
                }
            })
        }
        this.vectors.unshift({
            x,
            y
        })
    }

    getValues = () => {
        return this.vectors
    }
}

export default new BeforeValues()