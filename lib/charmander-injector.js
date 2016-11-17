export default class CharmanderInjector{

    constructor(){
        this.dependencies = {};
    }

    getDependency(key){
        return this.dependencies[key];
    }

    register(key,value){
        this.dependencies[key] = value
    }
    
    fire(){
    
    }

}
