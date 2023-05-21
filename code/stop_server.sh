#!/bin/bash

# Stop the FE server
pkill -f "vite"

# Stop the BE server
pkill -f "node app.js"
pkill -f "nodemon"
