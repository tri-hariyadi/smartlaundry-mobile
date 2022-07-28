import { PermissionsAndroid, Platform } from 'react-native';
import Geocoder from 'react-native-geocoder-reborn';
import GetLocation from 'react-native-get-location';

export interface ILocation {
  position: {lat: number, lng: number},
  formattedAddress: string,
  streetName: string | null;
  error: string | null;
  loading: boolean;
}

const getLocation = async (): Promise<ILocation> => {
  const location: ILocation = {
    position: {
      lat: 0,
      lng: 0,
    },
    formattedAddress: '',
    streetName: null,
    error: null,
    loading: false,
  };

  const getPosition = () => new Promise((resolve) => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(position => {
        const POSITION = {
          lat: position.latitude,
          lng: position.longitude,
        };
        location.position = POSITION;
        Geocoder.geocodePosition(POSITION).then(res => {
          location.formattedAddress = res[0].formattedAddress;
          location.streetName = res[0].streetName;
          resolve(location);
        }).catch(err => {
          location.error = err.message;
          resolve(location);
        });
      })
      .catch(error => {
        location.error = error.message;
        resolve(location);
      });
  });

  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  }

  let newLocation: any;
  await Promise.resolve(getPosition().then(res => {
    newLocation = res;
  }));

  return newLocation;
};

export const getCurrentLocation = async () => {
  return new Promise(async (resolve: (_value: ILocation) => void) => {
    const currentLoc = await getLocation();
    resolve(currentLoc);
  });
};

export default getLocation;
