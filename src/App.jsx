import { useState } from "react";
import DataForm from "./DataForm";
import DataList from "./DataList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Update from "./Update";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DataForm />}></Route>
          <Route path="/read" element={<DataList />}></Route>
          {/* <Route path="/update" element={<Update />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
