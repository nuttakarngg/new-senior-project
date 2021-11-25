import { Link } from "react-router-dom";

export default function CardResearch(props) {
  console.log(props);
  return (
    <div className="card my-3 animate__animated  animate__fadeInRight">
      <div
        style={{ fontSize: "18px" }}
        className="card-header bg-primary text-white"
      >
        ระบบแนะนำผู้เชี่ยวชาญ ด้วยเทคนิคการทำเหมืองข้อมูล
      </div>
      <div className="card-body">
        <div className="row px-5">
          <div className="col-md-6">
            <p>
              <b>ปีงบประมาณ</b> 2565
            </p>
            <p>
              <b>สาขาที่เกี่ยวข้อง</b> วิทยาศาสตร์และเทคโนโลยี
            </p>
            <p>
              <b>ประเภทงบประมาณ</b> งบประมาณภายใน
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <b>ผลของการวิจัย</b> การวิจัยเพื่อถ่ายทอดเทคโนโลยี
            </p>
            <p>
              <b>งบประมาณ</b> 588900.00
            </p>
          </div>
        </div>
      </div>
      <Link
        to="/Database/ReseachDetails"
        type="button"
        className="btn btn-outline-azure btn-sm card-footer border-azure"
      >
        ข้อมูลเพิ่มเติม
      </Link>
    </div>
  );
}
