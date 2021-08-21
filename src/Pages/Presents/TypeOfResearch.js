import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import canvasJs from "../../Libs/canvasjs.react";
const CanvasJSChart = canvasJs.CanvasJSChart;

export default function TypeOfResearch() {
  // Initial Variable
  const dispatch = useDispatch();
  const options = {
    animationEnabled: true,
    borderWidth: 3,
    title: {
      text: "จำนวนประเภทงานวิจัย",
      fontFamily: "Kanit",
      horizontalAlign: "left",
      padding: 15,
    },
    subtitles: [
      {
        fontFamily: "Kanit",
        wrap: true,
        text: "53 งานวิจัยทั้งหมด",
        verticalAlign: "center",
        fontSize: 20,
        dockInsidePlotArea: true,
      },
    ],
    data: [
      {
        innerRadius: "80%",
        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###'%'",
        dataPoints: [
          { name: "วิจัยเพื่อสร้างองค์ความรู้", y: 34, color: "#4ED8DA" },
          { name: "วิจัยเพื่อถ่ายทอดเทคโนโลยี", y: 19, color: "#C04DD8" },
        ],
      },
    ],
  };
  const initialFilterState = {
    keyword: "",
    startYear: "2000",
    endYear: "2005",
    useYear: false,
    branchList: [],
    researchType: "",
    year: 2020,
  };
  const YearList = [
    2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009,
    2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997,
    1996,
  ];
  const [filterState, setFilterState] = useState(initialFilterState);
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
  // End initial variable
  // Handle Event
  const handleCheckboxChange = (event) => {
    let list = [...filterState.branchList, event.target.value];
    if (filterState.branchList.includes(event.target.value)) {
      list = list.filter((branch) => branch !== event.target.value);
    }
    setFilterState({ ...filterState, branchList: list });
  };
  // End Handle Event
  //   Rander State
  const renderBranchList = BranchList.map((branch, idx) => (
    <label className="form-check" key={idx}>
      <input
        className="form-check-input"
        onChange={handleCheckboxChange}
        value={branch}
        type="checkbox"
      />
      <span className="form-check-label">{branch}</span>
    </label>
  ));

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
  const renderYear = YearList.sort().map((year, idx) => (
    <option key={idx} value={year}>
      {year}
    </option>
  ));
  // End Rander State
  // UseEffect
  useEffect(() => {
    dispatch({
      type: "SET_DATA",
      payload: { navbar: ["/Presents", "/TypeOfResearch"] },
    });
  });
  //End UseEffect
  return (
    <div className="container-xl">
      <div className="row">
        <div className="col-xl-12">
          <div className="row justify-content-around">
            <div className="col-xl-3 col-sm-12 my-3">
              <div className="card animate__animated animate__slideInLeft">
                <div className="card-header bg-primary">
                  <span className="text-white">ตัวกรองข้อมูล</span>
                </div>
                <div className="card-body">
                  <div>
                    <label className="form-label">
                      ปีงบประมาณ{" "}
                      <input
                        type="checkbox"
                        onChange={(event) => {
                          setFilterState({
                            ...filterState,
                            useYear: event.target.checked,
                          });
                        }}
                      />{" "}
                      ตามช่วงเวลา
                    </label>
                    <select
                      hidden={filterState.useYear}
                      className="form-select"
                      value={filterState.year}
                      onChange={(event) => {
                        setFilterState({
                          ...filterState,
                          year: event.target.value,
                        });
                      }}
                    >
                      {renderYear}
                    </select>
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
                    <span className="form-label">สาขาวิชาที่เกี่ยวข้อง</span>
                    {renderBranchList}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-sm-12 my-3">
              <div className="card animate__animated animate__slideInRight">
                <div className="card-header bg-primary">
                  <span className="text-white">จำนวนประเภทงานวิจัย</span>
                </div>
                <div className="card-body">
                  {filterState.branchList.length === 0 ? (
                    <div className="text-danger">
                      *** กรุณาเลือกสาขาที่ต้องการทราบแนวโน้มของงบประมาณ ***
                    </div>
                  ) : (
                    <div
                      className="row bg-white p-5"
                      style={{ minHeight: "60vh" }}
                    >
                      <div className="col-md-6 col-sm-12 px-0">
                        <CanvasJSChart options={options} />
                      </div>
                      <div className="col-md-6 col-sm-12 bg-white d-flex justify-content-center align-items-center py-4 py-4">
                        <div className="d-flex flex-column">
                          <div className="">
                            <span style={{ fontSize: "24px", fontWeight: 500 }}>
                              <i
                                className="fa fa-circle"
                                style={{ color: "#4ED8DA" }}
                              ></i>{" "}
                              83.6 %
                            </span>
                            <p className="text-muted">
                              <i
                                className="fa fa-circle"
                                style={{ color: "white" }}
                              ></i>{" "}
                              วิจัยเพื่อสร้างองความรู้
                            </p>
                          </div>
                          <div className="">
                            <span style={{ fontSize: "24px", fontWeight: 500 }}>
                              <i
                                className="fa fa-circle"
                                style={{ color: "#C04DD8" }}
                              ></i>{" "}
                              16.4 %
                            </span>
                            <p className="text-muted">
                              <i
                                className="fa fa-circle"
                                style={{ color: "white" }}
                              ></i>{" "}
                              วิจัยเพื่อถ่ายทอดเทคโนโลยี
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
