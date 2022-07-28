import React, { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { OrderPageProps } from '@utils/types';
import { service1 } from 'src/data';
import { RootState } from '@store/store';
import ListItem from './ListItem';
import style from './style';

const ChildCategory: React.FC<OrderPageProps> = ({ route, service }) => {
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    if (service1) {
      // setSubService(service1.subServices.filter((item) => item.type === 'Child'));
    }
  }, [service1]);

  return (
    <>
      <View style={style.pageContainer}>
        <ListItem routeKey={route.key} data={service.subServices ?
          service.subServices.filter(({ type }) => type === 'Child') : []} />
      </View>
      {!service1 || !Object.keys(service1).length &&
        <SafeAreaView style={[style.safeArea, { marginBottom: -top }]} />}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  service: state.ServiceReducer.service,
});

export default connect(mapStateToProps)(ChildCategory);
