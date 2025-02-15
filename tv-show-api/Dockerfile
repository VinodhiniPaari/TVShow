# Use the official OpenJDK base image for the backend
FROM openjdk:17-jdk-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven wrapper and POM file
COPY .mvn .mvn
COPY mvnw .
COPY pom.xml .

# Download dependencies (faster builds)
RUN chmod +x mvnw && ./mvnw dependency:go-offline

# Copy source code and build the application
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Use a minimal JDK for the final image
FROM openjdk:17-jdk-slim

# Set working directory in the container
WORKDIR /app

# Copy the built JAR from the previous step
COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar tv-show-api.jar

# Expose the port your Spring Boot application runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "/app/tv-show-api.jar"]
