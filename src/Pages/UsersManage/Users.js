import { useEffect, useMemo, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Pagination from "../../Components/Pagination/Pagination";

import Switch from "rc-switch";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  addUser,
  editUser,
  getAllUser,
  getUserById,
  removeUserById,
} from "../../services/user.service";
import Loading from "../../Components/Loading";
import { getAllBranch } from "../../services/branch.service";
import { getAllRoles } from "../../services/role.service";

let PageSize = 10;
export default function Researcher() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState({});
  const MySwal = withReactContent(Swal);
  const [userData, setUserData] = useState({
    ac_position: "ศาสตราจารย์",
    branchId: 1,
  });
  const [branchData, setBranchData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [role, setRole] = useState([]);
  const [status, setStatus] = useState(false);
  const [search, setSearch] = useState("");
  const closeModalRef = useRef();
  function reset() {
    setHasError({});
  }
  function save() {
    MySwal.fire({
      title: <p>ยืนยันแก้ไขข้อมูล</p>,
      icon: "warning",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ยินยัน",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed === true) {
        let iserror = {};
        if (!userData.firstNameTH) {
          iserror.firstNameError = true;
        } else {
          iserror.firstNameError = false;
        }
        if (!userData.lastNameTH) {
          iserror.lastNameError = true;
        } else {
          iserror.lastNameError = false;
        }
        if (!userData.email) {
          iserror.emailError = true;
        } else {
          iserror.emailError = false;
        }

        if (modal.mode === "create") {
          if (!userData.password) {
            iserror.passwordError = true;
          } else {
            iserror.passwordError = false;
          }
          let saveData = {
            ...userData,
            roleId: role,
            status: status ? "Y" : "N",
          };
          setHasError({ ...iserror });

          if (
            iserror.emailError ||
            iserror.lastNameError ||
            iserror.passwordError ||
            iserror.firstNameError
          ) {
            return null;
          }
          addUser(saveData)
            .then((result) => {
              setIsLoading(true);
              if (result.data.status === 200) {
                toast.success("เพิ่มข้อมูลผู้ใช้สำเร็จ");
              } else if (result.data.status === 400) {
                toast.error("เกิดข้อผิดพลาด อีเมลนี้อาจถูกใช้แล้ว");
              }else{
                toast.error("เกิดข้อผิดพลาดบางอย่าง");
              }
            })
            .finally(() => {
              setIsLoading(true);
              setTimeout(() => {
                fetchUser().then(() => setIsLoading(false));
              }, 2000);
            });
        } else if (modal.mode === "update") {
          setHasError({ ...iserror });

          if (
            iserror.emailError ||
            iserror.lastNameError ||
            iserror.passwordError ||
            iserror.firstNameError
          ) {
            return null;
          }
          let saveData = {
            id: modal.id,
            ...userData,
            roleId: role,
            status: status ? "Y" : "N",
          };
          editUser(modal.id, saveData)
            .then((result) => {
              if (result.data.status === 200) {
                toast.success("แก้ไขข้อมูลสำเร็จ");
              }
            })
            .finally(() => {
              setIsLoading(true);
              setTimeout(() => {
                fetchUser().then(() => setIsLoading(false));
              }, 2000);
            });
        }

        closeModalRef.current.click();
      }
      reset();
    });
  }
  function _renderBranchOption(item, idx) {
    return (
      <option key={idx} value={item.id}>
        {item.name_th}
      </option>
    );
  }
  function remove(id) {
    MySwal.fire({
      title: <p>ยืนยันการลบข้อมูล</p>,
      icon: "warning",
      confirmButtonColor: "#d63939",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ยินยัน",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed === true) {
        setIsLoading(true);
        const result = await removeUserById(id);
        if (result.data.status === 200) {
          toast.success("ลบข้อมูลสำเร็จ");
        } else if (result.data.status === 400) {
          toast.error("ไม่สามารถลบข้อมูลตัวเองได้");
        }
        fetchUser();
        setCurrentPage(1);
        setTimeout(() => setIsLoading(false), 1000);
        closeModalRef.current.click();
      }
    });
  }

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState({});
  let currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]); // eslint-disable-line react-hooks/exhaustive-deps
  const dispatch = useDispatch();

  function insertUser() {
    setUserData({
      ...userData,
      firstNameTH: "",
      lastNameTH: "",
      email: "",
      password: "",
    });

    let ndata = {
      title: "เพิ่มข้อมูล",
      mode: "create",
    };
    setModal(ndata);
  }
  function updateUser(id) {
    let ndata = {
      title: "แก้ไขข้อมูล",
      mode: "update",
      id: id,
    };
    setHasError({});
    setModal(ndata);
  }
  async function fetchBranch() {
    const branch = await getAllBranch();
    if (branch.data.status === 200) {
      setBranchData(branch.data.data);
    }
  }
  async function fetchRole() {
    const roles = await getAllRoles();
    if (roles.data.status === 200) {
      setRoleData(roles.data.data);
    }
  }
  async function fetchUser() {
    const user = await getAllUser(search);
    if (user.data.status === 200) {
      setData(user.data.data);
    }
  }
  function getRoles(roles) {
    const roleName = roles?.map((item) => item.name);
    return roleName?.join(", ") || "-";
  }

  function _renderRoles({ name, id }) {
    return (
      <label className="form-selectgroup-item" key={id}>
        <input
          type="checkbox"
          value={id}
          checked={role.some((i) => i === id)}
          onChange={(e) => {
            let newArray = [...role, parseInt(e.target.value)];
            if (role.includes(parseInt(e.target.value))) {
              newArray = newArray.filter(
                (value) => value !== parseInt(e.target.value)
              );
            }
            setRole([...newArray]);
          }}
          className="form-selectgroup-input"
        />
        <span className="form-selectgroup-label">{name}</span>
      </label>
    );
  }
  useEffect(() => {
    fetchUser();
  }, [search]);
  useEffect(() => {
    if (modal.mode === "update") {
      getUserById(modal.id).then((result) => {
        setUserData(result.data.data);
        setRole([...result.data.data?.roles.map((role) => role.id)]);
        setStatus(result.data.data?.status === "Y" ? true : false);
      });
    } else {
      setUserData({
        ac_position: "ศาสตราจารย์",
        branchId: 1,
      });
    }
  }, [modal]);
  useEffect(() => {
    fetchUser()
      .then(() => fetchBranch())
      .then(() => fetchRole());
  }, []);
  // Rander State
  const renderDataTable = currentTableData.map((item, idx) => (
    <tr key={item.id}>
      <td>{idx + 1}</td>
      <td className="text-center">{item.ac_position || "-"}</td>
      <td className="text-center">
        {`${item.firstNameTH} ${item.lastNameTH}` || "-"}
      </td>
      <td className="text-center">{item.branch?.name_th || "-"}</td>
      <td className="text-center">{item.email || "-"}</td>
      <td align="center">
        {item.status === "Y" ? (
          <i className="fas fa-check text-success"></i>
        ) : null}
      </td>
      <td align="center">{getRoles(item.roles)}</td>
      <td>
        <span
          className="fas fa-pencil-alt text-warning  cursor-pointer hover-warning p-2"
          data-bs-toggle="modal"
          data-bs-target="#modal-simple"
          onClick={() => updateUser(item.id)}
        ></span>
        <span
          className="fas fa-trash text-danger  cursor-pointer p-2 hover-danger"
          onClick={() => remove(item.id)}
        ></span>
      </td>
    </tr>
  ));
  // End Rander State
  // UseEffect
  useEffect(() => {
    dispatch({
      type: "SET_DATA",
      payload: { navbar: ["/UsersManage", "/Users"] },
    });
  }, []);
  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [data]);
  //End UseEffect
  return (
    <div className="container-xl">
      <Loading status={isLoading} />
      <div className="d-flex justify-content-end mt-3">
        <button
          className="btn btn-primary"
          onClick={() => insertUser(true)}
          data-bs-toggle="modal"
          data-bs-target="#modal-simple"
        >
          เพิ่มข้อมูลผู้ใช้ <i className="fas fa-plus ms-2" />
        </button>
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
              <div className="row">
                <div className="col-xl-12">
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-xl-4 col-sm-12">
                        <label className="form-label">ตำแหน่งทางวิชาการ</label>
                        <select
                          className="form-select"
                          value={userData.ac_position}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              ac_position: e.target.value,
                            })
                          }
                        >
                          <option value="ศาสตราจารย์">ศาสตราจารย์</option>
                          <option value="รองศาสตราจารย์">รองศาสตราจารย์</option>
                          <option value="ผู้ช่วยศาสตราจารย์">
                            ผู้ช่วยศาสตราจารย์
                          </option>
                          <option value="ไม่มี">
                            ไม่มี
                          </option>
                        </select>
                      </div>
                      <div className="col-xl-4 col-sm-12">
                        <label className="form-label">ชื่อ</label>
                        <input
                          type="text"
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              firstNameTH: e.target.value,
                            })
                          }
                          value={userData.firstNameTH}
                          className={
                            "form-control " +
                            (hasError.firstNameError ? "is-invalid" : "")
                          }
                        />
                      </div>
                      <div className="col-xl-4 col-sm-12">
                        <label className="form-label">นามสกุล</label>
                        <input
                          type="text"
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              lastNameTH: e.target.value,
                            })
                          }
                          value={userData.lastNameTH}
                          className={
                            "form-control " +
                            (hasError.lastNameError ? "is-invalid" : "")
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">สาขาวิชา</label>
                    <select
                      className="form-select"
                      value={userData.branchId}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          branchId: e.target.value,
                        })
                      }
                    >
                      {branchData.map(_renderBranchOption)}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">อีเมล์</label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          email: e.target.value,
                        })
                      }
                      value={userData.email}
                      className={
                        "form-control " +
                        (hasError.emailError ? "is-invalid" : "")
                      }
                    />
                  </div>
                  {modal.mode === "create" && (
                    <div className="mb-3">
                      <label className="form-label">รหัสผ่าน</label>
                      <input
                        type="password"
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            password: e.target.value,
                          })
                        }
                        value={userData.password}
                        className={
                          "form-control " +
                          (hasError.passwordError ? "is-invalid" : "")
                        }
                      />
                    </div>
                  )}

                  <div className="mb-3">
                    <div className="row">
                      <div className="col-xl-6 col-sm-4 mb-3">
                        <label className="form-label">บทบาท</label>
                        <div className="form-selectgroup">
                          {roleData.map(_renderRoles)}
                        </div>
                      </div>
                      <div className="col-xl-6 col-sm-4">
                        <label className="form-label">ทำงาน</label>
                        <Switch
                          onChange={(value) => setStatus(value)}
                          checked={status}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
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
              <button type="button" className="btn btn-primary" onClick={save}>
                บันทึก
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card animate__animated my-3 animate__slideInRight">
        <div className="card-header bg-primary">
          <span className="text-white">
            ตารางข้อมูลผู้เชี่ยวชาญในระบบฐานข้อมูล
          </span>
        </div>
        <div className="table-responsive mb-0">
          <div className="row">
            <div className="col-12">
              <div className="input-icon">
                <span className="input-icon-addon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="10" cy="10" r="7" />
                    <line x1="21" y1="21" x2="15" y2="15" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="form-control"
                  placeholder="ค้นหาผู้ใช้ด้วยชื่อ นามสกุล อีเมล หรือตำแหน่งทางวิชาการ"
                />
              </div>
            </div>
          </div>
          <table className="table card-table table-vcenter text-nowrap datatable">
            <thead>
              <tr className="text-center">
                <th className="w-1">No.</th>
                <th>ตำแหน่งทางวิชาการ</th>
                <th>ชื่อ - นามสกุล</th>
                {/* <th>การศึกษา</th> */}
                <th>สาขา/ภาควิชา</th>
                <th>อีเมล์</th>
                <th>ทำงาน</th>
                <th>บทบาท</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderDataTable}</tbody>
          </table>
        </div>
        <div className="card-footer d-flex align-items-center">
          <p className="m-0 text-muted">
            Showing <span>{currentPage}</span> to{" "}
            <span>{Math.round(data.length / PageSize)}</span> of{" "}
            <span>{data.length}</span> entries
          </p>
          <Pagination
            currentPage={currentPage}
            totalCount={data.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
}
