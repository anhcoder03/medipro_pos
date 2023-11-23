import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Sell from "./pages/sell";
import LoadingPage from "./components/common/LoadingPage";

function App() {
  const router = createBrowserRouter([{ path: "", element: <Sell /> }]);
  return (
    <React.Fragment>
      {/* <Suspense fallback={<LoadingPage />}> */}
      <RouterProvider router={router} />
      {/* </Suspense> */}
    </React.Fragment>
  );
}

export default App;
