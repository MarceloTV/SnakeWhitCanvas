class BeforeValues{
    vectors = []

    pushValues = (x,y) => {
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