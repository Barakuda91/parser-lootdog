Object.assign(global, {ROOT_DIR: '/var/www/freelancehunt/parser-lootdog'});

const lootdog = new (require(`${ROOT_DIR}/Classes/Lootdog`))();
const router = new (require(`${ROOT_DIR}/Classes/Router`))();
const orm = new (require(`${ROOT_DIR}/Classes/Orm`))();

(async () => {
    console.log('Start');

    await orm.init();
    console.log('orm.init');

    await orm.initModels();
    console.log('orm.initModels');

    await router.init({orm});
    console.log('router.init');

    await lootdog.init({orm});
    console.log('parser.init');

    await lootdog.start();
    console.log('lootdog.start');
})();
