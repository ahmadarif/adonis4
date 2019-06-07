FROM node:8-alpine

# Create app directory
WORKDIR /app

# Copy all files
COPY . /app/

# Install dependency
RUN npm install

CMD ["npm", "run", "docker-start"]
