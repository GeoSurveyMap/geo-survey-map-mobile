import { LinearGradient } from 'expo-linear-gradient';
import { AddLocation, Binoculars, Confirmation, TextType } from 'geo-survey-map-shared-modules';
import { GSMIcon } from 'geo-survey-map-shared-modules';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, LayoutAnimation, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';

import { GSMButton } from '@/components/GSMButton/GSMButton';
import { GSMText } from '@/components/GSMText/GSMText';
import { useOnboarding } from '@/hooks/useOnboarding';
import { type OnboardingScreenProps, ScreenName } from '@/navigation/navigation.types';
import { useFiltersState } from '@/store/useFilters';

import { FilterCategory } from '../sheets/FiltersSheet/components/FilterCategory/FilterCategory';

import { stylesheet } from './Onboarding.styles';

import type { Category } from 'geo-survey-map-shared-modules';

enum Stage {
  WELCOME,
  INSTRUCITON,
  SOILS,
}

export const Onboarding: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const { styles, theme } = useStyles(stylesheet);
  const { t } = useTranslation();
  const [stage, setStage] = useState(Stage.WELCOME);
  const { setIsOnboarded } = useOnboarding();

  const buttonLabel = useMemo(() => {
    switch (stage) {
      case Stage.WELCOME:
      case Stage.INSTRUCITON:
        return t('continue');
      case Stage.SOILS:
        return t('onboarding.goToTheAppButton');
    }
  }, [stage, t]);

  const handleNextStage = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    switch (stage) {
      case Stage.WELCOME:
        setStage(Stage.INSTRUCITON);
        break;
      case Stage.INSTRUCITON:
        setStage(Stage.SOILS);
        break;
      case Stage.SOILS: {
        navigation.replace(ScreenName.BottomNavigation);
        setIsOnboarded(true);
      }
    }
  };

  const openCategoryInfo = (category: Category) => {
    navigation.navigate(ScreenName.CategoryInfo, { category });
  };

  const content = useCallback(() => {
    switch (stage) {
      case Stage.WELCOME:
        return <WelcomeStageContent />;
      case Stage.INSTRUCITON:
        return <InstructionStageContent />;
      case Stage.SOILS:
        return <AboutSoilsContent handleOpenCategoryInfo={openCategoryInfo} />;
    }
  }, [stage]);

  const iconSize = stage === Stage.WELCOME ? 170 : 72;

  const contentGap = stage === Stage.WELCOME ? 80 : stage === Stage.INSTRUCITON ? 32 : 24;

  return (
    <View style={styles.screen}>
      <Animated.View style={styles.gradientWrapper} entering={FadeIn.delay(100).duration(500)}>
        <LinearGradient
          colors={['#42B760', '#0CAF8F', '#007A7A', '#3D2826', theme.background]}
          style={styles.gradientBackground}
        />
      </Animated.View>
      <Animated.View
        style={[styles.contentWrapper, { gap: contentGap }]}
        entering={FadeInDown.delay(300).duration(500)}
      >
        <View style={styles.iconWrapper}>
          <GSMIcon height={iconSize} width={iconSize} />
        </View>
        {content()}
        <GSMButton title={buttonLabel} onPress={handleNextStage} />
      </Animated.View>
    </View>
  );
};

const WelcomeStageContent: React.FC = () => {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  return (
    <View style={styles.textsWrapper}>
      <GSMText textStyle={TextType.H1} style={styles.mainHeader}>
        {t('onboarding.welcome.title')}
      </GSMText>
      <GSMText textStyle={TextType.H4}> {t('onboarding.welcome.description')}</GSMText>
    </View>
  );
};

export const InstructionStageContent: React.FC<{ hasTitle?: boolean }> = ({ hasTitle = true }) => {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();

  const content = [
    {
      Icon: Binoculars as React.FC<React.SVGAttributes<SVGElement>>,
      title: t('onboarding.instruction.step1.title'),
      description: t('onboarding.instruction.step1.description'),
    },
    {
      Icon: AddLocation as React.FC<React.SVGAttributes<SVGElement>>,
      title: t('onboarding.instruction.step2.title'),
      description: t('onboarding.instruction.step2.description'),
    },
    {
      Icon: Confirmation as React.FC<React.SVGAttributes<SVGElement>>,
      title: t('onboarding.instruction.step3.title'),
      description: t('onboarding.instruction.step3.description'),
    },
  ];

  return (
    <>
      {hasTitle && <GSMText textStyle={TextType.H1}>{t('onboarding.instruction.title')}</GSMText>}
      <FlatList
        data={content}
        renderItem={({ item }) => <InstructionListItem {...item} />}
        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.howToList}
      />
    </>
  );
};

export const InstructionListItem: React.FC<{
  Icon: React.FC<React.SVGAttributes<SVGElement>>;
  title: string;
  description: string;
}> = ({ Icon, title, description }) => {
  const { styles, theme } = useStyles(stylesheet);
  return (
    <View style={styles.instructionListItemWrapper}>
      <Icon color={theme.text} />
      <View style={styles.instructionListItemTextWrapper}>
        <GSMText textStyle={TextType.H3}>{title}</GSMText>
        <GSMText textStyle={TextType.P}>{description}</GSMText>
      </View>
    </View>
  );
};

export const AboutSoilsContent: React.FC<{
  handleOpenCategoryInfo: (category: Category) => void;
  hasTitle?: boolean;
}> = ({ handleOpenCategoryInfo, hasTitle = true }) => {
  const { t } = useTranslation();
  const { styles, theme } = useStyles(stylesheet);
  const { categories } = useFiltersState();

  return (
    <>
      <View style={styles.textsWrapper}>
        {hasTitle && <GSMText textStyle={TextType.H1}>{t('onboarding.aboutSoils.title')}</GSMText>}
        <GSMText textStyle={TextType.P}>{t('onboarding.aboutSoils.description')}</GSMText>
      </View>

      <View style={styles.categoriesList}>
        {Object.entries(categories).map(([category]) => (
          <FilterCategory
            key={category}
            category={category as Category}
            isSelected={true}
            onPress={() => handleOpenCategoryInfo(category as Category)}
            forceColor={theme.text}
            style={styles.categoryListItem}
          />
        ))}
      </View>
    </>
  );
};
