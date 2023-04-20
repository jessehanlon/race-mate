import "./App.css";
import * as React from 'react';
import { useTable } from 'react-table';

function App() {
  const data = React.useMemo(() => []);
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
  ]);
}