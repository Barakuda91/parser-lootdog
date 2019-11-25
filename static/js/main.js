const parser = new Vue({
    el: '#parser',
    errorAlert: 'Упс. Что-то пошло не так.',
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
        isLoading: true,
        status: null,
        start: 'start',
        stop: 'stop'
    },
    async created() {
        this.output = (await new Promise((cb) => axios.get('/api/tasks')
            .then(cb)
            .catch(error => console.log(error)))).data;
        this.isLoading = false
    },
    methods: {
        actionButton() {
            this.isEdit ? this.sendTask("put") : this.sendTask("post");
        },
        sendTask(method) {
            this.isLoading = true;
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
                .then((response) => {
                    this.button = "Добавить";
                    alert("Успешно отправленно");
                })
                .catch((error) => {
                    console.log(error);
                    alert(this.errorAlert);
                })
                .finally(() => this.isLoading = false);
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
                    this.link = el.link;
                    this.button = "Редактировать";
                }
            });
        },
        stopStatus(id) {
            this.isEdit = true;
            axios.post('/api/stop', {
                body: {
                    index: id,
                    status: this.stop
                }
            })
            .then((response) => alert("Статус изменён"))
            .catch(function(error) {
                console.log(error);
                alert(this.errorAlert);
            })
            .finally(() => this.isLoading = false);
        },
        startStatus(id) {
            this.isEdit = true;
            axios.post('/api/start', {
                body: {
                    index: id,
                    status: this.start
                }
            })
            .then((response) => alert("Статус изменён"))
            .catch((error) => {
                console.log(error);
                alert(this.errorAlert);
            })
            .finally(() => this.isLoading = false);
        }
    }
});