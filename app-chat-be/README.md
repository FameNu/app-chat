# Backend Project

This project uses TypeScript for the backend and is managed with Bun. Additionally, it includes a Go server.

## Prerequisites

- [Bun](https://bun.sh/)
- [Go](https://golang.org/)

## Getting Started

### Setting Up the TypeScript Backend

1. **Install Bun**:
   Follow the instructions on the [Bun website](https://bun.sh/) to install Bun.

2. **Install Dependencies**:
   Navigate to the project directory and run:
   ```sh
   bun install
   ```
3. Run the TypeScript Backend: To start the TypeScript backend, use
    ```sh
    bun dev
    ```
    : for development mode or
    ```sh
    bun start
    ```

### Setting Up the Go Server
1. Install Go: Follow the instructions on the Go website to install Go.

2. Navigate to the Go Server Directory: Assuming your Go server code is in the go-server directory, navigate to it:
    ```sh
    cd golang
    ```

Run the Go Server: To start the Go server, use:
    ```sh
    go run main.go
    ```

# Project Structure
```
/project-root
  ├── ts
  │   └── src
  │       └── index.ts
  ├── golang
  │   └── main.go
  └── README.md
```