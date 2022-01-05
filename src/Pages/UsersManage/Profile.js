import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useAuth } from "../../authentication/auth-context";
import { useForm } from "react-hook-form";
import "../../index.css";
import { getAllBranch } from "../../services/branch.service";
import { addResearch, getResearchById } from "../../services/research.service";
import { editProfile } from "../../services/user.service";
import { Link } from "react-router-dom";
import { editProfileImage } from "../../services/fileUpload.service";

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
  const [researchList, setResearchList] = useState([]);
  const [editUser, setEditUser] = useState({
    fullNameTH: false,
    fullNameEN: false,
    ac_position: false,
    branch: false,
    phone: false,
    email: false,
    expertOf: false,
  });
  const fetchResearchList = () => {
    getResearchById(data.id).then((result) => {
      if (result.status === 200) {
        console.log(result.data);
        setResearchList(result.data.data);
      }
    });
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  function _renderBranchOption(item, idx) {
    return (
      <option key={idx} value={item.id}>
        {item.name_th}
      </option>
    );
  }

  const _handleSave = () => {
    addResearch(watch()).then((result) => {
      if (result.status === 200) {
        toast.success("เพิ่มข้อมูลงานวิจัยสำเร็จ");
        fetchResearchList();
        closeModalRef.current.click();
      }
    });
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
  useEffect(() => {
    fetchResearchList();
  }, [data]);
  const _fetchUser = (callback) => {
    user().then(async (result) => {
      if (result.status === 200) {
        setData(result.data.data);
        if (result.data?.data?.image) {
          console.log("image...");
          setImage(result.data?.data?.image);
        }
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

  const handleImageProfile = (event) => {
    console.log("picture: ", event.target.files);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImage(reader.result);
    });
    reader.readAsDataURL(event.target.files[0]);
    editProfileImage(event.target.files[0]).then((result) => {
      if (result.status === 200) {
        toast.success("แก้ไขข้อมูลสำเร็จ");
      } else {
        toast.error("มีข้อผิดพลาดบางอย่าง");
      }
    });

    console.log(image);
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
                  <img
                    src={
                      data.image
                        ? image.startsWith("data")
                          ? image
                          : `http://localhost:3001/public/profiles/${image}`
                        : "/img/no-user.jpg"
                    }
                    className="img-user-responsive"
                  />
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
                <h4>คณะ/สาขา/หน่วยงาน</h4>
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
                          <option>โปรดเลือกสาขา</option>
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
                <h4>หน่วยงาน</h4>
                <div className="d-flex mb-2">
                  <div>
                    {!editUser.institution ? (
                      <div>
                        <span>{data.institution || "-"}</span>
                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            setEditUser({ ...editUser, institution: true })
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
                          value={data.institution}
                          onChange={(e) => {
                            setData({
                              ...data,
                              institution: e.target.value,
                            });
                          }}
                        />

                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            updateUser({ institution: data.institution }, () =>
                              setEditUser({ ...editUser, institution: false })
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
        <form
          className="modal modal-blur fade"
          id="modal-add-research"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
          onSubmit={handleSubmit(_handleSave)}
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
                      {...register("researchNameTH", { required: true })}
                      className={
                        "form-control " +
                        (errors?.researchNameTH && "is-invalid")
                      }
                    />
                    {errors?.researchNameTH?.type === "required" && (
                      <div class="invalid-feedback">
                        กรุณาเพิ่มชื่อโปรเจค (ภาษาไทย)
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      ชื่องานวิจัย (ภาษาอังกฤษ)
                    </label>
                    <input
                      type="text"
                      {...register("researchNameEN", { required: true })}
                      className={
                        "form-control " +
                        (errors?.researchNameEN && "is-invalid")
                      }
                    />
                    {errors?.researchNameEN?.type === "required" && (
                      <div class="invalid-feedback">
                        กรุณาเพิ่มชื่อโปรเจค (ภาษาอังกฤษ)
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">ผลของงานวิจัย</label>
                    <input
                      type="text"
                      {...register("researchResult", { required: true })}
                      className={
                        "form-control " +
                        (errors?.researchResult && "is-invalid")
                      }
                    />
                    {errors?.researchResult?.type === "required" && (
                      <div class="invalid-feedback">
                        กรุณาเพิ่มผลของงานวิจัย
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">ประเภทของงบประมาณ</label>
                    <input
                      type="text"
                      {...register("researchBudgetType", { required: true })}
                      className={
                        "form-control " +
                        (errors?.researchBudgetType && "is-invalid")
                      }
                    />
                    {errors?.researchBudgetType?.type === "required" && (
                      <div class="invalid-feedback">
                        กรุณาเพิ่มประเภทของงบประมาณ
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">ประเภทของทุนวิจัย</label>
                    <input
                      type="text"
                      {...register("researchScholarOwner", { required: true })}
                      className={
                        "form-control " +
                        (errors?.researchScholarOwner && "is-invalid")
                      }
                    />
                    {errors?.researchScholarOwner?.type === "required" && (
                      <div class="invalid-feedback">
                        กรุณาเพิ่มประเภทของทุนวิจัย
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">ชื่อโครงการของทุนวิจัย</label>
                    <input
                      type="text"
                      {...register("researchScholarName", { required: true })}
                      className={
                        "form-control " +
                        (errors?.researchScholarName && "is-invalid")
                      }
                    />
                    {errors?.researchScholarName?.type === "required" && (
                      <div class="invalid-feedback">
                        กรุณาเพิ่มชื่อโครงการของทุนวิจัย
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">จำนวนงบประมาณ</label>
                        <div className="input-group">
                          <input
                            type="text"
                            placeholder="0.00"
                            {...register("researchBudget", { required: true })}
                            className={
                              "form-control " +
                              (errors?.researchBudget && "is-invalid")
                            }
                          />
                          <span className="input-group-text">บาท</span>
                          {errors?.researchBudget?.type === "required" && (
                            <div class="invalid-feedback">
                              กรุณาเพิ่มจำนวนงบประมาณ
                            </div>
                          )}
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
                            placeholder="0.00"
                            {...register("researchBudgetResearcher", {
                              required: true,
                            })}
                            className={
                              "form-control " +
                              (errors?.researchBudgetResearcher && "is-invalid")
                            }
                          />
                          <span className="input-group-text">บาท</span>
                          {errors?.researchBudgetResearcher?.type ===
                            "required" && (
                            <div class="invalid-feedback">
                              กรุณาเพิ่มจำนวนงบประมาณ
                            </div>
                          )}
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
                            placeholder="0.00"
                            {...register("researchBudgetAssResearcher", {
                              required: true,
                            })}
                            className={
                              "form-control " +
                              (errors?.researchBudgetAssResearcher &&
                                "is-invalid")
                            }
                          />
                          <span className="input-group-text">บาท</span>
                          {errors?.researchBudgetAssResearcher?.type ===
                            "required" && (
                            <div class="invalid-feedback">
                              กรุณาเพิ่มจำนวนงบประมาณสำหรับผู้ช่วย
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <label className="form-label">งบประมาณอื่นๆ</label>
                        <div className="input-group">
                          <input
                            type="text"
                            placeholder="0.00"
                            {...register("researchBudgetETC", {
                              required: true,
                            })}
                            className={
                              "form-control " +
                              (errors?.researchBudgetETC && "is-invalid")
                            }
                          />
                          <span className="input-group-text">บาท</span>
                          {errors?.researchBudgetETC?.type === "required" && (
                            <div class="invalid-feedback">
                              กรุณาเพิ่มจำนวนงบประมาณอื่นๆ
                            </div>
                          )}
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
                          {...register("researchStartDate", {
                            required: true,
                          })}
                          className={
                            "form-control " +
                            (errors?.researchStartDate && "is-invalid")
                          }
                        />
                        {errors?.researchStartDate?.type === "required" && (
                          <div class="invalid-feedback">
                            กรุณาเพิ่มวันที่เริ่มวัจัย
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="mb-3">
                        <label className="form-label">
                          วันที่สิ้นสุดการวิจัย
                        </label>
                        <input
                          type="date"
                          {...register("researchEnddate", {
                            required: true,
                          })}
                          className={
                            "form-control " +
                            (errors?.researchEnddate && "is-invalid")
                          }
                        />
                        {errors?.researchEnddate?.type === "required" && (
                          <div class="invalid-feedback">
                            กรุณาเพิ่มวันที่สิ้นสุดการวิจัย
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="mb-3">
                        <label className="form-label">ปีงบประมาณ</label>
                        <input
                          type="text"
                          {...register("researchBudgetYear", {
                            required: true,
                          })}
                          className={
                            "form-control " +
                            (errors?.researchBudgetYear && "is-invalid")
                          }
                        />
                        {errors?.researchBudgetYear?.type === "required" && (
                          <div class="invalid-feedback">
                            กรุณาเพิ่มปีงบประมาณ
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">ประเภทของงานวิจัย</label>
                    <input
                      type="text"
                      {...register("researchType", {
                        required: true,
                      })}
                      className={
                        "form-control " + (errors?.researchType && "is-invalid")
                      }
                    />
                    {errors?.researchType?.type === "required" && (
                      <div class="invalid-feedback">
                        กรุณาเพิ่มประเภทของงานวิจัย
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">วันที่มีการเซ็นสัญญา</label>
                    <input
                      type="date"
                      {...register("researchContractDateSign", {
                        required: true,
                      })}
                      className={
                        "form-control " +
                        (errors?.researchContractDateSign && "is-invalid")
                      }
                    />
                    {errors?.researchContractDateSign?.type === "required" && (
                      <div class="invalid-feedback">
                        กรุณาเพิ่มวันที่มีการเซ็นสัญญา
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">สถานะงานวิจัย</label>
                    <input
                      type="text"
                      {...register("researchStatus", {
                        required: true,
                      })}
                      className={
                        "form-control " +
                        (errors?.researchStatus && "is-invalid")
                      }
                    />
                    {errors?.researchStatus?.type === "required" && (
                      <div class="invalid-feedback">
                        กรุณาเพิ่มสถานะงานวิจัย
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">บริษัทที่ร่วมการวิจัย</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("researchJoinCompany")}
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
                <button type="submit" className="btn btn-primary">
                  บันทึก
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="col-md-9 col-12 my-2">
          <div className="card animate__animated animate__slideInRight">
            <div className="card-header bg-primary d-flex align-items-center justify-content-between">
              <span className="text-white">โครงการงานวิจัย</span>
              <button
                className="btn"
                data-bs-toggle="modal"
                data-bs-target="#modal-add-research"
              >
                <i className="fas fa-plus me-2" />
                เพิ่ม
              </button>
            </div>
            <div className="card-body p-0">
              {researchList.length === 0 ? (
                <div className="card-body">
                  <p>ยังไม่มีผลงาน</p>
                </div>
              ) : (
                researchList.map((item, index) => _mapResearch(item, index))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
