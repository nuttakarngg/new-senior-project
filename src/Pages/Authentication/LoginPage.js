import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../Components/Loading";
import { loginService } from "../../services/auth.service";

import isEmail from "isemail";
import { useAuth } from "../../authentication/auth-context";
export default function LoginPage() {
  const history = useHistory();
  const auth = useAuth();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [remember, setRemember] = useState({ status: false });
  const [error, setError] = useState({ isEmail: true, isPassword: true });
  useEffect(() => {
    if (auth.hasLogin) {
      history.push("/");
    }
    if (localStorage.getItem("rememberMe")) {
      const rememberData = JSON.parse(localStorage.getItem("rememberMe"));
      setLoginData({ ...loginData, email: rememberData.email });
      setRemember(rememberData);
    }
  }, []);
  const login = async () => {
    setIsLoading(true);
    try {
      const { email, password } = loginData;
      setError({ isPassword: !!password, isEmail: !!email });
      if (!email) {
        toast.error("กรุณากรอกอีเมล");
      } else if (!isEmail.validate(email)) {
        toast.error("กรุณากรอกอีเมลให้ถูกต้อง");
      }

      if (!password) {
        toast.error("กรุณากรอกรหัสผ่าน");
      }
      if (email && password) {
        if (remember.status) {
          localStorage.setItem(
            "rememberMe",
            JSON.stringify({ ...remember, email: email })
          );
        } else {
          localStorage.removeItem("rememberMe");
        }
        const result = await loginService(loginData);
        console.log(result);
        if (result.data.status === 200) {
          localStorage.setItem("token", result.data.token);
          // window.dispatchEvent(new Event("storage"));
          window.location.reload();
          history.push("/");
        }
      }
    } catch (e) {
      if (e.response.status === 403) {
        toast.error("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      }
    }
    setIsLoading(false);
  };

  const rememberMe = (e) => {
    if (e.target.checked) {
      setRemember({
        ...remember,
        status: true,
      });
    } else {
      setRemember({
        status: false,
      });
    }
  };
  return (
    <div className="container-xl mb-5">
      <Loading status={isLoading} />

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
                                className={
                                  "form-control" +
                                  (error.isEmail ? "" : " is-invalid")
                                }
                                placeholder="กรุณากรอกอีเมล"
                                value={loginData.email}
                                onKeyDown={(e) =>
                                  e.code === "Enter" || e.code === "NumpadEnter"
                                    ? login()
                                    : null
                                }
                                onChange={(e) =>
                                  setLoginData({
                                    ...loginData,
                                    email: e.target.value,
                                  })
                                }
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
                                type="password"
                                className={
                                  "form-control" +
                                  (error.isPassword ? "" : " is-invalid")
                                }
                                placeholder="กรุณากรอกรหัสผ่าน"
                                value={loginData.password}
                                onKeyDown={(e) =>
                                  e.code === "Enter" || e.code === "NumpadEnter"
                                    ? login()
                                    : null
                                }
                                onChange={(e) =>
                                  setLoginData({
                                    ...loginData,
                                    password: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineFormCheck"
                                onChange={rememberMe}
                                checked={remember.status}
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
                            <Link
                              to="/forgot-password"
                              className="float-end text-primary"
                            >
                              ลืมรหัสผ่าน?
                            </Link>
                          </div>

                          <div className="col-12">
                            <button
                              type="submit"
                              className="btn btn-primary px-4 float-end mt-4"
                              onClick={login}
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
