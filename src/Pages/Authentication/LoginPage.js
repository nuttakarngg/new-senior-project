import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link,useHistory  } from "react-router-dom";
export default function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch({type:'SET_DATA',payload:{navbar:[]}})
  })
  return (
    <div className="container-xl mb-5">
      <div className="row mt-3">
        <div className="bg-light animate__animated animate__zoomIn">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="bg-white shadow rounded">
                  <div className="row mt-5">
                    <div className="col-md-7 pe-0">
                    <div className="p-3">
                        <span
                          className="text-primary cursor-pointer"
                          onClick={() => {
                            history.goBack();
                          }}
                        >
                          <i className="fas fa-arrow-left me-2" />
                          กลับไปที่ก่อนหน้า
                        </span>
                      </div>
                      <div className="form-left h-100 pt-3 pb-5 px-5">
                        <div className="row g-4">
                          <div className="col-12">
                            <label>
                              อีเมล<span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                              <div className="input-group-text">
                                <i className="fas fa-envelope"></i>
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="กรุณากรอกอีเมล"
                              />
                            </div>
                          </div>

                          <div className="col-12">
                            <label>
                              รหัสผ่าน<span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                              <div className="input-group-text">
                                <i className="fas fa-key"></i>
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="กรุณากรอกรหัสผ่าน"
                              />
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineFormCheck"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineFormCheck"
                              >
                                จดจำการเข้าสู่ระบบ
                              </label>
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <Link to="/forgot-password" className="float-end text-primary">
                              ลืมรหัสผ่าน?
                            </Link>
                          </div>

                          <div className="col-12">
                            <button
                              type="submit"
                              className="btn btn-primary px-4 float-end mt-4"
                            >
                              เข้าสู่ระบบ
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5 ps-0 d-none d-md-block">
                      <div className="form-right h-100 bg-rmutt text-white text-center pt-5 animate__animated animate__fadeIn animate__delay-1s"></div>
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
