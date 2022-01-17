import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getResearchByRid } from "../../services/research.service";
import moment from "moment";
import "moment/locale/th";
import { editResearch } from "../../services/research.service";
import { toast } from "react-toastify";
import { useAuth } from "../../authentication/auth-context";

export default function ReseachDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const [userData, setUserData] = useState({});
  const { user } = useAuth();
  moment.locale("th");
  const [ownresearch, setOwnResearch] = useState(false);
  const [research, setResearch] = useState({});
  const [editresearch, setEditResearch] = useState({
    researchNameTH: false,
    researchResult: false,
    researchNameEN: false,
    researchBudgetType: false,
    researchScholarOwner: false,
    researchScholarName: false,
    researchType: false,
    researchBudget: false,
    researchBudgetResearcher: false,
    researchBudgetAssResearcher: false,
    researchBudgetETC: false,
    researchStartDate: false,
    researchEnddate: false,
  });

  const fetchresearch = async (callback) => {
    let userData = (await user()).data.data;
    getResearchByRid(params.id).then((result) => {
      if (result.status === 200) {
        if (callback) callback();
        console.log(result.data);
        setResearch(result.data.data);
        if (result.data.data.users[0].id == userData?.id) {
          setOwnResearch(true);
        }
      }
    });
  };

  const updateResearch = (research, callback) => {
    // console.log(research);
    editResearch(research, research.id).then((result) => {
      // console.log(result.data);
      if (result.status === 200) {
        callback();
        fetchresearch();
        toast.success("อัปเดทข้อมูลวิจัยสำเร็จ");
      }
    });
  };

  useEffect(async () => {
    fetchresearch();
    // setUserData(userData.data.data);
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
                  <span style={{ fontSize: "20px" }} className="text-white">
                    รายละเอียดงานวิจัย
                  </span>
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
                            {ownresearch ? (
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
                            ) : null}
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
                                fetchresearch(() =>
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
                            {ownresearch ? (
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
                            ) : null}
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
                                fetchresearch(() =>
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
                            {ownresearch ? (
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
                            ) : null}
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
                                fetchresearch(() =>
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
                            {ownresearch ? (
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
                            ) : null}
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
                                fetchresearch(() =>
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
                            {ownresearch ? (
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
                            ) : null}
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
                                fetchresearch(() =>
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
                            {ownresearch ? (
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
                            ) : null}
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
                                fetchresearch(() =>
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
                            {ownresearch ? (
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
                            ) : null}
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
                                    researchType: research.researchType,
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
                                fetchresearch(() =>
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
                          {!editresearch.researchBudget ? (
                            <div>
                              <span>{research.researchBudget} บาท</span>
                              {ownresearch ? (
                                <button
                                  type="button"
                                  className="button-profile"
                                  onClick={() =>
                                    setEditResearch({
                                      ...editresearch,
                                      researchBudget: true,
                                    })
                                  }
                                >
                                  <i className="fas fa-pen text-warning ms-3" />
                                </button>
                              ) : null}
                            </div>
                          ) : (
                            <div className="d-flex align-items-center">
                              <div className="d-flex w-100 justify-content-between">
                                <input
                                  type="text"
                                  value={research.researchBudget}
                                  className="profile-name-edit  profile-input"
                                  onChange={(e) =>
                                    setResearch({
                                      ...research,
                                      researchBudget: e.target.value,
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
                                      researchBudget: research.researchBudget,
                                      id: research.researchId,
                                    },
                                    () =>
                                      setEditResearch({
                                        ...editresearch,
                                        researchBudget: false,
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
                                  fetchresearch(() =>
                                    setEditResearch({
                                      ...editresearch,
                                      researchBudget: false,
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
                        <div className="col">
                          <label className="form-label">
                            งบประมาณสำหรับผู้เชี่ยวชาญ
                          </label>
                          {!editresearch.researchBudgetResearcher ? (
                            <div>
                              <span>
                                {research.researchBudgetResearcher} บาท
                              </span>
                              {ownresearch ? (
                                <button
                                  type="button"
                                  className="button-profile"
                                  onClick={() =>
                                    setEditResearch({
                                      ...editresearch,
                                      researchBudgetResearcher: true,
                                    })
                                  }
                                >
                                  <i className="fas fa-pen text-warning ms-3" />
                                </button>
                              ) : null}
                            </div>
                          ) : (
                            <div className="d-flex align-items-center">
                              <div className="d-flex w-100 justify-content-between">
                                <input
                                  type="text"
                                  value={research.researchBudgetResearcher}
                                  className="profile-name-edit  profile-input"
                                  onChange={(e) =>
                                    setResearch({
                                      ...research,
                                      researchBudgetResearcher: e.target.value,
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
                                      researchBudgetResearcher:
                                        research.researchBudgetResearcher,
                                      id: research.researchId,
                                    },
                                    () =>
                                      setEditResearch({
                                        ...editresearch,
                                        researchBudgetResearcher: false,
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
                                  fetchresearch(() =>
                                    setEditResearch({
                                      ...editresearch,
                                      researchBudgetResearcher: false,
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
                      <div className="row mb-3">
                        <div className="col">
                          <label className="form-label">
                            งบประมาณสำหรับผู้ช่วย
                          </label>
                          {!editresearch.researchBudgetAssResearcher ? (
                            <div>
                              <span>
                                {research.researchBudgetAssResearcher} บาท
                              </span>
                              {ownresearch ? (
                                <button
                                  type="button"
                                  className="button-profile"
                                  onClick={() =>
                                    setEditResearch({
                                      ...editresearch,
                                      researchBudgetAssResearcher: true,
                                    })
                                  }
                                >
                                  <i className="fas fa-pen text-warning ms-3" />
                                </button>
                              ) : null}
                            </div>
                          ) : (
                            <div className="d-flex align-items-center">
                              <div className="d-flex w-100 justify-content-between">
                                <input
                                  type="text"
                                  value={research.researchBudgetAssResearcher}
                                  className="profile-name-edit  profile-input"
                                  onChange={(e) =>
                                    setResearch({
                                      ...research,
                                      researchBudgetAssResearcher:
                                        e.target.value,
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
                                      researchBudgetAssResearcher:
                                        research.researchBudgetAssResearcher,
                                      id: research.researchId,
                                    },
                                    () =>
                                      setEditResearch({
                                        ...editresearch,
                                        researchBudgetAssResearcher: false,
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
                                  fetchresearch(() =>
                                    setEditResearch({
                                      ...editresearch,
                                      researchBudgetAssResearcher: false,
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
                        <div className="col">
                          <label className="form-label">งบประมาณอื่นๆ</label>
                          {!editresearch.researchBudgetETC ? (
                            <div>
                              <span>{research.researchBudgetETC} บาท</span>
                              {ownresearch ? (
                                <button
                                  type="button"
                                  className="button-profile"
                                  onClick={() =>
                                    setEditResearch({
                                      ...editresearch,
                                      researchBudgetETC: true,
                                    })
                                  }
                                >
                                  <i className="fas fa-pen text-warning ms-3" />
                                </button>
                              ) : null}
                            </div>
                          ) : (
                            <div className="d-flex align-items-center">
                              <div className="d-flex w-100 justify-content-between">
                                <input
                                  type="text"
                                  value={research.researchBudgetETC}
                                  className="profile-name-edit  profile-input"
                                  onChange={(e) =>
                                    setResearch({
                                      ...research,
                                      researchBudgetETC: e.target.value,
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
                                      researchBudgetETC:
                                        research.researchBudgetETC,
                                      id: research.researchId,
                                    },
                                    () =>
                                      setEditResearch({
                                        ...editresearch,
                                        researchBudgetETC: false,
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
                                  fetchresearch(() =>
                                    setEditResearch({
                                      ...editresearch,
                                      researchBudgetETC: false,
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
                      <div className="row mb-3">
                        <div className="col">
                          <label className="form-label">วันที่เริ่มวัจัย</label>
                          {!editresearch.researchStartDate ? (
                            <div>
                              <span>
                                {moment(research.researchStartDate).format(
                                  "Do MMMM YYYY"
                                )}
                              </span>
                              {ownresearch ? (
                                <button
                                  type="button"
                                  className="button-profile"
                                  onClick={() =>
                                    setEditResearch({
                                      ...editresearch,
                                      researchStartDate: true,
                                    })
                                  }
                                >
                                  <i className="fas fa-pen text-warning ms-3" />
                                </button>
                              ) : null}
                            </div>
                          ) : (
                            <div className="d-flex align-items-center">
                              <div className="d-flex w-100 justify-content-between">
                                <input
                                  type="text"
                                  value={research.researchStartDate}
                                  className="profile-name-edit  profile-input"
                                  onChange={(e) =>
                                    setResearch({
                                      ...research,
                                      researchStartDate: e.target.value,
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
                                      researchStartDate:
                                        research.researchStartDate,
                                      id: research.researchId,
                                    },
                                    () =>
                                      setEditResearch({
                                        ...editresearch,
                                        researchStartDate: false,
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
                                  fetchresearch(() =>
                                    setEditResearch({
                                      ...editresearch,
                                      researchStartDate: false,
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
                        <div className="col">
                          <label className="form-label">
                            วันที่สิ้นสุดการวิจัย
                          </label>
                          {!editresearch.researchEnddate ? (
                            <div>
                              <span>
                                {moment(research.researchEnddate).format(
                                  "Do MMMM YYYY"
                                )}
                              </span>
                              {ownresearch ? (
                                <button
                                  type="button"
                                  className="button-profile"
                                  onClick={() =>
                                    setEditResearch({
                                      ...editresearch,
                                      researchEnddate: true,
                                    })
                                  }
                                >
                                  <i className="fas fa-pen text-warning ms-3" />
                                </button>
                              ) : null}
                            </div>
                          ) : (
                            <div className="d-flex align-items-center">
                              <div className="d-flex w-100 justify-content-between">
                                <input
                                  type="text"
                                  value={research.researchEnddate}
                                  className="profile-name-edit  profile-input"
                                  onChange={(e) =>
                                    setResearch({
                                      ...research,
                                      researchEnddate: e.target.value,
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
                                      researchEnddate: research.researchEnddate,
                                      id: research.researchId,
                                    },
                                    () =>
                                      setEditResearch({
                                        ...editresearch,
                                        researchEnddate: false,
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
                                  fetchresearch(() =>
                                    setEditResearch({
                                      ...editresearch,
                                      researchEnddate: false,
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
                        <div className="col">
                          <label className="form-label">ปีงบประมาณ</label>
                          {!editresearch.researchBudgetYear ? (
                            <div>
                              <span>{research.researchBudgetYear}</span>
                              {ownresearch ? (
                                <button
                                  type="button"
                                  className="button-profile"
                                  onClick={() =>
                                    setEditResearch({
                                      ...editresearch,
                                      researchBudgetYear: true,
                                    })
                                  }
                                >
                                  <i className="fas fa-pen text-warning ms-3" />
                                </button>
                              ) : null}
                            </div>
                          ) : (
                            <div className="d-flex align-items-center">
                              <div className="d-flex w-100 justify-content-between">
                                <input
                                  type="text"
                                  value={research.researchBudgetYear}
                                  className="profile-name-edit  profile-input"
                                  onChange={(e) =>
                                    setResearch({
                                      ...research,
                                      researchBudgetYear: e.target.value,
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
                                      researchBudgetYear:
                                        research.researchBudgetYear,
                                      id: research.researchId,
                                    },
                                    () =>
                                      setEditResearch({
                                        ...editresearch,
                                        researchBudgetYear: false,
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
                                  fetchresearch(() =>
                                    setEditResearch({
                                      ...editresearch,
                                      researchBudgetYear: false,
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
                      <div className="mb-3 ">
                        <label className="form-label">
                          วันที่มีการเซ็นสัญญา
                        </label>
                        {!editresearch.researchContractDateSign ? (
                          <div>
                            <span>
                              {moment(research.researchContractDateSign).format(
                                "Do MMMM YYYY"
                              )}
                            </span>
                            {ownresearch ? (
                              <button
                                type="button"
                                className="button-profile"
                                onClick={() =>
                                  setEditResearch({
                                    ...editresearch,
                                    researchContractDateSign: true,
                                  })
                                }
                              >
                                <i className="fas fa-pen text-warning ms-3" />
                              </button>
                            ) : null}
                          </div>
                        ) : (
                          <div className="d-flex align-items-center">
                            <div className="d-flex w-100 justify-content-between">
                              <input
                                type="text"
                                value={research.researchContractDateSign}
                                className="profile-name-edit  profile-input"
                                onChange={(e) =>
                                  setResearch({
                                    ...research,
                                    researchContractDateSign: e.target.value,
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
                                    researchContractDateSign:
                                      research.researchContractDateSign,
                                    id: research.researchId,
                                  },
                                  () =>
                                    setEditResearch({
                                      ...editresearch,
                                      researchContractDateSign: false,
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
                                fetchresearch(() =>
                                  setEditResearch({
                                    ...editresearch,
                                    researchContractDateSign: false,
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
                        <label className="form-label">สถานะงานวิจัย</label>
                        {!editresearch.researchStatus ? (
                          <div>
                            <span>{research.researchStatus}</span>
                            {ownresearch ? (
                              <button
                                type="button"
                                className="button-profile"
                                onClick={() =>
                                  setEditResearch({
                                    ...editresearch,
                                    researchStatus: true,
                                  })
                                }
                              >
                                <i className="fas fa-pen text-warning ms-3" />
                              </button>
                            ) : null}
                          </div>
                        ) : (
                          <div className="d-flex align-items-center">
                            <div className="d-flex w-100 justify-content-between">
                              <input
                                type="text"
                                value={research.researchStatus}
                                className="profile-name-edit  profile-input"
                                onChange={(e) =>
                                  setResearch({
                                    ...research,
                                    researchStatus: e.target.value,
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
                                    researchStatus: research.researchStatus,
                                    id: research.researchId,
                                  },
                                  () =>
                                    setEditResearch({
                                      ...editresearch,
                                      researchStatus: false,
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
                                fetchresearch(() =>
                                  setEditResearch({
                                    ...editresearch,
                                    researchStatus: false,
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
                          บริษัทที่ร่วมการวิจัย
                        </label>
                        {!editresearch.researchJoinCompany ? (
                          <div>
                            <span>{research.researchJoinCompany}</span>
                            {ownresearch ? (
                              <button
                                type="button"
                                className="button-profile"
                                onClick={() =>
                                  setEditResearch({
                                    ...editresearch,
                                    researchJoinCompany: true,
                                  })
                                }
                              >
                                <i className="fas fa-pen text-warning ms-3" />
                              </button>
                            ) : null}
                          </div>
                        ) : (
                          <div className="d-flex align-items-center">
                            <div className="d-flex w-100 justify-content-between">
                              <input
                                type="text"
                                value={research.researchJoinCompany}
                                className="profile-name-edit  profile-input"
                                onChange={(e) =>
                                  setResearch({
                                    ...research,
                                    researchJoinCompany: e.target.value,
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
                                    researchJoinCompany:
                                      research.researchJoinCompany,
                                    id: research.researchId,
                                  },
                                  () =>
                                    setEditResearch({
                                      ...editresearch,
                                      researchJoinCompany: false,
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
                                fetchresearch(() =>
                                  setEditResearch({
                                    ...editresearch,
                                    researchJoinCompany: false,
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
