module.exports = class Task {

    static async putTask(req, res) {
        const data = await req.orm.products.update({_id: req.body._id}, req.body);
        res.send({status: 'ok', data});
    }

    static async postTask(req, res) {
        const newProduct = new req.orm.products(req.body);
        const data = await newProduct.save();
        res.send({status: 'ok', data});
    }

    static async getTasks(req, res) {
        const data = await req.orm.products.find({});
        res.send({status: 'ok', data});
    }

    static async startTask(req, res) {
        const data = await req.orm.products.update({_id: req.body._id}, {$set: {isOnline: true}});
        res.send({status: 'ok', data});
    }

    static async stopTask(req, res) {
        const data = await req.orm.products.update({_id: req.body._id}, {$set: {isOnline: false}});
        res.send({status: 'ok', data});
    }
};
