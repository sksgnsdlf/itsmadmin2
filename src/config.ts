import { environment } from "./environments/environment";

export const API = environment.API;
export const MQTT = environment.MQTT;
export const AUTH_SERVER = environment.AUTH_SERVER;
export const CLIENT_ID = environment.CLIENT_ID;
export const CLIENT_SECRET = environment.CLIENT_SECRET;
export const CKEDITOR_UPLOAD_URI = environment.CKEDITOR_UPLOAD_URI;
export const TENANT = environment.TENANT;
export const GOOGLE_GEOCODING_API_KEY = environment.GOOGLE_GEOCODING_API_KEY;
export const DAUM_MAP_API_KEY = environment.DAUM_MAP_API_KEY;
//한번에 보여줄 최대 페이지 개수
export const MaxPageSize = 7;
export const TB_COL_BACK_COLOR ='#f0f2f4';
export const TB_BORDER_COLOR = '#dde1e5';
export const TB_HOVER_COLOR = '#f4f4f4';
export interface UserSearchForm  {
    society_no?:any,
    fromDt?:string,
    toDt?:string,
    user_cls?:any,
    user_cls_cd?:string,
    nmOrTel?:string,
    pageIndex?:number,
    pageSize?:number
}
export interface SocietyGroupSearchForm {
    oper_state?: string,
    org_no?:string,
    district_cd?:string,
    fromDt?:string,
    toDt?:string,
    society_cls?:string,
    pageIndex?:number,
    pageSize?:number,
    society_nm?:string,
}

//alert messages
export const SOCIETY_SELECT_ALERT_MSG = '단체를 먼저 선택해 주세요';
export const ONESTOP_DESCR_REPORT = '시민 불편신고의 담당자를 배정 해주세요.';
export const ONESTOP_DESCR_DIRECT_REPORT = '간단 상담일 경우 작성해주세요.';
export const ONESTOP_DESCR_INVITATION_REPORT = '당직실 담당자를 이첩해주세요.';
export const ONESTOP_COMPLATE_CITIZENMSG = '귀하께서 요청하신 () 관련 민원처리가 완료되었습니다.';