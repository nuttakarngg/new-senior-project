import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CardResearch from "../../Components/Database/CardResearch";

export default function Search() {
  // Initial Variable
  const dispatch = useDispatch();
  const initialFilterState = {
    keyword: "",
    startYear: "2000",
    endYear: "2005",
    useYear: false,
    branchList: [],
    researchType:''
  };
  const researchTypeList = ["การวิจัยเพื่อสร้างองค์ความรู้","การวิจัยเพื่อถ่ายทอดเทคโนโลยี"]
  const [filterState, setFilterState] = useState(initialFilterState);
  const YearList = [
    2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009,
    2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997,
    1996,
  ];
  const BranchList = [
    "สาขา 1",
    "สาขา 2",
    "สาขา 3",
    "สาขา 4",
    "สาขา 5",
    "สาขา 6",
    "สาขา 7",
    "สาขา 8",
    "สาขา 9",

  ];
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
  // RenderState
  const renderYearStart = YearList.sort().map((year, idx) => (
    <option key={idx} value={year}>
      {year}
    </option>
  ));
  const renderYearEnd = YearList.sort()
    .reverse()
    .map((year, idx) => (
      <option key={idx} value={year}>
        {year}
      </option>
    ));
  const renderBranchList = BranchList.map((branch, idx) => (
    <label className="form-check" key={idx}>
      <input className="form-check-input" onChange={handleCheckboxChange} value={branch} type="checkbox" />
      <span className="form-check-label">{branch}</span>
    </label>
  ));
  const renderResearchType = researchTypeList.map((researchType,idx)=>(
    <option key={idx} value={researchType}>{researchType}</option>
  ))

  // End RenderState

  // UseEffect
  useEffect(() => {
    dispatch({
      type: "SET_DATA",
      payload: { navbar: ["/Database", "/SearchByResearch"] },
    });
  });
  useEffect(() => {
    if (filterState.startYear > filterState.endYear) {
      const tempStartYear = filterState.startYear;
      const tempEndYear = filterState.endYear;
      setFilterState({
        ...filterState,
        startYear: tempEndYear,
        endYear: tempStartYear,
      });
    }
  }, [filterState]);
  // End UseEffect
  return (
    <div className="container-xl">
      <div className="page-header d-print-none mt-3 ">
        <div className="row align-items-center">
          <div className="col">
            <h2 className="page-title">ค้นหางานวิจัย</h2>
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
                <label className="form-label">หัวข้อ</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    onKeyUp={(event) => {
                      setFilterState({
                        ...filterState,
                        keyword: event.target.value,
                      });
                    }}
                  ></input>
                  <button className="btn btn-outline-secondary" type="button">
                    <i className="fas fa-search" />
                  </button>
                </div>
                <small>*สามารถว่างได้</small>
              </div>
              <div className="mt-3 hover-primary">
                <label className="form-label">
                  <input
                    type="checkbox"
                    onChange={(event) => {
                      setFilterState({
                        ...filterState,
                        useYear: event.target.checked,
                      });
                    }}
                  />{" "}
                  ปีงบประมาณ
                </label>
                <div className="row" hidden={!filterState.useYear}>
                  <div className="col-md-2 d-flex align-items-center">
                    ตั้งแต่
                  </div>
                  <div className="col-md-5 col-sm-12">
                    <select
                      className="form-select"
                      value={filterState.startYear}
                      onChange={(event) => {
                        setFilterState({
                          ...filterState,
                          startYear: event.target.value,
                        });
                      }}
                    >
                      {renderYearStart}
                    </select>
                  </div>
                  <div className="col-md-1 p-md-0 d-flex align-items-center">
                    ถึง
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <select
                      className="form-select"
                      value={filterState.endYear}
                      onChange={(event) => {
                        setFilterState({
                          ...filterState,
                          endYear: event.target.value,
                        });
                      }}
                    >
                      {renderYearEnd}
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <label className="form-label">ประเภทงานวิจัย</label>
                <select type="text" className="form-select" onChange={(event) => {
                        setFilterState({
                          ...filterState,
                          researchType: event.target.value,
                        });
                      }}>
                  <option value="">ทั้งหมด</option>
                 {renderResearchType}
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
          <CardResearch />
          <CardResearch />
          <CardResearch />
          <CardResearch />
          <CardResearch />
          <CardResearch />
          <CardResearch />
        </div>
      </div>
    </div>
  );
}
