class BeforeValues{
    //VECTORS
    vectors = []

    pushValues = (x,y) => {
        //THE VECTOR MUST NOT MORE OF 2000 VALUES FOR BETTER PERFORMANCE
        if(this.vectors.length === 2000){
            this.vectors.forEach((v,i) => {
                if(i >= 1000){
                    this.vectors.splice(i,1)
                }
            })
        }

        //UNSHIFT VECTORS
        this.vectors.unshift({
            x,
            y
        })
    }

    //GET VALUES
    getValues = () => {
        return this.vectors
    }
}

export default new BeforeValues()