import { ChevronDown } from 'geo-survey-map-shared-modules';
import React from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useStyles } from 'react-native-unistyles';

import { GSMText } from '../GSMText/GSMText';

import { stylesheet } from './GSMSelect.styles';

import type { Item } from 'react-native-picker-select';

interface Props<T = string> {
  label?: string;
  value: T;
  items: Item[];
  onValueChange: (value: T) => void;
}

export const GSMSelect = <T,>({ label, items, value, onValueChange }: Props<T>) => {
  const { styles, theme } = useStyles(stylesheet);
  return (
    <View style={[styles.wrapper]}>
      {label && <GSMText style={styles.label}>{label}</GSMText>}
      <RNPickerSelect
        style={{
          inputAndroid: styles.selectAndroid,
          inputIOS: styles.selectIOS,
          viewContainer: styles.container,
          inputAndroidContainer: styles.container,
          iconContainer: styles.iconContainer,
        }}
        useNativeAndroidPickerStyle={false}
        Icon={() => <ChevronDown color={theme.textFaded} />}
        items={items}
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );
};
