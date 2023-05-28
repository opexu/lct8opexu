FROM node:16-alpine as vite-lct-production
USER node
WORKDIR /usr/src/app
COPY --chown=node:node \
    ./package.json \
    ./package-lock.json \
    ./vite.config.js \
    ./tailwind.config.js \
    ./postcss.config.js \
    ./env.d.ts \
    ./tsconfig.json \
    ./
RUN npm ci
COPY --chown=node:node \
    ./src \
    ./src/
# EXPOSE 3000
CMD ["npm", "run", "dev"]