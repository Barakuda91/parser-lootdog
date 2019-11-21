module.exports = class Task {

    static async putTask(req, res) {
        const data = await req.orm.products.update({_id: req.data._id}, req.data);
        res.send({status: 'ok', data});
    }

    static async postTask(req, res) {
        const newProduct = new req.orm.products(req.data);
        const data = await newProduct.save();
        res.send({status: 'ok', data});
    }

    static async getTasks(req, res) {
        const data = await req.orm.products.find({});
        res.send({status: 'ok', data});
    }

    static async startTask(req, res) {
        const data = await req.orm.products.update({_id: req.data._id}, {$set: {isOnline: true}});
        res.send({status: 'ok', data});
    }

    static async stopTask(req, res) {
        const data = await req.orm.products.update({_id: req.data._id}, {$set: {isOnline: false}});
        res.send({status: 'ok', data});
    }
};
