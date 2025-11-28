FROM node:20

WORKDIR /app

# Copy backend from subfolder
COPY my-medusa-store/. .

# Ensure production build environment
ENV NODE_ENV=production

# Install deps including optional (SWC); rebuild native binding
RUN npm cache clean --force \
	&& npm install --include=optional \
	&& npm rebuild @swc/core --force

# Build the application (outputs to .medusa/server)
RUN npm run build

# Install production deps in the build output
WORKDIR /app/.medusa/server
RUN npm install --omit=dev --include=optional \
	&& npm rebuild @swc/core --force

# Expose port
EXPOSE 9000

# Run migrations then start
CMD ["sh", "-c", "npx medusa db:migrate && node index.js"]
