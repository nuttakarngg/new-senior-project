import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Bar } from "react-chartjs-2";
import YearRange from "../../Components/YearRange";
import { getAllBranch } from "../../services/branch.service";
import { getPricePerYear } from "../../services/data.service";
export default function Dashboard() {
  //  Initial Variable
  const initialFilterState = {
    keyword: "",
    startYear: "2555",
    endYear: "2565",
    useYear: false,
    branchList: [],
    researchType: "",
    year: 2555,
  };
  const YearList = [
    2555, 2556, 2557, 2558, 2559, 2560, 2561, 2562, 2563, 2564, 2565,
  ];
  const [branchScore, setBranchScore] = useState([]);
  const [filterState, setFilterState] = useState(initialFilterState);
  const dispatch = useDispatch();
  const [BranchList, setBranchList] = useState([]);
  const fetchBranch = () => {
    getAllBranch().then((result) => {
      if (result.status === 200) {
        setBranchList(result.data.data);
      }
    });
  };
  const fetchRanking = () => {
    getPricePerYear(filterState).then((result) => {
      if (result.status === 200) {
        setBranchScore(result.data.data);
      }
    });
  };
  const data = {
    labels: branchScore.map((item) => item.name_th),
    datasets: [
      {
        data: branchScore.map((item) => item.total),
        backgroundColor: BranchList.map((item) => item.color),
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
          },
        },
      ],
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
      payload: { navbar: ["/Presents", "/RankingPerYear"] },
    });
  });
  useEffect(() => {
    fetchBranch();
  }, []);
  useEffect(() => {
    fetchRanking();
    console.log(filterState);
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
                  <span className="text-white">อันดับงบประมาณรายได้ต่อปี</span>
                </div>
                <div className="card-body">
                  {filterState.branchList.length === 0 ? (
                    <div className="text-danger">
                      *** กรุณาเลือกสาขาที่ต้องการทราบแนวโน้มของงบประมาณ ***
                    </div>
                  ) : (
                    <Bar data={data} options={options} />
                  )}
                </div>
              </div>
              <div className="card animate__animated my-3 animate__slideInRight">
                <div className="card-header bg-primary">
                  <span className="text-white">
                    ตารางอันดับงบประมาณรายได้ต่อปี
                  </span>
                </div>

                <div className="table-responsive">
                  <table className="table card-table table-vcenter text-nowrap datatable">
                    <thead>
                      <tr>
                        <th className="w-1">No.</th>
                        <th>ชื่อสาขา</th>
                        <th>งบประมาณต่อปี</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <span className="text-muted">09</span>
                        </td>
                        <td>
                          <a
                            href="invoice.html"
                            className="text-reset"
                            tabIndex="-1"
                          >
                            สาขาวิทยาการคอมพิวเตอร์
                          </a>
                        </td>
                        <td className="text-success">
                          <i className="fas fa-circle"></i> 510,000 THB
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
