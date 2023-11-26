import React from "react";
import Layout from "../../components/layout/Layout";
import Cart from "../../components/Cart";
import { Product } from "../../components/Product";
import { Billing } from "../../components/Billing";

const Sell = () => {
  return (
    <Layout>
      <div className="flex  gap-x-8 ">
        <div className="flex flex-col gap-y-5 w-[70%]">
          <Cart />
          <Product />
        </div>
        <div className="w-[30%]">
          <Billing />
        </div>
      </div>
    </Layout>
  );
};

export default Sell;
