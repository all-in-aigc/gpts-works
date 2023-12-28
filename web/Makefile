dev:
	pnpm dev --hostname 0.0.0.0 --port 8067

docker-build:
	docker build -t gpts-works-web -f deploy/Dockerfile . 

docker-run:docker-build
	docker run -d --name=gpts-works-web --restart=always -p 8037:3000 gpts-works-web

