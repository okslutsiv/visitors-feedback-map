export function getMessages() {
  return fetch(`${process.env.REACT_APP_API_URL}`).then(response =>
    response.json(),
  );
}

export function getPlace(lat, lng, lang) {
  return fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=12&addressdetails=0`,
    {
      headers: {
        "Accept-language": `${lang}`,
      },
    },
  ).then(res => res.json());
}

export function getUserLocation() {
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        console.log(
          "hm... they do not allow us to get the position from navigator.. let us get it from the ip-address",
        );
        fetch(
          `https://api.ipgeolocation.io/ipgeo?apiKey=${
            process.env.REACT_APP_IPGEOLOCATION_API_KEY
          }`,
        )
          .then(res => res.json())
          .then(location => {
            resolve({
              lat: Number(location.latitude),
              lng: Number(location.longitude),
            });
          });
      },
    );
  });
}
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         position => {
//           setViewPort({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//             zoom: 16,
//           });
//           setHaveUsersLocation(true);
//         },
//         //if fails use the users IP
//         () => {
//           console.log(
//             "hm... they do not allow us to get the position from navigator.. let us get it from the ip-address",
//           );
//           fetch(
//             `https://api.ipgeolocation.io/ipgeo?apiKey=${
//               process.env.REACT_APP_IPGEOLOCATION_API_KEY
//             }`,
//           )
//             .then(res => res.json())
//             .then(location => {
//               setViewPort({
//                 lat: Number(location.latitude),
//                 lng: Number(location.longitude),
//                 zoom: 16,
//               });
//               setHaveUsersLocation(true);
//             })
//             .catch(e =>
//               setUsersLocationErr("Sorry, cannot get your location "),
//             );
//         },
//       );
//     }
//   }
