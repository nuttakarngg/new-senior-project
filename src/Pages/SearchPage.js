import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Lists from "../Components/list";
export default function SearchPage() {
  const dispatch = useDispatch();
  let keyword = useSelector((state) => state.nav_keyword) || "";
  function resetNavbar() {
    dispatch({
      type: "SET_KEYWORD",
      payload: "",
    });
  }
  const listRender = Lists.map((list, idx) => (
    <div className="col-md-3 my-2" key={idx}>
      {list.path ? (
        <Link
          to={list.path}
          className="card btn-outline-azure"
          onClick={resetNavbar}
        >
          <div className="card-body">{list.name}</div>
        </Link>
      ) : (
        <a
          href={list.url}
          target="_blank"
          rel="noreferrer"
          className="card btn-outline-azure"
          onClick={resetNavbar}
        >
          <div className="card-body">{list.name}</div>
        </a>
      )}
    </div>
  ));
  if (!keyword) return <></>;
  return (
    <div
      className="container-xl py-3 animate__animated animate__fadeIn"
      style={{ height: "100vh" }}
    >
      <div className="card bg-light">
        <div className="card-body">
          <div className="row">{listRender}</div>
        </div>
      </div>
    </div>
  );
}
