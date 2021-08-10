import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CardResearcher from "../../Components/Database/CardResearcher";

export default function Search() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "SET_DATA",
      payload: { navbar: ["/Database", "/SearchByResearcher"] },
    });
  });
  return (
    <div className="container-xl">
      <div className="page-header d-print-none mt-3 ">
        <div className="row align-items-center">
          <div className="col">
            <h2 className="page-title">ค้นหาผู้เชี่ยวชาญ</h2>
          </div>
        </div>
      </div>
      <div className="row justify-content-around">
        <div className="col-md-3 col-sm-12 my-3">
          <div className="card animate__animated animate__fadeIn">
            <div className="card-header bg-primary">
              <span className="text-white">ตัวกรองข้อมูล</span>
            </div>
            <div className="card-body">
              <div>
                <label className="form-label">คีย์เวิร์ด</label>
                <div className="input-group">
                  <input type="text" className="form-control"></input>
                  <button className="btn btn-outline-secondary" type="button">
                    <i className="fas fa-search" />
                  </button>
                </div>
                <small>*ชื่อ-นามสกุล, หน่วยงาน</small>
              </div>
              <div className="mt-3">
                <label classname="form-label">ตำแหน่งทางวิชาการ</label>
                <select type="text" className="form-select">
                  <option value="HTML">ทั้งหมด</option>
                  <option value="HTML">ศาสตราจารย์</option>
                  <option value="JavaScript">ผู้ช่วยศาสตราจารย์</option>
                </select>
              </div>
              <div className="mt-3">
                <span className="form-label">สาขาวิชาที่เกี่ยวข้อง</span>
                <label className="form-check">
                  <input className="form-check-input" type="checkbox" />
                  <span className="form-check-label">สาขา 1</span>
                </label>
                <label className="form-check">
                  <input className="form-check-input" type="checkbox" />
                  <span className="form-check-label">สาขา 2</span>
                </label>
                <label className="form-check">
                  <input className="form-check-input" type="checkbox" />
                  <span className="form-check-label">สาขา 3</span>
                </label>
                <label className="form-check">
                  <input className="form-check-input" type="checkbox" />
                  <span className="form-check-label">สาขา 4</span>
                </label>
                <label className="form-check">
                  <input className="form-check-input" type="checkbox" />
                  <span className="form-check-label">สาขา 5</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8 col-sm-12">
          <CardResearcher />
          <CardResearcher />
          <CardResearcher />
          <CardResearcher />
          <CardResearcher />
          <CardResearcher />
          <CardResearcher />
        </div>
      </div>
    </div>
  );
}
