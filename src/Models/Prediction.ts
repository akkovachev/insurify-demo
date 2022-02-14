export interface Prediction {
    attributes: Attributes;
    id: string;
    links: Links;
    relationships: Relationships;
    type: string;
  }
  
  interface Relationships {
    line: Line;
  }
  
  interface Line {
    data: Data;
  }
  
  interface Data {
    id: string;
    type: string;
  }
  
  interface Links {
    self: string;
  }
  
  interface Attributes {
    color: string;
    description: string;
    direction_destinations: string[];
    direction_names: string[];
    fare_class: string;
    long_name: string;
    short_name: string;
    sort_order: number;
    text_color: string;
    type: number;
  }