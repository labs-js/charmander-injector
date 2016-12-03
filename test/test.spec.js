import charmander from '../lib/index.js';

describe('charmander-injector', function() {
    'use strict';
    describe('register', function() {

        it('should be defined', function() {
            expect(charmander.register).toBeDefined();
        });


        it('should register dependency', function() {
            let dummyInquirer = {
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

        it('shouldnt register dependency if mock dependency is present', function() {

            let originalDummyDependency = {
                test: 'this is a original test value'
            };

            let dummyDependencies = {
                dependency: {
                    mock: {
                        test: 'this is a test value'
                    }
                }
            };

            spyOn(charmander, 'getDependencies').andReturn(dummyDependencies);

            charmander.register('dependency', originalDummyDependency);

        });
    });

    describe('inject', function() {

        it('should be defined', function() {
            expect(charmander.inject).toBeDefined();
        });

        it('should inject dependency', function() {

            let dummyDependencies = {
                'dependency': {
                    test: 'this is a test value'
                }
            };

            spyOn(charmander, 'getDependency').andReturn(dummyDependencies.dependency);

            let result = charmander.inject(
                ['dependency'],
                function(dependency) {
                    return dependency;
                }, this);

            let expectedResult = result();
            expect(expectedResult).toBe(dummyDependencies.dependency);

            //clean spy
            this.removeAllSpies();
        });

        it('should inject mock  dependency', function() {

            let dummyDependencies = {
                'dependency': {
                    mock: {
                        test: 'this is a test value'
                    }
                }
            };

            spyOn(charmander, 'getDependency').andReturn(dummyDependencies.dependency);

            let result = charmander.inject(
                ['dependency'],
                function(dependency) {
                    return dependency;
                }, this);

            let expectedResult = result();
            expect(expectedResult).toBe(dummyDependencies.dependency.mock);

            //clean spy
            this.removeAllSpies();
        });


    });


    describe('register mock dependency', function() {


        it('should be defined', function() {
            expect(charmander.registerMock).toBeDefined();
        });

        it('should register mock dependency', function() {

            let dummyDependency = {
                test: 'should be a mock dependency'
            };

            charmander.registerMock('dependency', dummyDependency);

            expect(charmander.dependencies['dependency'].mock).toBe(dummyDependency);

        });
    });

    describe('getDependency', function() {

        it('mock dependency', function() {

            let mockDependencies = {

                dependency: {
                    mock: {
                        test: 'this is a test value'
                    }
                }
            };

            spyOn(charmander, 'getDependencies').andReturn(mockDependencies);

            let result = charmander.getDependency('dependency');

            expect(result).toBe(mockDependencies.dependency.mock);

            //clean
            this.removeAllSpies();
        });

        it('get normal dependency', function() {

            let mockDependencies = {
                dependency: {
                    test: 'this is a test value'
                }
            };

            spyOn(charmander, 'getDependencies').andReturn(mockDependencies);

            let result = charmander.getDependency('dependency');

            expect(result).toBe(mockDependencies.dependency);

            //clean
            this.removeAllSpies();

        });

    });
});
