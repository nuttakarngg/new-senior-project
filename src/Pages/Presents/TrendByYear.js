import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { getAllBranch } from "../../services/branch.service";
import { getTrendByYear } from "../../services/data.service";

export default function TrendByYear() {
  //  Initial Variable
  const initialFilterState = {
    keyword: "",
    branchList: [],
    researchType: "",
    year: 10,
  };
  const YearList = [
    2564, 2563, 2562, 2561, 2560, 2559, 2558, 2557, 2556, 2555, 2554, 2553,
    2552, 2551, 2550,
  ];

  useEffect(() => {
    fetchBranch();
    fetchScore();
  }, []);
  const [filterState, setFilterState] = useState(initialFilterState);
  const dispatch = useDispatch();
  const fetchBranch = () => {
    getAllBranch().then((result) => {
      setBranchList(result.data.data);
    });
  };
  const [BranchList, setBranchList] = useState([]);
  //   data: Array.from({ length: filterState.year }, () =>
  //   Math.floor(Math.random() * 800000)
  // ),
  const [BranchScore, setBranchScore] = useState({});
  let fetchScore = () => {
    getTrendByYear(filterState, YearList.splice(0, filterState.year)).then(
      (result) => {
        if (result.status === 200) {
          let data = result.data.data;
          let temp = {};
          data.forEach((item) => {
            if (temp[item.name_en] == null) temp[item.name_en] = [];
            temp[item.name_en].push({
              year: item.researchBudgetYear,
              total: item.total,
              color: item.color,
            });
          });
          console.log(data);
          setBranchScore(temp);
        }
      }
    );
  };
  const mapColor = () => {
    return Object.keys(BranchScore).map((item) => {
      return BranchScore[item][0].color;
    });
  };

  const data = {
    labels: YearList.splice(0, filterState.year),
    datasets: Object.keys(BranchScore).map((item) => ({
      label: item,
      data: BranchScore[item].map((item, idx) => {
        return {
          y: item.total,
          x: idx,
        };
      }),

      fill: false,
      borderColor: mapColor(),
    })),
  };
  const options = {
    plugins: {
      legend: {
        display: true,
        position: "right",
      },
    },
  };
  //   End Initial Variable
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
        value={branch.id}
        type="checkbox"
      />
      <span className="form-check-label">{branch.name_th}</span>
    </label>
  ));
  // End Rander State

  // UseEffect
  useEffect(() => {
    dispatch({
      type: "SET_DATA",
      payload: { navbar: ["/Presents", "/TrendByYear"] },
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
    fetchScore();
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
                    <label className="form-label">ข้อมูลย้อนหลัง (ปี)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={filterState.year}
                      max="15"
                      min="7"
                      onChange={(e) =>
                        setFilterState({ ...filterState, year: e.target.value })
                      }
                    />
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
                  <span className="text-white">แนวโน้มของงบประมาณ</span>
                </div>
                <div className="card-body">
                  {filterState.branchList.length === 0 ? (
                    <div className="text-danger">
                      *** กรุณาเลือกสาขาที่ต้องการทราบแนวโน้มของงบประมาณ ***
                    </div>
                  ) : (
                    <Line data={data} options={options} />
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
