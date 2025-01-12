import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Close } from 'geo-survey-map-shared-modules';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';

import { BlurInsets } from '@/screens/Map/components/BlurInsets/BlurInsets';

import { stylesheet } from './DefaultScreenContainer.styles';

import type { PropsWithChildren } from 'react';
import type { ViewProps } from 'react-native';

interface Props extends ViewProps {
  hasBackButton?: boolean;
  hasCloseButton?: boolean;
  scrollable?: boolean;
}

const Placeholder = () => <View />;

export const DefaultScreenContainer: React.FC<PropsWithChildren<Props>> = ({
  children,
  hasBackButton = false,
  hasCloseButton = false,
  scrollable = true,
  ...viewProps
}) => {
  const { styles, theme } = useStyles(stylesheet);
  const { goBack } = useNavigation();
  const { top } = useSafeAreaInsets();

  const Wrapper = scrollable ? ScrollView : View;
  const hasButtons = hasBackButton || hasCloseButton;

  const paddingTop = top + 24;

  return (
    <View style={styles.bg}>
      <BlurInsets />
      <Wrapper style={styles.wrapper} contentContainerStyle={styles.wrapperContentContainer}>
        {hasButtons && (
          <View style={[styles.header, { paddingTop }]}>
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
        )}
        <View {...viewProps} style={[styles.container, viewProps.style]}>
          {children}
        </View>
      </Wrapper>
    </View>
  );
};
