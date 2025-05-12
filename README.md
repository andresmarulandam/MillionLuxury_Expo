# MillionLuxury_EXPO

MillionLuxury_EXPO is a modern and sophisticated React Native application built with Expo. It provides a clean and elegant interface for exploring cryptocurrency data, including prices, percentage changes, and detailed information.

## Features

- **Cryptocurrency List**: View a list of cryptocurrencies with their prices and percentage changes.
- **Detailed Views**: Navigate to detailed views for individual cryptocurrencies.
- **Theming**: Supports light and dark themes with a modern design.
- **Responsive Design**: Optimized for Android, iOS, and web platforms.
- **API Integration**: Fetches real-time cryptocurrency data using `axios`.

## Tech Stack

- **Frontend**: React Native, Expo
- **Navigation**: React Navigation
- **Styling**: Custom theming with light and dark modes
- **Testing**: Vitest
- **Utilities**: Axios for API requests

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/andresmarulandam/MillionLuxury_Expo.git

   ```

2. Install dependencies:
   npm install

3. Start the development server:
   npm start

4. Run on a specific platform:
   Android: npm run android
   iOS: npm run ios

## Scripts

npm start: Start the Expo development server.
npm run android: Run the app on an Android emulator or device.
npm run ios: Run the app on an iOS simulator or device.
npm run web: Run the app in a web browser.
npm test: Run tests using Vitest.

## Project structure

MillionLuxury*EXPO/
├── src/
│ ├── components/ # Reusable UI components
│ ├── navigation/ # Navigation setup
│ ├── screens/ # App screens
│ ├── theme/ # Theming and styles
│ ├── utils/ # Utility functions
│ └── models/ # TypeScript models
| └── services/
├── [package.json](http://\_vscodecontentref*/1) # Project dependencies and scripts
├── [README.md](http://_vscodecontentref_/2) # Project documentation
└── ...

## Theming

The app supports light and dark themes. Colors and typography are defined in the src/theme directory. Key colors include:

- Primary Colors: blue, purple, neonBlue
- Success and Error Colors: success, error
- Backgrounds: cardBackground, iconBackground

## Testing

The project uses Vitest for testing. To run tests, use:
npm test

## Contributing

Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch: git checkout -b feature-name.
Commit your changes: git commit -m 'Add feature'.
Push to the branch: git push origin feature-name.
Open a pull request.
