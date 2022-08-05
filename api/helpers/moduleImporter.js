
class ModuleImporter{

    static import = async (className) => {
        let path;
        if(className.endsWith("Service")){
            path = `../services/${className.remove("Service").toLowerCase()}.service.js`;
        }
        else if (className.endsWith("Controller")){
            path = `../controllers/${className.remove("Controller").toLowerCase()}.controller.js`;
        }
        else{
            path = `../models/${className.toLowerCase()}.model.js`;
        }
        let moduleClass;
        await import(path)
            .then(module => {
                console.log(module);
                moduleClass = module[className]; 
            }).catch(() => {
                console.log(`Fail to import ${className}`)
            });
        
        return moduleClass;
    }

}
module.exports=ModuleImporter;