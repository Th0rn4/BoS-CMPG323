# Use the official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /submissions

# Copy package.json and package-lock.json and install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy all the files from the current directory
COPY . .

# Expose the port (adjust based on your service's port)
EXPOSE 3004

# Start the Submission service
CMD ["node", "server.js"]
