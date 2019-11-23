const parser = new Vue({
    el: '#parser',
    data: {
        title: '',
        count: {
            buy: null,
            sell: null
        },
        price: {
            min: null,
            sell: null,
            curent: null
        },
        link: '',
        output: null,
        isEdit: false,
        button: "Добавить",
        isLoading: true
    },
    async created() {
        this.output = (await new Promise((cb) => axios.get('/api/tasks').then(cb).then(this.isLoading = false).catch(error => console.log(error)))).data;
    },
    mounted() {

    },
    methods: {
        actionButton() {
            this.isEdit ? this.methods.sendTask("put") : this.methods.sendTask("post");
        },
        sendTask(method) {
            axios[method]('/api/task', {
                    body: {
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
                    }
                })
                .then(function(response) {
                    console.log(response);
                    this.button = "Добавить";
                    alert("Успешно отправленно");
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        edit(id) {
            this.isEdit = true;
            this.output.forEach((el) => {
                if (id === el._id) {
                    this.title = el.title;
                    this.count.buy = el.count.buy;
                    this.count.sell = el.count.sell;
                    this.price.min = el.price.min;
                    this.price.max = el.price.sell;
                    this.button = "Редактировать";
                }
            });
        }
    }
});