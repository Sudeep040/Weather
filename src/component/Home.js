import { useEffect, useState } from "react";
import SideBar from "./sideBar";
import Main from "./main";

export default function Home() {
  return (
    <>
      <div className=" d-flex p-3 p-md-5  h-100  h ">
        <SideBar />
        <Main />
      </div>
    </>
  );
}
