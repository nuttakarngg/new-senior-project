import { useEffect, useState } from "react";
import "./Recommend.scss";
import { useDispatch } from "react-redux";

const datatest = [
  {
    id: 1,
    researcherName: "Chaiyapol",
    researcherSurname: "Mahajan",
    percentage: 100,
  },
  {
    id: 2,
    researcherName: "Chaiyapol",
    researcherSurname: "Mahajan",
    percentage: 60,
  },
  {
    id: 3,
    researcherName: "Chaiyapol",
    researcherSurname: "Mahajan",
    percentage: 20,
  },
  {
    id: 4,
    researcherName: "Chaiyapol",
    researcherSurname: "Mahajan",
    percentage: 50,
  },
];

const TagsInput = (props) => {
  const [tags, setTags] = useState(props.tags);
  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const addTags = (event) => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      props.selectedTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };
return (
    <div className="tags-input">
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            <span className="tag-title">{tag}</span>
            <span className="tag-close-icon" onClick={() => removeTags(index)}>
              x
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
        placeholder="Press enter to add tags"
      />
    </div>
  );
};

const checkpercentage = (percentage) => {
  if (percentage > 70) {
    return "text-success";
  } else if (percentage >= 40) {
    return "text-warning";
  } else if (percentage < 40) {
    return "text-danger";
  }
};

export default function RecommendResearcher() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "SET_DATA",
      payload: { navbar: ["/Database", "/RecommendResearcher"] },
    });
  });

  const selectedTags = (tags) => {
    console.log(tags);
  };

  const rendertable = (datatest) => {
    return (
      <tr key={datatest.id}>
        <th scope="row">{datatest.id}</th>
        <td>{datatest.researcherName}</td>
        <td>{datatest.researcherSurname}</td>
        <td className={checkpercentage(datatest.percentage)}>
          <i className="fa fa-circle"></i> {datatest.percentage} %
        </td>
      </tr>
    );
  };

  return (
    <div className="container-xl">
      <div className="page-header d-print-none mt-3 ">
        <div className="row align-items-center">
          <div className="col mb-3">
            <h2 className="page-title">แนะนำผู้เชี่ยวชาญ</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header bg-primary">
                <span className="text-white">รายละเอียดงานวิจัย</span>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div class="form-floating mb-3">
                      <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="............."
                      />
                      <label for="floatingInput">เจ้าของทุนวิจัย</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="............."
                      />
                      <label for="floatingInput">ชื่อทุนวิจัย</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="............."
                      />
                      <label for="floatingInput">งบประมาณ</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <TagsInput
                      selectedTags={selectedTags}
                      tags={[]}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="bg-primary text-white"
                            style={{ fontSize: "14px" }}
                          >
                            ลำดับ
                          </th>
                          <th
                            scope="col"
                            className="bg-primary text-white"
                            style={{ fontSize: "14px" }}
                          >
                            ชื่อผู้วิจัย
                          </th>
                          <th
                            scope="col"
                            className="bg-primary text-white"
                            style={{ fontSize: "14px" }}
                          ></th>
                          <th
                            scope="col"
                            className="bg-primary text-white"
                            style={{ fontSize: "14px" }}
                          >
                            ความเหมาะสม
                          </th>
                        </tr>
                      </thead>
                      <tbody>{datatest.map((data) => rendertable(data))}</tbody>
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
