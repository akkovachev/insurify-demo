import { get, noop } from "lodash";
import * as React from "react";
import { HeaderEntry, ITableComponent } from "../Models/Table";
import "./table.scss";

function buildJsxRow(row: any, headers: HeaderEntry[], rowIdx: number, rowAction: Function) {
  let buildCells: any[] = [];
  headers.forEach((h, i) => {
    let rowValue = get(row, h.name);
    
    if(Array.isArray(rowValue)) {
      rowValue = rowValue.join(" / ")
    }
    
    if (rowValue) {
      buildCells.push((
        <div className="cell"  data-title={h.label} key={i + rowIdx}>
          {rowValue}
        </div>
      ));
    }
  });

  return <div className="row" onClick={rowAction ? () => rowAction(row) : () => noop} key={rowIdx}>{buildCells}</div>;
}

export const TableComponent: React.FC<ITableComponent> = ( props: ITableComponent ) => {
  let headerElements = props.headers.map((headerEntry) => {
    return (
      <div className="cell" key={headerEntry.name}>
        {headerEntry.label}
      </div>
    );
  });

  let rows = props.rows.map((r, rowIdx) => {
    return buildJsxRow(r, props.headers, rowIdx, props.rowActions['rowAction']);
  });

  return (
    <div className="table">
      <div className="row header blue">{headerElements}</div>
      {rows}
    </div>
  );
};
