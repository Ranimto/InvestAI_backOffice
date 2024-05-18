import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MDBox from 'components/MDBox';
import { useSelector } from 'react-redux';


export default function Data() {
  const [feedbacks, setFeedbacks] = useState([]);
  const token= useSelector((state)=>state.auth.value.token);
  const [error, setError] = useState(null);
  
  const fetchFeedbacks = async () => {
    try {
     const url =` http://localhost:8023/feedback/getAll`;
      const response = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${token}` 
        } 
      }); 
      setFeedbacks(response.data);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during feedbacks recovery.");
      }
    }
  };


  useEffect(() => {

    fetchFeedbacks();
  }, []);

  const columns = [
    { Header: "user Id", accessor: "userId", width: "10%", align: "center" },
    { Header: "Text", accessor: "text", align: "center" },

  ];

  const rows = feedbacks.map((item) => ({
    userId: (
      <MDBox width="8rem" textAlign="center">
      <h3>{item.userId}</h3> 
      </MDBox>
      ),
    text: (
      <MDBox width="20rem" textAlign="center">
      <h3>{item.text}</h3>
      </MDBox>
      ),
  }));

  return { columns, rows };
}
