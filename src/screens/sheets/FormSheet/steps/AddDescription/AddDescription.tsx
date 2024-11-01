import React from 'react';
import { useTranslation } from 'react-i18next';

import { GSMInput } from '@/components/GSMInput/GSMInput';
import { useFormStore } from '@/store/useFormStore';

export const AddDescription: React.FC = () => {
  const { t } = useTranslation();
  const { locationName, problemDescription, setLocationName, setProblemDescription } = useFormStore();
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
        maxLength={255} // TODO: do wywalenia
      />
    </>
  );
};
