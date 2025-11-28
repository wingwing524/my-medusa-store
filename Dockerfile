FROM node:20-alpine

WORKDIR /app

# Copy everything from my-medusa-store folder
COPY my-medusa-store/. .

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Expose port
EXPOSE 9000

# Start command
CMD ["npm", "start"]
