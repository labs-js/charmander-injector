import CharmanderInjector from '../lib/charmander-injector';

describe('charmander-injector', () => {

    var charmander;

    beforeEach(() => {
        charmander = new CharmanderInjector();
    });

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

        it('should inject dependency into object', () => {

            var dummyDependencies = {
                'dependency': {
                    value: 'this is a dummy obj'
                }
            }

            spyOn(charmander, 'getDependency').andReturn(dummyDependencies.dependency);

            console.log('getDependency', charmander.getDependency('saraza'));

            var result = charmander.inject(
                ['dependency'], (dependency) => {
                
                    console.log(dependency); 
                },this);

            console.log(result.arguments);

        });
    });

});
