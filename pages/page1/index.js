import './index.css';

export default function (app) {
    app.pages.page1 = {
        data: {
            title: '',
            items: [
                { name: 'item1' }
            ]
        },

        /**
         * calling this life-circle function
         * when loaded this page, ex: app.go(), router.route.
         */
        created: function() {
            this.data.title = 'this page is created.' + Date.now();
        },

        /**
         * calling this life-circle function when will refresh this page
         * ex: this data is changed.
         * note: cannot update data in this function.
         */
        unmounted: function() {
        },

        /**
         * calling this life-circle function when refreshed this page.
         * ex: this data is changed.
         * note: cannot update data in this function.
         */
        mounted: function() {
            $('input[type=button]').click(() => {
                let value = $('input[name=item]').val();
                value = value && value.trim();
                this.data.items = [...this.data.items, { name: value }]
            });

            let page = this;
            $('ul li span').click(function () {
                let i = $(this).data('index');
                let items = [...page.data.items];
                items.splice(i, 1);
                page.data.items = items;
            });
        },

        /**
         * calling this life-circle function when leave this page.
         *  ex: app.go(), router.route.
         *  note: cannot update data in this function.
         */
        destroyed: function() {
        }
    };
};