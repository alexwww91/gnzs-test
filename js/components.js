Vue.component('dropdown', {
    data() {
        return {
            options: [
                { text: 'Не выбрано', value: 'inactive' },
                { text: 'Сделка', value: 'active' },
                { text: 'Контакт', value: 'active' },
                { text: 'Компания', value: 'active' },
            ],
            selected: 'inactive',
            buttonStatus: ['active', 'inactive', 'load'],
            currentButtonStatus: 'inactive',
            essence: '',
            results: [],
        }
    },
    template: `<div><select class="select" @change="changeCurrentButtonStatus($event)">
    <option v-for="(option, i) in options" :key="'option' + i" :id="'list-' + i" :value="option.value" :selected="i === 0 ? 'selected' : ''">{{ option.text }}</option>
    </select>
    <button v-if="currentButtonStatus == 'inactive'" class="inactive">Создать</button>
    <button v-else-if="currentButtonStatus == 'active'" class="active" @click="getResult(essence)">Создать</button>
    <button v-else-if="currentButtonStatus == 'load'" class="load"><i class="fa fa-circle-o-notch fa-spin" style="color: #fcfcfc;" aria-hidden="true"></i></button>
    <div v-for="(result, i) in results" :key="'option' + result.id" :style="i % 2 == 0 ? 'background: #4c8bf77a' : ''" class="result">
    <p>{{ result.essence }} {{ result.id }}</p>
    </div>
    </div>`,
    methods: {
        changeCurrentButtonStatus(status) {
            this.essence = status.target.selectedOptions[0].id; //получаем ID выбранного option
            return this.currentButtonStatus = status.target.value;
        },
        getResult(ess) {
            let essence = ess;
            if (essence == 'list-1') {
                console.log(1);
                this.currentButtonStatus = 'load';
                this.getPostData();
            } else if (essence == 'list-2') {
                console.log(2);
                this.currentButtonStatus = 'load';
                this.getPostData();
            } else if (essence == 'list-3') {
                console.log(3);
                this.currentButtonStatus = 'load';
                this.getPostData();
            }
        },
        async postData(url = '', data = {}) {
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: "action=" + data.action
            });
            return await response.json();
        },
        getPostData() {
            this.postData('server.php', { action: this.essence })
                .then((data) => {
                    console.log(data);
                    this.results.push(data);
                    this.currentButtonStatus = 'active';
                });
        }
    },
    computed: {

    },
    created() {
        console.log('dropdown');
    },
});

/*Vue.component('buton', {
    props: ['value'],
    data() {
        return {
            buttonStatus: ['active', 'inactive', 'load'],
            currentButtonStatus: 'inactive',
        }
    },
    template: `<button v-if="currentButtonStatus == 'inactive'" class="inactive">Создать</button>
    <button v-else-if="currentButtonStatus == 'active'" class="active">Создать 1</button>
    <button v-else-if="currentButtonStatus == 'load'" class="load">Загрузка</button>`,
    methods: {
    },
    computed: {
        changeCurrentButtonStatus(status) {
            return currentButtonStatus = status;
        },
    },
    created() {
        console.log(this.value);
    },
});*/

/*Vue.component('result', {
    data() {
        return {
            result: [1, 2],
        }
    },
    template: `<div>{{ result[result.length - 1] }}</div>`,
});*/