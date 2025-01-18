import { problemCausesForCategories } from 'geo-survey-map-shared-modules';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-actions-sheet';

import { GSMInput } from '@/components/GSMInput/GSMInput';
import { GSMSelect } from '@/components/GSMSelect/GSMSelect';
import { useFormStore } from '@/store/useFormStore';

export const AddDescription: React.FC = () => {
  const { t } = useTranslation();
  const {
    locationName,
    problemDescription,
    problemSolution,
    category,
    setLocationName,
    setProblemDescription,
    setProblemSolution,
  } = useFormStore();

  const problemCauses = category
    ? problemCausesForCategories[category].map(({ translationKey }) => t(`problemCause.${translationKey}`))
    : [];

  const problemCausesLength = problemCauses.length;

  return (
    <ScrollView style={{ flexGrow: 1, width: '100%' }} contentContainerStyle={{ gap: 16 }}>
      <GSMInput
        label={t('addPointForm.description.placeName.label')}
        placeholder={t('addPointForm.description.placeName.placeholder')}
        value={locationName}
        onChangeText={setLocationName}
      />
      <GSMInput
        label={t('addPointForm.description.problemDescription.label')}
        placeholder={t('addPointForm.description.problemDescription.placeholder')}
        multiline
        value={problemDescription}
        onChangeText={setProblemDescription}
      />
      <GSMSelect
        label={t('addPointForm.solution.title')}
        items={[
          ...problemCauses.map((item) => ({
            label: item,
            value: item,
          })),
        ]}
        value={!problemCauses.includes(problemSolution) ? 'Other' : problemSolution}
        onValueChange={setProblemSolution}
      />
      {(problemCauses.indexOf(problemSolution) === problemCausesLength - 1 ||
        !problemCauses.includes(problemSolution)) && (
        <GSMInput
          placeholder={t('addPointForm.solution.title')}
          multiline
          value={problemSolution}
          onChangeText={setProblemSolution}
        />
      )}
    </ScrollView>
  );
};
