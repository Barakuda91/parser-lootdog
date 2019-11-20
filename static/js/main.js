const parser = new Vue({
    el: '#parser',
    data: {
        nameItem: '',
        countItemMin: null,
        countItemMax: null,
        priceItemMin: null,
        priceItemMax: null,
        linkItem: '',
    },
    methods: {
        
    }
});

(() => {
    setInterval(() => parser.seconds++, 999);
})();
