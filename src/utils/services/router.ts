
import Route from './route';


export default class Router {
    private static __instance: Router;

    _currentRoute: Route;

    private _rootQuery: string;

    routes: Route[];

    history: History;


    private constructor(rootQuery: string) {

        this.routes = [];
        this.history = window.history;
        this._rootQuery = rootQuery;
    }

    public static getInstance(rootQuery: string) {
        if (!Router.__instance) {
            Router.__instance = new Router(rootQuery);
        }
        return Router.__instance;
    }

    use(pathname: string, block: any) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });

        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = ((event: PopStateEvent) => {
            this._onRoute((event.currentTarget as Window).location.pathname);
        });

        // this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }

    getCurrentRoute() {
        return this._currentRoute;
    }
}