class PromoHandler {
    constructor(service) {
        this.service = service
        this.getAll = this.getAll.bind(this) 
        this.add = this.add.bind(this)
        this.getById = this.getById.bind(this)
    }

    async getAll(req, res) {
        const response = await this.service.getAll()
        res.status(response.statusCode).send(response.payload)
    }

    async add(req, res) {
        const promo = req.body
        const response = await this.service.add(promo)
        res.status(response.statusCode).send(response.payload)
    }

    async getById(req, res) {
        const query = req.query.id
        const response = await this.service.getById(query)
        res.status(response.statusCode).send(response.payload)
    }

}

module.exports = PromoHandler;