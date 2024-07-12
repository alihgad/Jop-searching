class AppError extends Error {
    constructor(message,status){
       super(message) 
       this.status = status == undefined ? 500 : status 
    }
}

export default AppError;