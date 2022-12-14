# Start the container, keep stdout attached
start:
	docker-compose up --abort-on-container-exit

# Rebuild containers without cache
cc:
	docker-compose build --no-cache

# Rebuild and run the container, keep stdout attached
restart:
	docker-compose up --force-recreate --build --abort-on-container-exit

# Start the container, detach stdout
up: # create-network
	docker-compose up -d

# Remove database volumes
remove-volumes:
	docker rm -f -v issue_tracker_psql

# Rebuild and run the container, detach stdout
rebuild: # create-network
	docker-compose up -d --force-recreate --build

# Stop and remove containers
down:
	docker-compose down

reset: down rebuild

# Interactive terminal inside of docker
ash-app:
	docker exec -it issue_tracker_api /bin/ash

bash-postgres:
	docker exec -it issue_tracker_psql psql -U istr issue_tracker
