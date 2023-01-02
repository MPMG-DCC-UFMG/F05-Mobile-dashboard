# pull official base image
FROM node:alpine

# set working directory
WORKDIR /trena_dashboard

# add `/app/node_modules/.bin` to $PATH
ENV PATH /trena_dashboard/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . ./

CMD ["npm","start"]