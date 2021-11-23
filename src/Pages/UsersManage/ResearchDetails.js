import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function ReseachDetails() {
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "SET_DATA",
      payload: { navbar: ["/Database", "/RecommendResearcher"] },
    });
  });
    return (
    <div>
      <div className="container-xl">
        <div className="page-header d-print-none mt-3 ">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header bg-primary">
                    <span className="text-white">รายละเอียดงานวิจัย</span>
                </div>
                <div className="card-body"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
