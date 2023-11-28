FROM caddy:2.6.4-alpine AS run

WORKDIR /usr/share/caddy
COPY build/ ./

EXPOSE 80
