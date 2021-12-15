import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getResearchById } from "../../services/research.service";
import moment from "moment";
import "moment/locale/th";
import { editResearch } from "../../services/research.service";
import { toast } from "react-toastify";

export default function ReseachDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  // console.log(params);
  moment.locale("th");

  const [research, setResearch] = useState({});
  const [editresearch, setEditResearch] = useState({
    researchNameTH: false,
    researchResult: false,
    researchNameEN: false,
    researchBudgetType: false,
    researchScholarOwner: false,
    researchScholarName: false,
    researchType: falsecd ,
  });

  const fetchReseach = async () => {
    getResearchById(params.id).then((result) => {
      setResearch(result.data.data[0]);
      console.log(result.data);
    });
  };

  const updateResearch = (research, callback) => {
    console.log(research);
    editResearch(research, research.id).then((result) => {
      console.log(result.data);
      if (result.status === 200) {
        callback();
        fetchReseach();
        toast.success("อัปเดทข้อมูลวิจัยสำเร็จ");
      }
    });
  };

  useEffect(() => {
    fetchReseach();
  }, []);

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
                        {!editresearch.researchNameTH ? (
                          <div>
                            <span>{research.researchNameTH}</span>
                            <button
                              type="button"
                              className="button-profile"
                              onClick={() =>
                                setEditResearch({
                                  ...editresearch,
                                  researchNameTH: true,
                                })
                              }
                            >
                              <i className="fas fa-pen text-warning ms-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="d-flex align-items-center">
                            <div className="d-flex w-100 justify-content-between">
                              <input
                                type="text"
                                value={research.researchNameTH}
                                className="profile-name-edit  profile-input"
                                onChange={(e) =>
                                  setResearch({
                                    ...research,
                                    researchNameTH: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <button
                              type="button"
                              className="button-profile"
                              onClick={() =>
                                updateResearch(
                                  {
                                    researchNameTH: research.researchNameTH,
                                    id: research.researchId,
                                  },
                                  () =>
                                    setEditResearch({
                                      ...editresearch,
                                      researchNameTH: false,
                                    })
                                )
                              }
                            >
                              <i
                                className="fas fa-save text-success"
                                style={{ fontSize: 17 }}
                              />
                            </button>
                            <button
                              type="button"
                              className="button-profile"
                              onClick={() =>
                                fetchReseach(() =>
                                  setEditResearch({
                                    ...editresearch,
                                    researchNameTH: false,
                                  })
                                )
                              }
                            >
                              <i
                                className="fas fa-times text-danger"
                                style={{ fontSize: 17 }}
                              />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">
                          ชื่องานวิจัย (ภาษาอังกฤษ)
                        </label>
                        {!editresearch.researchNameEN ? (
                          <div>
                            <span>{research.researchNameEN}</span>
                            <button
                              type="button"
                              className="button-profile"
                              onClick={() =>
                                setEditResearch({
                                  ...editresearch,
                                  researchNameEN: true,
                                })
                              }
                            >
                              <i className="fas fa-pen text-warning ms-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="d-flex align-items-center">
                            <div className="d-flex w-100 justify-content-between">
                              <input
                                type="text"
                                value={research.researchNameEN}
                                className="profile-name-edit  profile-input"
                                onChange={(e) =>
                                  setResearch({
                                    ...research,
                                    researchNameEN: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <button
                              type="button"
                              className="button-profile"
                              onClick={() =>
                                updateResearch(
                                  {
                                    researchNameEN: research.researchNameEN,
                                    id: research.researchId,
                                  },
                                  () =>
                                    setEditResearch({
                                      ...editresearch,
                                      researchNameEN: false,
                                    })
                                )
                              }
                            >
                              <i
                                className="fas fa-save text-success"
                                style={{ fontSize: 17 }}
                              />
                            </button>
                            <button
                              type="button"
                              className="button-profile"
                              onClick={() =>
                                fetchReseach(() =>
                                  setEditResearch({
                                    ...editresearch,
                                    researchNameEN: false,
                                  })
                                )
                              }
                            >
                              <i
                                className="fas fa-times text-danger"
                                style={{ fontSize: 17 }}
                              />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">ผลของงานวิจัย</label>
                        {!editresearch.researchResult ? (
                          <div>
                            <span>{research.researchResult}</span>
                            <button
                              type="button"
                              className="button-profile"
                              onClick={() =>
                                setEditResearch({
                                  ...editresearch,
                                  researchResult: true,
                                })
                              }
                            >
                              <i className="fas fa-pen text-warning ms-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="d-flex align-items-center">
                            <div className="d-flex w-100 justify-content-between">
                              <input
                                type="text"
                                value={research.researchResult}
                                className="profile-name-edit  profile-input"
                                onChange={(e) =>
                                  setResearch({
                                    ...research,
                                    researchResult: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <button
                              type="button"
                              className="button-profile"
                              onClick={() =>
                                updateResearch(
                                  {
                                    researchResult: research.researchResult,
                                    id: research.researchId,
                                  },
                                  () =>
                                    setEditResearch({
                                      ...editresearch,
                                      researchResult: false,
                                    })
                                )
                              }
                            >
                              <i
                                className="fas fa-save text-success"
                                style={{ fontSize: 17 }}
                              />
                            </button>
                            <button
                              type="button"
                              className="button-profile"
                              onClick={() =>
                                fetchReseach(() =>
                                  setEditResearch({
                                    ...editresearch,
                                    researchResult: false,
                                  })
                                )
                              }
                            >
                              <i
                                className="fas fa-times text-danger"
                                style={{ fontSize: 17 }}
                              />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">ประเภทของงบประมาณ</label>
                        {!editresearch.researchBudgetType ? (
                          <div>
                            <span>{research.researchBudgetType}</span>
                            <button
                              type="button"
                              className="button-profile"
                              onClick={() =>
                                setEditResearch({
                                  ...editresearch,
                                  researchBudgetType: true,
                                })
                              }
                            >
                              <i className="fas fa-pen text-warning ms-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="d-flex align-items-center">
                            <div className="d-flex w-100 justify-content-between">
                              <input
                                type="text"
                                value={research.researchBudgetType}
                                className="profile-name-edit  profile-input"
                                onChange={(e) =>
                                  setResearch({
                                    ...research,
                                    researchBudgetType: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <button
                              type="button"
                              className="button-profile"
                              onClick={() =>
                                updateResearch(
                                  {
                                    researchBudgetType:
                                      research.researchBudgetType,
                                    id: research.researchId,
                                  },
                                  () =>
                                    setEditResearch({
                                      ...editresearch,
                                      researchBudgetType: false,
                                    })
                                )
                              }
                            >
                              <i
                                className="fas fa-save text-success"
                                style={{ fontSize: 17 }}
                              />
                            </button>
                            <button
                              type="button"
                              className="button-profile"
                              onClick={() =>
                                fetchReseach(() =>
                                  setEditResearch({
                                    ...editresearch,
                                    researchBudgetType: false,
                                  })
                                )
                              }
                            >
                              <i
                                className="fas fa-times text-danger"
                                style={{ fontSize: 17 }}
                              />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">ประเภทของทุนวิจัย</label>
                        {!editresearch.researchScholarOwner ? (
                          <div>
                            <span>{research.researchScholarOwner}</span>
                            <button
                              type="button"
                              className="button-profile"
                              onClick={() =>
                                setEditResearch({
                                  ...editresearch,
                                  researchScholarOwner: true,
                                })
                              }
                            >
                              <i className="fas fa-pen text-warning ms-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="d-flex align-items-center">
                            <div className="d-flex w-100 justify-content-between">
                              <input
                                type="text"
                                value={research.researchScholarOwner}
                                className="profile-name-edit  profile-input"
                                onChange={(e) =>
                                  setResearch({
                                    ...research,
                                    researchScholarOwner: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <button
                              type="button"
                              className="button-profile"
                              onClick={() =>
                                updateResearch(
                                  {
                                    researchScholarOwner:
                                      research.researchScholarOwner,
                                    id: research.researchId,
                                  },
                                  () =>
                                    setEditResearch({
                                      ...editresearch,
                                      researchScholarOwner: false,
                                    })
                                )
                              }
                            >
                              <i
                                className="fas fa-save text-success"
                                style={{ fontSize: 17 }}
                              />
                            </button>
                            <button
                              type="button"
                              className="button-profile"
                              onClick={() =>
                                fetchReseach(() =>
                                  setEditResearch({
                                    ...editresearch,
                                    researchScholarOwner: false,
                                  })
                                )
                              }
                            >
                              <i
                                className="fas fa-times text-danger"
                                style={{ fontSize: 17 }}
                              />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">
                          ชื่อโครงการของทุนวิจัย
                        </label>
                        {!editresearch.researchScholarName ? (
                          <div>
                            <span>{research.researchScholarName}</span>
                            <button
                              type="button"
                              className="button-profile"
                              onClick={() =>
                                setEditResearch({
                                  ...editresearch,
                                  researchScholarName: true,
                                })
                              }
                            >
                              <i className="fas fa-pen text-warning ms-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="d-flex align-items-center">
                            <div className="d-flex w-100 justify-content-between">
                              <input
                                type="text"
                                value={research.researchScholarName}
                                className="profile-name-edit  profile-input"
                                onChange={(e) =>
                                  setResearch({
                                    ...research,
                                    researchScholarName: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <button
                              type="button"
                              className="button-profile"
                              onClick={() =>
                                updateResearch(
                                  {
                                    researchScholarName:
                                      research.researchScholarName,
                                    id: research.researchId,
                                  },
                                  () =>
                                    setEditResearch({
                                      ...editresearch,
                                      researchScholarName: false,
                                    })
                                )
                              }
                            >
                              <i
                                className="fas fa-save text-success"
                                style={{ fontSize: 17 }}
                              />
                            </button>
                            <button
                              type="button"
                              className="button-profile"
                              onClick={() =>
                                fetchReseach(() =>
                                  setEditResearch({
                                    ...editresearch,
                                    researchScholarName: false,
                                  })
                                )
                              }
                            >
                              <i
                                className="fas fa-times text-danger"
                                style={{ fontSize: 17 }}
                              />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">ประเภทของงานวิจัย</label>
                        {!editresearch.researchType ? (
                          <div>
                            <span>{research.researchType}</span>
                            <button
                              type="button"
                              className="button-profile"
                              onClick={() =>
                                setEditResearch({
                                  ...editresearch,
                                  researchType: true,
                                })
                              }
                            >
                              <i className="fas fa-pen text-warning ms-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="d-flex align-items-center">
                            <div className="d-flex w-100 justify-content-between">
                              <input
                                type="text"
                                value={research.researchType}
                                className="profile-name-edit  profile-input"
                                onChange={(e) =>
                                  setResearch({
                                    ...research,
                                    researchType: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <button
                              type="button"
                              className="button-profile"
                              onClick={() =>
                                updateResearch(
                                  {
                                    researchType:
                                      research.researchType,
                                    id: research.researchId,
                                  },
                                  () =>
                                    setEditResearch({
                                      ...editresearch,
                                      researchType: false,
                                    })
                                )
                              }
                            >
                              <i
                                className="fas fa-save text-success"
                                style={{ fontSize: 17 }}
                              />
                            </button>
                            <button
                              type="button"
                              className="button-profile"
                              onClick={() =>
                                fetchReseach(() =>
                                  setEditResearch({
                                    ...editresearch,
                                    researchType: false,
                                  })
                                )
                              }
                            >
                              <i
                                className="fas fa-times text-danger"
                                style={{ fontSize: 17 }}
                              />
                            </button>
                          </div>
                        )}
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
                          <span>
                            {research.researchBudgetAssResearcher} บาท
                          </span>
                        </div>
                        <div className="col">
                          <label className="form-label">งบประมาณอื่นๆ</label>
                          <span>{research.researchBudgetETC} บาท</span>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <label className="form-label">วันที่เริ่มวัจัย</label>
                          <span>
                            {" "}
                            {moment(research.researchStartDate).format(
                              "Do MMMM YYYY"
                            )}
                          </span>
                        </div>
                        <div className="col">
                          <label className="form-label">
                            วันที่สิ้นสุดการวิจัย
                          </label>
                          <span>
                            {moment(research.researchEndDate).format(
                              "Do MMMM YYYY"
                            )}
                          </span>
                        </div>
                        <div className="col">
                          <label className="form-label">ปีงบประมาณ</label>
                          <span>{research.researchBudgetYear}</span>
                        </div>
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">
                          วันที่มีการเซ็นสัญญา
                        </label>
                        <span>
                          {moment(research.researchContractDateSign).format(
                            "Do MMMM YYYY"
                          )}
                        </span>
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">สถานะงานวิจัย</label>
                        <span>{research.researchStatus}</span>
                      </div>
                      <div className="mb-3 ">
                        <label className="form-label">
                          บริษัทที่ร่วมการวิจัย
                        </label>
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
