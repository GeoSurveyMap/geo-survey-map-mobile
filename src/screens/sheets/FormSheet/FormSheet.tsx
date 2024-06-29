import { TextType, useCreateSurvey } from 'geo-survey-map-shared-modules';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, LayoutAnimation, Pressable, UIManager, View } from 'react-native';
import { SheetManager, type SheetProps } from 'react-native-actions-sheet';
import { useStyles } from 'react-native-unistyles';

import { GSMButton } from '@/components/GSMButton/GSMButton';
import { GSMButtonStyle } from '@/components/GSMButton/GSMButton.types';
import { GSMSheet } from '@/components/GSMSheet/GSMSheet';
import { GSMText } from '@/components/GSMText/GSMText';
import { useFormStore } from '@/store/useFormStore';
import { Sheet } from '@/types/sheets';
import { isAndroid } from '@/utils/platform';

import { stylesheet } from './FormSheet.styles';
import { FormProgressIndicator } from './components/FormProgressIndicator/FormProgressIndicator';
import { AddDescription } from './steps/AddDescription/AddDescription';
import { AddPhoto } from './steps/AddPhoto/AddPhoto';
import { ChooseArea } from './steps/ChooseArea/ChooseArea';
import { ChooseCategory } from './steps/ChooseCategory/ChooseCategory';
import { Success } from './steps/Success/Success';

if (isAndroid && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export enum FormStepName {
  CHOOSE_CATEGORY = 'CHOOSE_CATEGORY',
  CHOOSE_AREA = 'CHOOSE_AREA',
  ADD_PHOTO = 'ADD_PHOTO',
  ADD_DETAILS = 'ADD_DETAILS',
  SUCCESS = 'SUCCESS',
}

const Title = ({ currentStage }: { currentStage: FormStepName }) => {
  const { t } = useTranslation();
  const title = () => {
    switch (currentStage) {
      case FormStepName.CHOOSE_CATEGORY:
        return t('addPointForm.chooseCategory.title');
      case FormStepName.CHOOSE_AREA:
        return t('addPointForm.affectedArea.title');
      case FormStepName.ADD_PHOTO:
        return t('addPointForm.addPhoto.title');
      case FormStepName.ADD_DETAILS:
        return t('addPointForm.description.title');
    }
  };

  return <GSMText textStyle={TextType.H4}>{title()}</GSMText>;
};

export const FormSheet: React.FC<SheetProps<Sheet.Form>> = () => {
  const { reset, radius, photoUri, category, location, problemDescription, locationName } = useFormStore();
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useCreateSurvey();

  const [currentStage, setCurrentStage] = useState(FormStepName.CHOOSE_CATEGORY);

  const handleStageChange = (stage: FormStepName) => {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.linear,
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
        onSubmit();
        break;
      case FormStepName.SUCCESS:
        SheetManager.hide(Sheet.Form);
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
      description: problemDescription,
      locationRequest: { ...location, name: locationName },
      solution: '',
      affectedArea: radius || 0,
    });

    if (response) {
      reset();
      handleStageChange(FormStepName.SUCCESS);
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
      case FormStepName.SUCCESS:
        return <Success />;
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
            <GSMButton
              onPress={onNext}
              title={t('addPoint')}
              buttonStyle={GSMButtonStyle.PRIMARY}
              loading={isPending}
            />
          </>
        );
      case FormStepName.SUCCESS:
        return (
          <GSMButton
            onPress={onNext}
            title={t('close')}
            buttonStyle={GSMButtonStyle.SECONDARY}
            style={styles.fullButton}
          />
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
    >
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <View style={styles.contentWrapper}>
          {currentStage !== FormStepName.SUCCESS && (
            <>
              <Title currentStage={currentStage} />
              <FormProgressIndicator
                currentStage={Array.from(Object.values(FormStepName)).indexOf(currentStage)}
                stages={stagesProgress}
              />
            </>
          )}
          {content()}
        </View>

        <View style={styles.buttonsContainer}>{buttons()}</View>
      </Pressable>
    </GSMSheet>
  );
};
