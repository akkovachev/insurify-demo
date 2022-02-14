import { Component } from "react";
import { BoardService } from "../Services/board.service";
import { TableComponent } from "../Common/Table";
import { HeaderEntry } from "../Models/Table";
import * as React from "react";
import { BoardItem } from "../Models/BoardItem";
import { sortBy } from "lodash";
import "./board.scss";
import { BoardFilters } from "./BoardFilters";
import { LiveUpdates } from "../Common/Live";

export class Board extends Component {
  handleAction = (e: any) => {
    this.setState({
      selected: e
    })
  };

  state: BoardState = {
    tableHeaders: [
      {
        name: "attributes.description",
        label: "Carrier",
       
      },
      {
        name: "attributes.long_name",
        label: "Line",
      },
      {
        name: "attributes.direction_destinations",
        label: "Destination",
      },
    ],
    dataRows: [],
    displayData: [],
    selected: undefined
  };

  componentDidMount() {
    const api = new BoardService();
    api.getRoutes().then((d) => {
      let sortData = sortBy(d, "attributes.sort_order");
      this.setState({ dataRows: sortData, displayData: [...sortData] });
    });
  }

  handleFilterChanges = (e: any) => {
    if (e.type === "CARRIER") {
      let filterByCarrier = this.state.dataRows.filter(
        (a) => a.attributes.description === e.value
      );

      this.setState({
        displayData: e.value !== 'all' ? filterByCarrier : [...this.state.dataRows],
      });
    }

    if (e.type === "RESET") {
      this.setState({
        displayData: [...this.state.dataRows],
      });
    }
  };

  render() {
    return (
      <div className="board-main">
        <BoardFilters
          boardData={this.state}
          onFilterChange={this.handleFilterChanges}
        ></BoardFilters>

        <div className="board-container">
          <div className="scrollable">
          <TableComponent
            headers={this.state.tableHeaders}
            rows={this.state.displayData}
            rowActions= {{
              rowAction: this.handleAction
            }}
            ></TableComponent>
            </div>
          <div className="scrollable">
            <LiveUpdates data={this.state.selected}></LiveUpdates> 
          </div>
        </div>
      </div>
    );
  }
}

export type BoardState = {
  tableHeaders: HeaderEntry[];
  dataRows: BoardItem[];
  displayData: BoardItem[];
  selected: any
};
