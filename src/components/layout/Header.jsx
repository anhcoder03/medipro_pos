import React, { useEffect, useState } from "react";
import { IconMap, IconPlus, IconSearch } from "../icons";
import { FiChevronsDown } from "react-icons/fi";
import { BiUser, BiLogOut } from "react-icons/bi";
import useClickOutSide from "../../hooks/useClickOutSide";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addPageCart, deletePageCart } from "../../store/slice/cartSlice";
import { setTabSelect } from "../../store/slice/tabSlicce";
import { authLogout } from "../../store/auth/authSlice";
import ResultSearch from "../search";
import { useDebounce } from "@uidotdev/usehooks";
import { getAllProduct } from "../../services/medicine.service";

export const Header = ({ user }) => {
  const [searchValue, setSearchValue] = useState({
    _limit: 1000,
    _sort: "createdAt",
    _order: "desc",
    search: "",
  });
  const [resultSearch, setResultSearch] = useState([]);
  const debouncedSearchTerm = useDebounce(searchValue, 500);
  const cartPage = useSelector((state) => state.cart);
  const tabIndex = useSelector((state) => state?.tabCart?.tabSelected);
  const distpatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (debouncedSearchTerm) {
          const data = await getAllProduct(debouncedSearchTerm);
          setResultSearch(data.docs);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [debouncedSearchTerm]);

  const {
    show: showModal,
    setShow: setShowModal,
    nodeRef,
  } = useClickOutSide(".action-wrapper");
  const {
    show: searchShow,
    setShow: setSearchShow,
    nodeRef: searchRef,
  } = useClickOutSide(".searchResult");

  const handleLogout = () => {
    distpatch(authLogout());
    toast.success("Đăng xuất thành công!");
    navigate("/login");
  };

  const handleAddPageCart = () => {
    distpatch(
      addPageCart({
        tabId: cartPage?.length + 1,
        products: [],
        price: 0,
      })
    );
    distpatch(setTabSelect(cartPage?.length));
  };
  const handleSelectTab = (tabIndex) => {
    return distpatch(setTabSelect(tabIndex - 1));
  };

  const handleDeletePageCart = (tabIndex) => {
    if (cartPage == 0) return;
    distpatch(deletePageCart(tabIndex));
  };

  const handleChange = (event) => {
    setSearchValue({
      ...searchValue,
      search: event.target.value,
    });
  };

  return (
    <div className="container">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-[60%] gap-x-5">
          <div className=" filter-search flex items-center bg-transparent   px-2 py-1 bg-white gap-2 rounded-lg h-[40px] w-[500px] relative">
            <span className="absolute top-1/2 left-2 text-[#8181a5] -translate-y-1/2">
              <IconSearch></IconSearch>
            </span>
            <input
              ref={searchRef}
              onClick={() => {
                setSearchShow(!searchShow);
              }}
              value={searchValue.search}
              onChange={handleChange}
              type="text"
              className="w-full px-8 text-[#8181a5] bg-transparent border-none outline-none"
              placeholder="Tên hoặc mã sản phẩm"
            />
            <div className="searchResult">
              <ResultSearch
                data={resultSearch}
                show={searchShow}
              ></ResultSearch>
            </div>
          </div>
          <div className="w-1/2">
            <div className="tabCart flex items-center gap-x-2 max-w-1/2 overflow-x-scroll">
              {cartPage?.length > 0 &&
                cartPage?.map((item, index) => (
                  <div
                    className={`flex items-center justify-center p-4 gap-x-1 cursor-pointer ${
                      item.tabId - 1 == tabIndex
                        ? "bg-white text-primary"
                        : "bg-[#22222233] text-[#ffffffbf]"
                    }`}
                    key={item?.tabId}
                    onClick={() => handleSelectTab(item?.tabId)}
                  >
                    <span className="text-sm">Đơn hàng</span> {index + 1}
                    <span
                      className="h-4 text-center flex items-center justify-center w-4 rounded-full bg-gray81 text-white"
                      onClick={() => handleDeletePageCart(index)}
                    >
                      x
                    </span>
                  </div>
                ))}
              <div className="text-white" onClick={handleAddPageCart}>
                <span className="font-bold">
                  <IconPlus></IconPlus>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between w-[40%] gap-x-5 font-semibold">
          <h3 className="flex items-center gap-x-3 text-base">
            <span>
              <IconMap />
            </span>
            Phòng khám Dr.Medipro
          </h3>
          <div
            className="flex items-center justify-between gap-x-2"
            ref={nodeRef}
          >
            <img
              src={
                user?.avatar ||
                "https://images.unsplash.com/photo-1695192413426-af217f0324e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1NXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              }
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <div className="flex flex-col">
              <h4 className="font-bold text-white">{user?.name}</h4>
              <span className="text-sm">{user?.email}</span>
            </div>
            <div className="relative">
              <span
                onClick={() => {
                  setShowModal(!showModal);
                }}
                className="text-xl p-1 w-[30px] h-[30px] block cursor-pointer rounded-md bg-white"
              >
                <span className="text-gray81">
                  <FiChevronsDown />
                </span>
              </span>
              <div
                className={`action-wrapper absolute top-[50px] z-50 -left-[170px] bg-white rounded-md shadow-md text-gray81 flex-col w-[200px] ${
                  showModal ? "flex" : "hidden"
                }`}
              >
                <p
                  className="px-2 py-3 cursor-pointer flex items-center gap-x-3 font-semibold"
                  onClick={handleLogout}
                >
                  <span className="text-xl font-semibold">
                    <BiLogOut />
                  </span>
                  <span>Đăng xuất</span>
                </p>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
