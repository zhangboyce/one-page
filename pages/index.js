import * as  filters from './filters';
import utils from './utils';
import Router from './Router';
import './index.css';

window.nunjucks.configure('.', {
    autoescape: true
});

const __load__ = function (htmlPath, originData, filters) {
    const app = this;

    return function (newData, refresh) {
        if (refresh) {
            app.utils.unmount.call(app, app.history.current());
        } else {
            let prev = app.history.prev();
            if (prev) {
                app.utils.destroy.call(app, prev);
                app.utils.unmount.call(app, prev);
            }
            app.utils.create.call(app, app.history.current());
        }

        const data = Object.assign({ }, originData, newData, filters);
        const html = window.nunjucks.render(htmlPath, { ...data });
        app.$app.html(html);

        app.utils.mount.call(app, app.history.current());

        console.log('[app] refreshed: ', originData, newData, data);
    }
};

let app = {
    // env: 'pro',
    env: 'dev',
    data: {
        openid: '',
        wxMsg: '',
        isMember: false
    },

    $app: null,
    pages: {},
    history: null,

    init: function () {
        this.$app = $('#app');

        let pages = ['page1', 'page2'];
        for (let i = 0; i < pages.length; i++) {
            let page = pages[i];
            require('./' + page + '/index.js').default(this);

            Router.route('/' + page, function (query) {
                app.go(page, query);
            });
            if (i === 0) {
                Router.route('/', function (query) {
                    app.go(page, query);
                });
            }
        }

        this.utils = utils(this);
        this.history = this.utils.history();
    },

    go: function (path, params) {
        const htmlPath = `./${ path }/index.html`;
        const page = this.pages[path];
        this.history.push(path);

        // 将page页面定义的data和参数合并成一个新的data对象传给页面
        let pageData = (page && page['data']) || {};
        let data = Object.assign({}, pageData, params);

        // 对全部data进行变化监听，如果发生变化，执行__refresh__重新刷新页面
        let loadFtn = __load__.call(this, htmlPath, data, {filters: this.filters || {}});
        page.data = this.utils.watchData(data, loadFtn);

        // 加载当前页面
        loadFtn({}, false);
    },
    filters: filters
};

app.init();
// app.go('home');