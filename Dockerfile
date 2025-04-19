FROM node:16
# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies and Angular CLI globally
RUN npm install --legacy-peer-deps && npm install -g @angular/cli@12.2.11

# Copy the application files
COPY . .

# Expose the port
EXPOSE 4200

# Start the application
CMD ["ng", "serve", "--host", "0.0.0.0"]