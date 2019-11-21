Object.assign(global, {ROOT_DIR: '/var/www/freelancehunt/parser-lootdog'});

const parser = new (require(`${ROOT_DIR}/Classes/Parser`))();
const router = new (require(`${ROOT_DIR}/Classes/Router`))();
const orm = new (require(`${ROOT_DIR}/Classes/Orm`))();

(async () => {
    console.log('Start 1');

    await orm.init();
    console.log('orm.init 1');

    await orm.initModels();
    console.log('orm.initModels 1');

    await router.init({orm});
    console.log('router.init 1');

    await parser.init({orm});
    console.log('parser.init 1');
})();
