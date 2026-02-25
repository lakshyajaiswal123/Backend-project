
//here we use promise method
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err));
    };
};

export { asyncHandler };
//making a asyncHAndler for the wrapper so basically user give the code in synchandler and we test

// we use try and catch function this code
// const asyncHandler = (fn) =>async(req,res,next) => {

//     try{
//         await fn(req,res,next)
//     }
//     catch (error){
//         res.status(error.code || 500).json({
//             success:false,
//             message:error.message
//         })
//     }
// }
