
export interface ITableComponent {
    headers: HeaderEntry[];
    rows: any[];
    rowActions: {[key: string] : Function} 
}

export interface HeaderEntry {
    name: string;
    label: string;
    action?: any;
}