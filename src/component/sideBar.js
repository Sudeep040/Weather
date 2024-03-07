import React from "react";
import "./style.css";

export default function SideBar() {
  return (
    <div className=" d-none d-md-flex justify-content-between h-100 flex-column theme px-4 py-3 rounded-4 text-white">
      {" "}
      <div>
        <div className=" py-2 cursor">
          <i class="fas fa-bars"></i>
        </div>
        <div className=" py-2 cursor">
          <i class="fas fa-map-marker"></i>
        </div>
        <div className=" py-2 cursor">
          <i class="fas fa-cloud"></i>
        </div>
        <div className=" py-2 cursor">
          <i class="fas fa-bolt"></i>
        </div>
        <div className=" py-2 cursor">
          <i class="fas fa-cog"></i>
        </div>
      </div>
      <div>
        <i class="fas fa-sign-out-alt cursor"></i>
      </div>
    </div>
  );
}
