import { useNavigation } from '@react-navigation/native';
import { icons } from 'geo-survey-map-shared-modules';
import React from 'react';
import { Keyboard, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';

import { BlurInsets } from '@/screens/Map/components/BlurInsets/BlurInsets';

import { stylesheet } from './DefaultScreenContainer.styles';

import type { PropsWithChildren } from 'react';
import type { ViewProps } from 'react-native';

interface Props extends ViewProps {
  hasBackButton?: boolean;
  hasCloseButton?: boolean;
}

const { Close, ArrowLeft } = icons;

const Placeholder = () => <View />;

export const DefaultScreenContainer: React.FC<PropsWithChildren<Props>> = ({
  children,
  hasBackButton = false,
  hasCloseButton = false,
  ...viewProps
}) => {
  const { styles, theme } = useStyles(stylesheet);
  const { goBack } = useNavigation();

  return (
    <View style={[styles.safeAreaView]}>
      <BlurInsets />
      <ScrollView
        style={styles.wrapper}
        contentContainerStyle={styles.wrapperContentContainer}
        contentInsetAdjustmentBehavior='always'
        overScrollMode='always'
      >
        <View style={styles.header}>
          {hasBackButton ? (
            <Pressable onPress={goBack} style={styles.headerButton}>
              <ArrowLeft color={theme.textFaded} />
            </Pressable>
          ) : (
            <Placeholder />
          )}
          {hasCloseButton ? (
            <Pressable onPress={goBack} style={styles.headerButton}>
              <Close color={theme.textFaded} />
            </Pressable>
          ) : (
            <Placeholder />
          )}
        </View>
        <View {...viewProps} style={[styles.container, viewProps.style]}>
          {children}
        </View>
      </ScrollView>
    </View>
  );
};
