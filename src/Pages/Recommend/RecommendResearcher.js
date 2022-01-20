import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { lexTo } from "../../services/aiforthai.service";
import { classify, ranking } from "../../services/recommend.service";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import {
  createScholar,
  getAllScholar,
  removeScholar,
} from "../../services/scholar.service";
import Loading from "../../Components/Loading";
import Swal from "sweetalert2";
import { sendEmail } from "../../services/mail.service";

const checkpercentage = (percentage) => {
  if (percentage > 70) {
    return "text-success";
  } else if (percentage >= 40) {
    return "text-warning";
  } else if (percentage < 40) {
    return "text-danger";
  }
};

export default function RecommendResearcher() {
  const dispatch = useDispatch();
  const modalCloseRef = useRef();
  const editorRef = useRef(null);
  const [scholar, setScholar] = useState({});
  const [scholarList, setScholarList] = useState([]);
  const [scholarSelected, setScholarSelected] = useState(0);
  const [label, setLabel] = useState("");
  const [rankingList, setRankingList] = useState([
    {
      user: {
        firstNameTH: "",
        lastNameTH: "",
      },
      percent: 20,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [mailTemplate, setMailTemplate] = useState("");
  const [showItem, setShowItem] = useState({
    scholarBudgetName: null,
    scholarType: null,
  });
  const recommend = () => {
    setIsLoading(true);
    ranking(label)
      .then((result) => {
        if (result.status === 200) {
          setRankingList(result.data);
        }
      })
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    dispatch({
      type: "SET_DATA",
      payload: { navbar: ["/Database", "/RecommendResearcher"] },
    });
  });
  useEffect(() => {
    fetchScholar();
  }, []);
  const fetchScholar = () => {
    getAllScholar().then((result) => {
      // console.log(result.data);
      if (result.status === 200) {
        setScholarList(result.data.data);
      }
    });
  };
  const _recommend = (e) => {
    setScholarSelected(e.target.value);
    let scholarItem = scholarList.filter(
      (item) => item.id == e.target.value
    )[0];
    setShowItem({
      scholarBudgetName: scholarItem?.scholarBudgetName || "",
      scholarType: scholarItem?.scholarType || "",
    });
    classify(e.target.value).then((result) => {
      if ((result.status = 200)) {
        setLabel(result.data["prediction(label)"]);
      }
    });
  };
  const _closeModal = () => {
    console.log(modalCloseRef.current.click());
    modalCloseRef.current.click();
  };
  const addScholar = () => {
    if (
      !(
        scholar.scholarName &&
        scholar.scholarType &&
        scholar.scholarBudgetName &&
        scholar.budgetYear
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
      });
      return null;
    }
    setIsLoading(true);
    lexTo(scholar.scholarName).then((result) => {
      if (result.status === 200) {
        let { types, tokens } = result.data;
        let narr = [];
        types.forEach((item, index) => {
          if (item === 1 || (item === 2 && !/\d/.test(tokens[index]))) {
            narr.push(tokens[index]);
          }
        });
        createScholar({
          ...scholar,
          tokens: `|${narr.join("|")}|`,
        });
        // console.log(`|${narr.join("|")}|`);
        fetchScholar();
        setIsLoading(false);
      }
    });
  };
  const _removeScholar = (id) => {
    setIsLoading(true);
    removeScholar(id).then((result) => {
      if (result.status === 200) {
      }
      fetchScholar();
      setIsLoading(false);
    });
  };
  const rendertable = (idx, datatest) => {
    return (
      <tr key={idx}>
        <th scope="row">{idx + 1}</th>
        <td>
          {datatest?.user?.firstNameTH} {datatest?.user?.lastNameTH}
        </td>
        <td className={checkpercentage(datatest.percent)}>
          <i className="fa fa-circle"></i> {datatest.percent} %
        </td>
        <td>
          <button
            href="#"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modal-sendmail"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </td>
      </tr>
    );
  };
  const _sendMail = () => {
    if (editorRef.current) {
      setIsLoading(true);
      let template = editorRef.current.getContent();
      sendEmail(template, null)
        .then((result) => {
          console.log(result);
          toast.success("ส่งข้อความสำเร็จ");
          setIsLoading(false);
        })
        .catch((e) => setIsLoading(false));
    }
  };

  return (
    <div className="container-xl">
      <Loading status={isLoading} />
      {/* -----------------MODAL----------------------------- */}
      <div
        class="modal modal-blur fade"
        id="modal-edit"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">แก้ไขโครงการวิจัย</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {scholarList.map((item) => (
                <div
                  className="sholarList d-flex justify-content-between rounded"
                  key={item.id}
                >
                  <span> {item.scholarName}</span>
                  <button
                    className="btn btn-danger ms-3 scholar-del"
                    onClick={() => _removeScholar(item.id)}
                  >
                    <i className="fas fa-trash " />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal modal-blur fade"
        id="modal-sendmail"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">ส่งอีเมล</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={(e) => (modalCloseRef.current = e)}
              ></button>
            </div>
            <div class="modal-body">
              <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                    "print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker imagetools textpattern noneditable help formatpainter permanentpen pageembed charmap tinycomments mentions quickbars linkchecker emoticons advtable export",
                  ],
                  toolbar: [
                    "print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker imagetools textpattern noneditable help formatpainter permanentpen pageembed charmap tinycomments mentions quickbars linkchecker emoticons advtable export",
                    "undo redo | formatselect | " +
                      "bold italic backcolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                  ],
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
              <div className="d-flex gap-2">
                <button className="btn btn-primary mt-4" onClick={_sendMail}>
                  ส่ง
                </button>
                <button
                  className="btn btn-secondary mt-4"
                  onClick={_closeModal}
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal modal-blur fade"
        id="modal-simple"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">เพิ่มข้อมูลโครงการวิจัย</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">
                  ชื่อโครงการวิจัย<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="example-text-input"
                  onChange={(e) => {
                    setScholar({ ...scholar, scholarName: e.target.value });
                  }}
                  placeholder="กรุณาใส่ชื่อโครงการวิจัย"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">
                  ประเภทงบประมาณ<span className="text-danger">*</span>
                </label>
                <select
                  class="form-select"
                  onChange={(e) => {
                    setScholar({ ...scholar, scholarType: e.target.value });
                  }}
                >
                  <option selected>กรุณาเลือกประเภทงบประมาณ</option>
                  <option value="งบประมาณภายนอก">งบประมาณภายนอก</option>
                  <option value="งบประมาณภายใน">งบประมาณภายใน</option>
                  <option value="ทุนส่วนตัว">ทุนส่วนตัว</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">
                  แหล่งทุน<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="example-text-input"
                  placeholder="กรุณาใส่แหล่งทุน"
                  onChange={(e) => {
                    setScholar({
                      ...scholar,
                      scholarBudgetName: e.target.value,
                    });
                  }}
                />
              </div>
              <div class="mb-3">
                <label class="form-label">
                  ปีงบประมาณ<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="example-text-input"
                  placeholder="กรุณาใส่ปีงบประมาณ"
                  value={scholar.budgetYear}
                  onChange={(e) => {
                    let text = "";
                    e.target.value.split("").forEach((item) => {
                      if (/\d/.test(item)) {
                        text += item;
                      }
                    });
                    setScholar({ ...scholar, budgetYear: text });
                  }}
                />
              </div>
              <input
                type="file"
                onChange={(e) =>
                  setScholar({ ...scholar, file: e.target.files[0] })
                }
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={addScholar}
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* -----------------MODAL----------------------------- */}
      <div className="page-header d-print-none mt-3 ">
        <div className="row align-items-center">
          <div className="col mb-3">
            <h2 className="page-title">แนะนำผู้เชี่ยวชาญ</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header bg-primary d-flex justify-content-between">
                <span className="text-white">รายละเอียดงานวิจัย</span>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    href="#"
                    className="btn btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-edit"
                  >
                    <i className="fa fa-pen ms-2 me-2"></i>แก้ไขโครงการวิจัย
                  </button>
                  <button
                    href="#"
                    className="btn btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-simple"
                  >
                    <i className="fa fa-plus ms-2 me-2"></i>เพิ่มโครงการวิจัย
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div class="mb-3">
                      <div class="form-label">ชื่อโครงการวิจัย</div>
                      <select
                        class="form-select"
                        onChange={_recommend}
                        value={scholarSelected}
                      >
                        <option value={0}>โปรดเลือก</option>
                        {scholarList?.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.scholarName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">แหล่งทุน</label>
                      <input
                        type="text"
                        class="form-control"
                        name="input-text-scholarowner"
                        placeholder="กรุณาเลือกชื่อโครงการวิจัย"
                        value={showItem.scholarBudgetName}
                        disabled
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">งบประมาณ</label>
                      <input
                        type="text"
                        class="form-control"
                        name="input-text-budget"
                        placeholder="กรุณาเลือกชื่อโครงการวิจัย"
                        value={showItem.scholarType}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-info mb-3 "
                      onClick={recommend}
                    >
                      ค้นหา
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="bg-primary text-white"
                            style={{ fontSize: "14px" }}
                          >
                            ลำดับ
                          </th>
                          <th
                            scope="col"
                            className="bg-primary text-white"
                            style={{ fontSize: "14px" }}
                          >
                            ชื่อผู้วิจัย
                          </th>

                          <th
                            scope="col"
                            className="bg-primary text-white"
                            style={{ fontSize: "14px", width: "140px" }}
                          >
                            ความเหมาะสม
                          </th>
                          <th
                            scope="col"
                            className="bg-primary text-white"
                            style={{ width: "10px" }}
                          ></th>
                        </tr>
                      </thead>
                      <tbody>
                        {rankingList.map((data, idx) => rendertable(idx, data))}
                      </tbody>
                    </table>
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
