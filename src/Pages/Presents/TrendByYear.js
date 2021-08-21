import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch } from "react-redux";

export default function TrendByYear() {
  //  Initial Variable
  const initialFilterState = {
    keyword: "",
    branchList: [],
    researchType: "",
    year: 10,
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
  //   data: Array.from({ length: filterState.year }, () =>
  //   Math.floor(Math.random() * 800000)
  // ),

  const data = {
    labels: YearList.splice(0, filterState.year),
    datasets: filterState.branchList.map((branch) => ({
        label: branch,
        data: Array.from({ length: filterState.year }, () =>
          Math.floor(Math.random() * 800000)
        ),
        fill: false,
        borderColor: '#'+Math.floor(Math.random()*16777215).toString(16),
      }))
  };
  const options = {
    plugins: {
      legend: {
        display: true,
        position:'right'
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
        value={branch}
        type="checkbox"
      />
      <span className="form-check-label">{branch}</span>
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
               {filterState.branchList.length===0? <div className="text-danger">*** กรุณาเลือกสาขาที่ต้องการทราบแนวโน้มของงบประมาณ ***</div>: <Line data={data} options={options} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
