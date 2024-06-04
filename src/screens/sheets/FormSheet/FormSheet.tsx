import { TextType, useCreateSurvey } from 'geo-survey-map-shared-modules';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LayoutAnimation, UIManager, View } from 'react-native';
import { SheetManager, type SheetProps } from 'react-native-actions-sheet';
import { useStyles } from 'react-native-unistyles';

import { Sheet } from '@/libs/sheets';
import { useFormStore } from '@/store/useFormStore';
import { isAndroid } from '@/utils/platform';

import { GSMButton } from '../../../components/GSMButton/GSMButton';
import { GSMButtonStyle } from '../../../components/GSMButton/GSMButton.types';
import { GSMSheet } from '../../../components/GSMSheet/GSMSheet';
import { GSMText } from '../../../components/GSMText/GSMText';

import { stylesheet } from './FormSheet.styles';
import { FormProgressIndicator } from './components/FormProgressIndicator/FormProgressIndicator';
import { AddDescription } from './steps/AddDescription/AddDescription';
import { AddPhoto } from './steps/AddPhoto/AddPhoto';
import { ChooseArea } from './steps/ChooseArea/ChooseArea';
import { ChooseCategory } from './steps/ChooseCategory/ChooseCategory';

if (isAndroid && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export enum FormStepName {
  CHOOSE_CATEGORY = 'CHOOSE_CATEGORY',
  CHOOSE_AREA = 'CHOOSE_AREA',
  ADD_PHOTO = 'ADD_PHOTO',
  ADD_DETAILS = 'ADD_DETAILS',
}

const Title = ({ currentStage }: { currentStage: FormStepName }) => {
  const { t } = useTranslation();
  const title = () => {
    switch (currentStage) {
      case FormStepName.CHOOSE_CATEGORY:
        return t('addPointForm.describtion.title');
      case FormStepName.CHOOSE_AREA:
        return t('addPointForm.affectedArea.title');
      case FormStepName.ADD_PHOTO:
        return t('addPointForm.addPhoto.title');
      case FormStepName.ADD_DETAILS:
        return t('addPointForm.describtion.title');
    }
  };

  return <GSMText textStyle={TextType.H4}>{title()}</GSMText>;
};

export const FormSheet: React.FC<SheetProps<Sheet.Form>> = () => {
  const { reset, radius, photoUri, category, location, problemDescription, locationName } = useFormStore();
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const { mutateAsync } = useCreateSurvey();

  const [currentStage, setCurrentStage] = React.useState(FormStepName.CHOOSE_CATEGORY);

  const handleStageChange = (stage: FormStepName) => {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.spring,
      update: {
        type: 'easeInEaseOut',
        property: 'scaleXY',
        initialVelocity: 10,
      },
      create: {
        type: 'easeInEaseOut',
        property: 'opacity',
      },
      duration: 300,
    });
    setCurrentStage(stage);
  };

  const onNext = () => {
    switch (currentStage) {
      case FormStepName.CHOOSE_CATEGORY:
        handleStageChange(FormStepName.CHOOSE_AREA);
        break;
      case FormStepName.CHOOSE_AREA:
        handleStageChange(FormStepName.ADD_PHOTO);
        break;
      case FormStepName.ADD_PHOTO:
        handleStageChange(FormStepName.ADD_DETAILS);
        break;
      case FormStepName.ADD_DETAILS:
        handleStageChange(FormStepName.ADD_DETAILS);
        break;
    }
  };

  const onPrevious = () => {
    switch (currentStage) {
      case FormStepName.CHOOSE_CATEGORY:
        reset();
        SheetManager.hide(Sheet.Form);
        break;
      case FormStepName.CHOOSE_AREA:
        handleStageChange(FormStepName.CHOOSE_CATEGORY);
        break;
      case FormStepName.ADD_PHOTO:
        handleStageChange(FormStepName.CHOOSE_AREA);
        break;
      case FormStepName.ADD_DETAILS:
        handleStageChange(FormStepName.ADD_PHOTO);
        break;
    }
  };

  const onSubmit = async () => {
    if (!category || !location) return;
    const response = await mutateAsync({
      category,
      description: locationName,
      locationRequest: location,
      solution: problemDescription,
    });

    if (response) {
      reset();
      SheetManager.hide(Sheet.Form);
    }
  };

  const content = () => {
    switch (currentStage) {
      case FormStepName.CHOOSE_CATEGORY:
        return <ChooseCategory />;
      case FormStepName.CHOOSE_AREA:
        return <ChooseArea />;
      case FormStepName.ADD_PHOTO:
        return <AddPhoto />;
      case FormStepName.ADD_DETAILS:
        return <AddDescription />;
    }
  };

  const buttons = () => {
    switch (currentStage) {
      case FormStepName.CHOOSE_CATEGORY:
        return (
          <>
            <GSMButton onPress={onPrevious} title={t('cancel')} buttonStyle={GSMButtonStyle.DESTRUCTIVE} />
            <GSMButton onPress={onNext} title={t('next')} buttonStyle={GSMButtonStyle.PRIMARY} disabled={!category} />
          </>
        );
      case FormStepName.CHOOSE_AREA:
        return (
          <>
            <GSMButton onPress={onPrevious} title={t('back')} buttonStyle={GSMButtonStyle.SOFT_DESTRUCTIVE} />
            {radius ? (
              <GSMButton onPress={onNext} title={t('next')} buttonStyle={GSMButtonStyle.PRIMARY} />
            ) : (
              <GSMButton onPress={onNext} title={t('skip')} buttonStyle={GSMButtonStyle.SECONDARY} />
            )}
          </>
        );
      case FormStepName.ADD_PHOTO:
        return (
          <>
            <GSMButton onPress={onPrevious} title={t('back')} buttonStyle={GSMButtonStyle.SOFT_DESTRUCTIVE} />
            {photoUri ? (
              <GSMButton onPress={onNext} title={t('next')} buttonStyle={GSMButtonStyle.PRIMARY} />
            ) : (
              <GSMButton onPress={onNext} title={t('skip')} buttonStyle={GSMButtonStyle.SECONDARY} />
            )}
          </>
        );
      case FormStepName.ADD_DETAILS:
        return (
          <>
            <GSMButton onPress={onPrevious} title={t('back')} buttonStyle={GSMButtonStyle.SOFT_DESTRUCTIVE} />
            <GSMButton onPress={onSubmit} title={t('addPoint')} buttonStyle={GSMButtonStyle.PRIMARY} />
          </>
        );
    }
  };

  const stagesProgress = [
    { isCompleted: true },
    { isCompleted: !!radius },
    { isCompleted: !!photoUri },
    { isCompleted: false },
  ];

  return (
    <GSMSheet
      onClose={reset}
      enableRouterBackNavigation={true}
      defaultOverlayOpacity={0}
      containerStyle={{ paddingBottom: 0 }}
      openAnimationConfig={{ delay: 0 }}
    >
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <Title currentStage={currentStage} />
          <FormProgressIndicator
            currentStage={Array.from(Object.values(FormStepName)).indexOf(currentStage)}
            stages={stagesProgress}
          />
          {content()}
        </View>

        <View style={styles.buttonsContainer}>{buttons()}</View>
      </View>
    </GSMSheet>
  );
};
