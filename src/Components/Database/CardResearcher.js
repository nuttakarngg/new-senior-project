import { Link } from "react-router-dom";

export default function CardResearcher({ email, firstNameTH, lastNameTH,ac_position ,institution ,expertOf,id,phone}) {
  console.log(id);
  return (
    <div className="card my-3 animate__animated  animate__fadeInRight">
      <div style={{fontSize:'18px'}} className="card-header bg-primary text-white">
        {firstNameTH} {lastNameTH}
      </div>
      <div className="card-body">
        <div className="row px-5">
          <div className="col-md-6">
            <p>
              <b>เบอร์โทร</b> {phone || "ไม่มี"}
            </p>
            <p>
              <b>ตำแหน่งทางวิชาการ</b> {ac_position}
            </p>
            <p>
              <b>หน่วยงาน</b> {institution || "-"}
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <b>อีเมล</b> {email}
            </p>
            <p>
              <b>สาขาวิชาที่มีความชำนาญการ</b> {expertOf || "-"}
            </p>
          </div>
        </div>
      </div>
      <Link to={`/Database/ReseacherDetails/${id}`}
        type="button"
        className="btn btn-outline-azure btn-sm card-footer border-azure"
      >
        ข้อมูลเพิ่มเติม
      </Link>
    </div>
  );
}
