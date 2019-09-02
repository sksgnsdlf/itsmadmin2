import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/common',
    linkpath: '/common',
    title: '시스템관리',
    icon: 'mdi mdi-gauge',
    class: 'has-arrow',
    label: '',
    labelClass: 'label label-rouded label-themecolor pull-right',
    extralink: false,
    submenu: [
      { path: '/common/code', title: '공통코드관리', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/common/organ', title: '기관관리', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/common/appmenu', title: '앱메뉴 관리', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/common/banner', title: '배너관리', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/common/mqtt', title: 'MQTT 모니터링', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/common/beacon', title: '비콘단말기 등록', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/common/category/complaint', title: '시민의소리 분류관리', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/common/group/list', title: '단체 목록', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/common/group/stat', title: '단체 현황', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/common/users', title: '통합회원 목록', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/common/official', title: '공무원 목록', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/common/coop', title: '협력업체 목록', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/common/prop', title: '회원속성 관리', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/common/auth', title: '사용자 권한관리', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/common/deptcls', title: '단체별 부서배정', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/common/chnlpost', title: '채널 및 게시물분야', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/common/dashboard', title: '대시보드', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
    ]
  },
  {
    path: '/message',
    linkpath: '/message',
    title: '메시지센터',
    icon: 'mdi mdi-forum',
    class: 'has-arrow',
    label: '',
    labelClass: 'label label-rouded label-themecolor pull-right',
    extralink: false,
    submenu: [
      { path: '/message/send', title: '푸시 발송', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/message/log', title: '푸시 발송 이력', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/message/group', title: '푸시 그룹 관리', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
    ]
  },
  {
    path: '/onestop',
    linkpath: '/onestop',
    title: '바로응답',
    icon: 'mdi mdi-account-alert',
    class: 'has-arrow',
    label: '',
    labelClass: 'label label-rouded label-themecolor pull-right',
    extralink: false,
    submenu: [
      { path: '/onestop/menual/add', title: '당직 매뉴얼 관리', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/onestop/menual', title: '당직 매뉴얼 검색', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/onestop/duty', title: '당직근무자', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/onestop/report', title: '바로응답접수', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/onestop/list', title: '바로응답접수목록', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/onestop/urban', title: '도시재생참여목록', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/onestop/mylist', title: '불편신고처리', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      // { path: '/onestop/test', title: '불편신고처리', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
    ]
  },
  {
    path: '/group',
    linkpath: '/group',
    title: '단체정보관리',
    icon: 'mdi mdi-account-multiple',
    class: 'has-arrow',
    label: '',
    labelClass: 'label label-rouded label-themecolor pull-right',
    extralink: false,
    submenu: [
      { path: '/group/info', title: '단체 정보', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/group/users', title: '회원 관리', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/group/board', title: '게시판 생성', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/group/message', title: '푸시발송이력', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
    ]
  },
  {
    path: '/board',
    linkpath: '/board',
    title: '게시물 관리',
    icon: 'mdi mdi-calendar-text',
    class: 'has-arrow',
    label: '',
    labelClass: 'label label-rouded label-themecolor pull-right',
    extralink: false,
    submenu: [
      { path: '/board/board', title: '게시판 생성', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/board/list', title: '게시물 등록', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/board/application', title: '신청·접수 내역', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/board/inplace', title: '시설·공간 예약내역', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/board/survey', title: '설문내역', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/board/bill', title: '결제내역', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/board/attend', title: '참여·출결 관리', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/board/qna', title: '묻고답하기', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/board/cs', title: '만족도내역', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
    ]
  },
  {
    path: '/map',
    linkpath: '/map',
    title: '출결 관리',
    icon: 'mdi mdi-google-maps',
    class: 'has-arrow',
    label: '',
    labelClass: 'label label-rouded label-themecolor pull-right',
    extralink: false,
    submenu: [
      { path: '/map/cls', title: '분류관리', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/map/report', title: '오류신고항목관리', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/map/place', title: '장소관리', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/map/data', title: '연계데이터관리', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/map/theme', title: '테마지도관리', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/map/notice', title: '공지사항관리', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/map/suggest', title: '사용자의견관리', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
     // { path: '/map/enrollment', title: '장소등록창', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
    ]
  }
];
