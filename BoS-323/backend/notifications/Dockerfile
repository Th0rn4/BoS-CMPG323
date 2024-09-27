# Use the official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /notifications

# Copy package.json and install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm start

# Copy all the files from the current directory
COPY . .

# Expose the port (adjust based on your service's port)
EXPOSE 3003

# Start the Assignment service
CMD ["npm", "start"]
