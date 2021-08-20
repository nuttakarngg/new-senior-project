import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Bar } from "react-chartjs-2";
export default function Dashboard() {
  //  Initial Variable
  const initialFilterState = {
    keyword: "",
    startYear: "2000",
    endYear: "2005",
    useYear: false,
    branchList: [],
    researchType: "",
    year: 2000,
  };
  const YearList = [
    2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009,
    2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997,
    1996,
  ];
  const [filterState, setFilterState] = useState(initialFilterState);
  const dispatch = useDispatch();
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
  const data = {
    labels: BranchList,
    datasets: [
      {
        data: Array.from({ length: 9 }, () =>
          Math.floor(Math.random() * 800000)
        ),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
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
      payload: { navbar: ["/Presents", "/RankingPerYear"] },
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
                  <span className="text-white">อันดับงบประมาณรายได้ต่อปี</span>
                </div>
                <div className="card-body">
                  <Bar data={data} options={options} />
                </div>
              </div>
              <div className="card animate__animated my-3 animate__slideInRight">
                <div className="card-header bg-primary">
                  <span className="text-white">
                    ตารางอันดับงบประมาณรายได้ต่อปี
                  </span>
                </div>
                <div className="">
                  <div class="table-responsive">
                    <table class="table card-table table-vcenter text-nowrap datatable">
                      <thead>
                        <tr>
                          <th class="w-1">No.</th>
                          <th>ชื่อสาขา</th>
                          <th>งบประมาณต่อปี</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <span class="text-muted">09</span>
                          </td>
                          <td>
                            <a
                              href="invoice.html"
                              class="text-reset"
                              tabindex="-1"
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
    </div>
  );
}
