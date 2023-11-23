import React from "react";
import { Header } from "./Header";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div>
        <Header></Header>
      </div>
      <div>{children}</div>
    </React.Fragment>
  );
};

export default Layout;
