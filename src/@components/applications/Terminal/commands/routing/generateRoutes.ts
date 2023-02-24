export default (routes: Routes): (() => GeneratedRoutes) => () => ((map => {
    for (const { name, ...route } of routes) {
        map.set(name, route as Route);
    }

    return map;
})(new Map<string, Route>()))