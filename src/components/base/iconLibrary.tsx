import React from 'react';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';

const iconLibraries = {
  Ionicons,
  MaterialIcons,
};

interface IconLibraryProps {
  size?: number;
  style?: any;
  color?: string;
  name: string;
  activeOpacity?: number;
  onPress?: (event: Event) => void;
  library?: keyof typeof iconLibraries;
}

export const IconLibrary: React.FC<IconLibraryProps> = ({
  style,
  onPress,
  name,
  size = 25,
  color = 'black',
  activeOpacity = 1,
  library = 'Ionicons',
}) => {
  const IconComponent = iconLibraries[library];
  return (
    <IconComponent
      size={size}
      color={color}
      onPress={onPress}
      name={name as any}
      style={[style, { opacity: activeOpacity }] as any}
      disabled={typeof onPress === 'function' ? false : true}
    />
  );
};
