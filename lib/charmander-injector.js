export default class CharmanderInjector {

    constructor() {
        this.dependencies = {};
    }

    register(key, value) {
        this.dependencies[key] = value
    }

    getDependency(key) {
        return this.dependencies[key];
    }

    inject(depsToInject, func, scope) {
        var functionArgs = [];

        for (var i = 0; i < depsToInject.length; i++) {
            var dep = depsToInject[i];
            functionArgs.push(this.getDependency(dep).value);
        }

        return () => {
            func.apply(scope || {}, functionArgs)
        };

    }

}
