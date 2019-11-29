const Parser = require('../Classes/Parser');
(async () => {
    const parser = new Parser();

    const config = {
        loginAs: 'vk' // 'vk' or 'mail' or 'ok'
    };

    await parser.init({
        viewport: {width: 1024, height: 900},
        launchOptions: {headless: false},
        credential: {
            vk: {login: 'bj91@bk.ru', password: 'sasha199112barakuda'},
            mail: {login: 'bj91', password: '199112barakuda', domen: 'bk.ru'}
        },
        links: {
            general: 'https://lootdog.io/'
        },
        timeout: 100000,
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
            mailFormLogin: '#auth > div.b-form-row.b-form-row_first > input',
            mailFormPass: '#auth > div:nth-child(3) > input',
            mailFormEnter: '#form > div.footer.footer_login > div > button.btn.btn_main.btn_stylish',
            mailFormSelector: '#auth > div.b-form-row.b-form-row_first > div > select',
            mailFormDomain: '#auth > div.b-form-row.b-form-row_first > div > select > option:nth-child(4)',
            modalContent: '#form > div.content',
            checkAccount: '#form > div.content > div.content__outer > div > div',
            /**mail.ru-end**/
            targetPrice: '#root > div > section > div > div.b-loading > div > div > div.b-product.row > div.col.span_7.b-product__col > div > div:nth-child(3) > div > div.b-product__purchase-price'
        }
    });

    await parser.openPage('general');
    await parser.waitFor('enter');
    await parser.clickAndWait('enter', 'modal');
    await parser.click('agreeCheckbox');
    /**login**/
    await parser.clickAndWait(`${config.loginAs}EnterWay`, `${config.loginAs}Form`);
    await parser.typeText(`${config.loginAs}FormLogin`, parser.credential[config.loginAs].login, 300);
    await parser.typeText(`${config.loginAs}FormPass`, parser.credential[config.loginAs].password, 300);
    config.loginAs === 'mail' && await parser.clickAndWait(`${config.loginAs}FormSelector`, 1000);
    config.loginAs === 'mail' && await parser.page.select(parser.selectors.formSelector, parser.credential.domen);
    config.loginAs === 'mail' && await parser.click('modalContent');
    console.log('pre enter');
    await parser.clickAndWait(`${config.loginAs}FormEnter`, `${config.loginAs}FormModal`);
    await parser.click(`${config.loginAs}FormCheckEnter`);
    /**login-end**/

    await parser.waitFor('targetPrice');
    const currentPrice =  await parser.getText('targetPrice');
})();
