import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getResearchById } from "../../services/research.service";
import moment from 'moment';
import 'moment/locale/th';

export default function ReseachDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params);
  moment.locale('th');

  const [research, setResearch] = useState({})

  const fetchReseach = async () => {
    getResearchById(params.id).then((result) => {
      setResearch(result.data.data[0]);
      console.log(result.data)
    });
  };

  useEffect(() => {
    fetchReseach();
  },[])

  useEffect(() => {
    
    dispatch({
      type: "SET_DATA",
      payload: { navbar: ["/Database", "/SearchByResearch"] },
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
                        <span>{ research.researchNameTH }</span>
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">
                          ชื่องานวิจัย (ภาษาอังกฤษ)
                        </label>
                        <span>{ research.researchNameEN }</span>
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">ผลของงานวิจัย</label>
                        <span>{research.researchResult}</span>
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">ประเภทของงบประมาณ</label>
                        <span>{ research.researchBudgetType }</span>
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">ประเภทของทุนวิจัย</label>
                        <span>{research.researchScholarOwner}</span>
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">
                          ชื่อโครงการของทุนวิจัย
                        </label>
                        <span>{research.researchScholarName}</span>
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">ประเภทของงานวิจัย</label>
                        <span>{research.researchType}</span>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <div className="row mb-3">
                        <div className="col">
                          <label className="form-label">จำนวนงบประมาณ</label>
                          <span>{research.researchBudget} บาท</span>
                        </div>
                        <div className="col">
                          <label className="form-label">
                            งบประมาณสำหรับผู้เชี่ยวชาญ
                          </label>
                          <span>{research.researchBudgetResearcher} บาท</span>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <label className="form-label">
                            งบประมาณสำหรับผู้ช่วย
                          </label>
                          <span>{research.researchBudgetAssResearcher} บาท</span>
                        </div>
                        <div className="col">
                          <label className="form-label">งบประมาณอื่นๆ</label>
                          <span>{research.researchBudgetETC} บาท</span>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <label className="form-label">วันที่เริ่มวัจัย</label>
                          <span> {moment(research.researchStartDate).format('Do MMMM YYYY')}</span>
                        </div>
                        <div className="col">
                          <label className="form-label">
                            วันที่สิ้นสุดการวิจัย
                          </label>
                          <span>{moment(research.researchEndDate).format('Do MMMM YYYY')}</span>
                        </div>
                        <div className="col">
                          <label className="form-label">ปีงบประมาณ</label>
                          <span>{research.researchBudgetYear}</span>
                        </div>
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">วันที่มีการเซ็นสัญญา</label>
                        <span>{moment(research.researchContractDateSign).format('Do MMMM YYYY')}</span>
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">สถานะงานวิจัย</label>
                        <span>{research.researchStatus}</span>
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">บริษัทที่ร่วมการวิจัย</label>
                        <span>{research.researchJoinCompany}</span>
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
