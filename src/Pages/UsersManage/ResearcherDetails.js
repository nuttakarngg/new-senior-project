import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getResearchById } from "../../services/research.service";
import { getUserById } from "../../services/user.service";

export default function ReseacherDetails() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [research, setResearch] = useState([]);
  //   console.log(id);
  const fetchUser = () => {
    getUserById(id).then((result) => {
      if (result.status === 200) {
        setUserData(result.data.data);
      }
    });
  };
  const fetchResearch = () => {
    getResearchById(id).then((result) => {
      if (result.status === 200) {
        setResearch(result.data.data);
      }
    });
  };
  const _mapResearch = (item, index) => {
    console.log(item);
    console.log(item.users[0].researchs_researchers.gtype);
    return (
      <Link
        style={{ textDecoration: "none", color: "black" }}
        className="card-table-row "
        key={index}
        to={`/Database/ReseachDetails/${item.researchId}`}
      >
        <span className="col-md-10">
          {index + 1}. {item.researchBudgetYear} :{item.researchNameTH}
        </span>
        <span
          className={
            " my-auto " + item.users[0].researchs_researchers.gtype ===
            "หัวหน้าโครงการวิจัย"
              ? "bg-danger"
              : item.users[0].researchs_researchers.gtype ===
                "ผู้ร่วมโครงการวิจัย"
              ? "bg-danger"
              : "bg-warning"
          }
        >
          {item.users[0].researchs_researchers.gtype}
        </span>
      </Link>
    );
  };
  useEffect(() => {
    fetchUser();
    fetchResearch();
  }, []);
  return (
    <div className="container-xl py-4">
      <div className="row">
        <div className="col-md-3 col-12">
          <div className="card animate__animated animate__slideInLeft my-2">
            <div className="card-header bg-primary">
              <span className="text-white">ข้อมูลผู้ใช้งาน</span>
            </div>
            <div className="card-body">
              <img src="/img/no-user.jpg" className="img-user-responsive" />
              <div className="m-3">
                <h4>ชื่อ-นามสกุล (ภาษาไทย)</h4>
                <p>
                  {userData.firstNameTH || "-"} {userData.lastNameTH || "-"}
                </p>
                <h4>ชื่อ-นามสกุล (ภาษาไทย)</h4>
                <p>
                  {userData.firstNameEN || "-"} {userData.lastNameEN || "-"}
                </p>
                <h4>ตำแหน่งทางวิชาการ</h4>
                <p>{userData.ac_position || "-"}</p>
                <h4>คณะ/สาขา/หน่วยงาน</h4>
                <p>{userData.branch?.name_th || "-"}</p>
                <h4>โทรศัพท์</h4>
                <p>{userData.phone || "-"}</p>
                <h4>อีเมล</h4>
                <p>{userData.email || "-"}</p>
                <h4>หน่วยงาน</h4>
                <p>{userData.institution || "-"}</p>
                <h4>สาขาที่มีความชำนานการ</h4>
                <p>{userData.exportOf || "-"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9 col-12 my-2">
          <div className="card animate__animated animate__slideInRight">
            <div className="card-header bg-primary d-flex align-items-center justify-content-between">
              <span className="text-white">โครงการงานวิจัย</span>
            </div>
            <div className="card-body p-0">
              {research.length === 0 ? (
                <div className="card-body">
                  <p>ยังไม่มีผลงาน</p>
                </div>
              ) : (
                research.map((item, index) => _mapResearch(item, index))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
