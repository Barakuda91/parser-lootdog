const parser = new Vue({
    el: '#parser',
    data: {
        nameItem: '',
        countItemMin: null,
        countItemMax: null,
        priceItemMin: null,
        priceItemMax: null,
        linkItem: '',
        output: null,
    },
    // created() {
    //     axios.get('/api/tasks ')
    //         .then(response => (this.output = response.data.data))
    //         .catch(error => (console.log(error)));
    // },
    created() {
        axios.get('/api/tasks ')
            .then(response => (this.output = response.data.data))
            .catch(error => (console.log(error)));
    },
    mounted() {
        // setTimeout(function() {
        //     if (this.status == false) {
        //         this.error = true;
        //     } else {
        //         this.done = true;
        //     }
        // }, 0);
    },
    methods: {
        sendItem() {
            axios.post('/api/task', {
                        title: this.nameItem,
                        count: {
                            buy: this.countItemMin,
                            sell: this.countItemMax
                        },
                        price: {
                            sell: this.priceItemMax,
                            min: this.priceItemMin,
                            current: null
                        },
                        link: this.linkItem
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