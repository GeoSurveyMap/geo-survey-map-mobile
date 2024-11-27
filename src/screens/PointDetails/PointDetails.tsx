import { TextType } from 'geo-survey-map-shared-modules';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { DefaultScreenContainer } from '@/components/DefaultScreenContainer/DefaultScreenContainer';
import { GSMText } from '@/components/GSMText/GSMText';
import { formatDateTime } from '@/utils/format';
import { resolveImagePath } from '@/utils/images';

import { stylesheet } from './PointDetails.styles';

import type { PointDetailsScreenProps } from '@/navigation/navigation.types';

export const PointDetails: React.FC<PointDetailsScreenProps> = ({
  route: {
    params: { survey },
  },
}) => {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();

  const dataWithLabels: { label: string; text: string }[] = [
    { label: t('pointDetails.category'), text: t(`category.${survey.category}`) },
    { label: t('pointDetails.placeName'), text: survey.location.name ?? '' },
    { label: t('pointDetails.affectedArea'), text: survey.affectedArea.toString() + 'm' },
    { label: t('pointDetails.problemDescription'), text: survey.description },
    { label: t('pointDetails.problemSolution'), text: survey.solution },
    { label: 'Data zgłoszenia', text: formatDateTime(survey.createdAt) }, // TODO: translation
  ];

  return (
    <DefaultScreenContainer hasBackButton style={styles.contentWrapper}>
      {dataWithLabels.map(
        ({ label, text }) => text && text.length > 0 && <TextWithLabel key={label} label={label} text={text} />,
      )}
      {survey.filePath && survey.filePath.length > 0 && (
        <PhotoWithLabel label={t('pointDetails.photo')} uri={resolveImagePath(survey.filePath)} />
      )}
    </DefaultScreenContainer>
  );
};

const TextWithLabel = ({ label, text }: { label: string; text: string }) => {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.textWithLabelWrapper}>
      <GSMText>{label}</GSMText>
      <GSMText textStyle={TextType.H2}>{text}</GSMText>
    </View>
  );
};

const PhotoWithLabel = ({ label, uri }: { label: string; uri: string }) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.textWithLabelWrapper}>
      <GSMText>{label}</GSMText>
      <Image source={{ uri }} style={styles.image} />
    </View>
  );
};
