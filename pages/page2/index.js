import './index.css';

export default function (app) {
    app.pages.page2 = {
        data: {
            title: '',
        },

        /**
         * calling this life-circle function
         * when loaded this page, ex: app.go(), router.route.
         */
        created: function() {
            app.utils.get('/api/page2/data').then((data) => {
                if(data && data.status === "ok"){
                    this.data.title = data.title;
                }
            });
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