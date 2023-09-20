import React from "react";

// components

import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";

export default function Settings() {
  return (
    <>
      <div className="container-fluid">
        <div className="row column_title">
          <div className="col-md-12">
            <div className="page_title">
              <h2>Settings</h2>
            </div>
          </div>
        </div>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div>
      </div>
      </div>
    </>
  );
}
