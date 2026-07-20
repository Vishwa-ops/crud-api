# CRUD API Deployment using AWS, Jenkins CI/CD

## Project Overview

This project demonstrates deployment of a Node.js CRUD API on AWS EC2 with PostgreSQL RDS, Jenkins CI/CD, PM2, and Nginx.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL (AWS RDS)
- Prisma ORM
- Jenkins
- GitHub
- PM2
- Nginx
- AWS EC2
- Git

## Features

- CRUD Operations
- Health Check Endpoint
- PostgreSQL Database
- Jenkins CI/CD Pipeline
- Automatic Deployment
- Rollback Mechanism
- Reverse Proxy using Nginx
- Process Management using PM2

## Project Structure

crud-api/
├── prisma/
├── routes/
├── app.js
├── package.json
├── Jenkinsfile
└── README.md

## API Endpoints

GET /health

GET /products

POST /products

PUT /products/:id

DELETE /products/:id

## Deployment Flow

GitHub
↓
Jenkins
↓
Build
↓
Deploy
↓
PM2 Restart
↓
Nginx
↓
Application Live

## Rollback

The Jenkins pipeline automatically creates a backup before deployment. If deployment fails, the previous version is restored automatically.

## Live Server

http://13.234.30.211/api/health

## Author

Vishwa
