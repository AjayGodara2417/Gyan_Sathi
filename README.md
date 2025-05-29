## An AI powered student platform Gyan Sathi

### Project Summary

Gyan Sathi is an innovative AI-powered educational platform designed to enhance students' academic journey through a comprehensive suite of learning tools and resources. The platform aims to bridge the gap between traditional learning methods and modern technological solutions.

#### Key Features:
- **Smart Note Management**: Download and access curated study materials and notes
- **Interactive Doubt Resolution**: Ask questions and get AI-powered answers to academic queries
- **AI-Generated Q&A**: Generate practice questions and answers to test understanding
- **Personalized Learning**: Tailored learning experience based on individual needs
- **Modern Technology Stack**: Built with Next.js for optimal performance and user experience

#### Target Audience:
- Students at various academic levels
- Self-learners seeking additional resources
- Educators looking to supplement their teaching materials

#### Mission:
To empower students with cutting-edge AI tools and resources that make learning more engaging, efficient, and effective.

``` bash
A platform for students where they can
download notes
ask doubts
generate Q&A's 
indulge in educatinal discussions
and a lot of other things to boot their academic journey
```

## Step by step Process to setup this project on your machine:
``` bash
git clone 
cd gyan_sathi
```

#### Now install all dependencies
```bash
npm i
```
#### Clerk Authentication

Open [Clerk.com](https://clerk.com/) and create an account and get the following credentials:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
```

#### Set up a cloudinary account and get the following things:

Open [cloudinary](https://cloudinary.com/) and create an account

```bash
Cloud Name
API Key
API secret
Preset Name
```

#### Set up MySql database
```bash
MYSQL_HOST=yourHost
MYSQL_USER=yourUsername
MYSQL_PASSWORD=yourPassword
MYSQL_DATABASE=databaseName (gyansathi)
```

Run the following queries on the mysql
```bash
create database gyansathi;
use gyansathi;
```

```bash
CREATE TABLE notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  tag VARCHAR(100),
  description TEXT,
  date DATE,
  file_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

```bash
CREATE TABLE channels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE
);
```

```bash
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  channel_id INT,
  author VARCHAR(100),
  question TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (channel_id) REFERENCES channels(id)
);
```

```bash
CREATE TABLE replies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT,
  author VARCHAR(100),
  text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id)
);
```

#### Open Route

Go to [OpenRouter.ai](https://openrouter.ai/) and create an acoount and get the API Key

```bash
Create an API key
```

#### Email.js

create an [Email.js](https://www.emailjs.com/) account to send and receive the contact us form details via email

```bash
Create an Emailjs Template and get the EMAILJS_TEMPLATE_ID
Get the EMAILJS_SERVICE_ID
Get the EMAILJS_PUBLIC_KEY
```

#### Set up Environment variables (take refrence from .env.example file)
```bash
Create a .env.local file
Set up all the environment variables in the .env.local file
```

#### There you go
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to be a part of
### Gyan Sathi


<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->
