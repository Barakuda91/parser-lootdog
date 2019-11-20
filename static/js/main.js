const parser = new Vue({
    el: '#parser',
    data: {

    }
});

(() => {
    setInterval(() => parser.seconds++, 999);
})();
