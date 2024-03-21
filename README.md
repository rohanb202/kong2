<div align="center">
  <h1>Kong</h1>
</div>

<p align="center">
  <img src="https://i.postimg.cc/PJ8JH4KQ/OIG1-1.jpg" alt="Kong: The AI Community" width="400">
</p>


## Introduction
Kong is a platform that serves as a language model hub (LLM). With the tagline "Building the Future," Kong aims to connect AI enthusiasts and professionals worldwide. Explore a wide array of LLMs, contribute your models, and engage with the AI community in Kong.

---

## Routes

| Route                   | Description                                     |
|-------------------------|-------------------------------------------------|
| **/**                   | Explore the page showcasing the most loved models. |
| **/models**             | Displays various available models.             |
| **/[user]**             | Displays user information.                     |
| **/[user]/[modelID]**   | Shows details of a particular model.           |
| **/login**              | Login page.                                     |
| **/register**           | Sign up page.                                   |
| **/models/new**         | Allows logged-in users to post new models.     |



---

## Tech Stack

- **Next.js**: Utilized for efficient and scalable web development.
- **Tailwind CSS**: Used for responsive and sleek UI design.
- **MongoDB**: Chosen for its flexibility and scalability in handling data storage.
- **shadcn, gsap, aos**: UI component and animation libraries enhancing user experience.
- **next-seo**: Implemented to enhance the application's SEO capabilities.
- **react-hook-form**: Used for efficient form handling.
- **react-markdown, rehype-raw, remark-gfm, markdown-yaml-metadata-parser**: Rendering markdown descriptions for models.
- **Recoil**: Employed for efficient state management within the application.

---
## Page Load Time Measurement

To evaluate the application's performance, I relied on industry-standard metrics provided by Google Lighthouse. Google Lighthouse offers a comprehensive set of metrics that align with today's web standards, including key indicators such as Largest Contentful Paint (LCP), First Contentful Paint (FCP), and Cumulative Layout Shift (CLS). These metrics offer valuable insights into page loading and user experience.

In addition to Google Lighthouse, I utilized Performance Insights in the browser's Developer Tools to measure page load time directly. Performance Insights provides detailed reports on page load times, allowing for precise measurement and analysis of performance metrics. By leveraging both Google Lighthouse and Performance Insights, I obtained a comprehensive understanding of the application's performance and identified opportunities for optimization.

--- 
## Optimization

### SEO Enhancement
- Utilized `next-seo` to enhance the SEO of the entire application.
- Implemented custom metadata for different routes to optimize search engine visibility and ranking.

### Server-Side Rendering (SSR)
- Leveraged SSR to render a particular model description. This approach greatly benefits SEO as search engines can crawl and index the content more efficiently.

### Dynamic Import with Next Bundle Analyzer
- Employed `next/dynamic` import to speed up the site. This optimizes the loading time by dynamically importing components only when needed, reducing initial page load time.
- Used Next Bundle Analyzer to analyze and add dynamic imports wherever necessary, decreasing the first load size. \
  Before: 

  ![Optimization](https://i.postimg.cc/BZz27Bf0/optmiz2.png)

  After: 

  ![Optimization with Next Bundle Analyzer](https://i.postimg.cc/GmppYZ9J/Screenshot-2024-03-20-201526.png)

### Image Optimization
- Integrated `next/image` component to optimize image presentation.
- It automatically serves correctly sized images for each device, using modern image formats like WebP and AVIF.



---

## Features
### Model Browsing
- Users can explore various models uploaded by organizations and other users.

### Model Categorization and Filtering
- Users can categorize models based on parameters like tasks, libraries used, datasets, and languages.
- Models can be filtered based on their names for easy access.

### Model Sorting
- Users can sort models based on criteria such as most likes, downloads, and trending, facilitating the efficient discovery of popular models.

### Responsive Design
- The entire site is fully responsive, ensuring seamless user experience across different devices and screen sizes.

### Model Posting
- Users can post their models, leveraging markdown rendering libraries like `react-markdown`, `rehype-raw`, `remark-gfm`, and `markdown-yaml-metadata-parser` for beautiful and informative descriptions.
- HTML can be used within markdown descriptions for enhanced formatting, including code snippets, images, and tables.
- Users who create a model repository can edit its description, allowing them to update and refine information about their models as needed.

### Model Interactions
- Users can engage with models by downloading, liking, and loving them, contributing to model rankings and visibility.

### Debounced Search
- Every search performed on the platform is debounced, ensuring that the search functionality responds efficiently and optimally, providing users with a smooth search experience.

### Scroll-Based Animations
- Utilized GSAP and AOS for scroll-based animations on the explore page (home page), captivating users with engaging visuals and enhancing user experience.
  
### Dark Theme Switch
- Utilized `next-theme` to add a dark theme switch to the whole application, allowing users to switch between light and dark themes for improved readability and reduced eye strain.


---

## Page Metrics (Google Lighthouse used in Incognito Browser Mode on Chrome and Performance Insights )

### Home Page (0.6s)
![Home Page](https://i.postimg.cc/bvvsr6FG/home.png)

### Models Page (0.7s)
![Models Page](https://i.postimg.cc/ThMqV8WY/models-page.png)

### Random Model Description Page 1 (0.88s)
![Model Description Part 1](https://i.postimg.cc/3N10RdHh/rm1.png)

### Random Model Description Page 2 (1.1s)
![Model Description Part 2](https://i.postimg.cc/ZYQ9592T/rm2.png)

### User Page (1.2s)
![Model Description Part 2](https://i.postimg.cc/QxtBnDxh/user.png)

### Login Page (0.7s)
![Login Page](https://i.postimg.cc/SxnbNR0p/login.png)

### Register Page (0.6s)
![Register Page](https://i.postimg.cc/9FWqS369/register.png)

---
