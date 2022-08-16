import React from 'react';
import { View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { RootState } from '@store/store';
import { OrderPageProps } from '@utils/types';
import ListItem from './ListItem';
import style from './style';

const ManCategory: React.FC<OrderPageProps> = ({ route, service }) => {
  const { top } = useSafeAreaInsets();
  return (
    <>
      <View style={style.pageContainer}>
        <ListItem routeKey={route.key} data={service.subServices ?
          service.subServices.filter(({ type }) => type === 'Man') : []} />
      </View>
      {!service || !Object.keys(service).length &&
        <SafeAreaView style={[style.safeArea, { marginBottom: -top }]} />}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  service: state.ServiceReducer.service,
  serviceError: state.ServiceReducer.serviceError,
});

export default connect(mapStateToProps)(ManCategory);
