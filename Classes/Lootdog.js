const parser = new (require(`${ROOT_DIR}/Classes/Parser`))();

module.exports = class Lootdog {
    async init(struct) {
        this.orm = struct.orm;

        // const set = {
        //     viewport: {width: 1024, height: 900},
        //     credential: {
        //         vk: {login: 'bj91@bk.ru', password: 'sasha199112barakuda'},
        //         mail: {login: 'bj91', password: '199112barakuda', domen: 'bk.ru'}
        //     },
        //     generalLink: 'https://lootdog.io/'
        // };
        //
        // const newSettings = new orm.settings(set);
        // await newSettings.save();
        this.settings = (await this.orm.settings.findOne({}))._doc;

        await parser.init({
            ...this.settings,
            launchOptions: {headless: false},
            links: {
                general: this.settings.generalLink
            },
            timeout: 10000,
            selectors: {
                enter: '#menu_login_btn',
                modal: '.b-modal__content',
                agreeCheckbox: '#root > div > div.b-modal-overlay > div > div > div > div > div > div > div > div.b-auth__agree > span > input',
                /**vk**/
                vkEnterWay: '.b-auth__type-btn.b-auth__type-btn_vk',
                vkForm: '#oauth_wrap_content > div.oauth_head',
                vkFormLogin: '.oauth_form_input.dark[name="email"]',
                vkFormPass: '.oauth_form_input.dark[name="pass"]',
                vkFormEnter: '#install_allow',
                vkFormModal: '#oauth_wrap_content > div.oauth_head',
                vkFormCheckEnter: '#oauth_wrap_content > div.oauth_bottom_wrap > div > div.fl_r > button.flat_button.fl_r.button_indent',
                /**vk-end**/
                /**mail.ru**/
                mailEnterWay: '#root > div > div.b-modal-overlay > div > div > div > div > div > div > div > div.b-auth__types > div:nth-child(1) > a > span',
                mailForm: '#modal > div',
                mailFormLogin: '#auth > div.b-form-row.b-form-row_first > input',
                mailFormPass: '#auth > div:nth-child(3) > input',
                mailFormSelector: '#auth > div.b-form-row.b-form-row_first > div > select',
                mailFormDomain: '#auth > div.b-form-row.b-form-row_first > div > select > option:nth-child(4)',
                modalContent: '#form > div.content',
                checkAccount: '#form > div.content > div.content__outer > div > div',
                mailFormEnter: '#form > div.content > div.content__outer > div > div > span',
                /**mail.ru-end**/
                loginNameClass: '#root > div > header > div.b-header__user > div:nth-child(4) > div > div.b-header__user-link',
                targetPrice: '#root > div > section > div > div.b-loading > div > div > div.b-product.row > div.col.span_7.b-product__col > div > div:nth-child(3) > div > div.b-product__purchase-price',
                modalError: '#root > div > div.b-modal-overlay > div > button',
                buyButton: '#root > div > section > div > div > div.row > div > div.b-product.row > div.col.span_7.b-product__col > div > div:nth-child(3) > div > div.b-product__purchase-actions > a',
                buyModal: '#root > div > div.b-modal-overlay > div > div > div > div',
                buyAgreeCheckbox: '#root > div > div.b-modal-overlay > div > div > div > div > div.b-dialog__submit.b-dialog__submit_buy > span > input[type=checkbox]',
                buyModalWallet: '#root > div > div.b-modal-overlay > div > div > div > div > div:nth-child(4) > div > div > div:nth-child(1) > div > dl:nth-child(3) > dd',
                buyModalPrice: '#root > div > div.b-modal-overlay > div > div > div > div > div:nth-child(4) > div > div > div:nth-child(2) > div',
                buyModalButton: '#root > div > div.b-modal-overlay > div > div > div > div > div.b-dialog__submit.b-dialog__submit_buy > div > button.b-btn_blue.b-dialog__submit-btn.instant_buy_button > span',
                buyModalSuccess: '#root > div > div.b-modal-overlay > div > div > div > div > div.b-box.b-box_success > div > div > span'
            }
        });
    }

    async autorisation() {}

    async autorisation() {
        const loginAs = this.settings.loginAs;

        await parser.openPage('general');
        await parser.waitFor('enter');
        await parser.clickAndWait('enter', 'modal');
        await parser.click('agreeCheckbox');
        /**login**/
        await parser.clickAndWait(`${loginAs}EnterWay`, `${loginAs}Form`);
        await parser.typeText(`${loginAs}FormLogin`, parser.credential[loginAs].login, 1);
        await parser.typeText(`${loginAs}FormPass`, parser.credential[loginAs].password, 1);
        loginAs === 'mail' && await parser.clickAndWait(`${loginAs}FormSelector`, 1);
        loginAs === 'mail' && await parser.page.select(parser.selectors.mailFormSelector, parser.credential.mail.domen);
        loginAs === 'mail' && await parser.click('mailFormPass', 1000);
        loginAs === 'mail' && await parser.page.keyboard.press('Enter');
        console.log('pre enter');
        loginAs === 'mail' && await parser.waitFor(`${loginAs}FormEnter`);
        loginAs === 'mail' && await parser.click(`${loginAs}FormEnter`);
        console.log('past enter');

        loginAs === 'vk' && await parser.clickAndWait(`${loginAs}FormEnter`, `${loginAs}FormModal`);
        loginAs === 'vk' && await parser.click(`${loginAs}FormCheckEnter`);
        /**login-end**/
        await parser.waitFor('loginNameClass');
        console.log('Autorisation done');
    }

    async start() {
        await this.autorisation();
        //await this.loop();
        // при старте открываем окно, проходим регистрацию
        // достаем из базы все таски
        // по очереде парсер заходит на таску и проверяет
        //      если цена ниже заданного покупаем позволеное количество
        //      если цена выше заданного:
        //          есть на продажу товар,
        //              если есть - выставляем
        //              если нет - следующая итерация
    }

    async loop() {
        const tasks = await this.orm.products.find({});

        for(const task of tasks) {
            console.log(task);
            if (task.isOnline) {
                if (await parser.page.$(parser.selectors.modalError) !== null) {
                    await parser.click('modalError');
                    console.log('CLICK ON ERROR MODAL');
                }
                await parser.openPage(task.link);
                await parser.waitFor('targetPrice');
                const currentPrice = parseFloat(await parser.getText('targetPrice'));
                const data = await this.orm.products.updateOne({_id: task._id}, {$set: {'price.current': currentPrice}});

                currentPrice < task.price.min && await this.buy(task);

                console.log(`${task.link}: done. currentPrice = ${currentPrice}`, data);
            }
        }

        await this.loop();
    }

    async buy(task) {
        await parser.openPage(task.link);
        await parser.clickAndWait('buyButton', 'buyModal');
        const price = parseFloat(await parser.getText('buyModalPrice'));
        const wallet = parseFloat(await parser.getText('buyModalWallet'));
        if (price < wallet) {
            /*покупаем*/

        } else {
            /*показываем ошибку*/

        }
    }
};
