#!/bin/sh

[ "${DEBUG}" = "true" ] && set -x
set -e

echo "[!!] Running 'docker-entrypoint.sh' as $(whoami).."
uname -s

# For builds on Linux, execute the '/docker/linux-fix-uid-gid.sh' script to change UID and GID of the Docker user.
# NOTE: EXECUTING THIS SCRIPT ON MACOS WILL LEAD TO BUILD FAILING, because the default user #1 on macOS has UID=501
# and GID=20. Attempting to change Docker user GID to 20 will lead to collision, because most Docker containers
# already have a group with GID=20. Moreover, changing UID and GID on Mac is not necessary in the first place, because
# Mac automatically maps file ownership between host OS and Docker container, so there will be no conflicts even if
# the host user and Docker user have different UIDs and GIDs.
test "${HOST_OS}" == "Linux" && /docker/linux-fix-uid-gid.sh

assert_dir() {
  if [ -d "$1" ]; then
    echo "[!!] $2 directory found: $1"
  else
    echo "[!!] $2 directory does not exist yet, creating.."
    if mkdir -p "$1"; then
      echo "[!!] $2 directory created."
    else
      subject_uppercase=$(echo "$2" | awk '{print toupper($0);}')
      echo "[!!] *** FAILED TO CREATE ${subject_uppercase} DIRECTORY: $1 ***";
      exit 2;
    fi
  fi
}

docker_chown() {
  if chown -R "${DOCKER_USER}:${DOCKER_USER}" "$1"; then
    echo "[!!] Owner is correctly set on '$1' directory."
  else
    echo "[!!] *** FAILED TO SET OWNER ON '$1' directory! ***"
  fi
}

assert_dir "${MODULES_DIR}" "Node modules"
docker_chown "${MODULES_DIR}"

echo "[!!] Checking versions: node $(node -v), npm $(npm -v)."

# only after the correct directory permissions have been set
if su - node -c "cd ${PROJECT_DIR} \
  && echo \"[!!] Running 'npm install' as '\$(whoami)' in '\$(pwd)'..\" \
  && npm install \
  && ls -la ${MODULES_DIR}"; then
  echo '[!!] NPM install completed successfully.'
else
  echo '[!!] NPM install failed.'
fi

echo "[!!] Entrypoint script complete, will now run '$*' as $(whoami).."

exec "$@"
