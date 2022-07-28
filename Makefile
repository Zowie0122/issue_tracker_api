include .env
export $(shell sed 's/=.*//' .env)

PROJECT_NAME              := Issue Tracker Api

# get host machine info
HOST_OS                   := $(shell uname -s)
HOST_UID                  := $(shell id -u)
HOST_GID                  := $(shell id -g)

# check if a process is running inside of the docker container
DOCKER_ON_PROCESS               := $(shell cat /proc/1/cgroup | grep 0::)

ifeq (,$(findstring containerd,$(DOCKER_TEST)))
  ifeq ($(HOST_OS),Darwin)
    DOCKER_BRIDGE_HOST_IP := $(shell docker run --rm -it alpine sh -c "ping -c 1 host.docker.internal | sed -ne 's/^PING host.docker.internal (\([0-9\.]*\)).*/\1/p'")
  else
    DOCKER_BRIDGE_HOST_IP := $(shell docker network inspect bridge --format='{{(index .IPAM.Config 0).Gateway}}')
  endif
endif

# pass host machine info to docker-compose file
BUILD_COMMIT              := $(shell git describe --always --abbrev=40 --dirty)
BUILD_DATE                := $(shell date +"%Y-%m-%d %H:%M:%S%z")
DOCKER_COMPOSE_VARS       :=  HOST_OS="$(HOST_OS)" HOST_UID=$(HOST_UID) HOST_GID=$(HOST_GID) \
                              DOCKER_BRIDGE_HOST_IP="$(DOCKER_BRIDGE_HOST_IP)" \
                              BUILD_COMMIT="$(BUILD_COMMIT)" BUILD_DATE="$(BUILD_DATE)"

.PHONY: hello
.SILENT: hello
hello:
	echo "Welcome to the $(PROJECT_NAME) make system running on $(HOST_OS)!\n\
The configuration variables were detected as follows:\n\
  - HOST_UID=$(HOST_UID)\n\
  - HOST_GID=$(HOST_GID)\n\
  - DOCKER_BRIDGE_HOST_IP=$(DOCKER_BRIDGE_HOST_IP)\n\
  - DOCKER_TEST=$(DOCKER_TEST)\n\
  - BUILD_COMMIT=$(BUILD_COMMIT)\n\
  - BUILD_DATE=$(BUILD_DATE)\n"

assert-param-%:
	@ if [ "${${*}}" = "" ]; then \
		echo "Error: running this target requires variable [$*] to be set" 1>&2 ; \
		exit 1 ; \
	fi

# #################################################################################################################### #
# The following section of this file contains only commands that should be accessible OUTSIDE Docker containers
# #################################################################################################################### #
ifeq (,$(findstring containerd,$(DOCKER_TEST)))

# Start the container, keep stdout attached
start:
	$(DOCKER_COMPOSE_VARS) docker-compose up --abort-on-container-exit

# Rebuild containers without cache
cc:
	$(DOCKER_COMPOSE_VARS) docker-compose build --no-cache

# Rebuild and run the container, keep stdout attached
restart:
	$(DOCKER_COMPOSE_VARS) docker-compose --force-recreate --build --abort-on-container-exit

# Start the container, detach stdout
up: # create-network
	$(DOCKER_COMPOSE_VARS) docker-compose up -d

# Rebuild and run the container, detach stdout
rebuild: # create-network
	$(DOCKER_COMPOSE_VARS) docker-compose up -d --force-recreate --build

# Stop and remove containers
down:
	$(DOCKER_COMPOSE_VARS) docker-compose down

reset: down rebuild

ash-app:
	docker exec -it issue_tracker_api /bin/ash

ash-node:
	$(DOCKER_COMPOSE_VARS) docker-compose exec --user=node issue_tracker_api /bin/ash

node-root:
	$(DOCKER_COMPOSE_VARS) docker-compose exec issue_tracker_api /bin/ash

# #################################################################################################################### #
# The following section of this file contains only commands that should be accessible INSIDE Docker containers
# #################################################################################################################### #
else

endif
