FROM node:16-alpine as vite-lct-production
WORKDIR /usr/src/app
COPY ./package.json \
    ./package-lock.json \
    ./vite.config.js \
    ./tailwind.config.js \
    ./postcss.config.js \
    ./env.d.ts \
    ./tsconfig.json \
    ./
RUN npm ci
COPY ./src \
    ./src/
# EXPOSE 3000
CMD ["npm", "run", "dev"]