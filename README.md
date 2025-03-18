 # Capstone Project: E-Commerce Application CI/CD Pipeline

## 📌 Project Overview
This project focuses on automating the CI/CD pipeline for an **E-Commerce Platform**. The platform consists of two primary components:

- **E-Commerce API**: A backend service built with Node.js and Express that handles product listings, user accounts, and order processing.
- **E-Commerce Frontend**: A web application built with React for users to browse products, manage accounts, and place orders.

The goal is to implement **Continuous Integration (CI)** and **Continuous Deployment (CD)** using **GitHub Actions** and deploy to **AWS** using **Docker containers**.


## 🛠️ Prerequisites
Before I began, I ensured I had the following installed:

- [Node.js (LTS)](https://nodejs.org/)
- [npm (Node Package Manager)](https://www.npmjs.com/)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- An **AWS Account** for deployment
- A **GitHub Repository**


## 🚀 Project Tasks:

### Task 1️⃣: Project Setup

#### **Create a new GitHub repository named `ecommerce-platform`**

**Create a git repository.**

![](./images/01.%20git%20reppo.png)

#### **Clone the Repository**

```sh
git clone https://github.com/DevOyinda/ecommerce-platform.git
cd ecommerce-platform
```
![](./images/02.%20clone%20repo.png)

#### **Craete two directories `api` for the backend and `webapp` for the frontend**
![](./images/03.%20api-backend%20&%20webbapp-frontend%20directory.png)


### Task 2️⃣: Initialize GitHub Actions
```sh
mkdir -p .github/workflows
```
**Make a Github/workflow Directory**
![](./images/04.%20Initialize%20.github-workflows.png)


### Task 3️⃣: Backend API Setup
In the api directory set up a node.js/Express application.
```sh
cd api
npm init -y
npm install express jest supertest dotenv cors
```
**Navigate into directory & Install express dependencies.**

express: to spin up our server.

jest: a javascript library to run our test.

supertest: to initiate our http request during server test

#### **Create an `index.js` file inside `api`:**
![](./images/07.%20content%20of%20index.jsfile.png)


#### **Run the backend server:**
```sh
node index.js
npm test
```
![](./images/08.%20start%20server.png)

![](./images/09.%20tests%20server.png)

###  Task 4️⃣: Frontend Web Application Setup

#### **Create React Application**

```sh
cd ..
npx create-react-app webapp
cd webapp
npm start
```
#### **Install Dependencies**
```bash
npm install axios react-router-dom
```

#### **Modify `src/components/Home.js` to fetch from the backend:**

```javascript
import React, { useEffect, useState } from 'react';

function Home() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:5000/') // API call to the backend
      .then((response) => response.text()) // Convert response to text
      .then((data) => setMessage(data)) // Update state with response data
      .catch((error) => {
        console.error('Error fetching data:', error);
        setMessage('Error fetching data');
      });
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <p>Backend Response: {message}</p>
    </div>
  );
}

export default Home;

```

### Task 5️⃣: Continuous Integration Workflow (GitHub Actions)

#### **Create a CI Workflow for Backend (`.github/workflows/backend-ci-workflow.yml`)**
![](./images/16.%20backend-ci.yml%20file.png)

#### **Create a CI Workflow for Frontend (`.github/workflows/frontend-ci-workflow.yml`)**

![](./images/17.%20frontend-ci.yml.png)

### Task 6️⃣: Docker Integration
#### **Create Dockerfile for Backend (`api/Dockerfile`)**

```dockerfile
# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["npm", "start"]

```

#### **Create Dockerfile for Frontend (`webapp/Dockerfile`)**

```dockerfile
# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["npm", "start"]

```

### Task7️⃣: Deploying to AWS & Continuous Deployment
#### **Configure Deployment in GitHub Actions (`.github/workflows/deploy.yml`)**
#### **Set up Auto-Deployment on AWS EC2**
- In this task, we manually deploy the Docker images to an AWS EC2 instance by building and pushing the images to Docker Hub, then SSHing into the EC2 instance to pull and run the containers with the necessary environment variables.
  
```yaml
name: CI Pipeline

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest

    steps:
      # Step 1: Checkout code
      - name: Checkout code
        uses: actions/checkout@v4

      # Step 2: Set up Node.js
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      # Step 3: Install dependencies
      - name: Install dependencies
        run: |
          cd api
          npm install

      # Step 4: Run tests
      - name: Run tests
        run: |
          cd api
          chmod +x ./node_modules/.bin/jest
          npm test

      # Step 5: Set up Docker Buildx
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Cache Docker layers for frontend
        uses: actions/cache@v3
        with:
          path: ~/.npm
          key: ${{ runner.os }}-docker-frontend-${{ hashFiles('**/webapp/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-docker-frontend-

      - name: Cache Docker layers for backend
        uses: actions/cache@v3
        with:
          path: ~/.npm
          key: ${{ runner.os }}-docker-backend-${{ hashFiles('**/api/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-docker-backend-

      # Step 6: Log in to Docker Hub
      - name: Log in to Docker Hub    
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_PASSWORD }}
        

      # Step 7: Build and push frontend Docker image
      - name: Build and push frontend Docker image
        run: |
          docker build --no-cache -t ${{ secrets.DOCKERHUB_USERNAME }}/ecommerce-frontend:${{ github.sha }} -f webapp/Dockerfile ./webapp
          docker push ${{ secrets.DOCKERHUB_USERNAME }}/ecommerce-frontend:${{ github.sha }}

      # Step 8: Build and push backend Docker image
      - name: Build and push backend Docker image
        run: |
          docker build --no-cache -t ${{ secrets.DOCKERHUB_USERNAME }}/ecommerce-backend:${{ github.sha }} -f api/Dockerfile ./api
          docker push ${{ secrets.DOCKERHUB_USERNAME }}/ecommerce-backend:${{ github.sha }}


      # Step 9: Deploy to AWS & Install Docker on EC2 if not installed
      - name: Install Docker on EC2 if not installed
        uses: appleboy/ssh-action@v0.1.10
        with:
          host: ${{ secrets.EC2_PUBLIC_IP }}
          username: ubuntu  # Modify based on your EC2 user (e.g., ubuntu or ec2-user)
          key: ${{ secrets.EC2_SSH_PRIVATE_KEY }}
          script: |
            if ! command -v docker &> /dev/null; then
              echo "Docker not found, installing..."
              sudo apt update
              sudo apt install -y docker.io
              sudo usermod -aG docker ubuntu  # Allow non-root Docker access
            fi

      # Step 10: Log in to Docker Hub
      # - name: Log in to Docker Hub
      # run: |
      #   echo "${{ secrets.DOCKERHUB_PASSWORD }}" | docker login -u "${{ secrets.DOCKERHUB_USERNAME }}" --password-stdin


      # Step 11: Deploy to AWS EC2 (pull images and run containers)
      - name: Deploy to AWS EC2
        uses: appleboy/ssh-action@v0.1.10
        with:
          host: ${{ secrets.EC2_PUBLIC_IP }}
          username: ubuntu  # Modify based on your EC2 user (e.g., ubuntu or ec2-user)
          key: ${{ secrets.EC2_SSH_PRIVATE_KEY }}
          script: |
            # Pull the latest Docker images for frontend and backend
            docker pull ${{ secrets.DOCKERHUB_USERNAME }}/ecommerce-frontend:${{ github.sha }}
            docker pull ${{ secrets.DOCKERHUB_USERNAME }}/ecommerce-backend:${{ github.sha }}

            # Stop and remove the previous containers if they exist
            docker ps -q --filter "name=ecommerce-frontend" | grep -q . && docker stop ecommerce-frontend && docker rm ecommerce-frontend
            docker ps -q --filter "name=ecommerce-backend" | grep -q . && docker stop ecommerce-backend && docker rm ecommerce-backend

            # Run the new frontend and backend containers
            docker run -d --name ecommerce-frontend -p 80:80 ${{ secrets.DOCKERHUB_USERNAME }}/ecommerce-frontend:${{ github.sha }}
            docker run -d --name ecommerce-backend -p 5000:5000 ${{ secrets.DOCKERHUB_USERNAME }}/ecommerce-backend:${{ github.sha }}

```

### Task 9️⃣:**Performance and security**

- Implement caching in your workflows to optimize build times
- Ensure all sensitive data including API Keys and database credentials are secured using Github Secrets.

![](./images/20.%20create%20secret&variables.png)


 Version Control with Git 

- **Stage Your Changes:** Once all files are created, stage, commit and push changes to github.
- Check github actions to see if deployment is successful are successful.

![](./images/21.%20Deployment%20successful.png)

## CONCLUSION

This capstone project successfully implemented a CI/CD pipeline for an E-Commerce Application, ensuring automated testing, containerization, and deployment to AWS EC2 using GitHub Actions and Docker. By leveraging Node.js, React, Docker, and AWS, the project achieved seamless integration between the backend and frontend, ensuring a scalable and efficient deployment process.

Key Achievements:

✅ Automated Continuous Integration (CI) with GitHub Actions to test code before deployment.

✅ Built Dockerized environments for both frontend and backend, improving portability.

✅ Integrated Continuous Deployment (CD) to automatically push updates to AWS EC2.

✅ Ensured security best practices by storing secrets and credentials securely in GitHub Secrets.

✅ Optimized performance and deployment speed using caching strategies.

This project demonstrates real-world DevOps practices, improving efficiency and reliability in deploying web applications. Future improvements could include Kubernetes orchestration, monitoring with Prometheus & Grafana, and scaling with AWS ECS or EKS.

🔹 This project showcases the power of DevOps automation in modern cloud-based applications! 