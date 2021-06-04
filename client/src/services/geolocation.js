import axios from "axios";


export function getCoordsFromBrowser() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        if (!pos || (pos && !pos.coords)) {
          reject("Could not get current position");
        } else {
          resolve(pos.coords);
        }
      });
    } else {
      reject(null);
    }
  });
}


export function getCoordsFromApi() {
  return new Promise((resolve, reject) => {
    axios
      .get("/geolocation")
      .then((res) => {
        const { latitude, longitude } = res.data;
        if (
          !latitude ||
          (!latitude && latitude !== 0) ||
          !longitude ||
          (!longitude && longitude !== 0)
        ) {
          reject("Could not get lan/lon");
        } else {
          resolve({
            latitude,
            longitude,
          });
        }
      })
      .catch((err) => {        
        reject(err);
      });
  });
}
