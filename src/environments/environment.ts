// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  isMockEnabled: true, // You have to switch this, when your real back-end is done
  firebaseConfig : {
    apiKey: "AIzaSyABdhQIiB0XAmoYD-n_HHqobwcxTOE_mis",
    authDomain: "tamima-c05fc.firebaseapp.com",
    databaseURL: "https://tamima-c05fc.firebaseio.com",
    projectId: "tamima-c05fc",
    storageBucket: "tamima-c05fc.appspot.com",
    messagingSenderId: "292755364721"
  },
  mapConfig : {
    apiKey: 'AIzaSyAU9f7luK3J31nurL-Io3taRKF7w9BItQE'
  }
};
