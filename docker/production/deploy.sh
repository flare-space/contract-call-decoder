#!/usr/bin/env bash

if [ -f ".disable-deploy" ]; then
	echo "Automatic deploy disabled"
	exit 1
fi

if [ -f "deploy-before.sh" ]; then
	./deploy-before.sh
fi

docker compose pull &&
docker compose up -d
