const parser = new Vue({
    el: '#parser',
    data: {
        message: 'You on the page',
        seconds: 0
    }
});

(() => {
    setInterval(() => parser.seconds++, 999);
})();
