var app = new Vue({
    el: '#app',
    data: {
        items: null,
        keyword: '',
        date: '',
        message: ''
    },
    // ウォッチャで変化があれば発火するように監視
    watch: {
        keyword: function(newKeyword, oldKeyword) {
            this.message = '検索中です...'
            // debouncedGetAnswer関数を発火
            this.debouncedGetAnswer()
        }
    },
    created: function() {
        // 変化が起きた3秒後に発火
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 3000)
    },
    methods:{
        getAnswer: function() {
            if(this.keyword === ''){
                this.items = null
                this.message = ''
            }

            this.message = 'Loadng...'
            var vm = this
            console.log(this);
            var params = { page: 1, per_page: 10, query: this.keyword }
            axios.get('https://qiita.com/api/v2/items', { params })
            .then(function(response){
                vm.items = response.data
            })
            .catch(function(error){
                vm.messae = 'Error!' + error
            })
            .finally(function() {
                vm.message = ''
            })
        }
    }
})