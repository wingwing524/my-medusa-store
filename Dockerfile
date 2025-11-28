FROM node:20

WORKDIR /app

# Copy everything from my-medusa-store folder
COPY my-medusa-store/. .

# Install dependencies
RUN npm install

# Build the application (outputs to .medusa/server)
RUN npm run build

# Install production dependencies in the build output
WORKDIR /app/.medusa/server
RUN npm install --omit=dev

# Expose port
EXPOSE 9000

# Start command (run migrations then start)
CMD ["sh", "-c", "npx medusa db:migrate && node index.js"]
