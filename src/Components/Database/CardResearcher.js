export default function CardResearcher({ email, firstNameTH, lastNameTH,ac_position ,institution ,expertOf}) {
  return (
    <div className="card my-3 animate__animated  animate__fadeInRight">
      <div style={{fontSize:'18px'}} className="card-header bg-primary text-white">
        {firstNameTH} {lastNameTH}
      </div>
      <div className="card-body">
        <div className="row px-5">
          <div className="col-md-6">
            <p>
              <b>เบอร์โทร</b> 0861350XXX
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
      <button
        type="button"
        className="btn btn-outline-azure btn-sm card-footer border-azure"
      >
        ข้อมูลเพิ่มเติม
      </button>
    </div>
  );
}
