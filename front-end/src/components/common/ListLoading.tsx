import "./Skeleton.css";
import Card from '@material-ui/core/Card';
import React from "react";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';


const ListLoading = () => {
  return (
    <>
      <div className="container">
        <div className="bar">
          <div className="indicator" />
        </div>
        <div className="wrapper" style={{ marginRight: "3%" }}>
          <div className="list" />
        </div>
        <div className="bar">
          <div className="indicator" />
        </div>
        <div className="wrapper" style={{ marginRight: "3%" }}>
          <div className="list" />
        </div>
        <div className="bar">
          <div className="indicator" />
        </div>
        <div className="wrapper">
          <div className="list" />
        </div>
      </div>
      <div className="container">
        <div className="bar">
          <div className="indicator" />
        </div>
        <div className="wrapper" style={{ marginRight: "3%" }}>
          <div className="list" />
        </div>
        <div className="bar">
          <div className="indicator" />
        </div>
        <div className="wrapper" style={{ marginRight: "3%" }}>
          <div className="list" />
        </div>
        <div className="bar">
          <div className="indicator" />
        </div>
        <div className="wrapper">
          <div className="list" />
        </div>
      </div>
      <div className="container">
        <div className="bar">
          <div className="indicator" />
        </div>
        <div className="wrapper" style={{ marginRight: "3%" }}>
          <div className="list" />
        </div>
        <div className="bar">
          <div className="indicator" />
        </div>
        <div className="wrapper" style={{ marginRight: "3%" }}>
          <div className="list" />
        </div>
        <div className="bar">
          <div className="indicator" />
        </div>
        <div className="wrapper">
          <div className="list" />
        </div>
      </div>
    </>
  );
};

export default ListLoading;