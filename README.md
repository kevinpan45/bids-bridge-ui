# bids-collector-desktop
BIDS dataset collect application

[Vercel Deployment](https://bids-collector-desktop.vercel.app)

## Environment Variables

### SVELTEKIT_BUILD_TYPE
Controls the build type for the SvelteKit application. Set to `static` to build a static site with pre-rendered pages.

**Usage:**
```bash
export SVELTEKIT_BUILD_TYPE=static 
npm run build
```

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

## Open Source
- ICON: [heroicons](https://heroicons.com/outline)