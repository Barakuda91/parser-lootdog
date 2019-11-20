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
        sendItem() {
            axios.post('/api/task', {
                    body: [
                        this.nameItem,
                        this.countItemMin,
                        this.countItemMax,
                        this.priceItemMin,
                        this.priceItemMax,
                        this.linkItem
                    ]
                })
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
});