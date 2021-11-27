import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useAuth } from "../authentication/auth-context";
import { useEffect, useState } from "react";

function Navbar() {
  let navbar = useSelector((state) => state.navbar) || [];
  let keyword = useSelector((state) => state.nav_keyword) || "";
  const [authen, setAuthen] = useState({});
  const auth = useAuth();
  const dispatch = useDispatch();
  useEffect(async () => {
    const authenti = await auth.user();
    if (authenti.status === 200) {
      setAuthen(authenti.data.data);
    }
  }, []);
  const searchNav = (e) => {
    dispatch({
      type: "SET_KEYWORD",
      payload: e.target.value,
    });
  };
  return (
    <div className="navbar-expand-md">
      <div className="collapse navbar-collapse" id="navbar-menu">
        <div className="navbar navbar-light">
          <div className="container-xl">
            <ul className="navbar-nav">
              <li
                className={
                  "nav-item " + (navbar[0] === "/HomePage" ? "active" : "")
                }
              >
                <Link className="nav-link " to="/">
                  <span className="nav-link-icon d-md-none d-lg-inline-block">
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
                      <polyline points="5 12 3 12 12 3 21 12 19 12" />
                      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                    </svg>
                  </span>
                  <span className="nav-link-title">หน้าแรก</span>
                </Link>
              </li>
              <li
                className={
                  "nav-item dropdown " +
                  (navbar[0] === "/Database" ? "active" : "")
                }
              >
                <a
                  className="nav-link dropdown-toggle"
                  href="#navbar-base"
                  data-bs-toggle="dropdown"
                  role="button"
                  aria-expanded="false"
                >
                  <span className="nav-link-icon d-md-none d-lg-inline-block ">
                    <i className="fas fa-database" />
                  </span>
                  <span className="nav-link-title">ระบบฐานข้อมูล</span>
                </a>
                <div className="dropdown-menu">
                  <div className="dropdown-menu-columns">
                    <div className="dropdown-menu-column">
                      {auth.hasLogin &&
                        authen.roles?.filter((role) => role.id === 3).length >
                          0 && (
                          <Link
                            className={
                              "dropdown-item " +
                              (navbar[1] === "/RecommendResearcher"
                                ? "active"
                                : "")
                            }
                            to="/Database/RecommendResearcher"
                          >
                            แนะนำผู้วิจัย
                          </Link>
                        )}
                      <Link
                        className={
                          "dropdown-item " +
                          (navbar[1] === "/SearchByResearcher" ? "active" : "")
                        }
                        to="/Database/SearchByResearcher"
                      >
                        ค้นหาผู้เชี่ยวชาญ
                      </Link>
                      <Link
                        className={
                          "dropdown-item " +
                          (navbar[1] === "/SearchByResearch" ? "active" : "")
                        }
                        to="/Database/SearchByResearch"
                      >
                        ค้นหางานวิจัย
                      </Link>
                      <a
                        className="dropdown-item"
                        target="_blank"
                        rel="noreferrer"
                        href="https://urms.rmutt.ac.th/"
                      >
                        ระบบฐานข้อมูลเดิม
                      </a>
                    </div>
                  </div>
                </div>
              </li>

              {auth.hasLogin &&
                authen.roles?.filter((role) => role.id === 4).length > 0 && (
                  <li
                    className={
                      "nav-item dropdown " +
                      (navbar[0] === "/Presents" ? "active" : "")
                    }
                  >
                    <a
                      className="nav-link dropdown-toggle"
                      href="#navbar-base"
                      data-bs-toggle="dropdown"
                      role="button"
                      aria-expanded="false"
                    >
                      <span className="nav-link-icon d-md-none d-lg-inline-block">
                        <i className="fas fa-chart-line" />
                      </span>
                      <span className="nav-link-title">
                        ระบบนำเสนอผู้บริหาร
                      </span>
                    </a>
                    <div className="dropdown-menu">
                      <div className="dropdown-menu-columns">
                        <div className="dropdown-menu-column">
                          {/* <Link
                        className={
                          "dropdown-item " +
                          (navbar[1] === "/Dashboard" ? "active" : "")
                        }
                        to="/Presents/Dashboard"
                      >
                        กระดานข้อมูล
                      </Link> */}
                          <Link
                            className={
                              "dropdown-item " +
                              (navbar[1] === "/RankingPerYear" ? "active" : "")
                            }
                            to="/Presents/RankingPerYear"
                          >
                            อันดับงบประมาณรายได้ต่อปี
                          </Link>
                          <Link
                            className={
                              "dropdown-item " +
                              (navbar[1] === "/TrendByYear" ? "active" : "")
                            }
                            to="/Presents/TrendByYear"
                          >
                            แนวโน้มของงบประมาณ
                          </Link>
                          <Link
                            className={
                              "dropdown-item " +
                              (navbar[1] === "/TypeOfResearch" ? "active" : "")
                            }
                            to="/Presents/TypeOfResearch"
                          >
                            จำนวนประเภทงานวิจัย
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                )}
              {auth.hasLogin &&
                authen.roles?.filter((role) => role.id === 1).length > 0 && (
                  <li
                    className={
                      "nav-item dropdown " +
                      (navbar[0] === "/UsersManage" ? "active" : "")
                    }
                  >
                    <a
                      className="nav-link dropdown-toggle"
                      href="#navbar-base"
                      data-bs-toggle="dropdown"
                      role="button"
                      aria-expanded="false"
                    >
                      <span className="nav-link-icon d-md-none d-lg-inline-block">
                        <i className="fas fa-users" />
                      </span>
                      <span className="nav-link-title">จัดการผู้ใช้งาน</span>
                    </a>
                    <div className="dropdown-menu">
                      <div className="dropdown-menu-columns">
                        <div className="dropdown-menu-column">
                          <Link
                            className={
                              "dropdown-item " +
                              (navbar[1] === "/Users" ? "active" : "")
                            }
                            to="/UsersManage/Researcher"
                          >
                            จัดการผู้ใช้งาน
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
              )}
            </ul>
            {/* <div className="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
              <form action="." method="get">
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
                    value={keyword}
                    onKeyUp={(e) => {
                      searchNav(e);
                    }}
                    onChange={(e) => {
                      searchNav(e);
                    }}
                    className="form-control"
                    placeholder="ค้นหาเมนู"
                  />
                </div>
              </form>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
