// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
//var elasticBaseVar:any = 'https://pri-back-dev.jfajardo.dev';
var elasticBaseVar:any = 'https://pri-back-pre.jfajardo.dev';
export const environment = {
  production: false,
  elasticbase: elasticBaseVar,
  elastic_base: elasticBaseVar,
  recaptcha: {
    siteKey:'6Lf4XTEjAAAAABwO8O525wKZvt3b5UdvFVwpFDIz',
  },
  
  elastic : elasticBaseVar+'/elastic' 
};
//https://ldap.pri-ramajudicial.ml desarrollo elastic
//https://ldapproduccion.pri-ramajudicial.ml preprod elastic.

//http://20.118.207.8/ ip desarrollo
//http://20.25.60.42/ ip preprod. 

//https://pri-back-dev.jfajardo.dev desarrollo db system
//https://pri-back-pre.jfajardo.dev preprod db system.

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
