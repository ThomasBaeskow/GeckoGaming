import axios from "axios"

// Getting data of IPHONES

// const options = {
//     method: 'GET',
//     url: 'https://amazon24.p.rapidapi.com/api/product',
//     params: {
//       categoryID: '20972781011',
//       keyword: 'Video Games',
//       country: 'US',
//       page: '1',
//       refinementID: 'n:468642,n:20972781011,n:20972797011'
//     },
//     headers: {
//       'X-RapidAPI-Key': '512c41bee6msh34a47e7b9ce1480p1fe0a4jsnaaffa48cc661',
//       'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
//     }
//   };
  
//   axios.request(options).then(function (response) {
//       console.log(response.data);
//   }).catch(function (error) {
//       console.error(error);
//   });




// isBestSeller:false
// product_title:"MSI GV15 15.6" 144Hz Gaming Laptop: Intel Core i5-11400H GTX 1650 8GB 256GB NVMe SSD, Wi-Fi 6, USB Type-C, Nahimic 3 Audio Immersion, Win 11: Black 11SC-633"
// product_main_image_url:"https://m.media-amazon.com/images/I/81cP2qZckeL._AC_UL320_.jpg"
// app_sale_price:null
// app_sale_price_currency:null
// isPrime:false
// product_detail_url:"https://www.amazon.com/dp/B09S4NBX1Z"
// product_id:"B09S4NBX1Z"
// evaluate_rate:"4.5 out of 5 stars"
// original_price:null

// isBestSeller:true
// product_title:"No Man's Sky - PlayStation 5"
// product_main_image_url:"https://m.media-amazon.com/images/I/71uKPJmC8yL._AC_UY218_.jpg"
// app_sale_price:null
// app_sale_price_currency:null
// isPrime:false
// product_detail_url:"https://www.amazon.com/dp/B0B4KN54RQ"
// product_id:"B0B4KN54RQ"
// evaluate_rate:"3.6 out of 5 stars"
// original_price:null

// isBestSeller:false
// product_title:"LEGO Star Wars: The Skywalker Saga - Standard Edition - Xbox Series X & Xbox One"
// product_main_image_url:"https://m.media-amazon.com/images/I/81Aj6NzwKAL._AC_UY218_.jpg"
// app_sale_price:null
// app_sale_price_currency:null
// isPrime:false
// product_detail_url:"https://www.amazon.com/dp/B07SH37MFG"
// product_id:"B07SH37MFG"
// evaluate_rate:"4.8 out of 5 stars"
// original_price:null





// SHOWING CATEGORIES


// const options = {
//   method: 'GET',
//   url: 'https://amazon24.p.rapidapi.com/api/category',
//   params: {country: 'US'},
//   headers: {
//     'X-RapidAPI-Key': '512c41bee6msh34a47e7b9ce1480p1fe0a4jsnaaffa48cc661',
//     'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });