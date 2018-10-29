// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAoBGSGK1bGDluUBJwI3RXnWKKVO8oUkNc",
    authDomain: "num-battle.firebaseapp.com",
    databaseURL: "https://num-battle.firebaseio.com",
    projectId: "num-battle",
    storageBucket: "num-battle.appspot.com",
    messagingSenderId: "955708324940"
  }
};
