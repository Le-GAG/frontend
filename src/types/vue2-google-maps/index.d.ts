// Type definitions for vue2-google-maps
// Project: vue2-google-maps
// Definitions by: nstCactus <nstCactus@gmail.com>

declare module 'vue2-google-maps'
{
  export interface Vue2GoogleMapsPluginOptions
  {
    load: {
      // Google Maps API key
      key: string,

      // Additional Google Maps libraries to load
      libraries?: string[],

      // Specific version of the Google Maps JS API to load
      v?: string,
    },
    autobindAllEvents?: boolean,
    installComponents?: boolean,
  }

  export function install();
}
