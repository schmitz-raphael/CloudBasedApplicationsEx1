# Stage 1: Build Stage
FROM node:16-alpine AS build

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Stage 2: Production Stage
FROM node:16-alpine

# Set working directory in container
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app .

# Expose the application port
EXPOSE 8000

# Command to run the application
CMD ["node", "app.js"]
