import React, { SVGProps } from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';
import Gap from 'src/components/Gap';
import style, { bulletStepDone, lineStepDone, textStepDone } from './style';
import Icon from '../Icon';

interface IProps {
  steps: Array<{
    _id: string,
    name: string,
    desc: string,
    status: string,
    imgSource?: ImageSourcePropType,
    SvgStep?: (_props: SVGProps<SVGElement>) => React.ReactElement;
  }>;
}

const Stepper: React.FC<IProps> = ({ steps }) => {
  return (
    <>
      {steps.map((item, idx) => (
        <View key={`steps-${idx}`} style={style.stepContent}>
          <View style={style.bulletLineWrapp}>
            <View style={[
              style.bullet,
              bulletStepDone(item.status, idx > 0 && steps[idx - 1].status )]}>
              {item.status === '1' && <Icon type={Icon.type.ei} name='check' color='#FFF' size={15} />}
            </View>
            {idx !== (steps.length - 1) &&
              <View style={[style.line, lineStepDone(item.status)]} />
            }
          </View>
          <View style={style.descContainer}>
            <View style={style.descWrapp}>
              {item.imgSource && <Image source={item.imgSource} style={style.imgSource} />}
              {item.SvgStep && <item.SvgStep />}
              <Gap height={4} />
              <Text style={[style.textName, textStepDone(item.status)]}>{item.name}</Text>
            </View>
            <Text style={style.textDesc}>{item.desc ? item.desc : '-'}</Text>
            <Gap height={15} />
          </View>
        </View>
      ))}
    </>
  );
};

Stepper.defaultProps = {
  steps: [],
};

export default Stepper;
