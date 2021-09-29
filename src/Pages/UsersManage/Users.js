import { useEffect, useMemo, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Pagination from "../../Components/Pagination/Pagination";

import Switch from "rc-switch";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

let PageSize = 10;
export default function Researcher() {
  // toast.success("Wow so easy!");
  const MySwal = withReactContent(Swal);
  const closeModalRef = useRef();

  function save() {
    MySwal.fire({
      title: <p>ยืนยันแก้ไขข้อมูล</p>,
      icon: "warning",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ยินยัน",
      showCancelButton: true,
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed === true) {
        console.log(closeModalRef.current);
        closeModalRef.current.click();
        toast.success("บักทึกข้อมูลสำเร็จ");
      }
      // return MySwal.fire(<p>Shorthand works too</p>)
    });
  }
  function remove() {
    MySwal.fire({
      title: <p>ยืนยันการลบข้อมูล</p>,
      icon: "warning",
      confirmButtonColor: "#d63939",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ยินยัน",
      showCancelButton: true,
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed === true) {
        console.log(closeModalRef.current);
        closeModalRef.current.click();
        toast.success("ลบข้อมูลสำเร็จ");
      }
      // return MySwal.fire(<p>Shorthand works too</p>)
    });
  }
  const initData = Array.from({ length: 100 }, (_, index) => ({
    id: index,
    fullName: "นายณัฐกานต์ สัธนานันต์",
    ac_position: "ผู้ช่วยศาตราจารย์",
    education: "ปริญญาตรี",
    eduMajor: "วิทยาการคอมพิวเตอร์",
    email: "nuttakarngg@gmail.com",
    status: true,
    role: "แอดมิน, ผู้เชี่ยวชาญ",
  }));
  const [data] = useState(initData);
  // const [searchText, setSearchText] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState({});
  let currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]); // eslint-disable-line react-hooks/exhaustive-deps
  const dispatch = useDispatch();

  // function handleSwitch(idx) {
  //   let objDataIndex = data.findIndex((obj) => obj.id === idx);
  //   let temp = data;
  //   temp[objDataIndex].status = !temp[objDataIndex].status;
  //   console.log(temp[objDataIndex].status);
  //   setData([...temp]);
  // }
  function searchData(keyword) {
    // setData(data.filter((x) => x.id === +keyword))
  }
  function updateUser() {
    let data = {
      title: "แก้ไขข้อมูล",
    };
    setModal(data);
  }
  // Rander State
  const renderDataTable = currentTableData.map((item, idx) => (
    <tr key={item.id}>
      <td>{item.id + 1}</td>
      <td>{item.ac_position}</td>
      <td>{item.fullName}</td>
      {/* <td>{item.education}</td> */}
      <td>{item.eduMajor}</td>
      <td>{item.email}</td>
      <td align="center">
        <i className="fas fa-check text-success"></i>
        {/* <Switch checked={item.status} onChange={() => handleSwitch(item.id)} /> */}
      </td>
      <td align="center">{item.role}</td>
      <td>
        <span
          className="fas fa-pencil-alt text-warning  cursor-pointer hover-warning p-2"
          data-bs-toggle="modal"
          data-bs-target="#modal-simple"
          onClick={() => updateUser()}
        ></span>
        <span
          className="fas fa-trash text-danger  cursor-pointer p-2 hover-danger"
          onClick={() => remove()}
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
  });
  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [data]);
  //End UseEffect
  return (
    <div className="container-xl">
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
                        <select className="form-select">
                          <option disabled>โปรดเลือก</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                        </select>
                      </div>
                      <div className="col-xl-4 col-sm-12">
                        <label className="form-label">ชื่อ</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-xl-4 col-sm-12">
                        <label className="form-label">นามสกุล</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">สาขาวิชา</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">อีเมล์</label>
                    <input type="text" className="form-control" />
                  </div>

                  <div className="mb-3">
                    <div className="row">
                      <div className="col-xl-6 col-sm-4 mb-3">
                        <label className="form-label">บทบาท</label>
                        <div className="form-selectgroup">
                          <label className="form-selectgroup-item">
                            <input
                              type="checkbox"
                              value="admin"
                              className="form-selectgroup-input"
                            />
                            <span className="form-selectgroup-label">
                              แอดมิน
                            </span>
                          </label>
                          <label className="form-selectgroup-item">
                            <input
                              type="checkbox"
                              value="researcher"
                              className="form-selectgroup-input"
                            />
                            <span className="form-selectgroup-label">
                              ผู้เชี่ยวชาญ
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-6 col-sm-4">
                        <label className="form-label">ทำงาน</label>
                        <Switch
                          onChange={(value) => console.log(value)}
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
              <button
                type="button"
                className="btn btn-primary"
                // data-bs-dismiss="modal"
                onClick={save}
              >
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
                  onChange={(e) => searchData(e.target.value)}
                  className="form-control"
                  placeholder="ค้นหาผู้ใช้"
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
