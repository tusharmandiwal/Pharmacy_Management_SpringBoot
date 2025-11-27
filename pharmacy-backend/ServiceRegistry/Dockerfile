# ------------ Stage 1: Build the application ------------
FROM maven:3.9.4-eclipse-temurin-17 AS build

WORKDIR /app

# Copy Maven project files
COPY pom.xml .
COPY src ./src

# Build jar
RUN mvn clean package -DskipTests

# ------------ Stage 2: Run the application ------------
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port your Supplier Service runs on
EXPOSE 8761

# Start service
ENTRYPOINT ["java", "-jar", "app.jar"]
