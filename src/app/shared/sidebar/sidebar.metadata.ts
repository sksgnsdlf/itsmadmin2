// Sidebar route metadata
export interface RouteInfo {
  path: string;
  linkpath?:string;
  title: string;
  icon: string;
  class: string;
  label: string;
  labelClass: string;
  extralink: boolean;
  submenu: RouteInfo[];
}
