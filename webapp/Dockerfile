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

# Install Nginx
RUN apt-get update && apt-get install -y nginx

# Remove the default Nginx configuration file
RUN rm /etc/nginx/sites-enabled/default

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/sites-available/default

# Copy the build output to Nginx's html directory
RUN cp -r build/* /var/www/html/

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

