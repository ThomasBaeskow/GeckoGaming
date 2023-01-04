import React from 'react'
import Banner from "../../components/banner/Banner"
import BestSeller from "../../components/bestSeller/BestSeller"
import Categories from "../../components/categories/Categories"

const Home = () => {
  
  return (
    <div>
      <Banner/>
      <BestSeller/>
      <Categories />
    </div>
  )
}

export default Home