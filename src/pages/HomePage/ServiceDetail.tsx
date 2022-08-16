import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import NoImage from '@image/welcome3.png';
import Error from '@image/error.svg';
import { Button, Gap, Icon } from '@components';
import { CardLoading, LoadingRect, Row } from '@parts';
import normalizeDimens from '@utils/normalizeDimens';
import colors from '@utils/colors';
import currencyFormat from '@utils/currencyFormat';
import { IResponseHttpService } from '@utils/types';
import discountFormat from '@utils/discountFormat';
import style from './style';

interface IProps {
  serviceDetail: Partial<IResponseHttpService>;
  top: number;
  getReview: () => Promise<void>;
  navigateToOrder: (_data: any) => void;
}

const ServiceDetail: React.FC<IProps> = ({serviceDetail, top, getReview, navigateToOrder}) => {

  if (serviceDetail.loading) return (
    <View style={style.loadingWrapper}>
      <Gap height={15} />
      <Row align='center' justify='center'>
        <LoadingRect width='100%' height={150} />
      </Row>
      <Gap height={30} />
      <CardLoading count={2} loadingTextCount={3} heightLoadingText={15} />
    </View>
  );

  if (!serviceDetail.result && serviceDetail.status !== 200) return (
    <View style={style.errorContainer}>
      <Gap height={20} />
      <Error width={normalizeDimens(200)} height={normalizeDimens(200)} /><Gap height={20} />
      <Text style={style.errorText}>
        {serviceDetail.message}
      </Text>
      <Gap height={40} />
    </View>
  );

  return (
    <View style={[style.detailContainer, {marginBottom: top}]}>
      <Image style={style.imgDetail}
        source={serviceDetail.result.banner[0] ? {uri: serviceDetail.result.banner[0]} : NoImage} />
      <Gap height={20} />
      <Text style={style.detailTitle}>
        {serviceDetail.result.name}
        <Gap width={5} />
        {serviceDetail.result.promo &&
          <View style={style.detailPromoWrapp}>
            <Icon type={Icon.type.mci} name='brightness-percent' color={colors.red.primary}
              size={normalizeDimens(16)} />
            <Gap width={3} />
            <Text style={[style.textDiscount, style.detailPromoText]}>
              {serviceDetail.result.promo.diskon.typeDiskon === 'percent'
                ? <Text>{serviceDetail.result.promo.diskon.valueDiskon}% off</Text>
                : <Text>{discountFormat(String(serviceDetail.result.promo.diskon.valueDiskon))}k off</Text>
              }
            </Text>
          </View>
        }
      </Text>
      <Gap height={6} />
      <Text style={style.detailTextDesc}>{serviceDetail.result.desc}.</Text>
      {serviceDetail.result.promo &&
        <Text style={style.detailTextDesc}>
          <Text style={style.detailTextDesc}>
            {
              serviceDetail.result.promo.diskon.typeDiskon === 'nominal'
                ? `Ada promo diskon hingga ${currencyFormat(String(serviceDetail.result.promo.diskon.valueDiskon))}`
                : `Ada promo diskon hingga ${serviceDetail.result.promo.diskon.valueDiskon}%`
            }
          </Text>,
          <Text style={style.detailTextDesc}>
            {
              serviceDetail.result.promo.minOrder.typeMinOrder === 'weight'
                ? ` Dengan minimal order ${serviceDetail.result.promo.minOrder.valueMinOrder} Kg`
                : ` Dengan minimal order ${currencyFormat(String(serviceDetail.result.promo.minOrder.valueMinOrder))}`
            }
          </Text>
        </Text>
      }
      <Gap height={6} />
      <Text style={style.detailTextPrice}>
        {currencyFormat(String(serviceDetail.result.price))}
        {serviceDetail.result.quantityType === 'kg' ? '/kg' : ''}
        <Gap width={5} />
        <Text style={[style.detailTextDesc, style.detailPrice]}>
          {serviceDetail.result.quantityType === 'kg'
            ? '(timbang di tempat oleh kurir)' : '(harga sesuai subservice)'}
        </Text>
      </Text>
      <Gap height={20} />
      <TouchableOpacity
        activeOpacity={serviceDetail.result.ratingAverage ? 0.25 : 1}
        onPress={serviceDetail.result.ratingAverage ? getReview : undefined}
        style={style.detailLaundryWrapp}>
        <View style={style.detailLaundryHeader}>
          <Text style={style.detailTextLaundryName}>{serviceDetail.result.laundry.name}</Text>
          {serviceDetail.result.ratingAverage && <Text style={style.textCekUlasan}>Cek Ulasan</Text>}
        </View>
        <Gap height={8} />
        <View>
          <View style={style.detailInfoWrapp}>
            <Icon type={Icon.type.mi} name='my-location' size={normalizeDimens(16)} />
            <Text style={style.itemText}>
              {serviceDetail.result.distance} km
              <Gap width={5} />
              <Text style={style.detailTextDesc}>
                ({serviceDetail.result.laundry.user_id.address.detailAddress})
              </Text>
            </Text>
          </View>
          <Gap height={8} />
          <View style={style.detailInfoWrapp}>
            <Icon type={Icon.type.ai} name='star' size={normalizeDimens(16)} color='#fbbf24' />
            <Text style={style.itemText}>
              {serviceDetail.result.ratingAverage ?
                `${serviceDetail.result.ratingAverage} ratings` : 'Belum ada rating'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Gap height={25} />
      <Button text='Order Sekarang'
        onPress={() => navigateToOrder(serviceDetail.result)}
      />
    </View>
  );
};

export default ServiceDetail;
