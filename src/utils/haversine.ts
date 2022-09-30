import { LatLng } from "react-native-maps";

function haversine(coords1: LatLng, coords2: LatLng) {
  let lat1 = coords1.latitude;
  const lon1 = coords1.longitude;
  let lat2 = coords2.latitude;
  const lon2 = coords2.longitude;

  const dLat = ((lat2 - lat1) * Math.PI) / 180.0;
  const dLon = ((lon2 - lon1) * Math.PI) / 180.0;

  lat1 = (lat1 * Math.PI) / 180.0;
  lat2 = (lat2 * Math.PI) / 180.0;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const rad = 6371;
  const c = 2 * Math.asin(Math.sqrt(a));
  return rad * c;
}

export default haversine;
