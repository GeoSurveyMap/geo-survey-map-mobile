import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Category, TextType, gradientForSurveyMapMarker, iconForSurveyMapMarker } from 'geo-survey-map-shared-modules';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { SheetManager, type SheetProps } from 'react-native-actions-sheet';
import { useStyles } from 'react-native-unistyles';

import { GSMSheet } from '@/components/GSMSheet/GSMSheet';
import { GSMText } from '@/components/GSMText/GSMText';
import { ScreenName } from '@/navigation/navigation.types';
import { usePointFocusStore } from '@/store/usePointFocus';

import { stylesheet } from './PointSheet.styles';

import type { RootStackParamList } from '@/navigation/navigation.types';
import type { Sheet } from '@/types/sheets';
import type { NavigationProp } from '@react-navigation/native';

export const PointSheet: React.FC<SheetProps<Sheet.Point>> = ({ payload, sheetId }) => {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const { reset } = usePointFocusStore();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const point = payload?.point;
  if (!point) {
    return null;
  }
  const color = point.category === Category.DRY_SOILS ? '#000' : '#ffffff';
  const gradient = gradientForSurveyMapMarker[point.category];
  const Icon = iconForSurveyMapMarker[point.category];

  const handleOpenDetails = async () => {
    await SheetManager.hide(sheetId);
    navigate(ScreenName.PointDetails, { survey: point });
  };

  return (
    <GSMSheet onBeforeClose={reset} containerStyle={styles.container} overlayColor='transparent'>
      <LinearGradient colors={gradient} style={styles.header}>
        <GSMText color={color} textStyle={TextType.H3}>
          {t(`category.${point.category}`)}
        </GSMText>
        <Icon color={color} />
      </LinearGradient>
      <View style={styles.contentContainer}>
        <View>
          <GSMText style={styles.label}>{t('addPointForm.description.placeName.label')}</GSMText>
          <GSMText textStyle={TextType.H2}>{point.location.name}</GSMText>
        </View>
        <View>
          <GSMText style={styles.label}>{t('addPointForm.description.problemDescription.label')}</GSMText>
          <GSMText numberOfLines={4} ellipsizeMode='tail'>
            {point.description}
          </GSMText>
        </View>
      </View>
      <TouchableOpacity style={styles.seeMoreContainer} onPress={handleOpenDetails} hitSlop={16}>
        <GSMText style={styles.seeMoreText}>{t('seeMore')}</GSMText>
      </TouchableOpacity>
    </GSMSheet>
  );
};
