# ================================
#    Stage 1 — Build the JAR
# ================================
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml to download dependencies first
COPY pom.xml .
RUN mvn -B dependency:go-offline

# Copy source code
COPY src ./src

# Build Spring Boot app
RUN mvn -B clean package -DskipTests

# ================================
#    Stage 2 — Run the JAR
# ================================
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy the built jar from stage 1
COPY --from=build /app/target/*.jar app.jar

# API Gateway runs on port 8080
EXPOSE 8080

# Start API Gateway
ENTRYPOINT ["java", "-jar", "app.jar"]
