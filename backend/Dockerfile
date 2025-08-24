# syntax=docker/dockerfile:1

# ===== Build stage =====
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom and sources
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn -B -DskipTests package

# ===== Run stage =====
FROM eclipse-temurin:17-jre
WORKDIR /app

ENV PORT=8080
EXPOSE 8080

# Copy built jar from build stage
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

# JVM opts can be overridden via JAVA_OPTS
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
