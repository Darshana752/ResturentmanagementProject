# -------------------------------
# Stage 1: Build the React app
# -------------------------------
FROM node:22.16.0 AS build

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json (for dependency installation)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files (your React source code)
COPY . .

# Build production-ready files
RUN npm run build


# -------------------------------
# Stage 2: Serve app with NGINX
# -------------------------------
FROM nginx:alpine

# Copy build output from the previous stage to NGINX's web folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 3000 (React default) — optional, you can also use 80
EXPOSE 3000

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
