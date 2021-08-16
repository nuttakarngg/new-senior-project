export default function CardResearcher() {
    return (
        <div className="card my-3 animate__animated  animate__fadeInRight">
        <div className="card-header bg-primary text-white">
          นายณัฐกานต์ สัธนานันต์
        </div>
        <div className="card-body">
          <div className="row px-5">
            <div className="col-md-6">
              <p>
                <b>เบอร์โทร</b> 0861350XXX
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
          className="btn btn-outline-azure btn-sm card-footer border-azure"
        >
          ข้อมูลเพิ่มเติม
        </button>
      </div>
    );
  }
  