FROM node:20-slim


RUN useradd -ms /bin/sh -u 1001 app
USER app

WORKDIR /usr/src/server

ENV PATH /usr/src/server/node_modules/.bin:$PATH

COPY --chown=app:app ./src/ /usr/src/server/src


COPY package.json /usr/src/server

# RUN npm cache clean --force

RUN npm install



EXPOSE 3001

CMD ["npm","run","dev"]
# CMD ["sh", "start.sh"]
