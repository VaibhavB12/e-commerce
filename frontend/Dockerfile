# Use the official Node.js base image
FROM node:22-alpine3.19

# Set the working directory
WORKDIR /app/frontend

# Copy package.json and install dependencies
COPY package*.json ./

# Update npm to the latest version
RUN npm install -g npm@10.9.0

# Install project dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose the port the frontend runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
