import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useAuth } from "../../authentication/auth-context";
import "../../index.css";
import { editProfile } from "../../services/user.service";
export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [data, setData] = useState({});
  const [modal, setModal] = useState({});
  const closeModalRef = useRef();
  const [editUser, setEditUser] = useState({
    fullNameTH: false,
    fullNameEN: false,
    ac_position: false,
    branch: false,
    pheon: false,
    email: false,
    expertOf: false,
  });
  const updateUser = (user, callback) => {
    editProfile(user).then((result) => {
      if (result.status === 200) {
        callback();
        _fetchUser();
        toast.success("อัปเดทข้อมูลผู้ใช้สำเร็จ");
      }
    });
  };
  const _fetchUser = () => {
    user().then((result) => {
      console.log(data);

      if (result.data.status === 200) {
        setData(result.data.data);
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
                          />
                          <input
                            type="text"
                            value={data.lastNameTH}
                            className="profile-name-edit profile-input"
                          />
                        </div>
                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            setEditUser({ ...editUser, fullNameTH: false })
                          }
                        >
                          <i
                            className="fas fa-save text-success "
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
                          />
                          <input
                            type="text"
                            value={data.lastNameEN}
                            className="profile-name-edit profile-input"
                          />
                        </div>
                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            setEditUser({ ...editUser, fullNameEN: false })
                          }
                        >
                          <i
                            className="fas fa-save text-success "
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
                        />

                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            setEditUser({ ...editUser, ac_position: false })
                          }
                        >
                          <i
                            className="fas fa-save text-success "
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
                        <input type="text" className="w-100  profile-input" />

                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            setEditUser({ ...editUser, branch: false })
                          }
                        >
                          <i
                            className="fas fa-save text-success "
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
                    {!editUser.pheon ? (
                      <div>
                        <span>{data.phone || "-"}</span>
                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            setEditUser({ ...editUser, pheon: true })
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
                        />

                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            setEditUser({ ...editUser, pheon: false })
                          }
                        >
                          <i
                            className="fas fa-save text-success "
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
                        <input type="text" className="w-100  profile-input" />

                        <button
                          type="button"
                          className="button-profile"
                          onClick={() =>
                            setEditUser({ ...editUser, email: false })
                          }
                        >
                          <i
                            className="fas fa-save text-success "
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
          id="modal-simple"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
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
                <div className="row"></div>
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
                <button type="button" className="btn btn-primary">
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
                data-bs-target="#modal-simple"
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
