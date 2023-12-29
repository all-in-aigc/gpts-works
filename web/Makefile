dev:
	pnpm dev --hostname 0.0.0.0 --port 8067

docker-build:
	sudo docker build -t gptsweb:v1.3.4 -f deploy/Dockerfile . 

docker-run:docker-build
	sudo docker run -d --name=gptsweb134 --restart=always -p 8034:3000 gptsweb:v1.3.4

