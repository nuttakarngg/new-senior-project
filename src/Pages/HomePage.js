import searchSVG from "../Assets/images/undraw_Online_friends_re_eqaj.svg";
import recommendSVG from "../Assets/images/undraw_Choose_re_7d5a.svg";
import signinSVG from "../Assets/images/undraw_Pie_chart_re_bgs8.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "SET_DATA", payload: { navbar: ["/HomePage"] } });
  });
  return (
    <div className=" container-xl">
      <div className="row">
        <div className="p-5 my-4 card bg-white animate__animated animate__zoomIn">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">ยินดีต้อนรับ</h1>
            <p className="col-md-8 fs-4">
              ระบบนี้เป็นส่วนหนึงของรายวิชา Senior Project
              ซึ่งเป็นต้นแบบของระบบแนะนำผู้เชี่ยวชาญ ด้วยเทคนิคการทำเหมืองข้อมูล
              โดยใช้กรณีศึกษาคณะวิทยาศาสตร์และเทคโนโลยี
              มหาวิทยาลัยเทคโนโลยีราชมงคลธัญบุรี
            </p>
            <button className="btn btn-primary btn-md" type="button">
              คู่มือการใช้งาน <i className="fas fa-book ms-2"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="page-header d-print-none mt-3 ">
        <div className="row align-items-center">
          <div className="col">
            <h2 className="page-title">เกี่ยวกับระบบของเรา</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-4 col-sm-12 my-3 d-flex align-items-stretch">
          <div className="card w-100 animate__animated animate__fadeInDown animate__delay-1s">
            <div className="empty">
              <div className="empty-img">
                <img src={searchSVG} height="128" alt="" />
              </div>
              <p className="empty-title">ค้นหาผู้เชี่ยวชาญ/งานวิจัย</p>
              <p className="empty-subtitle text-muted">
                สืบค้นข้อมูลผู้วิจัยหรืองานวิจัย
                เพื่อสนับสนุนการเลือกผู้เชี่ยวชาญในการจัดทำงานวิจัย
              </p>
              <div className="empty-action">
                <Link
                  to="/Database/SearchByResearcher"
                  className="btn btn-primary"
                >
                  <i className="fas fa-search me-2" />
                  สืบค้นทันที
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-sm-12 my-3 d-flex align-items-stretch">
          <div className="card w-100 animate__animated animate__fadeInDown animate__delay-2s">
            <div className="empty">
              <div className="empty-img">
                <img src={recommendSVG} height="128" alt="" />
              </div>
              <p className="empty-title">แนะนำผู้เชี่ยวชาญ</p>
              <p className="empty-subtitle text-muted">
                กรอกข้อมูลผู้เชี่ยวชาญ
                เพื่อสนับสนุนการเลือกผู้จัดทำงานวิจัยโดยรับคำแนะนำจากระบบ
              </p>
              <div className="empty-action">
                <Link
                  to="/Database/SearchByResearcher"
                  className="btn btn-primary"
                >
                  <i className="fas fa-user-tag me-2" />
                  เริ่มแนะนำทันที
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-sm-12 my-3 d-flex align-items-stretch">
          <div className="card w-100 animate__animated animate__fadeInDown animate__delay-3s">
            <div className="empty">
              <div className="empty-img">
                <img src={signinSVG} height="128" alt="" />
              </div>
              <p className="empty-title">นำเสนอผู้บริหาร</p>
              <p className="empty-subtitle text-muted">
                เข้าสู่ระบบเพื่อจัดการข้อมูล เรียกดูข้อมูล
                หรือเพื่อนำเสนอข้อมูลแก่ผู้บริหาร
              </p>
              <div className="empty-action">
                <Link to="/login" className="btn btn-primary">
                  <i className="fas fa-sign-in-alt me-2" />
                  เข้าสู่ระบบ
                </Link>
                <Link to="/Presents/Dashboard" className="btn btn-primary">
                  <i className="fas fa-sign-in-alt me-2" />
                  กระดานข้อมูล
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <p></p>
      </div>
    </div>
  );
}
