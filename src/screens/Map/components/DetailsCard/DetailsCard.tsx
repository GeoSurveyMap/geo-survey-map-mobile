import { LinearGradient } from 'expo-linear-gradient';
import {
  Category,
  type Survey,
  TextType,
  gradientForSurveyMapMarker,
  iconForSurveyMapMarker,
} from 'geo-survey-map-shared-modules';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Pressable, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';

import { GSMText } from '@/components/GSMText/GSMText';
import { useMap } from '@/store/useMap';
import { usePointFocusStore } from '@/store/usePointFocus';

import { stylesheet } from './DetailsCard.styles';

type Props = {
  point: Survey;
  onSeeMore: () => void;
};

export const DetailsCard: React.FC<Props> = ({ point, onSeeMore }) => {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();
  const gradient = gradientForSurveyMapMarker[point.category];
  const Icon = iconForSurveyMapMarker[point.category];
  const color = point.category === Category.DRY_SOILS ? '#000' : '#ffffff';
  const { mapRef } = useMap();
  const { reset } = usePointFocusStore();

  useEffect(() => {
    mapRef.current?.fitToCoordinates([{ latitude: point.location.x, longitude: point.location.y }], {
      edgePadding: { top: 0, right: 0, bottom: 200, left: 0 },
      animated: true,
    });
  }, [point, mapRef]);

  return (
    <Modal animationType='slide' transparent={true}>
      <Pressable style={styles.wrapper} onPress={reset} />
      <View style={[styles.container, { bottom: bottom }]}>
        <View style={styles.dragHandle} />
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
        <TouchableOpacity style={styles.seeMoreContainer} onPress={onSeeMore}>
          <GSMText style={styles.seeMoreText}>{t('seeMore')}</GSMText>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
