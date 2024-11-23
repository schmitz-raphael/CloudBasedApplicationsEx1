# Stage 1: Build
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY src/package*.json ./

# Install dependencies
RUN npm install

# Copy the entire source code
COPY . .

# Stage 2: Run
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app .

# Set the working directory for the app source
WORKDIR /app/src

# Expose the port used by the application
EXPOSE 8000

# Start the application
CMD ["node", "app.js"]
