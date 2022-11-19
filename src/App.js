import { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
// import chart from 'react chart'

import Pagintion from "./Pagintion";
import axios from "axios";
import "./App.css";
function App() {
  const [data, setData] = useState([]);
  const [perpage, setPerpage] = useState([]);
  const [arrowtype,setArrowtype] = useState(-1)
  useEffect(() => {
    axios
      .get(
        "https://api.github.com/search/repositories?q=created:%3E2017-10-22&sort=stars&order=desc"
      )
      .then((res) => {setData(res.data.items);setPerpage(res.data.items.slice(0,10))});
  }, []);
  const pageHandler = (pageNumber)=>{
    setPerpage(data.slice((pageNumber*10)-10,pageNumber*10))
  }
  return (
    <>
      <center>
        <h1>Most Starred Repos</h1>
        <div className="container">
          {perpage.map((res,i) => (
            <div className="card">
              <img src={res.owner.avatar_url} className="image" />
              <div className="textarea">
                {res.name} <br /> <br />
                {res.description} <br /> <br />
                <svg
                  aria-label="star"
                  role="img"
                  height="16"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  data-view-component="true"
                  class="octicon octicon-star"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                  ></path>
                </svg>
                <p style={{ display: "inline-block", marginLeft: "10px" }}>
                  {res.stargazers_count}
                </p>
                <p style={{ display: "inline-block", marginLeft: "50px" }}>
                  Issues:{res.open_issues_count}
                </p>
                <p style={{ display: "inline-block", marginLeft: "50px" }}>
                  Lated pushed at: {" " + res.updated_at.slice(0,10)}
                </p>
                <p style={{ display: "inline-block", marginLeft: "50px" }}>
                  by: {" " + res.name}
                </p>
              </div>
               {arrowtype === i ?( <div className="pop">
                <img 
                onClick={()=>setArrowtype(-1)}
                className='arrow_img'
                  alt="arrow"
                  src='/down_arrow.png'
                />
                <button>Commits</button>                 
               <button>Additions</button>                 
               <button>Deletions</button>  
                 </div>):( <img
              onClick={()=>setArrowtype(i)}
                className='arrow_img'
                            
                alt="arrow"
                src='/right_arrow.png'
              />)} 
                              
            </div>
            
          ))}<br/>
          <Pagintion data={data} pageHandler={pageHandler}/>  
         
        </div>
      </center>
    </>
  );
}

export default App;
