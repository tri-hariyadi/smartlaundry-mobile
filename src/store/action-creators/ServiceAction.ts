import { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import httpService from '@utils/axiosConfig';
import Constants from '@utils/constans';
import { IResponseHttpService } from '@utils/types';
import { ActionType } from '@store/actionTypes';
import { successDispatch } from '@store/dispatches';

class ServiceAction {
  public getServices = async (lat: number, lng: number) => {
    let response: Partial<IResponseHttpService> = {};
    const headers = await Promise.resolve(Constants.authHeader());
    await httpService.get(`services/${lat}/${lng}`, { headers })
      .then(async res => (response = {...res.data, loading: false}))
      .catch((error) => {
        const err = error as AxiosError;
        if (err.response?.data) {
          response = { result: null, message: (err.response.data as any).message,
            status: err.response.status, loading: false };
        } else {
          response = { result: null, message: err.message || 'Gagal Logout', status: 500, loading: false };
        }
      });
    return response;
  }

  public getServicesById = async (idService:string, lat: number, long: number) => {
    let response: Partial<IResponseHttpService> = {};
    const headers = await Promise.resolve(Constants.authHeader());
    await httpService.post(`services/${idService}`, {lat, long}, { headers })
      .then(async res => (response = {...res.data, loading: false}))
      .catch((error) => {
        const err = error as AxiosError;
        if (err.response?.data) {
          response = { result: null, message: (err.response.data as any).message,
            status: err.response.status, loading: false };
        } else {
          response = { result: null, message: err.message || 'Error koneksi', status: 500, loading: false };
        }
      });
    return response;
  }

  public saveDataService = (data: Array<any>, error: boolean | string | undefined) => (dispatch: Dispatch<any>) => {
    if (!data || !(data && Object.keys(data).length)) {
      dispatch({
        type: ActionType.DATA_SERVICE,
        payload: {
          loading: false,
          data: {},
          error,
        },
      });
    } else {
      successDispatch(dispatch, ActionType.DATA_SERVICE, data);
    }
  }

  public getReview = async (idService: string) => {
    let response: Partial<IResponseHttpService> = {};
    const headers = await Promise.resolve(Constants.authHeader());
    await httpService.get(`services/get/rating/${idService}`, { headers })
      .then(async res => (response = {...res.data, loading: false}))
      .catch((error) => {
        const err = error as AxiosError;
        if (err.response?.data) {
          response = { result: null, message: (err.response.data as any).message,
            status: err.response.status, loading: false };
        } else {
          response = { result: null, message: err.message || 'Error koneksi', status: 500, loading: false };
        }
      });
    return response;
  }

  public addReview = async (data: any) => {
    let response: Partial<IResponseHttpService> = {};
    const headers = await Promise.resolve(Constants.authHeader());
    await httpService.post('services/add/rating', data, { headers })
      .then(async res => (response = {...res.data, loading: false}))
      .catch((error) => {
        const err = error as AxiosError;
        if (err.response?.data) {
          response = { result: null, message: (err.response.data as any).message,
            status: err.response.status, loading: false };
        } else {
          response = { result: null, message: err.message || 'Error koneksi', status: 500, loading: false };
        }
      });
    return response;
  }

}

export default new ServiceAction();
