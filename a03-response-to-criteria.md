# IFN666_25se1 Assessment 03 Submission

**Student name:** Luat Tran

**Student ID:** n11423714

# Response to marking criteria

## Core: Development workflow (3 marks)

- **One line description:** App code structure and how to create development build on iOS device to support development
- **Video timestamp:** 0:35
- **Relevant files**
  - app/README.md
  - app/assets
  - app/src/components
  - app/src/config
  - app/src/constants
  - app/src/functions
  - app/src/pages
  - app/AppRouter.jsx
  - app/App.jsx
  - app/app.json
  - app/package.json

## Core: Core functionality (3 marks)

- **One line description:** App features including pokemon search, team management, authentication and simple user setting
- **Video timestamp:** 1:46
- **Relevant files**
  - Auth pages
    - app/src/pages/auth/LoginPage.jsx
    - app/src/pages/auth/RegisterPage.jsx
  - Pokemon info page
    - app/src/pages/pokemon-info/PokemonInfoPage.jsx
  - Pokemon search page
    - app/src/pages/search/PokemonSearchPage.jsx
  - Pokemon team pages
    - app/src/pages/team-info/TeamInfoPage.jsx
    - app/src/pages/team-info/TeamListPage.jsx
    - app/src/pages/team-info/TeamScanPage.jsx
    - app/src/pages/team-info/TeamSharePage.jsx

## Core: User interface design (3 marks)

- **One line description:** UI built using Mantine theme and React Native components with additional custom atomic components and React Navigation with clean nested routing and logical layout.
- **Video timestamp:** 03:26
- **Relevant files**
  - React native based UI components
    - app/src/components/shared/core/atoms
      - app/src/components/shared/core/atoms/buttons/Button.jsx
      - app/src/components/shared/core/atoms/Modal.jsx
      - app/src/components/shared/core/atoms/Drawer.jsx
  - Theme
    - app/src/components/shared/core/contexts/ThemeProvider.jsx
    - app/src/config/theme/index.js
  - Navigation stack & navigation bar
    - app/AppRouter.jsx
  - Layouts
    - app/src/pages/ScreenLayout.jsx
    - app/src/pages/auth/AuthLayout.jsx

## Core: API integration (3 marks)

- **One line description:** Fetch data from backend API for login, team evaluation, Pokémon search.
- **Video timestamp:** 04:11
- **Relevant files**
  - app/src/components/auth/context/AuthContext.jsx
  - app/src/components/auth/login/LoginForm.jsx
  - app/src/components/auth/register/RegisterForm.jsx
  - app/src/components/auth/reset-password/ResetPasswordForm.jsx
  - app/src/components/user/LogoutButton.jsx
  - app/src/pages/pokemon-info/PokemonInfoPage.jsx
  - app/src/components/search/PokemonSearchResults.jsx
  - app/src/components/search/SearchTypeBar.jsx
  - app/src/components/search/SearchBar.jsx
  - app/src/pages/team-info/TeamInfoPage.jsx
  - app/src/components/team-info/AddTeamForm.jsx
  - app/src/components/team-info/TeamListItem.jsx

## Additional: Device notifications (3 marks)

- **One line description:** Send in-app notification when user add pokemon to team, create new team and alert user if the current session is expiring soon
- **Video timestamp:** 04:47
- **Relevant files**
  - app/src/functions/notification.js
  - app/src/components/auth/login/LoginForm.jsx
  - app/src/components/pokemon-info/PokemonTeamDisplay.jsx
  - app/src/components/team-info/AddTeamForm.jsx

## Additional: Linking (3 marks)

- **One line description:** Deeplinks navigate users to specific screens within the app and can also display shared team details when accessed.
- **Video timestamp:** 05:22
- **Relevant files**
  - app/app.json
  - app/AppRouter.jsx
  - app/src/pages/team-info/TeamSharePage.jsx

## Additional: Gestures (3 marks)

- **One line description:**
- **Video timestamp:**
- **Relevant files**
  - path/to/file
  - path/to/file

## Additional: Camera (3 marks)

- **One line description:** Scanning a friend's shared Pokémon team QR code will import their team directly into your app.
- **Video timestamp:** 05:53
- **Relevant files**
  - app/app.json
  - app/src/pages/team-info/TeamScanPage.jsx

## Additional: Share (3 marks)

- **One line description:** Share your pokemon team by sending app's deeplink or QR code with team's info
- **Video timestamp:** 2:43
- **Relevant files**
  - app/app.json
  - app/src/components/team-info/TeamInfo.jsx

## Additional: Sensors (3 marks)

- **One line description:**
- **Video timestamp:**
- **Relevant files**
  - path/to/file
  - path/to/file

## Additional: Status bar (3 marks)

- **One line description:**
- **Video timestamp:**
- **Relevant files**
  - path/to/file
  - path/to/file

## Additional: Location services (3 marks)

- **One line description:**
- **Video timestamp:**
- **Relevant files**
  - path/to/file
  - path/to/file

## Additional: Safe areas (3 marks)

- **One line description:**
- **Video timestamp:**
- **Relevant files**
  - path/to/file
  - path/to/file

## Additional: Upon request (3 marks)

- **One line description:**
- **Video timestamp:**
- **Relevant files**
  - path/to/file
  - path/to/file
