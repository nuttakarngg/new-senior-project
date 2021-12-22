import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CardResearcher from "../../Components/Database/CardResearcher";
import { getAllBranch } from "../../services/branch.service";
import { getAllResearcher } from "../../services/researcher.service";
import _ from "lodash";
export default function Search() {
  // Initial Variable
  const dispatch = useDispatch();
  const [branch, setBranch] = useState([]);
  const [research, setResearch] = useState([])
  const initialFilterState = {
    keyword: "",
    acPosition: "",
    branchList: [],
  };
  const [filterState, setFilterState] = useState(initialFilterState);
  const AcademiaPositionList = ["ศาสตราจารย์","รองศาสตราจารย์", "ผู้ช่วยศาสตราจารย์","ไม่มี"];
  // End Initial Variable
  // Handle Event
  const handleCheckboxChange = (event) => {
    let list = [...filterState.branchList, event.target.value];
    if (filterState.branchList.includes(event.target.value)) {
      list = list.filter((branch) => branch !== event.target.value);
    }
    setFilterState({ ...filterState, branchList: list });
  };
  // End Handle Event
  // Render State
  const renderBranchList = branch.map((branch, idx) => (
    <label className="form-check" key={idx}>
      <input
        className="form-check-input"
        onChange={handleCheckboxChange}
        value={branch.id}
        type="checkbox"
      />
      <span className="form-check-label">{branch.name_th}</span>
    </label>
  ));

  const renderAcademiaPosition = AcademiaPositionList.map(
    (academiaType, idx) => (
      <option key={idx} value={academiaType}>
        {academiaType}
      </option>
    )
  );
  // End Render State
  const fetchResearcher = () => {
    console.log('fetch...');
    getAllResearcher(filterState).then((result) => {
      setResearch(result.data.data)
    });
  };

  const fetchBranch = () => {
    getAllBranch().then((result) => {
      console.log(result.data);
      setBranch(result.data.data);
    });
  };
  // UseEffect
  useEffect(() => {
    fetchBranch();
    fetchResearcher();
  }, []);
  useEffect(() => {
    dispatch({
      type: "SET_DATA",
      payload: { navbar: ["/Database", "/SearchByResearcher"] },
    });
  });
  useEffect(() => {
    fetchResearcher();
    _.debounce(fetchResearcher, 1000);
  }, [filterState]);
  // End UseEffect
  return (
    <div className="container-xl">
      <div className="page-header d-print-none mt-3 ">
        <div className="row align-items-center">
          <div className="col">
            <h2 className="page-title">ค้นหาผู้เชี่ยวชาญ</h2>
          </div>
        </div>
      </div>
      <div className="row justify-content-around">
        <div className="col-md-3 col-sm-12 my-3">
          <div className="card animate__animated animate__slideInLeft">
            <div className="card-header bg-primary">
              <span className="text-white">ตัวกรองข้อมูล</span>
            </div>
            <div className="card-body">
              <div>
                <label className="form-label">คีย์เวิร์ด</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    onKeyUp={(event) =>
                      setFilterState({
                        ...filterState,
                        keyword: event.target.value,
                      })
                    }
                ></input>
                  <button className="btn btn-outline-secondary" type="button">
                    <i className="fas fa-search" />
                  </button>
                </div>
                <small>*ชื่อ, นามสกุล, หน่วยงาน, อีเมล์</small>
              </div>
              <div className="mt-3">
                <label className="form-label">ตำแหน่งทางวิชาการ</label>
                <select
                  type="text"
                  className="form-select"
                  onChange={(event) => {
                    setFilterState({
                      ...filterState,
                      acPosition: event.target.value,
                    });
                  }}
                >
                  <option value="">ทั้งหมด</option>
                  {renderAcademiaPosition}
                </select>
              </div>
              <div className="mt-3">
                <span className="form-label">สาขาวิชาที่เกี่ยวข้อง</span>
                {renderBranchList}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8 col-sm-12">
          {research.map((item,idx)=><CardResearcher {...item} key={idx}/>)}
        </div>
      </div>
    </div>
  );
}
