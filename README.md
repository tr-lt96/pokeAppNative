# Poketeam

**Poketeam** is a mobile app that helps users **search for basic Pokémon information**, **create their own team**, and get a **basic analysis of team composition**. Built with [Expo](https://expo.dev/) and [React Native](https://reactnative.dev/), it's designed for simplicity and quick access to Pokémon data.

---

## Features

- Search for Pokémon by name and type
- View pokemon's basic information, such as types, abilities and stats
- Build, manage and analyse pokemon teams
- Share pokemon team with friends via deeplink and QR code.
- Scanning shared QR code to retrieve team info and add to your team list.
- Basic account authentication with email/username and password

---

## Tool used

- `expo` and related packages by `expo`
  - `expo-notification` - for notification feature (https://docs.expo.dev/versions/latest/sdk/notifications/)
  - `expo-splash-screen` - for managing splash screen (https://docs.expo.dev/versions/latest/sdk/splash-screen/)
  - `expo-linking` - for listening and parsing deeplinks (https://docs.expo.dev/versions/latest/sdk/linking/)
- `react-navigation` for app page routing (https://reactnavigation.org/)
- `react-hook-form` for handling forms (https://react-hook-form.com)
- `react-native-qrcode-svg` - for displaying QR code (https://www.npmjs.com/package/react-native-qrcode-svg)
- `react-native-safe-area-context` & `react-native-screens` - for layouting view and avoid device edges and notch (https://docs.expo.dev/versions/latest/sdk/safe-area-context/)
- `react-native-share` - for sharing feature (https://github.com/react-native-share/react-native-share)
- `react-native-vision-camera` - for scanning QR code (https://react-native-vision-camera.com)
- `react-native-view-shot` - for capturing screen and producing images (https://www.npmjs.com/package/react-native-view-shot)

---

## Installation

### Prerequisite

- Ensure you have an Apple account (not required to enrol developer program)

### 1. Install dependencies

Navigate to the root of this project, run:

```bash
npm install
```

### 2. Configure iOS project

** Please read this carefully **

Ensure that the steps in [this guide](https://reactnative.dev/docs/set-up-your-environment?os=macos&platform=ios) for developing RN app for iOS on macOS.

Run the following command to create empty `ios` folder:

```bash
npx expo prebuild --platform ios
```

You should see that an `ios` folder has been created. Open this `ios` folder in XCode. Then, click on the `poketeam` project on the left sidebar, and navigate to `Signing and Capabilities` tab on the right.

Ensure that:

- The **push notification** feature is **removed**. If not, click on the trash icon on the push notification feature to remove it from including in the app bundle
- The Team has been set to your Apple account ID - you'll need to login to your Apple account

### 3. Configure iOS device

You'll also need to plugin your iOS device to your Mac device. Within the XCode window, follow [this guide](https://developer.apple.com/documentation/xcode/enabling-developer-mode-on-a-device) to enable developer mode.

### 4. Create development build

In your terminal on Mac device, navigate to the root of this project, run:

```bash
npm run build:device
```

Wait until expo finish building the project.

For the first time the app builds, in your iOS device's settings, navigate to `VPN & device management` section. You should be able to trust the app developer from there.

---

## Scripts

| Script                 | Description                               |
| ---------------------- | ----------------------------------------- |
| `npm start`            | Start Expo development server             |
| `npm run ios`          | Run on iOS simulator                      |
| `npm run build:device` | Create/update development build on device |

---

## Folder Structure

```
.
├── assets/                  # Images, fonts, icons, etc.
├── src/
│   ├── components/          # Reusable components for app
│   ├── config/              # Theme and styling configurations
│   ├── constants/           # Static values and enums
│   ├── functions/           # Utility functions and API calls
│   └── pages/               # App screens/views (e.g., Home, Search, TeamBuilder)
├── .env                     # Environment variables
├── app.json                 # Expo configuration
├── App.jsx                  # Main app entry point
├── AppRouter.jsx            # Navigation setup with React Navigation

```

---

## Environment Variables

In .env file:

- Set `EXPO_PUBLIC_ENV=local` to enable local development mode
- Set `EXPO_PUBLIC_ENV=stage` to enable staging/production mode

---

## Reporting Issues

To report bugs or suggest features, please open an issue on the [GitHub Issues Page](https://github.com/your-username/poketeam-mobile/issues)

Provide steps to reproduce, screenshots (if applicable), and any console errors.

---

## Contributing

We welcome community contributions. To contribute:

1. Fork the repo
2. Clone your fork

```bash
git clone https://github.com/your-username/PokeAppNative.git
cd PokeAppNative
```
