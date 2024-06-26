# E-Esport Blogging API

Welcome to the E-Esport Blogging API, a dynamic platform dedicated to Esports enthusiasts, featuring content on League of Legends, Valorant, and Rocket League. Built with Node.js, Next.js, React.js, Tailwind CSS, Supabase, and Vercel, our API offers a rich user experience and a robust backend.

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en)
- [Git](https://git-scm.com/downloads)

### Installation

1. Clone the Repository
   ```bash
   git clone https://github.com/pperennezzelus/ece-webtech-2023-fall-gr03-02.git
   ```
2. Navigate to the Project Directory
   ```bash
   cd ece-webtech-2023-fall-gr03-02
   ```
3. Navigate to the App folder

   ```bash
   cd .\app\
   ```

4. Install Dependencies
   ```bash
   npm install
   ```

### Usage

The project has been initialized using bash `npx create-next-app@latest` and has the primary application in the app folder.

1. Navigate to the App folder

   ```bash
   cd .\app\
   ```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

**To learn more about Next.js, take a look at the following resources:**

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

**Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces:**

- [Tailwind CSS Official Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Installation Guide](https://tailwindcss.com/docs/installation)
- [Tailwind CSS Configuration](https://tailwindcss.com/docs/configuration)

**Supabase is an open-source Firebase alternative, providing a suite of tools for building scalable and powerful web applications:**

- [Supabase Official Documentation](https://supabase.io/docs)
- [Supabase Auth Documentation](https://supabase.io/docs/guides/auth)
- [Supabase Database Documentation](https://supabase.io/docs/guides/database)

**Quill is a modern WYSIWYG editor built for compatibility and extensibility:**

- [Quill Official Documentation](https://quilljs.com/docs/quickstart/)
- [Quill API Reference](https://quilljs.com/docs/api/)
- [Quill Customization Guide](https://quilljs.com/guides/customizing-quill/)

## Deploy on Vercel

- [Vercel Official Website](https://vercel.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [Deploying a Next.js App on Vercel](https://vercel.com/guides/deploying-nextjs-with-vercel)
- [Vercel for GitHub](https://vercel.com/github)

Vercel provides an excellent platform for deploying modern web applications with ease and efficiency. It's highly recommended for projects requiring high performance and scalability.

## Deliverables

- Vercel URL: https://ece-webtech-2023-fall-gr03-02.vercel.app/
- Supabase project URL: https://supabase.com/dashboard/project/epyotpxdlffdoysfwnbd

## Authors

- Hugo BENEDIT, Group 3 SI Inter
- Paul PERENNEZ-ZELUS, Group 3 SI Inter
- Sebastien TRAN, Group 3 SI Inter

## Evaluation

### Mandatory Tasks

- **Naming convention**
  - Grade: 2/2
  - Comments: We adhere to community conventions and best practices, ensuring consistency across our codebase.
  - Task feedback:
- **Project structure**

  - Grade: 2/2
  - Comments: Our project follows a Page Router structure which is simple yet comprehensive, following the imposed guidelines for easy navigation and maintenance.
  - Task feedback: page router is easier for navigation and maintenance than app router

- **Git usage**

  - Grade: 2/2
  - Comments: We utilize GitHub for version control, following Conventional Commits (feat, fix, bump, docs...) with meaningful commit messages for clarity and consistency.
  - Task feedback: it wasn't important to us at the beginning but now we understand how important it is to use conventional commits in larger scale project

- **Code quality**

  - Grade: 4/4
  - Comments: Our code is formatted using the Prettier plugin in Visual Studio Code, adhering to Next.js and Supabase documentation standards for high-quality code.
  - Task feedback: easy with the prettier plugin on VSC

- **Design, UX, and content**

  - Grade: 4/4
  - Comments: The design is minimalist, user-friendly, and responsive on all screens. We've utilized Tailwind CSS and component libraries for an aesthetically pleasing interface.
  - Task feedback:

- **Home page**
  - Grade: 2/2
  - Comments: [Home Page](https://ece-webtech-2023-fall-gr03-02.vercel.app/) displays featured articles with a friendly and informative layout.
  - Task feedback:
- **Navigation**
  - Grade: 2/2
  - Comments: A consistent navigation bar is present on all pages, providing easy access to different sections of the application. We made the choice to implement a navigation bar on the left instead of a classical header. To make it look like Discord.
  - Task feedback:
- **Login and profile page**
  - Grade: 4/4
  - Comments: [Login Page](https://ece-webtech-2023-fall-gr03-02.vercel.app/login) Implements using OAuth2 with Supabase, using Github provider allowing users to sign in and view their profiles and edit them.
  - Task feedback: hard to implement at the beginning but now we realize how effortless it is compared to other way to login on a page with email and password old-school.
- **Post creation and display**
  - Grade: 4,5/6
  - Comments: Users can create and view posts at [Articles Page](https://ece-webtech-2023-fall-gr03-02.vercel.app/articles), with pagination and sorting features
  - Task feedback:
- **Comment creation and display**
  - Grade: 4/4
  - Comments: Each article page includes a section for users to leave comments, and reply comments inspired by GitHub issue commenting.
  - Task feedback:
- **Post modification and removal**
  - Grade: 4/4
  - Comments: Authors can edit or delete their posts, with controls visible only to them
  - Task feedback:
- **Search**
  - Grade: 6/6
  - Comments: A search bar is available on all pages, performing server-side searches using Supabase's Full Text Search capabilities
  - Task feedback:
- **Use an external API**
  - Grade: 2/2
  - Comments: We've integrated the [Pokemon API](https://ece-webtech-2023-fall-gr03-02.vercel.app/pokeapi) to display random Pokemon data (name and image).
  - Task feedback: Easy and funny to implement
- **Resource access control**
  - Grade: 2/6
  - Comments: Utilizing RLS policies in Supabase for secure data access and control.
  - Task feedback:
- **Account settings**
  - Grade: 3,5/4
  - Comments: Users can edit their profiles on [Profile Page](https://ece-webtech-2023-fall-gr03-02.vercel.app/profile), including personal settings like name, age, job, biography, hobbies
  - Task feedback: Meduim task to implement due to the interactionb with Supabase
- **WYSIWYG integration**
  - Grade: 2/2
  - Comments: On [Create Article Page](https://ece-webtech-2023-fall-gr03-02.vercel.app/create-article)we use Quill for rich text editing in post creation and editing
  - Task feedback: Implemented easily
- **Gravatar integration**
  - Grade: 1.5/2
  - Comments: Gravatar icons are displayed on [Profile Page](https://ece-webtech-2023-fall-gr03-02.vercel.app/profile), by linking a picture with his mail address
  - Task feedback: Easy to implement but display gravatar next to the comment is a bit more difficult
- **Light/dark mode**
  - Grade: 2/2
  - Comments: sers can toggle between light and dark themes, with their preference persisted across sessions
  - Task feedback: easy to implement but very repetitive

### Bonus Tasks

- **Nested Comment**
  - Grade: 2
  - Comments: Our platform supports nested comments for enhanced user interaction.

## Miscellaneous

### Course Feedback

We really like this new course for us, it was very challenging and entertaining with the labs and the final project

### Project Reuse

- [x] We authorize the professors to use our project as an example for the next year students (facultative).
