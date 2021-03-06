class CharmanderInjector {

    constructor() {
        this.dependencies = {};
    }

    register(key, value) {
        const dependency = this.getDependencies()[key];

        if (!dependency || !dependency.mock) {
            this.getDependencies()[key] = value;
        }
    }

    getDependencies() {
        return this.dependencies;
    }

    getDependency(key) {
        const dependency = this.getDependencies()[key],
            mockDependency = dependency.mock;

        if (mockDependency) {
            return mockDependency;
        }

        return dependency;
    }

    registerMock(key, value) {
        this.dependencies[key] = {
            'mock': value
        };
    }

    inject(depsToInject, func, scope) {
        let functionArgs = [];

        for (let i = 0; i < depsToInject.length; i++) {
            let dep = depsToInject[i],
                depValue = this.getDependency(dep);

            if (depValue.mock) {
                functionArgs.push(depValue.mock);
            } else {
                functionArgs.push(this.getDependency(dep));
            }
        }

        return function() {
            return func.apply(scope || {}, functionArgs);
        };

    }

}

module.exports = new CharmanderInjector();
