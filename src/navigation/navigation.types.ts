import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Category, Survey } from 'geo-survey-map-shared-modules';

export enum ScreenName {
  Map = 'Map',
  Profile = 'Profile',
  Settings = 'Settings',

  CategoryInfo = 'CategoryInfo',
  PointDetails = 'PointDetails',
  BottomNavigation = 'BottomNavigation',
}

export type RootStackParamList = {
  [ScreenName.BottomNavigation]: undefined;
  [ScreenName.CategoryInfo]: { category: Category };
  [ScreenName.PointDetails]: { survey: Survey };
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
