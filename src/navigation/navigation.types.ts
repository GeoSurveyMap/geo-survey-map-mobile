import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Category } from 'geo-survey-map-shared-modules';

export enum ScreenName {
  Map = 'Map',
  Profile = 'Profile',
  CategoryInfo = 'CategoryInfo',
  PointDetails = 'PointDetails',
}

export type RootStackParamList = {
  [ScreenName.Map]: undefined;
  [ScreenName.Profile]: undefined;
  [ScreenName.CategoryInfo]: { category: Category };
  [ScreenName.PointDetails]: { id: string };
};

export type MapScreenProps = NativeStackScreenProps<RootStackParamList, ScreenName.Map>;

export type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, ScreenName.Profile>;

export type CategoryInfoScreenProps = NativeStackScreenProps<RootStackParamList, ScreenName.CategoryInfo>;
