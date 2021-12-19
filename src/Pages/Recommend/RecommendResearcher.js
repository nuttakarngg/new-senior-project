import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const datatest = [
  {
    id: 1,
    researcherName: "Chaiyapol",
    researcherSurname: "Mahajan",
    percentage: 100,
  },
  {
    id: 2,
    researcherName: "Chaiyapol",
    researcherSurname: "Mahajan",
    percentage: 60,
  },
  {
    id: 3,
    researcherName: "Chaiyapol",
    researcherSurname: "Mahajan",
    percentage: 40,
  },
  {
    id: 4,
    researcherName: "Chaiyapol",
    researcherSurname: "Mahajan",
    percentage: 20,
  },
];

const checkpercentage = (percentage) => {
  if (percentage > 70) {
    return "text-success";
  } else if (percentage >= 40) {
    return "text-warning";
  } else if (percentage < 40) {
    return "text-danger";
  }
};

export default function RecommendResearcher() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "SET_DATA",
      payload: { navbar: ["/Database", "/RecommendResearcher"] },
    });
  });

  const rendertable = (datatest) => {
    return (
      <tr key={datatest.id}>
        <th scope="row">{datatest.id}</th>
        <td>{datatest.researcherName}</td>
        <td>{datatest.researcherSurname}</td>
        <td className={checkpercentage(datatest.percentage)}>
          <i className="fa fa-circle"></i> {datatest.percentage} %
        </td>
      </tr>
    );
  };

  return (
    <div className="container-xl">
      {/* -----------------MODAL----------------------------- */}
      <div
        class="modal modal-blur fade"
        id="modal-simple"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">เพิ่มข้อมูลโครงการวิจัย</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">ชื่อโครงการวิจัย</label>
                <input
                  type="text"
                  class="form-control"
                  name="example-text-input"
                  placeholder="กรุณาใส่ชื่อโครงการวิจัย"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">ประเภทงบประมาณ</label>
                <select class="form-select">
                  <option value="0" selected>
                    กรุณาเลือกประเภทงบประมาณ
                  </option>
                  <option value="1">งบประมาณภายนอก</option>
                  <option value="2">งบประมาณภายใน</option>
                  <option value="3">ทุนส่วนตัว</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">แหล่งทุน</label>
                <input
                  type="text"
                  class="form-control"
                  name="example-text-input"
                  placeholder="กรุณาใส่แหล่งทุน"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">ปีงบประมาณ</label>
                <input
                  type="text"
                  class="form-control"
                  name="example-text-input"
                  placeholder="กรุณาใส่ปีงบประมาณ"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn me-auto" data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* -----------------MODAL----------------------------- */}
      <div className="page-header d-print-none mt-3 ">
        <div className="row align-items-center">
          <div className="col mb-3">
            <h2 className="page-title">แนะนำผู้เชี่ยวชาญ</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header bg-primary d-flex justify-content-between">
                <span className="text-white">รายละเอียดงานวิจัย</span>
                <button
                  href="#"
                  className="btn btn-light"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-simple"
                >
                  <i className="fa fa-plus ms-2 me-2"></i>เพิ่มโครงการวิจัย
                </button>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div class="mb-3">
                      <div class="form-label">ชื่อโครงการวิจัย</div>
                      <select class="form-select">
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">แหล่งทุน</label>
                      <input
                        type="text"
                        class="form-control"
                        name="input-text-scholarowner"
                        placeholder="กรุณาเลือกชื่อโครงการวิจัย"
                        disabled
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">งบประมาณ</label>
                      <input
                        type="text"
                        class="form-control"
                        name="input-text-budget"
                        placeholder="กรุณาเลือกชื่อโครงการวิจัย"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-center">
                    <button type="button" className="btn btn-info mb-3 ">
                      ค้นหา
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="bg-primary text-white"
                            style={{ fontSize: "14px" }}
                          >
                            ลำดับ
                          </th>
                          <th
                            scope="col"
                            className="bg-primary text-white"
                            style={{ fontSize: "14px" }}
                          >
                            ชื่อผู้วิจัย
                          </th>
                          <th
                            scope="col"
                            className="bg-primary text-white"
                            style={{ fontSize: "14px" }}
                          ></th>
                          <th
                            scope="col"
                            className="bg-primary text-white"
                            style={{ fontSize: "14px" }}
                          >
                            ความเหมาะสม
                          </th>
                        </tr>
                      </thead>
                      <tbody>{datatest.map((data) => rendertable(data))}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
