# Abdul Haris - Personal Portfolio

Welcome to the repository of my personal portfolio website! This project is designed to stand out with a beautiful, modern, and dynamic user experience, showcasing my skills as a software engineer.

## 🚀 Features

- **Modern & Premium Design**: Built with an emphasis on rich aesthetics, modern typography, and glassmorphism.
- **Dynamic Animations**: Smooth, engaging animations and interactive elements powered by GSAP.
- **Mobile-First Responsiveness**: Flawless experience across all device sizes (desktop, tablet, and mobile).
- **SEO Optimized**: Implemented with technical SEO best practices for high visibility and structured metadata.
- **Performance Focused**: Optimized asset loading, code splitting, and caching for blazing-fast load times.

## 🛠️ Tech Stack

- **Framework**: [Angular](https://angular.dev/) (version 21.1.0)
- **Styling**: SCSS / Vanilla CSS
- **Animations**: [GSAP (GreenSock Animation Platform)](https://gsap.com/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 💻 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- Node.js (v18 or higher recommended)
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Haris7430/Haris-Portfolio.git
   cd Haris-Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200/`.

## 🔒 Environment Variables

This project uses environment variables for configuration. 

> **Important Security Note**: This is a frontend-only application. **Never** place highly sensitive secrets (like database passwords or private API keys) inside your environment files, as they will be exposed in the browser. 

Only place safe, public-facing configurations (such as public API wrappers, Analytics IDs, public Maps keys) in the environment files.

Create an `environment.ts` file in `src/environments/` for local development:
```typescript
export const environment = {
  production: false,
  // Your public configuration here
};
```

*(Ensure any `.env` files or secret configurations are added to `.gitignore` and securely managed within your hosting provider's dashboard).*

## 🏗️ Building for Production

To create a production-ready build:

```bash
ng build
```

Artifacts will be stored in the `dist/` directory, optimized for performance.

## 🧪 Testing

To run unit tests utilizing Vitest:
```bash
ng test
```

## 🌐 Contact

- **Name**: Abdul Haris
- **GitHub**: [@Haris7430](https://github.com/Haris7430)
