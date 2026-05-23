<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white" alt="Capacitor" />
</div>

<h1 align="center">Mosaic 🌌</h1>

<p align="center">
  <strong>The Ultimate All-in-One Entertainment Tracker</strong>
</p>

Mosaic is a sleek, unified platform built to track all your favorite entertainment media. Whether you want to log the movies you've watched, the books you're reading, the anime you plan to watch, or the albums you love—Mosaic keeps it all organized in a stunning, highly responsive interface.

---

## ✨ Key Features

- **🎬 Unified Entertainment Tracking**: Organize Movies, Anime, K-Dramas, TV Series, Books, and Music all in one place.
- **📚 Interactive Watchlists**: Set items to *Watching*, *Completed*, *Plan to Watch*, or *Dropped* and view them cleanly in your personalized Dashboard Tracker.
- **⭐ Gamified Review System**: Write reviews, rate media with a 5-star interactive component, Like/Dislike community reviews, and earn "Rewards Points" to unlock custom avatars and themes.
- **🔍 Deep Global Search Engine**: Instantly search across all categories simultaneously. The search engine is enriched with creator metadata, allowing you to search directly for your favorite Director, Author, Animation Studio, or Music Artist.
- **📱 Native Mobile App**: Wrapped with Capacitor, Mosaic functions not just as a PWA, but as a fully native Android APK package.
- **⚡ Blazing Fast (No Backend Required)**: Fully Client-Side Architecture. All user accounts, waitlists, and reward points are securely stored in Local Device Storage—meaning zero server costs, infinite scaling, and absolute privacy.

## 🛠️ Tech Stack

- **Framework**: React.js 18
- **Bundler**: Vite
- **Styling**: Vanilla CSS (Glassmorphism & Custom Animations)
- **State Management**: React Hooks & LocalStorage Persistence
- **Mobile Container**: Capacitor.js

## 🚀 Getting Started

To run this project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ansika-Singh/Mosaic.git
   cd Mosaic
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for Production:**
   ```bash
   npm run build
   ```

## 📱 Compiling the Android App

To convert the web application into a Native Android `.apk`:

1. Ensure you have **Android Studio** and the **Java Development Kit (JDK)** installed.
2. Build your web assets:
   ```bash
   npm run build
   ```
3. Sync the web assets to the native Android project:
   ```bash
   npx cap sync android
   ```
4. Build the APK using Gradle:
   ```bash
   cd android
   ./gradlew assembleDebug
   ```

## 🌐 Deploying to the Web

The easiest way to deploy Mosaic to the web is by using **Vercel**:
1. Sign up for a free account at [Vercel](https://vercel.com).
2. Connect your GitHub account.
3. Import the `Mosaic` repository. Vercel will automatically detect Vite and handle the build process completely for free!

---
*Built as a modern, unified solution for tracking entertainment.*
