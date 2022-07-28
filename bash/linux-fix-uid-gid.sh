#!/bin/sh

[ "${DEBUG}" = "true" ] && set -x
set -e

echo "[!!] Current Docker build is running on ${HOST_OS}, executing 'linux-fix-uid-gid.sh'.."

# Detecting uid and gid of the '${DOCKER_USER}' user inside Docker container
NODE_UID_DEFAULT=$(id -u "${DOCKER_USER}")
NODE_GID_DEFAULT=$(id -g "${DOCKER_USER}")

echo "[!!] Checking UID and GID. Docker host user is ${HOST_UID}:${HOST_GID}, '${DOCKER_USER}' is ${NODE_UID_DEFAULT}:${NODE_GID_DEFAULT}."

if [ "${HOST_UID}" != "0" ] && [ "${HOST_UID}" != "${NODE_UID_DEFAULT}" ]; then
  echo "[!!] Need to change UID and GID for '${DOCKER_USER}'."
  if usermod -u "${HOST_UID}" "${DOCKER_USER}" &&
    groupmod -g "${HOST_GID}" "${DOCKER_USER}"; then
    echo "[!!] UID and GID changed. '${DOCKER_USER}' is now $(id -u "${DOCKER_USER}"):$(id -g "${DOCKER_USER}")."
  else
    echo "[!!] *** FAILED SETTING UID AND GID FOR '${DOCKER_USER}'! ***"
    exit 1
  fi
else
  echo "[!!] UID and GID are OK!"
fi
