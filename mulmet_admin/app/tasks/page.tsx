"use client";
import TasksBody from "@/components/layout/body/tasksBody/tasksBody";
import SideBar from "@/components/layout/sideBar";
import React, { Component } from "react";

export class page extends Component {
  render() {
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <div style={{ width: "250px", flexShrink: 0 }}>
          <SideBar />
        </div>
        <div style={{ flex: 1, overflow: "auto" }}>
          <TasksBody />
        </div>
      </div>
    );
  }
}

export default page;
