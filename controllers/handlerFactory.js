import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
// import APIFeatures from "../utils/apiFeatures.js";


export const factoryDeleteOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id)

    if (!doc) { // if tour is false. means tour value "null" is not a truthy value. --> false
      return next(new AppError("No document found with that ID", 404)) // we need return, because we want to end the circle and not res.status(responding) the tour with false ID to the client. (user)
    }

    res.status(204).json({
      // statuscode 204 = no content
      status: 'success',
      data: null,
    });
});

export const factoryCreateOne = Model => catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body) // this is shorthand for belows code
    // const tour = req.body
    // const newTour = new Tour(tour)
    // await newTour.save()
    res.status(201).json({
      status: 'success',
      data: {
        data: newDoc
    },
    })
}) 

export const factoryUpdateOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    if (!doc) { // if tour is false. means tour value "null" is not a truthy value. --> false
      return next(new AppError("No document found with that ID", 404)) // we need return, because we want to end the circle and not udating th tour with wrong ID given by user
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      },
    });
});

// here its different because we got a "populate" inside our getTour middleware in our tourController.js. We solve this by passing as second argument an object with populate options.
export const factoryGetOne = (Model, popOptions) => catchAsync(async (req, res, next) => {
    // const id = req.params.id * 1; // this is a trick which converts automatically a string to a number, when it gets multiplied with a number.
  // const tour = tours.filter((item) => item.id === id); // filters the object with the fitting id property from the array and returns it.

    //   const doc = await Model.findById(req.params.id).populate("reviews")
    let query = Model.findById(req.params.id) 
    // if (popOptions) query = query.populate(popOptions)
    const doc = await query
  
    if (!doc) { // if tour is false. means tour value "null" is not a truthy value. --> false
      return next(new AppError("No document found with that ID", 404)) // we need return, because we want to end the circle and not res.status(responding) the tour with false ID to the client. (user)
    }

  // we read this object with the fitting id to the client.
    res.status(200).json({
    status: 'success',
    data: {
      data: doc
    },
  });
})


export const factoryGetAll = Model => catchAsync(async (req, res, next) => {
    // we need this here to allow nested GET reviews on tour! (hack)
    // let filter = {} // we create a filter object which we pass in our find method, if we have a route with tourI in params. (create Review on tour/get reviews on tour)
    // if (req.params.userId) filter = {user: req.params.userId}

    // console.log(req.query);
    // EXECUTE QUERY: here we can just delete one of the methods if we dont want to apply them.
    // const features = Model.find()

    // const doc = await features.query.explain() // .explain() shows more infos about the query
    const doc = await Model.find()

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      result: doc.length,
    //   results: doc.length, // just do this if you read an array with multiple objects inside.
      data: {
        data: doc
      },
    });
});