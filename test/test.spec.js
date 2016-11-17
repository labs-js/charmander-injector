import CharmanderInjector from '../lib/charmander-injector';

describe('charmander-injector', () => {

    var charmander;

    beforeEach(() => {
        charmander = new CharmanderInjector();
    });

    describe('register', () => {
        it('should be defined', ()=>{
            expect(charmander.register).toBeDefined();
        });


        it('should register dependency', () => {
            var dummyInquirer = {name:"dummy inquirer"},
                dummyExec = {name:"dummy exec"};

            charmander.register('inquirer', dummyInquirer);
            charmander.register('exec', dummyExec);


            expect(charmander.dependencies['inquirer']).toBeDefined();
            expect(charmander.dependencies['exec']).toBeDefined();
        });

    });
});
