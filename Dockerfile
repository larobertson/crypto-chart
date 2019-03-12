FROM node:9.6.1-onbuild
RUN npm install
EXPOSE 4000
CMD ["npm", "start"]