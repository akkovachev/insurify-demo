export interface StopData {
    attributes: Attributes;
    id: string;
    links: Links;
    relationships: Relationships;
    type: string;
  }
  
  interface Relationships {
    facilities: Facilities;
    parent_station: Parentstation;
    zone: Zone;
  }
  
  interface Zone {
    data: Data;
  }
  
  interface Data {
    id: string;
    type: string;
  }
  
  interface Parentstation {
    data?: any;
  }
  
  interface Facilities {
    links: Links2;
  }
  
  interface Links2 {
    related: string;
  }
  
  interface Links {
    self: string;
  }
  
  interface Attributes {
    address: string;
    at_street?: any;
    description?: any;
    latitude: number;
    location_type: number;
    longitude: number;
    municipality: string;
    name: string;
    on_street?: any;
    platform_code?: any;
    platform_name?: any;
    vehicle_type?: any;
    wheelchair_boarding: number;
  }