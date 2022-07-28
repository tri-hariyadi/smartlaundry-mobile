import { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import httpService from '@utils/axiosConfig';
import Constants from '@utils/constans';
import token from '@utils/token';
import IAuth from '@store/action-interfaces/auth';
import { ActionType } from '@store/actionTypes';
import { errorDispatch, loadingDispatch, successDispatch } from '@store/dispatches';
import { IResponseHttpService } from '@utils/types';

class AuthAction {
  public userLogin = async (data: any) => {
    let response: Partial<{ result: null; message: string; status: number }> = {};
    await httpService.post('users/login', data, { headers: Constants.API_HEADERS })
      .then(res => (response = res.data))
      .catch(error => {
        const err = error as AxiosError;
        if (err.response?.data) {
          response = { result: null, message: (err.response.data as any).message, status: err.response.status };
        } else {
          response = { result: null, message: err.message || 'Gagal Logout', status: 500 };
        }
      });
    return response;
  };

  public refreshToken = async () => {
    const headers = await Promise.resolve(Constants.authHeader());
    return httpService.get('users/refreshtoken', { headers });
  };

  public logOut = async () => {
    let response: Partial<{ data: null; message: string; status: number }> = {};
    const dataToken = await Promise.resolve(token.getToken());
    const headers = await Promise.resolve(Constants.authHeader());
    await httpService.post('users/logout', {dataToken}, { headers })
      .then(async res => {
        await Promise.resolve(token.removeToken());
        response = res.data;
      })
      .catch((error) => {
        const err = error as AxiosError;
        if (err.response?.data) {
          response = { data: null, message: (err.response.data as any).message, status: err.response.status };
        } else {
          response = { data: null, message: err.message || 'Gagal Logout', status: 500 };
        }
      });
    return response;
  };

  public userRegister = async (data: any) => {
    let response: Partial<{ result: null; message: string; status: number }> = {};
    await httpService.post('users/register', data, { headers: Constants.API_HEADERS })
      .then(res => (response = res.data))
      .catch((error) => {
        const err = error as AxiosError;
        if (err.response?.data) {
          response = { result: null, message: (err.response.data as any).message, status: err.response.status };
        } else {
          response = { result: null, message: err.message || 'Gagal Logout', status: 500 };
        }
      });
    return response;
  };

  public getDataUser = (id: string, user?: boolean) => async (dispatch: Dispatch<IAuth>) => {
    loadingDispatch(dispatch, ActionType.USER_DATA);
    const userLogin = user ? 'pengusaha' : 'user';
    const headers = await Promise.resolve(Constants.authHeader());
    await httpService.get(`users/${userLogin}/${id}`, { headers })
      .then(res => {
        if (res.data && res.status === 200)
          successDispatch(dispatch, ActionType.USER_DATA, res.data.result);
        else errorDispatch(dispatch, ActionType.USER_DATA, res.data.message);
      })
      .catch(err =>
        errorDispatch(dispatch, ActionType.USER_DATA, err.message));
  };

  public getUser = async (id: string, user?: boolean) => {
    let response: Partial<IResponseHttpService> = {};
    const userLogin = user ? 'pengusaha' : 'user';
    const headers = await Promise.resolve(Constants.authHeader());
    await httpService.get(`users/${userLogin}/${id}`, { headers })
      .then(res => (response = {...res.data, loading: false}))
      .catch(error => {
        const err = error as AxiosError;
        if (err.response?.data) {
          response = { result: null, message: (err.response.data as any).message,
            status: err.response.status, loading: false };
        } else {
          response = { result: null, message: err.message || 'Oops, terjadi Kesalahan', status: 500, loading: false };
        }
      });
    return response;
  }

  public updateUser = async (data: any, idUser: string) => {
    let response: Partial<IResponseHttpService> = {};
    const headers = await Promise.resolve(Constants.authHeader());
    await httpService.put(`users/${idUser}`, data, { headers })
      .then(async res => {
        (response = {...res.data, loading: false});
      })
      .catch((error) => {
        const err = error as AxiosError;
        if (err.response?.data) {
          response = { result: null, message: (err.response.data as any).message,
            status: err.response.status, loading: false };
        } else {
          response = { result: null, message: err.message || 'Oops, terjadi Kesalahan', status: 500, loading: false };
        }
      });
    return response;
  }

  public resetAuthReducer = () => (dispatch: Dispatch<IAuth>) => {
    return new Promise(resolve => {
      successDispatch(dispatch, ActionType.RESET_AUTH_REDUCER, '');
      setTimeout(resolve, 2);
    });
  }

  public getRole = async () => {
    let response: Partial<IResponseHttpService> = {};
    await httpService.get('roles', { headers: Constants.API_HEADERS })
      .then(async res => {
        (response = {...res.data, loading: false});
      })
      .catch((error) => {
        const err = error as AxiosError;
        if (err?.response?.data) {
          response = { result: null, message: (err.response.data as any).message,
            status: err.response.status, loading: false };
        } else {
          response = { result: null, message: err.message || 'Oops, terjadi Kesalahan', status: 500, loading: false };
        }
      });
    return response;
  }

}

export default new AuthAction();
