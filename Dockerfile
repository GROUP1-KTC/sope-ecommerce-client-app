

ARG NODE_VERSION=23.11.0
ARG PNPM_VERSION=10.8.0
ARG NEXT_PUBLIC_SOCKET_BASE_URL
ARG NEXT_PUBLIC_LIVEKIT_WS_URL
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_VERIFY_IMAGE_URL
ARG NEXT_PUBLIC_ELASTIC_SEARCH

FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app
COPY . . 

# Install pnpm.
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}


# Create a stage for installing production dependecies.
FROM base as deps


RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --prod --frozen-lockfile

# Create a stage for building the application.
FROM deps as build


RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Copy the rest of the source files into the image.
COPY . .
# Run the build script.
RUN pnpm run build

# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM base as final

# Use production node environment by default.
ENV NODE_ENV production

# Khai báo lại ARG để nhận giá trị từ --build-arg
ARG NEXT_PUBLIC_SOCKET_BASE_URL
ARG NEXT_PUBLIC_LIVEKIT_WS_URL
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_VERIFY_IMAGE_URL
ARG NEXT_PUBLIC_ELASTIC_SEARCH

# Set ENV để app runtime thấy được
ENV NEXT_PUBLIC_SOCKET_BASE_URL=$NEXT_PUBLIC_SOCKET_BASE_URL
ENV NEXT_PUBLIC_LIVEKIT_WS_URL=$NEXT_PUBLIC_LIVEKIT_WS_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_VERIFY_IMAGE_URL=$NEXT_PUBLIC_VERIFY_IMAGE_URL
ENV NEXT_PUBLIC_ELASTIC_SEARCH=$NEXT_PUBLIC_ELASTIC_SEARC

# Run the application as a non-root user.
USER node

# Copy package.json so that package manager commands can be used.
COPY package.json .

# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/.next ./.next


EXPOSE 3000

CMD pnpm start
