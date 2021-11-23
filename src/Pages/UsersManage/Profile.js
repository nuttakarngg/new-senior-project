import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useAuth } from "../../authentication/auth-context";
import { useForm } from "react-hook-form";
import "../../index.css";
import { getAllBranch } from "../../services/branch.service";
import { addResearch } from "../../services/research.service";
import { editProfile } from "../../services/user.service";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
export default function Profile() {

  const dispatch = useDispatch();
  const { user } = useAuth();
  const [data, setData] = useState({});
  const [modal, setModal] = useState({
    title: "เพิ่มข้อมูลงานวิจัย",
  });
  const [image, setImage] = useState("/img/no-user.jpg");
  const closeModalRef = useRef();
  const [branchData, setBranchData] = useState([]);
  const [research, setResearch] = useState({});
  const [editUser, setEditUser] = useState({
    fullNameTH: false,
    fullNameEN: false,
    ac_position: false,
    branch: false,
    phone: false,
    email: false,
    expertOf: false,
  });
  const validationSchema = Yup.object().shape({
    researchName: Yup.string().required("จำเป็นต้องกรอก"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(formOptions);
  function _renderBranchOption(item, idx) {
    return (
      <option key={idx} value={item.id}>
        {item.name_th}
      </option>
    );
  }

  const _handleSave = () => {
    handleSubmit((data) => console.log(data));
    console.log(errors,watch('researchName'));
    return null;
    addResearch(research).then((result) => console.log(result));
  };
  async function fetchBranch() {
    const branch = await getAllBranch();
    if (branch.data.status === 200) {
      setBranchData(branch.data.data);
    }
  }
  const updateUser = (user, callback) => {
    editProfile(user).then((result) => {
      if (result.status === 200) {
        callback();
        _fetchUser();
        toast.success("อัปเดทข้อมูลผู้ใช้สำเร็จ");
      }
    });
  };
  const _fetchUser = (callback) => {
    user().then(async (result) => {
      if (result.data.status === 200) {
        setData(result.data.data);
      }
      await fetchBranch();
      if (callback) {
        callback();
      }
    });
  };
  useEffect(() => {
    _fetchUser();
    dispatch({
      type: "SET_DATA",
      payload: { navbar: ["/"] },
    });
  }, []);
  const _mapResearch = (item, index) => {
    return (
      <div className="card-table-row ">
        <span>
          {index + 1}. 2565 :
          โครงการปัจจัยการศึกษาและวิเคราะห์แรงกดผิวสัมผัสในการจับวัตถุสำหรับแขนเทียมโดยใช้ปัญญาประดิษฐ์
        </span>
        <span className="bg-danger">หัวหน้าโครงการ</span>
      </div>
    );
  };

  const handleImageProfile = (event) => {
    let file = event.target.files[0];
    setImage(file.result);
  };
  return (
    <div className="container-xl py-4">
      <div className="row">
        <div className="col-md-3 col-12">
          <div className="card animate__animated animate__slideInLeft my-2">
            <div className="card-header bg-primary">
              <span className="text-white">ข้อมูลผู้ใช้งาน</span>
            </div>
            <div className="card-body">
              <div className="image-upload">
                <label htmlFor="file-input">
                  <img src={image} className="img-user-responsive" />
                </label>
                <input
                  type="file"
                  id="file-input"
                  onChange={handleImageProfile}
                />
              </div>
              <div className="m-3">
                <h4>ชื่อ-นามสกุล (ภาษาไทย)</h4>
                <div className="d-flex mb-2">
                  <div>
                    {!editUser.fullNameTH ? (
                      <div>
                        <span>
                          {data.firstNameTH || "-"} {data.lastNameTH}
                        </span>
                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            setEditUser({ ...editUser, fullNameTH: true })
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
                            value={data.firstNameTH}
                            className="profile-name-edit  profile-input"
                            onChange={(e) =>
                              setData({ ...data, firstNameTH: e.target.value })
                            }
                          />
                          <input
                            type="text"
                            value={data.lastNameTH}
                            className="profile-name-edit profile-input"
                            onChange={(e) =>
                              setData({ ...data, lastNameTH: e.target.value })
                            }
                          />
                        </div>
                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            updateUser(
                              {
                                firstNameTH: data.firstNameTH,
                                lastNameTH: data.lastNameTH,
                              },
                              () =>
                                setEditUser({ ...editUser, fullNameTH: false })
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
                            _fetchUser(() =>
                              setEditUser({ ...editUser, fullNameTH: false })
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
                <h4>ชื่อ-นามสกุล (ภาษาไทย)</h4>
                <div className="d-flex mb-2">
                  <div>
                    {!editUser.fullNameEN ? (
                      <div>
                        <span>
                          {data.firstNameEN || "-"} {data.lastNameEN}
                        </span>
                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            setEditUser({ ...editUser, fullNameEN: true })
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
                            className="profile-name-edit  profile-input"
                            value={data.firstNameEN}
                            onChange={(e) =>
                              setData({ ...data, firstNameEN: e.target.value })
                            }
                          />
                          <input
                            type="text"
                            value={data.lastNameEN}
                            className="profile-name-edit profile-input"
                            onChange={(e) =>
                              setData({ ...data, lastNameEN: e.target.value })
                            }
                          />
                        </div>
                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            updateUser(
                              {
                                firstNameEN: data.firstNameEN,
                                lastNameEN: data.lastNameEN,
                              },
                              () =>
                                setEditUser({ ...editUser, fullNameEN: false })
                            )
                          }
                        >
                          <i
                            className="fas fa-save text-success "
                            style={{ fontSize: 17 }}
                          />
                        </button>
                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            _fetchUser(() =>
                              setEditUser({ ...editUser, fullNameEN: false })
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
                <h4>ตำแหน่งทางวิชาการ</h4>
                <div className="d-flex mb-2">
                  <div>
                    {!editUser.ac_position ? (
                      <div>
                        <span>{data.ac_position || "-"}</span>
                        <button
                          type="button"
                          className="button-profile"
                          value={data.ac_position}
                          onClick={() =>
                            setEditUser({ ...editUser, ac_position: true })
                          }
                        >
                          <i className="fas fa-pen text-warning ms-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center">
                        <input
                          type="text"
                          className="w-100  profile-input"
                          value={data.ac_position}
                          onChange={(e) =>
                            setData({ ...data, ac_position: e.target.value })
                          }
                        />

                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            updateUser({ ac_position: data.ac_position }, () =>
                              setEditUser({ ...editUser, ac_position: false })
                            )
                          }
                        >
                          <i
                            className="fas fa-save text-success "
                            style={{ fontSize: 17 }}
                          />
                        </button>
                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            _fetchUser(() =>
                              setEditUser({ ...editUser, ac_position: false })
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
                <h4>คณะ/หน่วยงาน</h4>
                <div className="d-flex mb-2">
                  <div>
                    {!editUser.branch ? (
                      <div>
                        <span>{data.branch?.name_th || "-"}</span>
                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            setEditUser({ ...editUser, branch: true })
                          }
                        >
                          <i className="fas fa-pen text-warning ms-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center">
                        <select
                          className="form-select"
                          value={data.branchId}
                          onChange={(e) =>
                            setData({ ...data, branchId: e.target.value })
                          }
                        >
                          {branchData.map(_renderBranchOption)}
                        </select>
                        {/* <input
                          type="text"
                          className="w-100  profile-input"
                          value={data.branch?.name_th}
                          onChange={(e) =>
                            setData({ ...data, branch: e.target.value })
                          }
                        /> */}

                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            updateUser({ branchId: data.branchId }, () =>
                              setEditUser({ ...editUser, branch: false })
                            )
                          }
                        >
                          <i
                            className="fas fa-save text-success "
                            style={{ fontSize: 17 }}
                          />
                        </button>
                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            _fetchUser(() =>
                              setEditUser({ ...editUser, branch: false })
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
                <h4>โทรศัพท์</h4>
                <div className="d-flex mb-2">
                  <div>
                    {!editUser.phone ? (
                      <div>
                        <span>{data.phone || "-"}</span>
                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            setEditUser({ ...editUser, phone: true })
                          }
                        >
                          <i className="fas fa-pen text-warning ms-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center">
                        <input
                          type="text"
                          className="w-100  profile-input"
                          value={data.phone}
                          onChange={(e) =>
                            setData({ ...data, phone: e.target.value })
                          }
                        />
                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            updateUser({ phone: data.phone }, () =>
                              setEditUser({ ...editUser, phone: false })
                            )
                          }
                        >
                          <i
                            className="fas fa-save text-success "
                            style={{ fontSize: 17 }}
                          />
                        </button>
                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            _fetchUser(() =>
                              setEditUser({ ...editUser, phone: false })
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
                <h4>อีเมล</h4>
                <div className="d-flex mb-2">
                  <div>
                    {!editUser.email ? (
                      <div>
                        <span>{data.email || "-"}</span>
                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            setEditUser({ ...editUser, email: true })
                          }
                        >
                          <i className="fas fa-pen text-warning ms-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center">
                        <input
                          type="text"
                          className="w-100  profile-input"
                          value={data.email}
                          onChange={(e) =>
                            setData({ ...data, email: e.target.value })
                          }
                        />

                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            updateUser({ email: data.email }, () =>
                              setEditUser({ ...editUser, email: false })
                            )
                          }
                        >
                          <i
                            className="fas fa-save text-success "
                            style={{ fontSize: 17 }}
                          />
                        </button>
                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            _fetchUser(() =>
                              setEditUser({ ...editUser, email: false })
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
                <h4>สาขาที่มีความชำนานการ</h4>
                <div className="d-flex mb-2">
                  <div>
                    {!editUser.expertOf ? (
                      <div>
                        <span>{data.expertOf || "-"}</span>
                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            setEditUser({ ...editUser, expertOf: true })
                          }
                        >
                          <i className="fas fa-pen text-warning ms-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center">
                        <input
                          type="text"
                          className="w-100  profile-input"
                          value={data.expertOf}
                          onChange={(e) => {
                            setData({
                              ...data,
                              expertOf: e.target.value,
                            });
                          }}
                        />

                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            updateUser({ expertOf: data.expertOf }, () =>
                              setEditUser({ ...editUser, expertOf: false })
                            )
                          }
                        >
                          <i
                            className="fas fa-save text-success "
                            style={{ fontSize: 17 }}
                          />
                        </button>
                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            _fetchUser(() =>
                              setEditUser({ ...editUser, expertOf: false })
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
        <div
          className="modal modal-blur fade"
          id="modal-add-research"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modal.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="mb-3">
                    <label className="form-label">ชื่องานวิจัย (ภาษาไทย)</label>
                    <input
                      type="text"
                      {...register("researchName")}
                      className="form-control"
                      // onChange={(e) =>
                      //   setResearch({
                      //     ...research,
                      //     researchNameTH: e.target.value,
                      //   })
                      // }
                      // value={research.researchNameTH}
                    />
                      {errors.firstName?.message}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      ชื่องานวิจัย (ภาษาอังกฤษ)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        setResearch({
                          ...research,
                          researchNameEN: e.target.value,
                        })
                      }
                      value={research.researchNameEN}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">ผลของงานวิจัย</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        setResearch({
                          ...research,
                          researchResult: e.target.value,
                        })
                      }
                      value={research.researchResult}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">ประเภทของงบประมาณ</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        setResearch({
                          ...research,
                          researchBudgetType: e.target.value,
                        })
                      }
                      value={research.researchBudgetType}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">ประเภทของทุนวิจัย</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        setResearch({
                          ...research,
                          researchScholarOwner: e.target.value,
                        })
                      }
                      value={research.researchScholarOwner}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">ชื่อโครงการของทุนวิจัย</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        setResearch({
                          ...research,
                          researchScholarName: e.target.value,
                        })
                      }
                      value={research.researchScholarName}
                    />
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">จำนวนงบประมาณ</label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="0.00"
                            onChange={(e) =>
                              setResearch({
                                ...research,
                                researchBudget: e.target.value,
                              })
                            }
                            value={research.researchBudget}
                          />
                          <span className="input-group-text">บาท</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">
                          งบประมาณสำหรับผู้เชี่ยวชาญ
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="0.00"
                            onChange={(e) =>
                              setResearch({
                                ...research,
                                researchBudgetResearcher: e.target.value,
                              })
                            }
                            value={research.researchBudgetResearcher}
                          />
                          <span className="input-group-text">บาท</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">
                          งบประมาณสำหรับผู้ช่วย
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="0.00"
                            onChange={(e) =>
                              setResearch({
                                ...research,
                                researchBudgetAssResearcher: e.target.value,
                              })
                            }
                            value={research.researchBudgetAssResearcher}
                          />
                          <span className="input-group-text">บาท</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">งบประมาณอื่นๆ</label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="0.00"
                            onChange={(e) =>
                              setResearch({
                                ...research,
                                researchBudgetETC: e.target.value,
                              })
                            }
                            value={research.researchBudgetETC}
                          />
                          <span className="input-group-text">บาท</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <div className="mb-3">
                        <label className="form-label">วันที่เริ่มวัจัย</label>
                        <input
                          type="date"
                          className="form-control"
                          onChange={(e) =>
                            setResearch({
                              ...research,
                              researchStartDate: e.target.value,
                            })
                          }
                          value={research.researchStartDate}
                        />
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="mb-3">
                        <label className="form-label">
                          วันที่สิ้นสุดการวิจัย
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          onChange={(e) =>
                            setResearch({
                              ...research,
                              researchEnddate: e.target.value,
                            })
                          }
                          value={research.researchEnddate}
                        />
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="mb-3">
                        <label className="form-label">ปีงบประมาณ</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) =>
                            setResearch({
                              ...research,
                              researchBudgetYear: e.target.value,
                            })
                          }
                          value={research.researchBudgetYear}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">ประเภทของงานวิจัย</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        setResearch({
                          ...research,
                          researchType: e.target.value,
                        })
                      }
                      value={research.researchType}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">วันที่มีการเซ็นสัญญา</label>
                    <input
                      type="date"
                      className="form-control"
                      onChange={(e) =>
                        setResearch({
                          ...research,
                          researchContractDateSign: e.target.value,
                        })
                      }
                      value={research.researchContractDateSign}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">สถานะงานวิจัย</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        setResearch({
                          ...research,
                          researchStatus: e.target.value,
                        })
                      }
                      value={research.researchStatus}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">บริษัทที่ร่วมการวิจัย</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        setResearch({
                          ...research,
                          researchJoinCompany: e.target.value,
                        })
                      }
                      value={research.researchJoinCompany}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn me-auto"
                  data-bs-dismiss="modal"
                  ref={closeModalRef}
                >
                  ปิด
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={_handleSave}
                >
                  บันทึก
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9 col-12 my-2">
          <div className="card animate__animated animate__slideInRight">
            <div className="card-header bg-primary d-flex align-items-center justify-content-between">
              <span className="text-white">โครงการงานวิจัย</span>
              <button
                className="btn"
                data-bs-toggle="modal"
                data-bs-target="#modal-add-research"
              >
                เพิ่ม
                <i className="fas fa-plus ms-2" />
              </button>
            </div>
            <div className="card-body p-0">
              {Array.from({ length: 100 }, () => 0).map((item, index) =>
                _mapResearch(item, index)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
