import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import 'moment/locale/id';
import Error from '@image/error.svg';
import { ButtonIcon, Gap, Icon } from '@components';
import { CardLoading, Row } from '@parts';
import { IResponseHttpService } from '@utils/types';
import normalizeDimens from '@utils/normalizeDimens';
import style from './style';

interface IProps {
  reviews: Partial<IResponseHttpService>;
  serviceDetail: Partial<IResponseHttpService>;
  top: number;
  btModal: React.MutableRefObject<any>;
  btModal2: React.MutableRefObject<any>;
}

const ServiceReview: React.FC<IProps> = ({ reviews, serviceDetail, top, btModal, btModal2 }) => {
  if (reviews.loading) return (
    <View style={style.loadingWrapper}>
      <Gap height={15} />
      <CardLoading count={3} loadingTextCount={3} heightLoadingText={15} />
    </View>
  );

  if (!reviews.result && reviews.status !== 200) return (
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
    <View style={[style.reviewsContainer, {marginBottom: top}]}>
      <View style={style.starAverage}>
        <View style={style.ratingAverageWrapp}>
          <Text style={style.txtRatingAverage}>{serviceDetail.result.ratingAverage}</Text>
          <Gap width={6} />
          <Icon type={Icon.type.ai} name='star' size={23} color='#fbbf24' />
        </View>
        <Gap width={6} />
        <Text style={style.reviewCreated}>
          {reviews.result.length > 600 ? '600+' : reviews.result.length} rating/ulasan
        </Text>
      </View>
      <Gap height={10} />
      <Row align='center' style={style.rowBtnBack}>
        <ButtonIcon icType={Icon.type.mci} icName='arrow-left' icSize={22} dimens={35}
          background='transparent' rippleColor='rgba(0,0,0,0.3)' onPress={() => {
            btModal2.current.dismiss();
            setTimeout(() => {
              btModal.current.show();
            }, 400);
          }} />
        <Gap width={6} />
        <Text style={style.allReviews}>Semua Ulasan</Text>
      </Row>
      <Gap height={20} />
      {reviews.result.map((item: any, idx: number) => (
        <View key={`Reviews-${idx}`}>
          {idx !== 0 && <Gap height={15} />}
          <View style={style.headerReviews}>
            <View style={style.fakeAfatar}>
              <Text style={style.fakeAfatarText}>
                {`${item.name.split(' ').map((word: string) => word[0]).join('')}`}
              </Text>
            </View>
            <View style={style.contentContainer}>
              <Text style={style.nameReviewer}>{item.name}</Text>
              <Text style={style.reviewCreated}>{moment(item.createdAt).utc().format('DD MMMM yyy')}</Text>
            </View>
            <View style={style.starWrapper}>
              <Icon type={Icon.type.ai} name='star' size={17} color='#f43f5e' />
              <Gap width={5} />
              <Text style={[style.nameReviewer, style.textStar]}>{item.rating}</Text>
            </View>
          </View>
          <Gap height={10} />
          <View style={style.itemReviewsWrapp}>
            <View style={style.beforeBulb} />
            <View style={style.commentTextWrapp}>
              <Text style={style.commentText}>{item.comment}</Text>
              <Gap height={7} />
              <View style={style.ratingAverageWrapp}>
                <Icon type={Icon.type.mci} name='washing-machine' size={16} color='#333' />
                <Gap width={6} />
                <Text style={style.reviewCreated}>
                  {item.sub_service ? item.sub_service : item.id_service.name}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ServiceReview;
