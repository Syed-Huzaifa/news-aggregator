# News Aggregator App

## 📰 Overview
The **News Aggregator App** is a modern and responsive web application built with **React.js, Vite, TailwindCSS, and Shadcn/ui**. It aggregates the latest news from multiple sources using three public news APIs:

- [The World News API](https://theworldnewsapi.com/)
- [The New York Times API](https://developer.nytimes.com/)
- [The Guardian API](https://open-platform.theguardian.com/)

This application is built using **TypeScript** to ensure type safety and better development experience.

## 🚀 Features
- Fetches and displays the latest news from multiple sources.
- Responsive design using TailwindCSS for seamless experience across devices.
- Beautiful UI with **Shadcn/ui** components.
- Fast performance powered by **Vite**.
- Type safety with **TypeScript**.
- Category-based news filtering.
- Search functionality to find relevant news articles.
- Light and dark mode support.

## 🛠️ Tech Stack
- **Frontend**: React.js, Vite, TypeScript
- **Styling**: TailwindCSS, Shadcn/ui
- **APIs Used**: The World News API, The New York Times API, The Guardian API

## 📦 Installation
To run the project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/Syed-Huzaifa/news-aggregator.git
   cd news-aggregator
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up API keys:
   - Create a `.env` file in the root directory.
   - Add your API keys:
     ```sh
      VITE_REACT_APP_WORLD_NEWS_API_KEY=c4b31cc60b5e4f4f9c35f79e6acf9552
      VITE_REACT_APP_WORLD_NEWS_API_URL=https://api.worldnewsapi.com/search-news
      VITE_REACT_APP_NYT_API_KEY=A7flvMI15G2zdOeLMrHGbA0NcO5WEzfN
      VITE_REACT_APP_NYT_API_URL=https://api.nytimes.com/svc/search/v2/articlesearch.json
      VITE_REACT_APP_THE_GUARDIAN_API_KEY=365c05a5-3d9d-497c-bfd3-e7a9d9a9465c
      VITE_REACT_APP_THE_GUARDIAN_API_URL=https://content.guardianapis.com/search
     ```

4. Start the development server:
   ```sh
   npm run dev
   ```

5. Open your browser and visit:
   ```sh
   http://localhost:3000
   ```

## 🐳 Docker Setup
A `Dockerfile` is included for easy containerized deployment.

1. Build the Docker image:
   ```sh
   docker build -t news-aggregator .
   ```

2. Run the Docker container:
   ```sh
   docker run -p 3000:3000 news-aggregator
   ```

## 🎨 UI Components
The app utilizes **Shadcn/ui** for beautiful and customizable UI components, including:
- Search bar
- News cards
- Buttons and loading states

## 📌 Future Enhancements
- Personalized news feed.
- Additional news sources and categories.
- Improved search and filtering options.

## 📝 License
This project is open-source and available under the **MIT License**.

## 📬 Contact
For any questions or suggestions, reach out via:
- Email: shahhuzaifa338@gmail.com
