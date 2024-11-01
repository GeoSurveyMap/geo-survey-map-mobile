import { useNavigation } from '@react-navigation/native';
import { icons } from 'geo-survey-map-shared-modules';
import React from 'react';
import { Keyboard, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';

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
    <Pressable style={styles.wrapper} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeAreaView} edges={['top']}>
        <ScrollView
          style={styles.wrapper}
          contentContainerStyle={styles.wrapperContentContainer}
          contentInsetAdjustmentBehavior='always'
          overScrollMode='always'
        >
          {(hasBackButton || hasCloseButton) && (
            <View style={styles.header}>
              {hasBackButton ? (
                <Pressable onPress={goBack} style={styles.headerButton}>
                  <ArrowLeft color={theme.textFaded} />
                </Pressable>
              ) : (
                <Placeholder />
              )}
              {hasCloseButton && (
                <Pressable onPress={goBack} style={styles.headerButton}>
                  <Close color={theme.textFaded} />
                </Pressable>
              )}
            </View>
          )}
          <View {...viewProps} style={[styles.container, viewProps.style]}>
            {children}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Pressable>
  );
};
