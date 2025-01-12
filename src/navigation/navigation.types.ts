import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Category, Survey } from 'geo-survey-map-shared-modules';

export enum ScreenName {
  Onboarding = 'Onboarding',

  Map = 'Map',
  Profile = 'Profile',
  Settings = 'Settings',

  CategoryInfo = 'CategoryInfo',
  PointDetails = 'PointDetails',
  BottomNavigation = 'BottomNavigation',
  HowToUse = 'HowToUse',
  SoilCategories = 'AboutSoils',
  PrivacyPolicy = 'PrivacyPolicy',
}

export type RootStackParamList = {
  [ScreenName.Onboarding]: undefined;
  [ScreenName.BottomNavigation]: undefined;
  [ScreenName.CategoryInfo]: { category: Category };
  [ScreenName.PointDetails]: { survey: Survey };
  [ScreenName.HowToUse]: undefined;
  [ScreenName.SoilCategories]: undefined;
  [ScreenName.PrivacyPolicy]: undefined;
};

export type BottomTabsParamList = {
  [ScreenName.Map]: undefined;
  [ScreenName.Profile]: undefined;
  [ScreenName.Settings]: undefined;
};

// -- Type generics --

type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

type BottomTabsScreenProps<T extends keyof BottomTabsParamList> = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;

export type MapScreenProps = BottomTabsScreenProps<ScreenName.Map>;
export type ProfileScreenProps = BottomTabsScreenProps<ScreenName.Profile>;
export type SettingsScreenProps = BottomTabsScreenProps<ScreenName.Settings>;

export type CategoryInfoScreenProps = RootStackScreenProps<ScreenName.CategoryInfo>;
export type PointDetailsScreenProps = RootStackScreenProps<ScreenName.PointDetails>;
export type OnboardingScreenProps = RootStackScreenProps<ScreenName.Onboarding>;
export type HowToUseScreenProps = RootStackScreenProps<ScreenName.HowToUse>;
export type SoilCategoriesScreenProps = RootStackScreenProps<ScreenName.SoilCategories>;
export type PrivacyPolicyScreenProps = RootStackScreenProps<ScreenName.PrivacyPolicy>;
