import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import canvasJs from "../../Libs/canvasjs.react";
import YearRange from "../../Components/YearRange";
import { getAllBranch } from "../../services/branch.service";
import { getTypeOfResearch } from "../../services/data.service";
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
    branchList: [],
    researchType: "",
    year: 2564,
  };
  const YearList = [
    2565, 2564, 2563, 2562, 2561, 2560, 2559, 2558, 2557, 2556, 2555, 2554,
    2553, 2552, 2551, 2550,
  ];
  const [filterState, setFilterState] = useState(initialFilterState);
  const fetchType = () => {
    getTypeOfResearch(filterState).then((result) => {
      if (result.status === 200) {
        setTypeOfResearch(result.data);
      }
    });
  };
  const _renderDonut = (item) => {
    console.log(item);
    let type = item.type;
    if (type.length === 0) {
      return null;
    }
    const _mapColor = (type) => {
      switch (type) {
        case "การพัฒนาเชิงทดลอง":
          return "#4ED8DA";
        case "การวิจัยประยุกต์":
          return "#C04DD8";
        case "การวิจัยพื้นฐาน":
          return "#206bc4";
      }
    };
    let all = type?.map((i) => i.count)?.reduce((a = 0, b) => (a += b)) || 0;
    const _maptype = (itemtype) => {
      return (
        <div className="">
          <span style={{ fontSize: "24px", fontWeight: 500 }}>
            <i
              className="fa fa-circle"
              style={{ color: _mapColor(itemtype.researchType) }}
            ></i>{" "}
            {((itemtype.count / all) * 100).toFixed(2)} %
          </span>
          <p className="text-muted">
            <i className="fa fa-circle" style={{ color: "white" }}></i>{" "}
            {itemtype.researchType}
          </p>
        </div>
      );
    };
    const _mapDataPoint = () => {
      return item.type.map((item2) => ({
        name: item2.researchType,
        y: ((item2.count / all) * 100).toFixed(2),
        color: _mapColor(item2.researchType),
      }));
    };
    const options = {
      animationEnabled: true,
      borderWidth: 3,
      title: {
        text: "จำนวนประเภทงานวิจัย",
        fontFamily: "Prompt",
        horizontalAlign: "left",
      },
      subtitles: [
        {
          fontFamily: "Prompt",
          text: `${all} งานวิจัยทั้งหมด`,
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
          // indexLabel: "{name}: {y}",
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
                <div className="d-flex flex-column">
                  {item?.type.map(_maptype)}
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
  }, []);

  useEffect(() => {
    fetchType();
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
                    <select className="form-select">
                      <option value="งบประมาณภายนอก">งบประมาณภายนอก</option>
                      <option value="งบประมาณภายใน">งบประมาณภายใน</option>
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
