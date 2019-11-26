const puppeteer = require('puppeteer');

module.exports = class Parser {
    async init(struct) {
        Object.assign(this, struct);

        this.browser = await puppeteer.launch(this.launchOptions);
        this.page = await this.browser.newPage();

        this.page.setDefaultTimeout(this.timeout || 0);

        this.viewport && this.page.setViewport(this.viewport);
    }

    async openPage(link) {
        await this.page.goto(this.links[link] || link);
    }

    async click(selector) {
        await this.page.click(this.selectors[selector] || selector).catch(console.log);
    }

    async waitFor(selector) {
        await this.page.waitFor(this.selectors[selector] || selector).catch(console.log);
    }

    async clickAndWait(clickSelector, waitSelector) {
        await this.click(clickSelector);
        await this.waitFor(waitSelector);
    }

    async typeText(selector, text, delay = 0) {
        await this.page.focus(this.selectors[selector] || selector);
        await this.page.keyboard.type(text, {delay});
    }

    async getText(selector) {
        let spanElement;

        spanElement = await this.page.$$(this.selectors[selector]);
        spanElement = spanElement.pop();
        spanElement = await spanElement.getProperty('innerText');

        return await spanElement.jsonValue()
    }
};
