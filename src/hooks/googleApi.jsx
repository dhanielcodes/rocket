// lib/googleApiClient.js

import { Loader } from "@googlemaps/js-api-loader";

/**
 * This is a wrapper around the Google Maps API client.
 * see https://developers.google.com/maps/documentation/javascript
 */

let googleApiClient;

export default async function getGoogleMapsApiClient() {
  if (googleApiClient) {
    return googleApiClient;
  }

  const loader = new Loader({
    apiKey: "AIzaSyC66tddo0cipGjszLLoPiEETFyI_O9g-sA",
    version: "weekly",
    libraries: ["places"],
  });

  googleApiClient = await loader.load();

  return googleApiClient;
}
