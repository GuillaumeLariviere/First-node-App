class Extenders {
    static initialize = ()=>{
        
        JSON.tryParse = function(text){
            let result;
            try{
                result = JSON.parse(text);
            }
            catch(error){
                console.log(error, text);
            }
            return result;
        }
        
        Date.prototype.toShortDateString = function(sep = '/'){
            let date = this.toJSON().slice(0,10);
            return date.slice(8, 10) + sep 
                    + date.slice(5, 7) + sep 
                    + date.slice(0, 4);
        }
        
        Array.prototype.first = function(){
            return [...this].shift();
        }
        Array.prototype.last = function(){
            return [...this].pop();
        }
        
        String.prototype.remove = function(pattern) {
            return this.replace(pattern, "");
        }
        
    }
   
    
    
}
module.exports = Extenders;
