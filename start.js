Object.assign(global, {ROOT_DIR: '/var/www/freelancehunt/parser-lootdog'});

const router = new (require(`${ROOT_DIR}/Classes/Router`))();
const orm = new (require(`${ROOT_DIR}/Classes/Orm`))();

(async () => {
    console.log('Start 1');

    await orm.init();
    console.log('orm.init 1');
    await orm.initModels();
    console.log('orm.initModels 1');
    await router.init({orm});

    console.log('finish');
})();
