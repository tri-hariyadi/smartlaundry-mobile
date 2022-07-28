import { View } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { service1 } from 'src/data';
import { OrderPageProps } from '@utils/types';
import { RootState } from '@store/store';
import style from './style';
import ListItem from './ListItem';

const WomanCategory: React.FC<OrderPageProps> = ({ route, service }) => {
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    if (service1) {
      // setSubService(service1.subServices.filter((item) => item.type === 'Woman'));
    }
  }, [service1]);

  return (
    <>
      <View style={style.pageContainer}>
        <ListItem routeKey={route.key} data={service.subServices ?
          service.subServices.filter(({ type }) => type === 'Woman') : []} />
      </View>
      {!service || !Object.keys(service).length &&
        <SafeAreaView style={[style.safeArea, { marginBottom: -top }]} />}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  service: state.ServiceReducer.service,
});

export default connect(mapStateToProps)(WomanCategory);
