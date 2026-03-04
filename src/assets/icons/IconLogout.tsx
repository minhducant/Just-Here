import * as React from 'react';
import { useColorScheme } from 'react-native';
import normalize from 'react-native-normalize';
import Svg, { G, Path } from 'react-native-svg';

const SvgComponent = () => {
  const colorScheme = useColorScheme();
  const fillColor = colorScheme === 'dark' ? '#FFFFFF' : '#000000';

  return (
    <Svg width={normalize(25)} height={normalize(25)} fill="none" viewBox="0 0 24 24">
      <G stroke={fillColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
        <Path d="M21.791 12.12H9.75M18.864 9.205l2.928 2.916-2.928 2.916M16.36 7.63c-.33-3.58-1.67-4.88-7-4.88-7.101 0-7.101 2.31-7.101 9.25 0 6.94 0 9.25 7.1 9.25 5.33 0 6.67-1.3 7-4.88" />
      </G>
    </Svg>
  );
};
export default SvgComponent;
