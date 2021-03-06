import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Bar } from "react-chartjs-2";
import currency from "currency.js";
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
  // const [data, setData] = useState({})
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
        backgroundColor: branchScore.map((item) => item.color),
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
    console.log(data);
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
                  <span className="text-white">???????????????????????????????????????</span>
                </div>
                <div className="card-body">
                  <div>
                    <label className="form-label">
                      ??????????????????????????????{" "}
                      <input
                        type="checkbox"
                        onChange={(event) => {
                          setFilterState({
                            ...filterState,
                            useYear: event.target.checked,
                          });
                        }}
                      />{" "}
                      ?????????????????????????????????
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
                    <span className="form-label">???????????????????????????????????????????????????????????????</span>
                    {renderBranchList}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-sm-12 my-3">
              <div className="card animate__animated animate__slideInRight">
                <div className="card-header bg-primary">
                  <span className="text-white">???????????????????????????????????????????????????????????????????????????</span>
                </div>
                <div className="card-body">
                  {filterState.branchList.length === 0 ? (
                    <div className="text-danger">
                      *** ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? ***
                    </div>
                  ) : (
                    <Bar data={data} options={options} />
                  )}
                </div>
              </div>
              {branchScore.length > 0 && (
                <div className="card animate__animated my-3 animate__slideInRight">
                  <div className="card-header bg-primary">
                    <span className="text-white">
                      ??????????????????????????????????????????????????????????????????????????????????????????
                    </span>
                  </div>

                  <div className="table-responsive">
                    <table className="table card-table table-vcenter text-nowrap datatable">
                      <thead>
                        <tr>
                          <th className="w-1">No.</th>
                          <th>????????????????????????</th>
                          <th>???????????????????????????????????????</th>
                        </tr>
                      </thead>
                      <tbody>
                        {branchScore.length > 0 &&
                          branchScore.map((item, idx) => (
                            <tr>
                              <td>
                                <span className="text-muted">{idx + 1}</span>
                              </td>
                              <td>
                                <a
                                  href="invoice.html"
                                  className="text-reset"
                                  tabIndex="-1"
                                >
                                  {item.name_th}
                                </a>
                              </td>
                              {/* <td className="text-success"> */}
                              <td className="">
                                {/* <i className="fas fa-circle"></i>  */}
                                {/* {currency(item?.total)}{" "} */}
                                {Intl.NumberFormat("th-TH", {
                                  style: "currency",
                                  currency: "THB",
                                }).format(item.total)}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
