# Use the official Node.js image as the base image
FROM node:14

# Create and set the working directory
WORKDIR /

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on, yes
EXPOSE 3000

# Define the command to run the application
CMD ["node", "server.js"]