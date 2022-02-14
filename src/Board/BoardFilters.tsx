import { groupBy, map } from "lodash";
import * as React from "react";
import { BoardState } from "./Board";
import './board.scss'

export class BoardFilters extends React.Component<{boardData: BoardState, onFilterChange: Function}>{
    
    state = {
        type: '',
        value: ''
    }
    filterByCarrier() {
        let rowsData = this.props.boardData.dataRows;
        let carriersNames = map(groupBy(rowsData, 'attributes.description'), (v, k) => {
            return {
                label: k,
                value: k,
                total: v.length
            }
        })
        return (
            <div className="filter">
                <label>Filter By Carrier: </label>
                <select onChange={this.handleCarrierFilterChange} value={this.state.value}>
                    <option value="all" key="-1">All ({this.props.boardData.dataRows.length})</option>
                    {carriersNames.map((e, i) => {
                        return (<option value={e.value} key={i}>{e.label} ({e.total})</option>)
                    })}
                </select>
            </div>
        )
    }

    handleCarrierFilterChange = (e) => {
        this.setState({
            type: 'CARRIER',
            value: e.target.value
        }, () => {
            this.props.onFilterChange({...this.state})
        })
    }

    handleResetFilter = () => {
        this.setState({
            type: 'RESET',
            value: undefined
        }, () => {
            this.props.onFilterChange({...this.state})
        })
    }

    render() {
      
        return (
            <div className="filters">
                {this.props.boardData.dataRows.length ? this.filterByCarrier() : null}
                {this.state.value ? <button className="clear" onClick={this.handleResetFilter}>Clear Filter</button>: null}
            </div>
        )
    }
}