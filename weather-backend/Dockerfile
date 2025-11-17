# Use a lightweight JDK base image
FROM openjdk:17-jdk-alpine

# Copy the jar file produced by Maven after build
COPY target/weatherapp-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080 for container
EXPOSE 8080

# Command to run the jar file
ENTRYPOINT ["java","-jar","/app.jar"]