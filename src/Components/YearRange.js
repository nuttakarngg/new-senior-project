import { useState } from "react";

export default function YearRange(props) {
  const { onChange, value } = props;
  const { startYear, endYear } = value;
  const [filterState, setFilterState] = useState({ startYear, endYear });
  const YearList = [
    2555, 2556, 2557, 2558, 2559, 2560, 2561, 2562, 2563, 2564, 2565,
  ];
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
  function emitvalue(event) {
    setFilterState({
      ...filterState,
      startYear: event.target.value,
    });
    if (filterState.startYear > filterState.endYear) {
      const tempStartYear = filterState.startYear;
      const tempEndYear = filterState.endYear;
      setFilterState({
        ...filterState,
        startYear: tempEndYear,
        endYear: tempStartYear,
      });
    }
    onChange(filterState);
  }

  return (
    <>
      <div className="col-md-2 d-flex align-items-center">ตั้งแต่</div>
      <div className="col-md-5 col-sm-12">
        <select
          className="form-select"
          value={filterState.startYear}
          onChange={(event) => {
            emitvalue(event);
          }}
        >
          {renderYearStart}
        </select>
      </div>
      <div className="col-md-1 p-md-0 d-flex align-items-center">ถึง</div>
      <div className="col-md-4 col-sm-12">
        <select
          className="form-select"
          value={filterState.endYear}
          onChange={(event) => {
            emitvalue(event);
          }}
        >
          {renderYearEnd}
        </select>
      </div>
    </>
  );
}
