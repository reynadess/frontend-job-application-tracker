# Use an official Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and lock files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Expose the port Vite uses
EXPOSE 5173

# Set env variable so it's available inside the container
ENV VITE_BASE_URL="http://localhost:3000/api"

# Start Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]
