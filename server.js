const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => res.sendFile(path.join(__dirname + '/views/index.html')));
router.put('/api/task', (req, res) => setTimeout(() => {res.send({ status: 'ok' })}, 3000));
router.post('/api/task', (req, res) => setTimeout(() => {res.send({ status: 'ok' })}, 3000));
router.post('/api/start', (req, res) => setTimeout(() => {res.send({ status: 'ok' })}, 3000));
router.post('/api/stop/', (req, res) => setTimeout(() => {res.send({ status: 'ok' })}, 3000));
router.get('/api/tasks', (req, res) => {

    setTimeout(() => {
        res.send([{
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
            },
            link: 'http://google.com',
            _id: 1
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
            },
            link: 'http://google.com',
            _id: 2
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
            },
            link: 'http://google.com',
            _id: 3
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
            },
            link: 'http://google.com',
            _id: 4
        }]);
    }, 3000);
});

app.use(express.static('static'));
app.use('/', router);

app.listen(4000, () => {
    console.log('App listening on port 4000!');
    console.log('visit http://localhost:4000');
    console.table({
        'get:/api/tasks': 'Get all tasks',
        'put :/api/task': 'Update task',
        'post:/api/task': 'Create task',
        'post:/api/start': 'For start task',
        'post:/api/stop': 'For stop task'
    });
});