const express = require('express');
const path = require('path');
const router = express.Router();
let port = 4000;

module.exports = class Router{
    constructor() {
        this.app = express();
        this.router = router;
    };

    async init (struct) {
        console.log('Init');

        this.router.get('/', (req, res) => res.sendFile(path.join(ROOT_DIR+'/views/index.html')));
        this.router.put('/api/task', (req, res) => res.send({status: 'ok'}));
        this.router.post('/api/task', (req, res) => res.send({status: 'ok'}));
        this.router.post('/api/start', (req, res) => res.send({status: 'ok'}));
        this.router.post('/api/stop/', (req, res) => res.send({status: 'ok'}));
        this.router.get('/api/tasks', (req, res) => {
            res.send([
                {
                    isOnline: false,
                    title: 'Shine diamond',
                    count: {
                        buy: 10,
                        sell: 2
                    },
                    price: {
                        min: 200,
                        sell: 210,
                        current: 198
                    }
                }, {
                    isOnline: false,
                    title: 'Rock wood',
                    count: {
                        buy: 15,
                        sell: 13
                    },
                    price: {
                        min: 52,
                        sell: 60,
                        current: 51
                    }
                }, {
                    isOnline: true,
                    title: 'Яркий самоцвет симбиотов',
                    count: {
                        buy: 12,
                        sell: 12
                    },
                    price: {
                        min: 45,
                        sell: 65,
                        current: 32
                    }
                }, {
                    isOnline: true,
                    title: 'Аксесуар "расписная ширма"',
                    count: {
                        buy: 0,
                        sell: 0
                    },
                    price: {
                        min: 120,
                        sell: 250,
                        current: 58
                    }
                }
            ]);
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