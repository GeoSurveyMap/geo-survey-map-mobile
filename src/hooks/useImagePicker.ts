import {
  MediaTypeOptions,
  launchCameraAsync,
  launchImageLibraryAsync,
  useCameraPermissions,
  useMediaLibraryPermissions,
} from 'expo-image-picker';
import { useCallback, useState } from 'react';
import { Alert, Linking } from 'react-native';

import type { ImagePickerAsset, ImagePickerOptions, ImagePickerResult } from 'expo-image-picker';

type Props = {
  onCanceled?: () => void;
};

const pickerOptions: ImagePickerOptions = {
  mediaTypes: MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [4, 3],
  selectionLimit: 1,
};

const t = {
  noPermisisons: {
    library: {
      title: "We can't access your photos", //TODO: translate
      description: 'Please allow access to your photos in the settings.',
    },
    camera: {
      title: "We can't access your camera",
      description: 'Please allow access to your camera in the settings.',
    },
    cancel: 'Cancel',
    openSettings: 'Open settings',
  },
};

export const useImagePicker = ({ onCanceled }: Props) => {
  const [image, setImage] = useState<ImagePickerAsset | null>(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [, requestLibraryPermission] = useMediaLibraryPermissions();

  const handleImageResult = useCallback(
    (result: ImagePickerResult) => {
      if (result.canceled) {
        onCanceled?.();
        return;
      }

      const newImage = result.assets?.[0];
      setImage(newImage);
    },
    [onCanceled],
  );

  const handleNoPermissions = useCallback(
    (source: 'camera' | 'library') => {
      Alert.alert(t.noPermisisons[source].title, t.noPermisisons[source].description, [
        {
          text: t.noPermisisons.cancel,
          onPress: onCanceled,
          style: 'cancel',
        },
        {
          text: t.noPermisisons.openSettings,
          onPress: () => {
            Linking.openSettings();
            onCanceled?.();
          },
          style: 'default',
        },
      ]);
    },
    [onCanceled],
  );

  const launchCamera = useCallback(async () => {
    if (!cameraPermission?.granted) {
      const permission = await requestCameraPermission();
      if (!permission.granted || permission.canAskAgain === false) {
        handleNoPermissions('camera');
      }
    }
    const result = await launchCameraAsync(pickerOptions);

    handleImageResult(result);
  }, [cameraPermission?.granted, handleImageResult, requestCameraPermission, handleNoPermissions]);

  const launchLibrary = useCallback(async () => {
    await requestLibraryPermission();
    const result = await launchImageLibraryAsync(pickerOptions);

    handleImageResult(result);
  }, [handleImageResult, requestLibraryPermission]);

  return { image, launchCamera, launchLibrary };
};
