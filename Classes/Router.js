const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const Task = require(`${ROOT_DIR}/Models/Task`);
const router = express.Router();
let port = 4000;

module.exports = class Router{
    constructor() {
        this.app = express();
        this.router = router;
    };

    async init (struct) {
        console.log('Init');

        this.orm = struct.orm;

        this.router.get('/', (req, res) => res.sendFile(path.join(ROOT_DIR+'/views/index.html')));

        this.router.post('/api/start', Task.startTask);
        this.router.post('/api/stop/', Task.stopTask);

        this.router.post('/api/task', Task.postTask);
        this.router.put('/api/task', Task.putTask);
        this.router.get('/api/tasks', Task.getTasks);
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use((req, res, next) => {
            req.orm = this.orm;
            //req.body = JSON.parse(req.body);
            next();
        });
        this.app.use(express.static('./static'));
        this.app.use('/', this.router);

        await new Promise((cb) => this.app.listen(port, cb));

        console.log(`App listening on port ${port}!`);
        console.log(`visit http://localhost:${port}`);
        console.table({
            'get:/api/tasks': 'Get all tasks',
            'put :/api/task': 'Update task',
            'post:/api/task': 'Create task',
            'post:/api/start': 'For start task',
            'post:/api/stop': 'For stop task'
        });
    };
};