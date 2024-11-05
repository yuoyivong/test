# Stage 1: Build the application
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml (if using pnpm)
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies with a frozen lockfile for consistency
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN pnpm build

# Stage 2: Serve the application
FROM node:18 AS runner

# Set working directory
WORKDIR /app

# Copy only the necessary files from the build stage
# Commenting out next.config.js if it's not needed
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "node_modules/next/dist/bin/next", "start"]
