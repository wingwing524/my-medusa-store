FROM node:20

WORKDIR /app

# Copy backend source
COPY . .

# Install dependencies
RUN npm install

# Build the application (outputs to .medusa/server)
RUN npm run build

# Install production dependencies in the build output dir
WORKDIR /app/.medusa/server
RUN npm install --omit=dev

EXPOSE 9000

# Run migrations then start the server
CMD ["sh", "-c", "npx medusa db:migrate && node index.js"]
