import * as React from 'react';
import { useColorScheme } from 'react-native';
import normalize from 'react-native-normalize';
import Svg, { G, Path } from 'react-native-svg';

const SvgComponent = () => {
  const colorScheme = useColorScheme();
  const fillColor = colorScheme === 'dark' ? '#FFFFFF' : '#000000';

  return (
    <Svg width={normalize(25)} height={normalize(25)} fill="none" viewBox="0 0 24 24">
      <G stroke={fillColor} strokeLinecap="round" strokeWidth={1.5}>
        <Path d="m18 20.5 1.5 1.5M6 20.5 4.5 22" />
        <Path
          strokeLinejoin="round"
          d="M21 13c0 4.968-4.032 9-9 9s-9-4.032-9-9 4.032-9 9-9 9 4.032 9 9Z"
        />
        <Path
          strokeLinejoin="round"
          d="m15.339 15.862-2.79-1.665c-.486-.288-.882-.981-.882-1.548v-3.69"
        />
        <Path strokeLinejoin="round" strokeMiterlimit={10} d="m18 2 3.747 3.31M6 2 2.253 5.31" />
      </G>
    </Svg>
  );
};
export default SvgComponent;
