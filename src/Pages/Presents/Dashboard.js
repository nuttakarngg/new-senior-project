import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Dashboard() {
  const dispatch = useDispatch();
  // UseEffect
  useEffect(() => {
    dispatch({
      type: "SET_DATA",
      payload: { navbar: ["/Presents", "/Dashboard"] },
    });
  });
  //End UseEffect
  return (
    <div className="container-xl">
        
    </div>
);
}
