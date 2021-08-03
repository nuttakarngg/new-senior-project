import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Search() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "SET_DATA",
      payload: { navbar: ["/Database", "/Search"] },
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
          <div className="card h-100 animate__animated animate__fadeIn">
            <div className="card-header bg-primary">
              <span className="text-white">ตัวกรองข้อมูล</span>
            </div>
            <div className="card-body">
              <div>
                <label className="form-label">คีย์เวิร์ด</label>
                <input type="text" className="form-control"></input>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8 col-sm-12">
          <div className="card my-3 animate__animated  animate__fadeInRight">
            <div className="card-header bg-primary text-white">
              นายณัฐกานต์ สัธนานันต์
            </div>
            <div className="card-body">
              <div className="row px-5">
                <div className="col-md-6">
                  <p>
                    <b>ปีงบประมาณ</b> 2574
                  </p>
                  <p>
                    <b>ตำแหน่งทางวิชาการ</b> ผู้ช่วยศาสตราจารย์
                  </p>
                  <p>
                    <b>หน่วยงาน</b> คณะครุศาสตร์อุตสาหกรรม
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <b>เบอร์โทร</b> 0861350XXX
                  </p>
                  <p>
                    <b>อีเมล</b> pond064@hotmail.com
                  </p>
                  <p>
                    <b>สาขาวิชาที่มีความชำนาญการ</b> อบรมพนักงานและบุคลากร
                    ด้านการบริหารจัดการคุณภาพและใช้โปรแกรมคอมพิวเตอร์
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-outline-azure btn-sm card-footer"
            >
              ข้อมูลเพิ่มเติม
            </button>
          </div>
          <div className="card my-3 animate__animated  animate__fadeInRight">
            <div className="card-header bg-primary text-white">
              นายณัฐกานต์ สัธนานันต์
            </div>
            <div className="card-body">
              <div className="row px-5">
                <div className="col-md-6">
                  <p>
                    <b>ปีงบประมาณ</b> 2574{" "}
                  </p>
                  <p>
                    <b>ตำแหน่งทางวิชาการ</b> ผู้ช่วยศาสตราจารย์
                  </p>
                  <p>
                    <b>หน่วยงาน</b> คณะครุศาสตร์อุตสาหกรรม
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <b>เบอร์โทร</b> 0861350XXX
                  </p>
                  <p>
                    <b>อีเมล</b> pond064@hotmail.com
                  </p>
                  <p>
                    <b>สาขาวิชาที่มีความชำนาญการ</b> อบรมพนักงานและบุคลากร
                    ด้านการบริหารจัดการคุณภาพและใช้โปรแกรมคอมพิวเตอร์
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-outline-azure btn-sm card-footer"
            >
              ข้อมูลเพิ่มเติม
            </button>
          </div>
          <div className="card my-3 animate__animated  animate__fadeInRight">
            <div className="card-header bg-primary text-white">
              นายณัฐกานต์ สัธนานันต์
            </div>
            <div className="card-body">
              <div className="row px-5">
                <div className="col-md-6">
                  <p>
                    <b>ปีงบประมาณ</b> 2574{" "}
                  </p>
                  <p>
                    <b>ตำแหน่งทางวิชาการ</b> ผู้ช่วยศาสตราจารย์
                  </p>
                  <p>
                    <b>หน่วยงาน</b> คณะครุศาสตร์อุตสาหกรรม
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <b>เบอร์โทร</b> 0861350XXX
                  </p>
                  <p>
                    <b>อีเมล</b> pond064@hotmail.com
                  </p>
                  <p>
                    <b>สาขาวิชาที่มีความชำนาญการ</b> อบรมพนักงานและบุคลากร
                    ด้านการบริหารจัดการคุณภาพและใช้โปรแกรมคอมพิวเตอร์
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-outline-azure btn-sm card-footer"
            >
              ข้อมูลเพิ่มเติม
            </button>
          </div>
          <div className="card my-3 animate__animated  animate__fadeInRight">
            <div className="card-header bg-primary text-white">
              นายณัฐกานต์ สัธนานันต์
            </div>
            <div className="card-body">
              <div className="row px-5">
                <div className="col-md-6">
                  <p>
                    <b>ปีงบประมาณ</b> 2574{" "}
                  </p>
                  <p>
                    <b>ตำแหน่งทางวิชาการ</b> ผู้ช่วยศาสตราจารย์
                  </p>
                  <p>
                    <b>หน่วยงาน</b> คณะครุศาสตร์อุตสาหกรรม
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <b>เบอร์โทร</b> 0861350XXX
                  </p>
                  <p>
                    <b>อีเมล</b> pond064@hotmail.com
                  </p>
                  <p>
                    <b>สาขาวิชาที่มีความชำนาญการ</b> อบรมพนักงานและบุคลากร
                    ด้านการบริหารจัดการคุณภาพและใช้โปรแกรมคอมพิวเตอร์
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-outline-azure btn-sm card-footer"
            >
              ข้อมูลเพิ่มเติม
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
