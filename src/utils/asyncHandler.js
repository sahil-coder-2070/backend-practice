//same method my promise

const asyncHandler = (requestHandler) => {
    //req and res will be there and promise will perform as like res will run the func and cath will throw err
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}


export default asyncHandler

//This is for calling fn as fn

/*
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        res.state(err.code || 500).jons({
            success: false,
            message: err.message
        })
    }
}

*/