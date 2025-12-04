FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and repository into the image
# We install dependencies at the repository root because this project keeps deps in the root package.json
COPY package.json package-lock.json ./
COPY . .

# Install dependencies and build. The root `package.json` scripts call into `frontend/` as needed.
RUN npm ci --silent
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Copy built app from builder
COPY --from=builder /app .

EXPOSE 3000
CMD ["sh", "-c", "npm run start"]
