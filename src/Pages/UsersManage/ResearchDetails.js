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
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 col-sm-12">
                      <div className="mb-3">
                        <label className="form-label">
                          ชื่องานวิจัย (ภาษาไทย)
                        </label>
                        <span>ทดสอบ</span>
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">
                          ชื่องานวิจัย (ภาษาอังกฤษ)
                        </label>
                        <span>ทดสอบ</span>
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">ผลของงานวิจัย</label>
                        <span>ทดสอบ</span>
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">ประเภทของงบประมาณ</label>
                        <span>ทดสอบ</span>
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">ประเภทของทุนวิจัย</label>
                        <span>ทดสอบ</span>
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">
                          ชื่อโครงการของทุนวิจัย
                        </label>
                        <span>ทดสอบ</span>
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">ประเภทของงานวิจัย</label>
                        <span>ทดสอบ</span>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <div className="row mb-3">
                        <div className="col">
                          <label className="form-label">จำนวนงบประมาณ</label>
                          <span>ทดสอบ</span>
                        </div>
                        <div className="col">
                          <label className="form-label">
                            งบประมาณสำหรับผู้เชี่ยวชาญ
                          </label>
                          <span>ทดสอบ</span>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <label className="form-label">
                            งบประมาณสำหรับผู้ช่วย
                          </label>
                          <span>ทดสอบ</span>
                        </div>
                        <div className="col">
                          <label className="form-label">งบประมาณอื่นๆ</label>
                          <span>ทดสอบ</span>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <label className="form-label">วันที่เริ่มวัจัย</label>
                          <span>ทดสอบ</span>
                        </div>
                        <div className="col">
                          <label className="form-label">
                            วันที่สิ้นสุดการวิจัย
                          </label>
                          <span>ทดสอบ</span>
                        </div>
                        <div className="col">
                          <label className="form-label">ปีงบประมาณ</label>
                          <span>ทดสอบ</span>
                        </div>
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">วันที่มีการเซ็นสัญญา</label>
                        <span>ทดสอบ</span>
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">สถานะงานวิจัย</label>
                        <span>ทดสอบ</span>
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">บริษัทที่ร่วมการวิจัย</label>
                        <span>ทดสอบ</span>
                      </div>
                    </div>
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
