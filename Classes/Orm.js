const mongoose = require("mongoose");
const fs = require('fs-extra');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

module.exports = class Orm {
    constructor() {
        this.mongoose = mongoose;
    }

    async init() {
        await this.mongoose.connect("mongodb://localhost:27017/parser-db", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        autoIncrement.initialize(this.mongoose.connection);
    }

    async initModels() {
        const schemas = await fs.readdir(`${ROOT_DIR}/schemas`);

        for (const schemaName of schemas) {
            const schemaJson = Orm.getJson(await fs.readFile(`${ROOT_DIR}/schemas/${schemaName}`));
            const scheme = new Schema(schemaJson);
            const name = Orm.getName(schemaName, 's');
            scheme.plugin(autoIncrement.plugin, name);
            this[name] = mongoose.model(name, scheme);
        }
    }

    static getJson(schemaBuffer) {
        return JSON.parse((schemaBuffer).toString());
    }

    static getName(schemaName, ending) {
        const separatedName = schemaName.split('.');
        return ending ? `${separatedName[0]}${ending}` : separatedName[0];
    }
};
