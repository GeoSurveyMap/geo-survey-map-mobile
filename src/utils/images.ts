export const resolveImagePath = (relativePath: string) => {
  return process.env.EXPO_PUBLIC_IMAGES_URL + 'surveyimages/' + relativePath;
};
