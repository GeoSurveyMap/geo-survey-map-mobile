import React from 'react';
import { useTranslation } from 'react-i18next';

import { GSMInput } from '@/components/GSMInput/GSMInput';
import { useFormStore } from '@/store/useFormStore';

type Props = {};

export const AddDescription: React.FC<Props> = ({}) => {
  const { t } = useTranslation();
  const { locationName, problemDescription, setLocationName, setProblemDescription } = useFormStore();
  return (
    <>
      <GSMInput
        label={t('addPointForm.describtion.placeName.label')}
        placeholder={t('addPointForm.describtion.placeName.placeholder')}
        value={locationName}
        onChangeText={setLocationName}
      />
      <GSMInput
        label={t('addPointForm.describtion.problemDescription.label')}
        placeholder={t('addPointForm.describtion.problemDescription.placeholder')}
        multiline
        value={problemDescription}
        onChangeText={setProblemDescription}
      />
    </>
  );
};
