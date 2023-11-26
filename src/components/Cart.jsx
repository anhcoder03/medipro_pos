import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PriceUtils from "../helper/PriceUtils";
import { IconTrash } from "./icons";
import {
  decreaseQuantity,
  deleteCartByTabId,
  increaseQuantity,
} from "../store/slice/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartIndex = useSelector((state) => state?.tabCart?.tabSelected);
  console.log(cartIndex);
  const carts = useSelector((state) => state.cart[cartIndex]?.products);
  useEffect(() => {}, [cartIndex]);
  const handleDeleteCart = (_id) => {
    dispatch(
      deleteCartByTabId({
        tabIndex: cartIndex,
        _id,
      })
    );
  };
  const handleIncrement = (_id) => {
    dispatch(
      increaseQuantity({
        tabIndex: cartIndex,
        _id,
      })
    );
  };
  const handleDecrement = (_id) => {
    dispatch(
      decreaseQuantity({
        tabIndex: cartIndex,
        _id,
      })
    );
  };
  return (
    <div className="bg-white shadow-md rounded-md">
      <div className="table-wrapper">
        <table className="table">
          <thead className="bg-[#f4f6f8]">
            <tr>
              <th>STT</th>
              <th>Mã sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {carts?.length > 0 &&
              carts.map((item, index) => (
                <tr key={item?._id}>
                  <td>{index + 1}</td>
                  <td>{item?._id}</td>
                  <td>{item?.name}</td>
                  <td className="flex items-center gap-x-2">
                    <button
                      className="text-2xl font-boldflex items-center justify-center px-3 py-1 bg-[#f4f6f8] text-gray-500  rounded-lg"
                      onClick={() => handleDecrement(item?._id)}
                    >
                      -
                    </button>
                    <span className="w-[70px] p-2 inline-block border border-gray-300 text-center rounded-md">
                      {item?.quantity}
                    </span>
                    <button
                      className="text-xl font-bold flex items-center justify-center px-3 py-1 bg-[#f4f6f8] text-gray-500 rounded-lg"
                      onClick={() => handleIncrement(item?._id)}
                    >
                      +
                    </button>
                  </td>
                  <td>
                    <span>{PriceUtils.format(item?.price)}</span>
                  </td>
                  <td className="flex items-center gap-x-2">
                    <span>
                      {PriceUtils.format(item?.price * item?.quantity)}
                    </span>
                    <span
                      className="cursor-pointer"
                      onClick={() => handleDeleteCart(item?._id)}
                    >
                      <IconTrash />
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
