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
    created() {
        axios.get('/api/tasks ')
            .then(response => (this.output = response.data))
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