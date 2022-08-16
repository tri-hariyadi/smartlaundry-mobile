import { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import httpService from '@utils/axiosConfig';
import { IResponseHttpService } from '@utils/types';
import Constants from '@utils/constans';
import { successDispatch } from '@store/dispatches';
import { ActionType } from '@store/actionTypes';
import IOrders from '../action-interfaces/orders';

class OrderAction {
  public getOrders = async (idUser: string) => {
    let response: Partial<IResponseHttpService> = {};
    const headers = await Promise.resolve(Constants.authHeader());
    await httpService.post(`orders/getall/${idUser}`, {}, { headers })
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

  public getOrderById = async (idUser: string, idOrder: string) => {
    let response: Partial<IResponseHttpService> = {};
    const headers = await Promise.resolve(Constants.authHeader());
    await httpService.get(`orders/${idUser}/${idOrder}`, { headers })
      .then(async res => (response = {...res.data, loading: false}))
      .catch((error) => {
        const err = error as AxiosError;
        if (err.response?.data) {
          response = { result: null, message: (err.response.data as any).message,
            status: err.response.status, loading: false };
        } else {
          response = { result: null, message: err.message || 'Terjadi kesalahan', status: 500, loading: false };
        }
      });
    return response;
  }

  public saveOrders = (data: Array<any>, error: boolean | string | undefined) => (dispatch: Dispatch<IOrders>) => {
    if (!data || !data.length) {
      dispatch({
        type: ActionType.DATA_ORDERS,
        payload: {
          loading: false,
          data: [],
          error,
        },
      });
    } else {
      successDispatch(dispatch, ActionType.DATA_ORDERS, data);
    }
  }

  public saveOrderCart = (data: any) => (dispatch: Dispatch<IOrders>) => {
    if (data && Object.keys(data).length) {
      successDispatch(dispatch, ActionType.ORDER_CART, data);
    }
  }

  public resetOrderCart = () => (dispatch: Dispatch<IOrders>) => {
    successDispatch(dispatch, ActionType.RESET_ORDER_CART, '');
  }

  public calculatePrice = async (data: IParamCalcPrice) => {
    let response: Partial<IResponseHttpService> = {};
    const headers = await Promise.resolve(Constants.authHeader());
    await httpService.post('order/calculateprice', data, { headers })
      .then(async res => (response = {...res.data, loading: false}))
      .catch((error) => {
        const err = error as AxiosError;
        if (err.response?.data) {
          response = { result: null, message: (err.response.data as any).message,
            status: err.response.status, loading: false };
        } else {
          response = { result: null, message: err.message || 'Gagal menghitung harga', status: 500, loading: false };
        }
      });
    return response;
  }

  public getAnyOrder = async (idUser: string) => {
    let response: Partial<IResponseHttpService> = {};
    const headers = await Promise.resolve(Constants.authHeader());
    await httpService.get(`/order/getanyorder/${idUser}`, { headers })
      .then(res => (response = {...res.data, loading: false}))
      .catch((error) => {
        const err = error as AxiosError;
        if (err.response?.data) {
          response = { result: null, message: (err.response.data as any).message,
            status: err.response.status, loading: false };
        } else {
          response = { result: null, message: err.message || 'Terjadi kesalahan', status: 500, loading: false };
        }
      });
    return response;
  }

  public createOrder = async (values: any) => {
    const data = {
      service: values.service,
      sub_service: values.sub_service,
      totalPrice: values.totalPrice,
      total: values.total,
      note: values.note,
      payment: 'Cash On Delivery',
      id_merchant: values.id_merchant,
      id_customer: values.id_customer,
      address: {
        addressName: values.addressName,
        address: values.address,
        detailAddress: values.detailAddress,
        lat: values.lat,
        long: values.long,
      },
    };
    let response: Partial<IResponseHttpService> = {};
    const headers = await Promise.resolve(Constants.authHeader());
    await httpService.post('orders/request', data, { headers })
      .then(async res => {
        (response = {...res.data, loading: false});
      })
      .catch((error) => {
        const err = error as AxiosError;
        if (err.response?.data) {
          response = { result: null, message: (err.response.data as any).message,
            status: err.response.status, loading: false };
        } else {
          response = { result: null, message: err.message || 'Gagal order', status: 500, loading: false };
        }
      });
    return response;
  }

  public inputWeight = async (values: {totalPrice: number, total: number}, id_order: string) => {
    let response: Partial<IResponseHttpService> = {};
    const headers = await Promise.resolve(Constants.authHeader());
    await httpService.put(`order/inputweight/${id_order}`, values, { headers })
      .then(async res => {
        (response = {...res.data, loading: false});
      })
      .catch((error) => {
        const err = error as AxiosError;
        if (err?.response?.data) {
          response = { result: null, message: (err.response.data as any).message,
            status: err.response.status, loading: false };
        } else {
          response = { result: null, message: err?.message || 'Gagal order', status: 500, loading: false };
        }
      });
    return response;
  }

}

export default new OrderAction();

interface IParamCalcPrice {
  totalPay: number;
  totalOrder: number;
  id_service: string;
  laundryPosition: {
    lat: number;
    long: number;
  },
  custPosition: {
    lat: number;
    long: number;
  }
}
