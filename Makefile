-include infra/.env infra/.env.local

MAKEFLAGS += --no-print-directory
TAG    := $(shell git describe --tags --abbrev=0 2> /dev/null || echo 'latest')
IMG    := ${NAME}:${TAG}
LATEST := ${NAME}:latest

COMPOSE_FILE ?= infra/docker/docker-compose.yml
ifneq ("$(wildcard infra/docker/docker-compose.override.yml)","")
    COMPOSE_FILE := infra/docker/docker-compose.yml:infra/docker/docker-compose.override.yml
endif
DOCKER_COMPOSE := COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker compose
NPM := $(DOCKER_COMPOSE) run -p ${PORT}:3000 --rm node npm

export COMPOSE_FILE COMPOSE_PROJECT_NAME DOMAIN_NAME PORT ENV

### Docker

up: ## Démarre les containers
	$(DOCKER_COMPOSE) up -d

stop: ## Stop les containers
	$(DOCKER_COMPOSE) stop

down: ## Supprime les containers
	$(DOCKER_COMPOSE) down --remove-orphans

build: ## Build les différentes images
	$(DOCKER_COMPOSE) build --no-cache

node: ## Lance le container node
	$(eval cmd := sh)
	$(DOCKER_COMPOSE) run --rm --no-deps node $(cmd)

npm-install: ## Lance npm install
	$(NPM) cache clean --force
	$(NPM) install

assets-build: npm-install ## Build les assets en mode dev (mode prod : 'make assets-build env=prod')
	$(eval env := prod)
	$(NPM) run build

assets-watch: npm-install ## Lance le mode dev avec l'option --watch
	$(NPM) run dev

prettier-check: ## Lance la vérification du formatage des assets (basé sur prettier)
	$(NPM) run prettier:check

prettier-write: ## Lance la modification automatique du formatage des assets (basé sur prettier) 
	$(NPM) run prettier:fix

help: ## Test
	@awk 'BEGIN {FS = ":.*##";} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^###/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
