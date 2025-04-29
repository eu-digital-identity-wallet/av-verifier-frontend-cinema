# Starfilm

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 21 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Docker](https://www.docker.com/) (if you want to run the application in a container)

## Running Locally

### 1. Clone the Repository

```bash
git clone https://github.com/t-scy/av-verifier-frontend-starfilm.git
cd av-verifier-frontend-starfilm
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Application
```bash
npm run dev
```
The Application will run on http://localhost:5173/.

## Running with Docker

### 1. Clone the Repository

```bash
git clone https://github.com/t-scy/av-verifier-frontend-starfilm.git
cd av-verifier-frontend-starfilm
```

### 2. Build the Docker Image

Run the following command to build the Docker image:

```bash
docker build -t starfilm .
```

### 3. Run the Docker Container
```bash
docker run -d -p 3000:80 starfilm
```
The Application will run on http://localhost:3000/.
