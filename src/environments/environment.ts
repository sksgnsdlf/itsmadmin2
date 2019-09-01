// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // API: "http://49.254.187.234:3000",
   API: "http://itsmpohang.hssa.me:9001",
  // API: "https://smart.pohang.go.kr/api",
  MQTT: "https://smart.pohang.go.kr/mqtt",
  // export const AUTH_SERVER = "http://192.168.0.15:3000";
  AUTH_SERVER: "https://smart.pohang.go.kr/auth",
  CLIENT_ID: "fSxJIe4Wk1",
  CLIENT_SECRET: "26QZIPA0I7z8M2m4EecECjqAqQ06lvDM",
  CKEDITOR_UPLOAD_URI: '/ckeditor',
  TENANT: `pohang`,
  GOOGLE_GEOCODING_API_KEY: 'AIzaSyAtCGdmR6WsQTsiENAe20fllq8xfylZCSU',
  DAUM_MAP_API_KEY: '48d8404196ff0894a1a761df22ab8e2e'
};
