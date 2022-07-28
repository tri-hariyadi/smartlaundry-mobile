import { AxiosRequestHeaders } from 'axios';
import Token from '@utils/token';

class Constants {
  public API_TIMEOUT = 15000;

  public API_HEADERS = {
    'Content-type': 'application/json',
    'X-Api-Key': 'C0Uj7h/moE8QJg1i12L6+1cB8Xv2NX/16w==',
  };

  public authHeader = async (): Promise<AxiosRequestHeaders> => {
    const accessToken = (await Token.getToken())?.accessToken;
    if (accessToken) {
      return {
        'Content-type': 'application/json',
        'X-Api-Key': 'C0Uj7h/moE8QJg1i12L6+1cB8Xv2NX/16w==',
        'Authorization': `Bearer ${accessToken}`,
      };
    }
    return {};
  };

  public authHeaderMultiPart = async (): Promise<AxiosRequestHeaders> => {
    const accessToken = (await Token.getToken())?.accessToken;
    if (accessToken) {
      return {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'X-Api-Key': 'C0Uj7h/moE8QJg1i12L6+1cB8Xv2NX/16w==',
        'Authorization': `Bearer ${accessToken}`,
      };
    }
    return {};
  };

}

export default new Constants();
