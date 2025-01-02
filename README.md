# bids-collector-desktop
BIDS dataset collect application

![Vercel Deployment](https://bids-collector-desktop-kevinpan45-kevinpan45s-projects.vercel.app/)

## Dockerize the application

- Build Static files

```bash
npm run build
```

- Build Docker image

```bash
docker build -t bids-bridge-ui:latest .
```

- Run Docker container
***Change port number if needed***
```bash
docker run -d -p 80:80 bids-bridge-ui
```
