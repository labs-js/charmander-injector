import charmander from '../lib/index.js';

describe('charmander-injector', function() {

    describe('register', function() {

        it('should be defined', function() {
            expect(charmander.register).toBeDefined();
        });


        it('should register dependency', function() {
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

    describe('inject', function() {

        it('should be defined', function() {
            expect(charmander.inject).toBeDefined();
        });

        it('should inject dependency', function() {

            var dummyDependencies = {
                'dependency': {
                    test: 'this is a test value'
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

            //clean spy
            this.removeAllSpies();
        });
    });


    describe('register mock dependency', function() {


        it('should be defined', function() {
            expect(charmander.registerMock).toBeDefined();
        });

        it('should register mock dependency', function() {

            var dummyDependency = {
                test: 'should be a mock dependency'
            }

            charmander.registerMock('dependency', dummyDependency);

            expect(charmander.dependencies['dependency'].mock).toBe(dummyDependency);

        });
    });

    describe('getDependency', function() {

        it('mock dependency', function() {

            var mockDependencies = {

                dependency: {
                    mock: {
                        test: 'this is a test value'
                    }
                }
            }

            spyOn(charmander, 'getDependencies').andReturn(mockDependencies);

            var result = charmander.getDependency('dependency');

            expect(result).toBe(mockDependencies.dependency.mock);

            //clean
            this.removeAllSpies();
        });

        it('get normal dependency', function() {

            var mockDependencies = {
                dependency: {
                    test: 'this is a test value'
                }
            }

            spyOn(charmander, 'getDependencies').andReturn(mockDependencies);

            var result = charmander.getDependency('dependency');

            expect(result).toBe(mockDependencies.dependency);

            //clean
            this.removeAllSpies();



        });

    });
});
