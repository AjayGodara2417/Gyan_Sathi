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

```bash
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  contact VARCHAR(255),
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
```bash
CREATE TABLE ai_chats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(255),
  task VARCHAR(50),
  prompt TEXT,
  response TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Aiven Database
Create an [Aiven](https://aiven.io/) account and get the required credentials
Connect the Aiven database to MySQL Workbench with the SSL certificate
Get the following from Aiven website:
```bash
Host
Port
User
Password
SSL mode
```
After connecting, run the following table queries on the SQL Editor (MySQL Workbench) to create the tables:
```bash
-- Notes
CREATE TABLE notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  tag VARCHAR(100),
  description TEXT,
  date DATE,
  file_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Channels
CREATE TABLE channels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE
);

-- Posts (linked to channels)
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  channel_id INT,
  author VARCHAR(100),
  question TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (channel_id) REFERENCES channels(id)
);

-- Replies (linked to posts)
CREATE TABLE replies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT,
  author VARCHAR(100),
  text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id)
);

-- Products
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  contact VARCHAR(255),
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI Chats
CREATE TABLE ai_chats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(255),
  task VARCHAR(50),
  prompt TEXT,
  response TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Connect with Aiven properly with the connection string and following Credentials in your .env file:
```bash
aiven_HOST
aiven_PORT
aiven_USER
aiven_PASSWORD
aiven_NAME
aiven_SSL_CA_PATH
DATABASE_URL
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

create two templates:
1. for contact us page
2. for Q&A page

Get the templete id for both the templates
```bash
Get the EMAILJS_TEMPLATE_ID_CONTACTUS
Get the EMAILJS_TEMPLATE_ID_ASK_QUE
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