import React, { useEffect, useState } from "react";
import { IconSearch } from "./icons";
import { Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import PriceUtils from "../helper/PriceUtils";
import { getAllCustomer } from "../services/customer.service";
import Select from "react-select";
import { toast } from "react-toastify";
import { addOrder } from "../services/order.service";
import { resetPageCart } from "../store/slice/cartSlice";

export const Billing = () => {
  const dispatch = useDispatch();
  const [dataCustomers, setDataCustomers] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [note, setNote] = useState(null);
  const [customerId, setCustomerId] = useState();
  const cartIndex = useSelector((state) => state?.tabCart?.tabSelected);
  const price = useSelector((state) => state.cart[cartIndex]?.price);
  const products = useSelector((state) => state.cart[cartIndex]?.products);
  const user = useSelector((state) => state.auth?.auth?.user);
  async function getCustomers() {
    const response = await getAllCustomer({ _limit: 3000 });
    const ListArr = [];
    response?.docs?.map((e) => {
      ListArr?.push({
        ...e,
        value: e?._id,
        label: `${e?.name} - ${e?.phone}`,
      });
    });
    setDataCustomers(ListArr);
  }
  useEffect(() => {
    getCustomers();
  }, []);
  const handleOrder = () => {
    if (!products?.length) {
      return toast.error("Vui lòng chọn sản phẩm!");
    }
    if (!customerId) {
      return toast.error("Vui lòng chọn khách hàng!");
    }
    if (!paymentMethod) {
      return toast.error("Vui lòng chọn hình thức thanh toán");
    }
    const medicines = [];
    products?.map((item) => {
      medicines.push({
        medicineId: item?._id,
        quantity: item?.quantity,
        price: item?.price,
      });
    });
    const data = {
      medicines,
      customerId,
      orderType: 1,
      totalAmount: price,
      paymentStatus: 1,
      paymentMethod,
      status: 1,
      sellerId: user?._id,
      note,
    };
    console.log(data);
    return addOrder(data).then((r) => {
      if (r?.order) {
        dispatch(resetPageCart(cartIndex));
        return toast.success("Thanh toán thành công");
      }
      return toast.error("Đã có lỗi xảy ra");
    });
  };

  return (
    <div className="w-full bg-white shadow-lg text-black p-4 rounded-md">
      <h1 className="text-xl font-semibold pb-5 border-b border-b-gray-300">
        Thông tin thanh toán
      </h1>
      <div className="filter-search border border-gray-300 my-5 flex items-center bg-transparent   px-2 py-1 bg-white gap-2 rounded-lg h-[40px] max-w-[500px] relative w-full">
        <span className="absolute top-1/2 left-2 text-[#8181a5] -translate-y-1/2">
          <IconSearch></IconSearch>
        </span>
        <Select
          placeholder=""
          className=" w-full !border-none !text-xs hover:!border-transparent !bg-transparent react-select"
          classNamePrefix="hover:!border-transparent !border-none bg-transparent react-select"
          options={dataCustomers}
          onChange={(val) => {
            setCustomerId(val?._id);
          }}
        ></Select>
      </div>
      <div className="my-5 pb-5 border-b border-b-gray-300 flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <span>Tổng tiền hàng</span>
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-300">
            {products?.length}
          </span>
        </div>
        <span>{PriceUtils.format(price) ?? "0 đ"}</span>
      </div>
      <div className="flex items-center justify-between">
        <h3 className="text-[18px] font-semibold ">Khách cần trả</h3>
        <span className="text-[18px] font-bold text-[#ff7f00]">
          {PriceUtils.format(price) ?? "0 đ"}
        </span>
      </div>
      <div className="my-5">
        <h3 className="text-[18px] font-semibold ">Hình thức thanh toán</h3>
        <Radio.Group
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="mt-3"
        >
          <p className="mb-2">
            <Radio value={1}>Tiền mặt</Radio>
          </p>
          <p>
            <Radio value={2}>Chuyển khoản</Radio>
          </p>
        </Radio.Group>
        <div className="mt-5">
          <textarea
            className="outline-none border border-gray-300 w-full input-primary min-h-[100px] p-3 rounded-md "
            placeholder="Ghi chú"
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between gap-x-5 my-5">
          <button className="bg-primary50 w-[150px] py-3 rounded-md text-primary">
            In
          </button>
          <button
            className="bg-primary w-[200px] py-3 rounded-md text-white"
            onClick={() => handleOrder()}
          >
            Thanh toán
          </button>
        </div>
        <div className="mt-5">
          <p className="text-base font-medium text-center">
            Hotline Hỗ trợ khách hàng 1900 8989
          </p>
        </div>
      </div>
    </div>
  );
};
