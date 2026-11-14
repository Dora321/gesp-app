#!/bin/sh
set -eu
id gesp-classroom >/dev/null 2>&1 || useradd --system --home-dir /var/lib/gesp-classroom --shell /sbin/nologin gesp-classroom
install -d -m 700 -o gesp-classroom -g gesp-classroom /var/lib/gesp-classroom
install -m 644 /opt/gesp-classroom/server/deploy/gesp-classroom.service /etc/systemd/system/gesp-classroom.service
install -m 644 /opt/gesp-classroom/server/deploy/gesp-classroom-https.service /etc/systemd/system/gesp-classroom-https.service
/opt/gesp-runtime/caddy validate --config /opt/gesp-classroom/server/deploy/Caddyfile --adapter caddyfile
systemctl daemon-reload
systemctl enable --now gesp-classroom gesp-classroom-https
