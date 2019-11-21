const express = require('express');
const path = require('path');
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

        this.router.post('/api/start', Task.startTask); // закинуть статус в базу
        this.router.post('/api/stop/', Task.stopTask); // закинуть статус в базу
        // при старте запускается таска парсера,
        // которая достает все активные таски из базы
        // по очереде парсер заходит на таску и проверяет
        //      если цена ниже заданного покупаем позволеное количество
        //      если цена выше заданного:
        //          есть на продажу товар,
        //              если есть - выставляем
        //              если нет - следующая итерация

        this.router.post('/api/task', Task.postTask);
        this.router.put('/api/task', Task.putTask);
        this.router.get('/api/tasks', Task.getTasks);
        // this.router.get('/api/tasks', (req, res) => {
        //     res.send([
        //         {
        //             isOnline: false,
        //             title: 'Shine diamond',
        //             count: {
        //                 buy: 10,
        //                 sell: 2
        //             },
        //             price: {
        //                 min: 200,
        //                 sell: 210,
        //                 current: 198
        //             }
        //         }, {
        //             isOnline: false,
        //             title: 'Rock wood',
        //             count: {
        //                 buy: 15,
        //                 sell: 13
        //             },
        //             price: {
        //                 min: 52,
        //                 sell: 60,
        //                 current: 51
        //             }
        //         }, {
        //             isOnline: true,
        //             title: 'Яркий самоцвет симбиотов',
        //             count: {
        //                 buy: 12,
        //                 sell: 12
        //             },
        //             price: {
        //                 min: 45,
        //                 sell: 65,
        //                 current: 32
        //             }
        //         }, {
        //             isOnline: true,
        //             title: 'Аксесуар "расписная ширма"',
        //             count: {
        //                 buy: 0,
        //                 sell: 0
        //             },
        //             price: {
        //                 min: 120,
        //                 sell: 250,
        //                 current: 58
        //             }
        //         }
        //     ]);
        // });
        this.app.use((req, res, next) => {
            req.orm = this.orm;
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