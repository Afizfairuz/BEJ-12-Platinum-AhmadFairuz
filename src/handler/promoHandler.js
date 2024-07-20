class PromoHandler {
    constructor(service) {
        this.service = service
        this.getAll = this.getAll.bind(this) 
    }

    async getAll(req, res) {
        const response = await this.service.getAll()
        res.status(response.statusCode).send(response.payload)
    }

}

module.exports = PromoHandler;