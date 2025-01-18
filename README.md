
# LOESS Soil Map Documentation

Welcome to the **LOESS Soil Map** project! This application is a mobile app built using **React Native** with **Expo**, designed to help visualize and interact with soil data on a map. This README provides all necessary instructions to navigate the project, run the application, and build it for iOS and Android.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Folder Structure](#folder-structure)
3. [Setup Instructions](#setup-instructions)
4. [Running the Project](#running-the-project)
5. [Building for iOS and Android](#building-for-ios-and-android)
    - [Building for iOS](#building-for-ios)
    - [Building for Android](#building-for-android)
6. [Dependencies](#dependencies)

---

## Project Overview

The **LOESS Soil Map** application leverages modern mobile development frameworks to provide an interactive experience for viewing and managing soil data. Key features include:

- **Interactive Maps** with marker and soil data visualization.
- **Multi-language Support** via `i18next`.
- **User Authentication** and state management with `zustand`.
- **Cross-Platform Development** using Expo and React Native.

---

## Folder Structure

```plaintext
.
├── App.tsx
├── README.md
├── app.config.ts
├── assets/
│   ├── icon.png
│   └── splash-icon.png
├── babel.config.js
├── keystore/
├── metro.config.js
├── package.json
├── src/
│   ├── components/
│   ├── hooks/
│   ├── libs/
│   ├── navigation/
│   ├── screens/
│   ├── store/
│   ├── styles/
│   ├── types/
│   └── utils/
├── tsconfig.json
└── yarn.lock
```

---

## Setup Instructions

### Prerequisites

Before starting, ensure you have the following installed:

1. **Node.js** (v20.18.0)
2. **Yarn** as the package manager.
3. **Expo CLI**:
   ```bash
   npm install -g expo-cli
   ```

4. [Xcode](https://developer.apple.com/xcode/) (for macOS/iOS builds).
5. [Android Studio](https://developer.android.com/studio) (for Android builds).

### Installing Dependencies

Clone the repository and install dependencies:

```bash
git clone <repository_url>
cd <project_directory>
yarn install
```

---

## Running the Project

Start the development server with:

```bash
yarn start
```

To run the app on a specific platform:

- For Android:
  ```bash
  yarn android
  ```

- For iOS:
  ```bash
  yarn ios
  ```

---

## Building for iOS and Android

### Building for iOS

1. Prebuild the iOS project:
   ```bash
   yarn prebuild:ios
   ```

2. Open the iOS project in Xcode:
   ```bash
   open ios/LOESSSoilMap.xcworkspace
   ```

3. Select your device or simulator in Xcode, then click **Run** to build and run the app.

4. To create a release build, ensure the project is set to the `Release` configuration in Xcode.

### Building for Android

1. Prebuild the Android project:
   ```bash
   yarn prebuild:android
   ```

2. Open the project in Android Studio:
   ```bash
   open -a "Android Studio" android/
   ```

3. Use Android Studio to build and run the app on a connected device or emulator.

4. For a release build:
   - Generate a keystore (if not done already) and configure `android/app/build.gradle` with the keystore credentials.
   - Build the APK using the **Build** menu in Android Studio.

---

## Dependencies

The project utilizes the following key dependencies:

- **React Native**: Core framework for building mobile apps.
- **Expo**: Simplifies the development workflow.
- **i18next**: Provides multi-language support.
- **react-navigation**: Handles navigation in the app.
- **zustand**: Manages state.

To see the full list of dependencies, refer to the `package.json` file.

---

Thank you for contributing to **LOESS Soil Map**! Let’s build an amazing app together. If you have any questions, feel free to open an issue in the repository.
