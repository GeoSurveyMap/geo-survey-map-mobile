import React from 'react';
import { useTranslation } from 'react-i18next';

import { GSMInput } from '@/components/GSMInput/GSMInput';
import { GSMSelect } from '@/components/GSMSelect/GSMSelect';
import { useFormStore } from '@/store/useFormStore';

const problemSolutions = ['Caused by nature', 'Caused by human', 'Other'];

export const AddDescription: React.FC = () => {
  const { t } = useTranslation();
  const {
    locationName,
    problemDescription,
    problemSolution,
    setLocationName,
    setProblemDescription,
    setProblemSolution,
  } = useFormStore();
  return (
    <>
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
        items={problemSolutions.map((item) => ({
          label: item,
          value: item,
        }))}
        value={problemSolution}
        onValueChange={setProblemSolution}
      />
    </>
  );
};
