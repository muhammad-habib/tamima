// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  isMockEnabled: true, // You have to switch this, when your real back-end is done
  firebaseConfig : {
    apiKey: "AIzaSyBPhE1emq36dLx3zRj1CRsn5SfZgBe8aOY",
    authDomain: "tamima-e0b87.firebaseapp.com",
    databaseURL: "https://tamima-e0b87.firebaseio.com",
    projectId: "tamima-e0b87",
    storageBucket: "tamima-e0b87.appspot.com",
    messagingSenderId: "936396213012"
  }
};
