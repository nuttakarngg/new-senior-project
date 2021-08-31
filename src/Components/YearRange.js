import { useEffect, useState } from "react";

export default function YearRange(props) {
  const { onChange, value } = props;
  const { startYear, endYear } = value;
  const [filterState, setFilterState] = useState({ startYear, endYear });
  const YearList = [
    2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009,
    2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997,
    1996,
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
  function emitvalue() {
    onChange(filterState);
  }

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
    emitvalue();
  }, [filterState]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <div className="col-md-2 d-flex align-items-center">ตั้งแต่</div>
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
      <div className="col-md-1 p-md-0 d-flex align-items-center">ถึง</div>
      <div className="col-md-4 col-sm-12">
        <select
          className="form-select"
          value={filterState.endYear}
          onChange={(event) => {
            setFilterState({
              ...filterState,
              endYear: event.target.value,
            });
            emitvalue();
          }}
        >
          {renderYearEnd}
        </select>
      </div>
    </>
  );
}
