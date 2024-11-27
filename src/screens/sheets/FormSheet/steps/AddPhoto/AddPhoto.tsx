import { BlurView } from 'expo-blur';
import { TextType } from 'geo-survey-map-shared-modules';
import { Camera, Close, Library } from 'geo-survey-map-shared-modules';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useStyles } from 'react-native-unistyles';

import { GSMText } from '@/components/GSMText/GSMText';
import { useImagePicker } from '@/hooks/useImagePicker';
import { useFormStore } from '@/store/useFormStore';
import { SCREEN_WIDTH } from '@/utils/platform';

import { PADDING, stylesheet } from './AddPhoto.styles';

const ANIMATION_DURATION = 300;

export const AddPhoto = () => {
  const { styles, theme } = useStyles(stylesheet);
  const { t } = useTranslation();
  const { launchCamera, launchLibrary, image } = useImagePicker({});
  const { photoAsset, setPhotoAsset } = useFormStore();

  const imageHeight = useSharedValue(0);

  const setImageSize = useCallback(
    (uri: string) => {
      Image.getSize(uri, (width, height) => {
        const elementWidth = SCREEN_WIDTH - PADDING * 2;
        imageHeight.value = (height * elementWidth) / width;
      });
    },
    [imageHeight],
  );

  useLayoutEffect(() => {
    if (photoAsset) {
      setImageSize(photoAsset.uri);
    }
    // eslint-disable-next-line
  }, [setImageSize]);

  useEffect(() => {
    if (image) {
      setImageSize(image.uri);
      setPhotoAsset(image);
    }
  }, [image, imageHeight, setImageSize, setPhotoAsset]);

  const animatedImageStyle = useAnimatedStyle(() => ({
    height: withTiming(imageHeight.value, { duration: ANIMATION_DURATION, easing: Easing.inOut(Easing.ease) }),
  }));

  const animatedImageWrapperStyle = useAnimatedStyle(() => ({
    opacity: withTiming(photoAsset ? 1 : 0, { duration: ANIMATION_DURATION, easing: Easing.inOut(Easing.ease) }),
  }));

  const handleImageRemove = () => {
    imageHeight.value = 0;
    setPhotoAsset(undefined);
  };

  return (
    <View style={styles.container}>
      {photoAsset ? (
        <Animated.View style={animatedImageWrapperStyle}>
          <Animated.Image source={{ uri: photoAsset?.uri }} style={[styles.image, animatedImageStyle]} />
          <Pressable onPress={handleImageRemove} style={styles.closeIconContainer}>
            <BlurView style={styles.closeIcon} experimentalBlurMethod='dimezisBlurView'>
              <Close color={theme.primary} />
            </BlurView>
          </Pressable>
        </Animated.View>
      ) : (
        <View style={styles.buttonsContainer}>
          <Pressable style={styles.takePhotoContainer} onPress={launchCamera}>
            <Camera color={theme.textFaded} />
            <GSMText textStyle={TextType.H4} color={theme.textFaded}>
              {t('addPointForm.addPhoto.takePhoto')}
            </GSMText>
          </Pressable>
          <GSMText color={theme.textFaded}>{t('addPointForm.addPhoto.or')}</GSMText>
          <Pressable style={styles.takePhotoContainer} onPress={launchLibrary}>
            <Library color={theme.textFaded} />
            <GSMText textStyle={TextType.H4} color={theme.textFaded}>
              {t('addPointForm.addPhoto.chooseFromGallery')}
            </GSMText>
          </Pressable>
        </View>
      )}
    </View>
  );
};
