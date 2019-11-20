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
    // const newProduct = new orm.products(        {
    //     isOnline: false,
    //     title: 'Shine diamond',
    //     count: {
    //         buy: 10,
    //         sell: 2
    //     },
    //     price: {
    //         min: 200,
    //         sell: 210,
    //         current: 198
    //     }
    // });
    // await newProduct.save();
    console.log('finish');
})();
