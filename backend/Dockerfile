FROM node:18-alpine

WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY . .

# Create uploads directory structure
RUN mkdir -p uploads/hero uploads/gallery/thumbs uploads/news uploads/achievements uploads/units

# Expose port
EXPOSE 5000

# Start server
CMD ["node", "server.js"]
