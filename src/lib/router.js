class RouteMatcher {
    constructor(router) {
        this.router = router
    }

    match(path) {
        const key = this.router.lookup.find(p => path.match(p))
        return this.router.routes[key]
    }
}

class Router {
    constructor() {
        this.lookup = []
        this.routes = {}
        this.unrestrict('/client/.*')
    }

    addMapping(path, options) {
        const matcher = new RegExp(path)
        this.routes[matcher] = Object.assign({ path }, options)
        this.lookup.push(matcher)
    }

    restrict(path, scope) {
        this.addMapping(path, { scope })
        return this
    }

    unrestrict(path) {
        this.addMapping(path, { auth: false })
        return this
    }

    build() {
        return new RouteMatcher(this)
    }
}

const router = new Router()
    .unrestrict('.*:/login')
    .unrestrict('.*:/callback')
    .unrestrict('.*:/logout')
    .restrict('.*:/test.*', ['admin'])
    .restrict('.*:/admin.*', ['admin'])
    .unrestrict('.*:/.*', ['admin', 'user'])
    .build();

const guard = (path, user, opts) => {
    const match = router.match(path);
    if (match) {
        if (match.auth === false) {
            return {
                status: 200
            }
        }
        if (user) {
            const intersection = match.scope.filter(value => value == user.role);
            if (intersection.length) {
                return {
                    status: 200
                }
            } else {
                return {
                    status: 302,
                    redirect: '/'
                }
            }
        }
    }

    return {
        status: 302,
        redirect: opts?.login || '/'
    }
}
export default guard