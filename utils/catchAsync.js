// CATCHING ERRORS IN ASYNC FUNCTIONS:
export const catchAsync = fn => {
    return (req, res, next) => {
      fn(req, res, next).catch(next) // this allows us to forehand our error which will happen in our promis to our global error handling middleware. We can get rid of the "try/catch" block in createTour. Async functions return promises, where the catch method can be used.
    }
}