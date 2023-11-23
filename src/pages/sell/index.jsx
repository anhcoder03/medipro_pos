import React from "react";
import Layout from "../../components/layout/Layout";
import Cart from "../../components/Cart";
import { Product } from "../../components/Product";
import { Billing } from "../../components/Billing";

const Sell = () => {
  return (
    <Layout>
      <div>
        <div>
          <Cart />
          <Product />
        </div>
        <Billing />
      </div>
    </Layout>
  );
};

export default Sell;
