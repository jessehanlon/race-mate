import "./App.css";
import * as React from 'react';
import { useTable } from 'react-table';

var boats = [];



function App() {
  const data = React.useMemo((boats) => []);
  const columns = React.useMemo(() => [
    {
      Header: "Boat",
      accessor: "boat",
    },
    {
      Header: "Sail Number",
      accessor: "sail_no",
    },
    {
      Header: "Design",
      accessor: "design",
    },
    {
      Header: "Owner",
      accessor: "owner",
    },
    {
      Header: "Rating",
      accessor: "rating",
    },
    {
      Header: "Time Correction Factor",
      accessor: "tcf",
    },
    {
      Header: "Start Time",
      accessor: "start",
    },
    {
      Header: "Finish Time",
      accessor: "finish",
    },
    {
      Header: "Elapsed Time",
      accessor: "elapsed",
    },
    {
      Header: "Corrected Time",
      accessor: "corrected",
    },
    {
      Header: "Finishing Place",
      accessor: "place",
    },
    {
      Header: "Comments",
      accessor: "comments",
    }
  ], []);
  
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({columns, data});

  return (
    <div className='race_results'>
      <div className='container'>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => 
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) =>  (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            )};
          </thead>
          <tbody {...getTableBodyProps() }>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            )
          })}
            
          </tbody>
        </table>
      </div>

      <div id="add-boat">
        <a id="add-boat-title">Add Boat</a>
        <div className="input-group" id="boat-details">
              <span className="input-group-text" id="inputGroup-sizing-sm">Boat Name</span>
              <input type="text" className="form-control" id="boat" aria-describedby="inputGroup-sizing-sm"></input>
          </div>
          <div className="input-group">
            <span className="input-group-text" id="inputGroup-sizing-sm">Sail Number</span>
              <input type="text" className="form-control" id="sail_no" aria-describedby="inputGroup-sizing-sm"></input>
          </div>
          <div className="input-group">
            <span className="input-group-text" id="inputGroup-sizing-sm">Boat Design</span>
              <input type="text" className="form-control" id="design" aria-describedby="inputGroup-sizing-sm"></input>
          </div>
          <div className="input-group">
            <span className="input-group-text" id="inputGroup-sizing-sm">Owner</span>
              <input type="text" className="form-control" id="owner" aria-describedby="inputGroup-sizing-sm"></input>
          </div>
          <div className="input-group">
            <span className="input-group-text" id="inputGroup-sizing-sm">PHRF Rating</span>
              <input type="text" className="form-control" id="rating" aria-describedby="inputGroup-sizing-sm"></input>
          </div>
          <div className="input-group">
            <span className="input-group-text" id="inputGroup-sizing-sm">Finish Time</span>
              <input type="text" className="form-control" id="finish" aria-describedby="inputGroup-sizing-sm"></input>
          </div>
          <div className="input-group">
            <span className="input-group-text" id="inputGroup-sizing-sm">Comments</span>
            <input type="text" className="form-control" id="comments" aria-describedby="inputGroup-sizing-sm"></input>
        </div>
      </div>
        
        <div id="add-boat-btn-section">    
          <button type="button" className="btn btn-outline-primary" id="add-boat-btn" onClick={() => {
              var boat = document.getElementById("boat").value; 
              var sail_no = document.getElementById("sail_no").value;
              var design = document.getElementById("design").value;
              var owner = document.getElementById("owner").value;
              var rating = document.getElementById("rating").value;
              var finish = document.getElementById("finish").value;
              var comments = document.getElementById("comments").value;
                      
              var tcf = 650 / (550 + rating);
                      
              var newBoat = {
                "boat":boat,
                "sail_no":sail_no,
                "design":design,
                "owner":owner,
                "rating":rating,
                "tcf":tcf,
                "finish":finish,
                "comments":comments,
              }
              boats.push(newBoat);
              console.log(boats)
            }}>
            Add Boat
          </button>                        
          
        </div>

    </div>
  )
}



/*  
  var boat = document.getElementById("boat").value;
  var sail_no = document.getElementById("sail_no").value;
  var design = document.getElementById("design").value;
  var owner = document.getElementById("owner").value;
  var rating = document.getElementById("rating").value;
  var finish = document.getElementById("finish").value;
  var comments = document.getElementById("comments").value;

  var tcf = 650 / (550 + rating);
  
  var newBoat = {
    "boat":boat,
    "sail_no":sail_no,
    "design":design,
    "owner":owner,
    "rating":rating,
    "tcf":tcf,
    "finish":finish,
    "comments":comments,
  }
  boats.push(newBoat);
}
*/

export default App;



