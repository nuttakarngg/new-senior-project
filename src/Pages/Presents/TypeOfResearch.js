import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import canvasJs from "../../Libs/canvasjs.react";
import YearRange from "../../Components/YearRange";
import { getResearchAll } from "../../services/research.service";
import { getAllBranch } from "../../services/branch.service";
export default function TypeOfResearch() {
  // Initial Variable
  const CanvasJSChart = canvasJs.CanvasJSChart;
  const [research, setResearch] = useState([]);
  const dispatch = useDispatch();
  const [branch, setBranch] = useState([]);
  const [researchType, setResearchType] = useState([]);
  const [typeOfResearch, setTypeOfResearch] = useState([]);
  const fetchResearch = () => {
    getResearchAll(filterState).then((result) => {
      if (result.status === 200) {
        // console.log(result.data);
        getResearchType();
        console.log(result.data.data);
        setResearch(result.data.data);
        getResearchType();
      }
    });
  };
  const fetchBranch = () => {
    getAllBranch().then((result) => {
      if (result.status === 200) {
        setBranch(result.data.data);
      }
    });
  };
  useEffect(() => {
    fetchBranch();
    fetchResearch();
  }, []);
  const options = {
    animationEnabled: true,
    borderWidth: 3,
    title: {
      text: "จำนวนประเภทงานวิจัย",
      fontFamily: "Prompt",
      horizontalAlign: "left",
      padding: 15,
    },
    subtitles: [
      {
        fontFamily: "Prompt",
        wrap: true,
        text: `${research.length} งานวิจัยทั้งหมด`,
        verticalAlign: "center",
        fontSize: 18,
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
          {
            name: researchType[0],
            y: ((typeOfResearch[0] / research.length) * 100).toFixed(2),
            color: "#4ED8DA",
          },
          {
            name: researchType[1],
            y: ((typeOfResearch[1] / research.length) * 100).toFixed(2),
            color: "#C04DD8",
          },
        ],
      },
    ],
  };
  const initialFilterState = {
    keyword: "",
    researchResult: "",
    startYear: "2550",
    endYear: "2564",
    useYear: false,
    branchList: [],
    researchType: "",
    year: 2564,
  };
  const YearList = [
    2565, 2564, 2563, 2562, 2561, 2560, 2559, 2558, 2557, 2556, 2555, 2554,
    2553, 2552, 2551, 2550,
  ];
  const [filterState, setFilterState] = useState(initialFilterState);

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
  const renderYear = YearList.sort().map((year, idx) => (
    <option key={idx} value={year}>
      {year}
    </option>
  ));
  const getResearchType = () => {
    var temp = [];
    let keys = Array.from(new Set(research.map((item) => item.researchType)));
    keys.forEach((item, idx) => {
      temp[idx] = research.reduce(
        (counter, obj) =>
          obj.researchType === item ? (counter += 1) : counter,
        0
      );
    });
    setTypeOfResearch([...temp]);
    console.log(typeOfResearch);
    setResearchType([...keys]);
  };

  // End Rander State
  // UseEffect
  useEffect(() => {
    dispatch({
      type: "SET_DATA",
      payload: { navbar: ["/Presents", "/TypeOfResearch"] },
    });
  });

  useEffect(() => {
    fetchBranch();
    fetchResearch();
  }, [filterState]);
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
                      <YearRange
                        onChange={({ startYear, endYear }) =>
                          setFilterState({ ...filterState, startYear, endYear })
                        }
                        value={initialFilterState}
                      />
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
                              {(
                                (typeOfResearch[0] / research.length) *
                                100
                              ).toFixed(2)}{" "}
                              %
                            </span>
                            <p className="text-muted">
                              <i
                                className="fa fa-circle"
                                style={{ color: "white" }}
                              ></i>{" "}
                              {/* {[1]} */}
                              {researchType[0]}
                            </p>
                          </div>
                          <div className="">
                            <span style={{ fontSize: "24px", fontWeight: 500 }}>
                              <i
                                className="fa fa-circle"
                                style={{ color: "#C04DD8" }}
                              ></i>{" "}
                              {(
                                (typeOfResearch[1] / research.length) *
                                100
                              ).toFixed(2)}{" "}
                              %
                            </span>
                            <p className="text-muted">
                              <i
                                className="fa fa-circle"
                                style={{ color: "white" }}
                              ></i>{" "}
                              {researchType[1]}
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
