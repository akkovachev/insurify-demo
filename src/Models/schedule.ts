export interface ScheduleItem {
    attributes: Attributes;
    id: string;
    relationships: Relationships;
    type: string;
  }
  
  interface Relationships {
    route: Route;
    stop: Route;
    trip: Route;
  }
  
  interface Route {
    data: Data;
  }
  
  interface Data {
    id: string;
    type: string;
  }
  
  interface Attributes {
    arrival_time?: any;
    departure_time: string;
    direction_id: number;
    drop_off_type: number;
    pickup_type: number;
    stop_headsign?: any;
    stop_sequence: number;
    timepoint: boolean;
  }