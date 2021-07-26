
# Use an official Node runtime as the parent image
FROM node:current-alpine3.14 

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Make the container's port 80 available to the outside world
EXPOSE 3000

# Run app.js using node when the container launches
CMD ["node", "index.js"]