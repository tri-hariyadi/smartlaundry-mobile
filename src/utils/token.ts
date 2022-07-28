import jwtDecode, { JwtPayload } from 'jwt-decode';
import moment from 'moment';
import { getData, removeData, storeData } from '@store/localStorage';

export interface IToken {
  accessToken: string;
  refreshToken: string
}

class Token {
  public async tokenDecode(): Promise<{
      token?: IToken;
      exp?: Date;
      iss?: string | undefined;
      sub?: string | undefined;
      aud?: string | string[] | undefined;
      nbf?: number | undefined;
      iat?: number | undefined;
      jti?: string | undefined;
      error?: boolean;
    }> {
    const token: IToken = await getData('token');
    const dataTokenDecoded = {
      token: undefined,
      exp: undefined,
      iss: undefined,
      sub: undefined,
      aud: undefined,
      nbf: undefined,
      iat: undefined,
      jti: undefined,
      error: false,
    };
    if (!token.accessToken) return {
      ...dataTokenDecoded,
      error: true,
    };
    try {
      const profile: JwtPayload = jwtDecode(token.accessToken);
      const { exp } = profile;
      if (exp && exp > moment().unix())
        return {
          ...profile,
          token,
          exp: new Date(exp),
        };
      return { ...dataTokenDecoded, error: true };
    } catch (error) {
      return { ...dataTokenDecoded, error: true };
    }
  }

  public checkExpirity(token: string): boolean {
    if (!token) return false;
    try {
      const profile: JwtPayload = jwtDecode(token);
      const { exp } = profile;
      if (exp && exp > moment().unix()) return true;
      return false;
    } catch (error) {
      return false;
    }
  }

  public async setToken(dataToken: IToken) {
    await storeData('token', dataToken);
  }

  public async getToken(): Promise<IToken> {
    const token: IToken = await getData('token');
    return token;
  }

  public async removeToken() {
    await removeData('token');
  }

  public async isAuth(): Promise<boolean> {
    const token = (await this.getToken())?.accessToken;
    if (token) return this.checkExpirity(token);
    else return false;
  }
}

export default new Token();
