import { keyBy } from "lodash";
import moment from "moment";
import * as React from "react";
import { Component } from "react";
import { BoardItem } from "../Models/BoardItem";
import { Prediction } from "../Models/Prediction";
import { ScheduleItem } from "../Models/schedule";
import { StopData } from "../Models/StopData";
import { BoardService } from "../Services/board.service";
import './live.scss'
export class LiveUpdates extends Component<LiveUpdatesProps> {

  state: LiveUpdatesState = {
    isShown: false,
    scheduleData: [],
    stopsData: [],
    predictions: [],
    lastRoute: undefined,
    isLoading: false
  };

  componentDidUpdate(prevProps: any) {
    if (this.props.data && prevProps.data?.id !== this.props.data?.id) {
      this.getSchedule(this.props.data?.id || "");
    } 
  }

  getSchedule = async (routeId: string) => {
    if(routeId !== this.state.lastRoute) {
      this.setState({
        isShown: false,
        isLoading: true
      })
    }
    const api = new BoardService();

    let stops = await api.getStopsForRoute(routeId)
    let schedule = await api.getScheduleByRoute(routeId);

    this.setState({
        stopsData: stops,
        scheduleData: schedule,
        isShown: true,
        isLoading: false,
        lastRoute: routeId
    });
  }

  scheduleItems() {
      if(this.state.scheduleData.length) {
          let stops = keyBy(this.state.scheduleData, 'relationships.stop.data.id')
          return this.state.stopsData.map(e => {
              return (
                <div className="scheduleItem" key={e.id}>
                  <span>{e.attributes.name}</span>
                  <span>{e.attributes.address}</span>
                  {stops[e.id]?.attributes.arrival_time ? <span><b>Arrival:</b> {moment(stops[e.id]?.attributes.arrival_time).format('lll')}</span> : null} 
                  {stops[e.id]?.attributes.departure_time ? <span><b>Departure:</b> {moment(stops[e.id]?.attributes.departure_time).format('lll')}</span> : null}
                </div>
              );
          })
      } 
      
      return <div className="loader">No Data Was Found!</div>;
  }

  render() {
    let show = this.state.isShown ? true : false;
    return show ? (
      <div className="live-updates">
        <span>Schedule: {this.props.data?.attributes.long_name}</span>
        {this.scheduleItems()}
      </div>
    ) : (
      this.state.isLoading ? 
      (<div className="live-updates">
        <span>Schedule: {this.props.data?.attributes.long_name}</span>
      <div className="loader">Loading...</div>
    </div>) : ''
    );
  }
}

type LiveUpdatesProps = {
    data?: BoardItem
}

type LiveUpdatesState = {
    isShown: boolean,
    scheduleData: ScheduleItem[],
    stopsData: StopData[],
    predictions: Prediction[]
    lastRoute: string | undefined;
    isLoading: boolean;
}