import { useEffect, useState } from "react";
import API from "./api";

function Dashboard() {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(()=>{
    API.get("/items").then(res=>setItems(res.data));
  },[]);

  return (
    <div>
      <h2>Dashboard</h2>

      {items.map(i=>(
        <div key={i._id}>
          {i.itemName} - {i.location}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;