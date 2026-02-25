class ApiError extends Error {
    constructor(
        statusCode ,
        message = "Something went wrong",
        errors = [] ,
        statck= ""
     )
        //constructor override
        {
            super(message)
            this.statusCode = statusCode
            this.data = null
            this.message = message
            this.success =false;
            this.errors = errors

            //production grade

            // jo bhi code likh rha h usko pata chala jaaye yha yha error aarha h 
            if(statck){
                this.stack = statck
            }

            else{
                Error.captureStackTrace(this,this.constructor)
            }
        }
        
}

export {ApiError}