import { icons } from 'geo-survey-map-shared-modules';
import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { useStyles } from 'react-native-unistyles';

import { stylesheet } from './GSMSelect.styles';

import type { Item } from 'react-native-picker-select';

const { ChevronDown } = icons;

interface Props<T = string> {
  value: T;
  items: Item[];
  onValueChange: (value: T) => void;
}

export const GSMSelect = <T,>({ items, value, onValueChange }: Props<T>) => {
  const { styles, theme } = useStyles(stylesheet);
  return (
    <RNPickerSelect
      style={{
        inputAndroid: styles.select,
        inputIOS: styles.select,
        viewContainer: styles.container,
        iconContainer: styles.iconContainer,
      }}
      Icon={() => <ChevronDown color={theme.textFaded} />}
      items={items}
      onValueChange={onValueChange}
      value={value}
    />
  );
};
