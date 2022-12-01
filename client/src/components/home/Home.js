import React from "react";
import Banner from "../banner/Banner";
import BestSeller from "../bestSeller/BestSeller";
import Categories from "../categories/Categories";

const Home = () => {
  return (
    <div>
      <Banner />
      <BestSeller />
      <Categories />
    </div>
  );
};

export default Home;
