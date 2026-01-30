FROM node:20

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source
COPY . .

# Build step
RUN npm run build

# Run app
CMD ["npm", "start"]
