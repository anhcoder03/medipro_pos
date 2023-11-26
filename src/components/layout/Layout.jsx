import React, { useEffect } from "react";
import { Header } from "./Header";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Layout = ({ children }) => {
  const auth = useSelector((state) => state.auth?.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth?.user) {
      navigate("/login");
      toast.warning("Đăng nhập để vào trang bán hàng!");
      return;
    }
  }, [auth]);
  return (
    <React.Fragment>
      <div className="bg-primary">
        <Header user={auth?.user}></Header>
      </div>
      <div className="mt-8 container">{children}</div>
    </React.Fragment>
  );
};

export default Layout;
