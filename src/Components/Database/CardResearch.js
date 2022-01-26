import { Link } from "react-router-dom";

export default function CardResearch({
  researchId,
  researchNameTH,
  researchBudgetYear,
  users,
  researchBudgetType,
  researchResult,
  researchBudget,
}) {
  console.log(users);
  return (
    <div className="card my-3 animate__animated  animate__fadeInRight">
      <div
        style={{ fontSize: "18px" }}
        className="card-header bg-primary text-white"
      >
        {researchNameTH}
      </div>
      <div className="card-body">
        <div className="row px-5">
          <div className="col-md-6">
            <p>
              <b>ปีงบประมาณ</b> {researchBudgetYear}
            </p>
            <p>
              <b>สาขาที่เกี่ยวข้อง</b> {users[0]?.branch?.name_th}
            </p>
            <p>
              <b>ประเภทงบประมาณ</b> {researchBudgetType}
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <b>ผลของการวิจัย</b> {researchResult}
            </p>
            <p>
              <b>งบประมาณ</b> {researchBudget}
            </p>
          </div>
        </div>
      </div>
      <Link
        to={`/Database/ReseachDetails/${researchId}`}
        type="button"
        className="btn btn-outline-azure btn-sm card-footer border-azure"
      >
        ข้อมูลเพิ่มเติม
      </Link>
    </div>
  );
}
