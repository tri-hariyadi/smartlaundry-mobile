/* eslint-disable react-native/no-inline-styles */
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import { Animated, View } from 'react-native';
import StatusBarApp from 'src/components/StatusBarApp';
import colors from '@colors';
import {Header} from '@parts';

interface IProps {
  topBarArr: Array<{
      route: string;
      component: any;
    }>
  renderItem: (_props: any) => JSX.Element;
  conditionalComp?: () => JSX.Element;
  showBackButton?: boolean;
  onBackPress?: () => void
}

const TopBarItem: React.FC<MaterialTopTabBarProps & IProps> = ({
  state, descriptors, navigation, position, topBarArr, renderItem, conditionalComp,
  showBackButton, onBackPress,
}) => {
  const animref = React.useRef(new Animated.Value(0)).current;
  return (
    <>
      <StatusBarApp backgroundColor={colors.primary} />
      <Header showBackButton={showBackButton} onBackPress={onBackPress} />
      <View style={{ flexDirection: 'row' }}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true, params: undefined });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <View key={`topBarItem-${index}`} style={{ flex: 1, overflow: 'hidden' }}>
              {renderItem({
                state,
                descriptors,
                navigation,
                position,
                routeName: route.name,
                isFocused,
                index,
                topBarArr,
                onPress,
                onLongPress,
                animref,
              })}
            </View>
          );
        })}
      </View>
      {conditionalComp && conditionalComp()}
    </>
  );
};

TopBarItem.defaultProps = {
  conditionalComp: undefined,
  showBackButton: true,
  onBackPress: undefined,
};

export default TopBarItem;
