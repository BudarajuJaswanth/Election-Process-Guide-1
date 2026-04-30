# ElectVoice — Official AI Election Assistant (ECI)

![ElectVoice Banner](https://img.shields.io/badge/ECI-Official%20Guide-112E51?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production--Ready-005EA2?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Gemini AI](https://img.shields.io/badge/AI-Gemini%201.5%20Flash-4285F4?style=for-the-badge&logo=google-gemini)

**ElectVoice** is a high-fidelity, production-ready AI election assistant designed for the **Election Commission of India (ECI)**. It provides factually accurate, non-partisan guidance to voters across 6 regional languages, utilizing the power of Gemini 1.5 Flash to answer complex queries about the Indian election process.

---

## 🌟 Key Features

- 🧠 **AI-Powered Intelligence**: Integrated with **Gemini 1.5 Flash** for accurate, context-aware responses to voter queries.
- 🌍 **Multilingual Support**: Fully localized in 6 languages: **English, Hindi, Tamil, Bengali, Marathi, and Telugu**.
- 🛠️ **Interactive Visualization**:
  - **3D Scene Manager**: Realistic 3D models of EVMs and Ballot Boxes for process education.
  - **Dynamic Map Integration**: Find polling booths and ECI offices instantly.
  - **Election Timeline**: Interactive 2025-26 election calendar with key milestones.
  - **Voter Checklist**: Step-by-step guidance for first-time voters and EPIC registration.
- 🏛️ **Official Branding**: Adheres to government-standard UI/UX with high-contrast, accessible design tokens.
- 🛡️ **Privacy & Security**: Built with non-partisan guardrails and secure API key management via environment variables.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **AI Engine**: Google Generative AI (Gemini 1.5 Flash)
- **3D Rendering**: Three.js, @react-three/fiber, @react-three/drei
- **Animations**: Framer Motion
- **Icons**: Lucide-React
- **Localization**: Custom Context-based I18n system

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- A Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/BudarajuJaswanth/Election-Process-Guide.git
   cd Election-Process-Guide
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory and add your API key:
   ```env
   VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

---

## 📂 Project Structure

- `src/services/ElectVoiceEngine.js`: The AI brain connecting to Gemini.
- `src/i18n/translations.js`: Master dictionary for all 6 languages.
- `src/components/chat/`: The main AI assistant interface.
- `src/components/visualization/`: Interactive map and timeline components.
- `src/components/3d/`: Three.js scene management.

---

## 📜 Disclaimer
This is a non-partisan educational tool built to assist voters in understanding the election process. All information is based on official Election Commission of India (ECI) guidelines.

---

## 🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

---

**© 2026 ElectVoice — Election Commission of India Official Guide.**
All information provided is for educational purposes.
