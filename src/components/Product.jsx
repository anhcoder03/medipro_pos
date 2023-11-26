import React, { useEffect, useState } from "react";
import { IconCate, IconFilter } from "./icons";
import { getAllProduct } from "../services/medicine.service";
import PriceUtils from "../helper/PriceUtils";
import { useDispatch, useSelector } from "react-redux";
import { updateCartByTabId } from "../store/slice/cartSlice";

export const Product = () => {
  const [products, setProducts] = useState([]);
  const tabId = useSelector((state) => state?.tabCart?.tabSelected);
  const dispatch = useDispatch();
  const handleGetProducts = async () => {
    try {
      const data = await getAllProduct({ _limit: 1000 });
      setProducts(data.docs);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetProducts();
  }, []);

  const handleAddCart = (product) => {
    return dispatch(
      updateCartByTabId({
        tabId,
        product: {
          _id: product?._id,
          price: product?.price,
          quantity: 1,
          name: product?.name,
        },
      })
    );
  };

  return (
    <div className="bg-white rounded-md shadow-md text-black h-[300px] overflow-hidden mb-[90px] p-4">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-3 p-3">
            <span>
              <IconCate></IconCate>
            </span>
            <span>
              <IconFilter />
            </span>
          </div>
        </div>
        <div className="list-item">
          {products?.length > 0 &&
            products?.map((item) => (
              <div key={item?._id} onClick={() => handleAddCart(item)}>
                <div className="product-item w-[130px] ">
                  <img
                    className="w-[100px] h-[100px] object-cover rounded"
                    src={`${
                      item?.image
                        ? item?.image
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                    } `}
                    alt=""
                  />
                  <div className="product-info">
                    <p className="name">{item?.name}</p>
                    <p className="price">{PriceUtils.format(item?.price)}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
