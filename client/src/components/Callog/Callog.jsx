import React, { useState, useEffect } from "react";
import callogApi from "../../api/callogApi";

Callog.propTypes = {};

function Callog(props) {
  const [callogList, setCallogList] = useState([]);
  useEffect(() => {
    const getCallog = async () => {
      try {
        const response = await callogApi.showCallog();
        const data = response.data;
        await setCallogList(...callogList, data);
        console.log(callogList);
      } catch (error) {
        console.log("Some error" + error);
      }
    };
    getCallog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <ul className="todo-list">
        {callogList.map((value) => (
          <li key={value._id}>{value.phoneNumber}</li>
        ))}
      </ul>
    </div>
  );
}

export default Callog;
