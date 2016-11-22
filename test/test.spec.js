import charmander from '../lib/index.js';

describe('charmander-injector', () => {

    describe('register', () => {
        it('should be defined', () => {
            expect(charmander.register).toBeDefined();
        });


        it('should register dependency', () => {
            var dummyInquirer = {
                    name: "dummy inquirer"
                },
                dummyExec = {
                    name: "dummy exec"
                };

            charmander.register('inquirer', dummyInquirer);
            charmander.register('exec', dummyExec);

            expect(charmander.dependencies['inquirer']).toBeDefined();
            expect(charmander.dependencies['exec']).toBeDefined();
        });
    });

    describe('inject', () => {

        it('should be defined', () => {
            expect(charmander.inject).toBeDefined();
        });

        it('should inject dependency', () => {

            var dummyDependencies = {
                'dependency': {
                    test:'this is a test value'
                }
            }

            spyOn(charmander, 'getDependency').andReturn(dummyDependencies.dependency);

            var result = charmander.inject(
                ['dependency'],
                function(dependency) {
                    return dependency;
                }, this);

            var expectedResult = result();
            expect(expectedResult).toBe(dummyDependencies.dependency);
        });
    });

});
