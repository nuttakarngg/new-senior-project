import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import canvasJs from "../../Libs/canvasjs.react";
import YearRange from "../../Components/YearRange";
import { getAllBranch } from "../../services/branch.service";
import { getScohlarType, getTypeOfResearch } from "../../services/data.service";
import { getOwner } from "../../services/scholar.service";
export default function TypeOfResearch() {
  // Initial Variable
  const CanvasJSChart = canvasJs.CanvasJSChart;
  const dispatch = useDispatch();
  const [branch, setBranch] = useState([]);
  const [typeOfResearch, setTypeOfResearch] = useState([]);

  const initialFilterState = {
    keyword: "",
    researchResult: "",
    startYear: "2550",
    endYear: "2564",
    useYear: false,
    owner: "",
    budgetType: "",
    branchList: [],
    researchType: "",
    year: 2564,
  };

  const YearList = [
    2565, 2564, 2563, 2562, 2561, 2560, 2559, 2558, 2557, 2556, 2555, 2554,
    2553, 2552, 2551, 2550,
  ];

  const [owner, setOwner] = useState([]);
  const [filterState, setFilterState] = useState(initialFilterState);
  const fetchType = () => {
    getTypeOfResearch(filterState).then((result) => {
      if (result.status === 200) {
        setTypeOfResearch(result.data);
      }
    });
  };
  const fetchScohlarType = (item) => {
    if (item) {
      Promise.all(item).then((result) => {
        // console.log(result.map((res) => res.data));
        setTypeOfResearch(result.map((res) => res.data));
      });
    }
  };
  const fetchOwner = () => {
    getOwner().then((result) => {
      if (result.status === 200) {
        setOwner(result.data.data);
      }
    });
  };
  const _renderDonut = (item) => {
    if (item?.data?.length === 0) {
      return null;
    }

    let all =
      item?.data?.length === 0
        ? 0
        : item?.data?.map((i) => i.total)?.reduce((a = 0, b) => (a += b)) || 0;
    let colors = [
      "#008018",
      "#7423ff",
      "#1ab400",
      "#a329ff",
      "#28b600",
      "#7400cf",
      "#00ff88",
      "#00009f",
      "#00c83d",
      "#ca4aff",
      "#94c500",
      "#4d00a8",
      "#00ff9e",
      "#5914b0",
      "#beff73",
      "#8e2dc1",
      "#e7de2e",
      "#6c6cfe",
      "#aad43a",
      "#002e9d",
      "#bcd437",
      "#002d97",
      "#c1fa76",
      "#ff70ff",
      "#008e00",
      "#ff73ff",
      "#008d00",
      "#ff37c4",
      "#00c35b",
      "#ff6ff9",
      "#009d30",
      "#a80093",
      "#89ff92",
      "#6e0077",
      "#75d75a",
      "#dd7cff",
      "#7aad00",
      "#005dd7",
      "#86af00",
      "#0082ff",
      "#ff1f00",
      "#00ffc1",
      "#ff0083",
      "#009c3e",
      "#9e3eb5",
      "#72a000",
      "#004cb8",
      "#ffe05b",
      "#002b84",
      "#e1c747",
      "#00328c",
      "#ff6b00",
      "#0098ff",
      "#ff5b16",
      "#00ffff",
      "#f30026",
      "#00fff7",
      "#d7031b",
      "#00ffff",
      "#fa0056",
      "#00f3d9",
      "#e00064",
      "#00ffff",
      "#ff493f",
      "#00ffff",
      "#9f0000",
      "#00ffff",
      "#9d0000",
      "#00faff",
      "#ff5a30",
      "#00e6ff",
      "#950000",
      "#00e1ff",
      "#e74633",
      "#00deff",
      "#8c0000",
      "#34e9ff",
      "#b63c00",
      "#009eff",
      "#a09d00",
      "#00409f",
      "#bfbf3c",
      "#60006e",
      "#3eaf49",
      "#ff88f1",
      "#006600",
      "#ff97ff",
      "#009c48",
      "#ff62bb",
      "#008036",
      "#cd53b6",
      "#009351",
      "#ff9fff",
      "#6c8900",
      "#6d92ff",
      "#ff6f38",
      "#007ee4",
      "#b74100",
      "#00a8ff",
      "#b06600",
      "#006ecd",
      "#547400",
      "#ffa1ff",
      "#004600",
      "#ffa3ff",
      "#004600",
      "#f78fea",
      "#008540",
      "#df70ca",
      "#00b884",
      "#640061",
      "#ceffb2",
      "#460056",
      "#c8e9a8",
      "#40004d",
      "#ffe294",
      "#002b78",
      "#d4943d",
      "#004398",
      "#677600",
      "#cd90f5",
      "#4b6b00",
      "#e69eff",
      "#004500",
      "#ffa8ff",
      "#003600",
      "#ffb6ff",
      "#003200",
      "#eab1ff",
      "#002e00",
      "#dbadff",
      "#002a00",
      "#ff8ac1",
      "#003c0e",
      "#ff697b",
      "#00bfbd",
      "#9f0020",
      "#00cdff",
      "#892000",
      "#00cbff",
      "#6a0000",
      "#3dd5ff",
      "#660000",
      "#73e9ff",
      "#7a0019",
      "#00c4ff",
      "#550000",
      "#00c1ff",
      "#520000",
      "#c1fdff",
      "#410000",
      "#c4f5ff",
      "#3b0000",
      "#fffbcc",
      "#000734",
      "#69c68b",
      "#9d0054",
      "#54b384",
      "#b6549a",
      "#009c82",
      "#ff7186",
      "#00c5dc",
      "#5b0029",
      "#00b9ff",
      "#3d0d00",
      "#00b8ff",
      "#4e4100",
      "#007cd8",
      "#baab58",
      "#005cb5",
      "#bba35a",
      "#004596",
      "#ffbf97",
      "#003170",
      "#ff9183",
      "#008fe7",
      "#373700",
      "#32b2ff",
      "#3b2c00",
      "#7cadff",
      "#152a00",
      "#ffc7fa",
      "#002b07",
      "#ff90bc",
      "#002107",
      "#ffd4ff",
      "#001403",
      "#ffe7ff",
      "#001229",
      "#ffd9ff",
      "#00281b",
      "#fd8093",
      "#009986",
      "#d36b8a",
      "#003c23",
      "#ff9ec8",
      "#00351e",
      "#ffa9d6",
      "#262300",
      "#d4e2ff",
      "#3b1d00",
      "#00a6f0",
      "#58340f",
      "#00a7e2",
      "#3b2a00",
      "#00a1dc",
      "#382400",
      "#00a9da",
      "#492d0c",
      "#009ed7",
      "#5f341e",
      "#00b0c1",
      "#5c272d",
      "#66bfdf",
      "#282100",
      "#ffb0dc",
      "#002d37",
      "#ffbae0",
      "#18193c",
      "#9eae77",
      "#004d9d",
      "#648947",
      "#0059a2",
      "#61a379",
      "#41274e",
      "#a9c5b0",
      "#00254b",
      "#6bac97",
      "#002c56",
      "#938d66",
      "#0079bd",
      "#9c745a",
      "#004176",
      "#4f835e",
      "#b682b6",
      "#31432f",
      "#00a9b9",
      "#353323",
      "#009fb6",
      "#53416e",
      "#67765a",
      "#00304f",
      "#687365",
      "#004265",
      "#008ba5",
      "#003652",
      "#0088ae",
      "#004045",
      "#5675a6",
      "#003b4f",
      "#00697f",
      "#003f55",
      "#005266",
      "#004256",
    ];
    const _maptype = (itemtype, index) => {
      return (
        <div className="">
          <span style={{ fontSize: "24px", fontWeight: 500 }}>
            <i className="fa fa-circle" style={{ color: colors[index] }}></i>{" "}
            {((itemtype.total / all) * 100).toFixed(2)} %
          </span>
          <p className="text-muted">
            <i className="fa fa-circle" style={{ color: "white" }}></i>{" "}
            {itemtype.researchScholarName}
          </p>
        </div>
      );
    };
    const _mapDataPoint = () => {
      return item?.data?.map((item2, index) => ({
        name: item2.researchScholarName,
        y: ((item2.total / all) * 100).toFixed(2),
        color: colors[index],
      }));
    };
    const options = {
      animationEnabled: true,
      borderWidth: 3,
      title: {
        text: "จำนวนชื่อทุนวิจัย",
        fontFamily: "Prompt",
        horizontalAlign: "left",
      },
      subtitles: [
        {
          fontFamily: "Prompt",
          // text: `${all} งานวิจัยทั้งหมด`,
          verticalAlign: "center",
          fontSize: 18,
          dockInsidePlotArea: true,
        },
      ],
      data: [
        {
          innerRadius: "80%",
          type: "pie",
          showInLegend: true,
          indexLabel: "{name}: {y}",
          yValueFormatString: "#,###'%'",
          dataPoints: _mapDataPoint(),
        },
      ],
    };
    return (
      <div className="card animate__animated animate__slideInRight mb-3">
        <div className="card-header bg-primary">
          <span className="text-white">
            {branch.filter((branchItem) => branchItem.id == item.id)[0].name_th}
          </span>
        </div>
        <div className="card-body">
          {filterState.branchList.length === 0 ? (
            <div className="text-danger">
              *** กรุณาเลือกสาขาที่ต้องการทราบแนวโน้มของงบประมาณ ***
            </div>
          ) : (
            <div className="row bg-white p-5" style={{ minHeight: "60vh" }}>
              <div className="col-md-6 col-sm-12 px-0">
                <CanvasJSChart options={options} />
              </div>
              <div className="col-md-6 col-sm-12 bg-white d-flex justify-content-center align-items-center py-4 py-4">
                <div
                  className="d-flex flex-column overflow-auto"
                  style={{ height: "300px" }}
                >
                  {item?.data?.map(_maptype)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  const fetchBranch = () => {
    getAllBranch().then((result) => {
      if (result.status === 200) {
        setBranch(result.data.data);
        // console.log(result.data.data);
      }
    });
  };
  useEffect(() => {
    fetchBranch();
    fetchOwner();
    // fetchScohlarType();
  }, []);

  useEffect(() => {
    fetchType();
    let item = filterState.branchList.map((item) =>
      getScohlarType(filterState, item)
    );
    fetchScohlarType(item);
  }, [filterState]);

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
  // End Rander State
  // UseEffect
  useEffect(() => {
    dispatch({
      type: "SET_DATA",
      payload: { navbar: ["/Presents", "/TypeOfScholar"] },
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
                      <YearRange
                        onChange={({ startYear, endYear }) =>
                          setFilterState({ ...filterState, startYear, endYear })
                        }
                        value={initialFilterState}
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="form-label">ประเภทงบประมาณ</div>
                    <select
                      className="form-select"
                      value={filterState.budgetType}
                      onChange={(e) =>
                        setFilterState({
                          ...filterState,
                          budgetType: e.target.value,
                        })
                      }
                    >
                      <option value="">ทั้งหมด</option>
                      <option value="งบประมาณภายนอก">งบประมาณภายนอก</option>
                      <option value="งบประมาณภายใน">งบประมาณภายใน</option>
                    </select>
                  </div>
                  <div className="mt-3">
                    <div className="form-label">แหล่งทุน</div>
                    <select
                      className="form-select"
                      value={filterState.owner}
                      onChange={(e) =>
                        setFilterState({
                          ...filterState,
                          owner: e.target.value,
                        })
                      }
                    >
                      <option value="">ทั้งหมด</option>
                      {owner.map((item) => (
                        <option value={item.name}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-3">
                    <span className="form-label">สาขาวิชาที่เกี่ยวข้อง</span>
                    {renderBranchList}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-sm-12 my-3">
              {typeOfResearch.map(_renderDonut)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
