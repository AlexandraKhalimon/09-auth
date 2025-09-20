import css from './page.module.css'; 
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "404 - Page not found",
  description: "The page you are looking for does not exist",
  openGraph: {
    title: "404 - Page not found",
    description: "Sorry, the page you are looking for does not exist.",
    url: "https://08-zustand-notehub.vercel.app/not-found",
    images: [
      {
        url: "https://cdn.pixabay.com/photo/2024/07/20/17/12/warning-8908707_1280.png",
        width: 1200,
        height: 630,
        alt: "Error",
      },
    ],
    type: "article",
  },
};

const NotFound = () => {
    return (
        <div>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </div>
    );
};

export default NotFound;