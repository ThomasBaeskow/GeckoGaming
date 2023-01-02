// Creating a Class to apply query methods filter, sort, limit, paginate
class APIFeatures {
    constructor(query, queryString) {
      this.query = query
      this.queryString = queryString
    }
  
    filter() {
      // filtering
      const queryObj = {...this.queryString} 
      console.log(queryObj);
      const excludedFields = ["page", "sort", "limit", "fields"]
      excludedFields.forEach(item => delete queryObj[item]) 
      // Advanced filtering
      let queryStr = JSON.stringify(queryObj) 
      console.log(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

      // console.log(JSON.parse(queryStr));
     
      this.query = this.query.find(JSON.parse(queryStr))
  
      return this;
    }
  
    sort() {
      if(this.queryString.sort) { // when sort exists in the query object
        const sortBy = this.queryString.sort.split(",").join(" ")
        console.log(sortBy);
        this.query = this.query.sort(sortBy) // we want to sort our query by the value of sort, which is price. ascending order:(127.0.0.1:3000/api/v1/tours?sort=price), descending order: (127.0.0.1:3000/api/v1/tours?sort=-price)
        // sort("price ratingAverage") --> when we want to sort by price and then by ratingAverage: (127.0.0.1:3000/api/v1/tours?sort=-price,-ratingAverage)
      } 
      // The following else code sorted my documents new after one get request. thats why i couldnt get the right results when im using 127.0.0.1:3000/api/v1/tours?page=2&limit=3 on Postman
    //   else {
    //     this.query = this.query.sort("-createdAt") // documents ordered by the dates they were created
    //   }
      return this;
    }
  
    limitFields() {
      // 3) Field limiting
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(",").join(" "); // (127.0.0.1:3000/api/v1/tours?fields=name,duration,difficulty,price) we select the fields name, duration, etc. WE can also exclude in query string like (127.0.0.1:3000/api/v1/tours?fields=name,-duration,-difficulty,price)
        console.log(fields);
        this.query = this.query.select(fields) // using select is called "Projection"
      } else {
        this.query = this.query.select("-__v") // the "-" means we are excluding the field __v
      }
      return this;
    }
  
    paginate() {
      // 4) Pagination
      const page = this.queryString.page * 1 || 1; // converts string to number and set default value of page to 1 if theres no value set to the field page in query string
      const limit = this.queryString.limit * 1 || 20; // converts string to number and set default value of limit to 10. Example: we have more then 1 million documents in our collection. We just wanna show the user 30 
      console.log(this.queryString);
      const skip = (page - 1) * limit; // if the user wants to see page 2 (page=2&limit=10) the calculation would be: skip = (2 - 1) * 10 ==> 10
      console.log(skip);
      // page=2&limit=10      1-10 page 1, 11-20 page 2, 21-30 page 3
      this.query = this.query.skip(skip).limit(limit); // means if we want to see page 2 we need to skip 10 docs, cause on page 1 are 1-10 docs and on page 2 are 11-20 docs. 10 by page cause of the limit field.
      return this;
    }
  }

  export default APIFeatures
