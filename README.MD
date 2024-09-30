# Roomie

Sistema de reserva de salas para reunião.

Meeting Room Reservation System

## Sobre

O objetivo desse projeto é criar uma API com arquitetura bem definida e desacoplada, utilizando DDD e Clean Architecture para fazer distribuição de responsabilidade de camadas, seguindo os pricípios do SOLID.

The objective of this project is to create an API with a well-defined, decoupled architecture, utilizing DDD and Clean Architecture to distribute responsibilities across layers, following SOLID principles.

## Funcionalidades

- Cadastro de usuários
- Gerenciamento de salas
- Reserva de salas
- Visualização de reservas
- Cancelamento de reservas

## Features

- User registration
- Room management
- Room reservation
- Reservation viewing
- Reservation cancellation

## Regras de negócio

### Cadastro e autenticação de usuários
- Cadas usuário deve ter um e-mail único para registro.
- Senhas dever ser armazenadas de forma segura (hashing).

### Gerenciamento de salas
- Apenas administratores podem criar, editar ou deletar salas.
- Cada sala deve ter um nome único, capacidade e recursos (ex: TV, quandro, etc).

### Reservar de salas
- Usuários podem reservar salas para uma data e hora específicas.
- Reservas não podem sobrepor-se a outras reservas.
- A duração miníma de uma reserva é de 30 minutos e a máxima é de 4 horas.

### Visualização de reservas
- Usuários podem visualizar apenas suas próprias reservas.
- Usuários podem visualizar a disponibilidade das salas para fazer novas reservas.

### Cancelamento de reservas
- Usuários podem cancelar suas reservas até 1 hora antes do horário de início.

## Business Rules

### User Registration and Authentication
- Each user must have a unique email for registration.
- Passwords must be securely stored (hashed).

### Room Management
- Only administrators can create, edit, or delete rooms.
- Each room must have a unique name, capacity, and resources (e.g., TV, whiteboard, etc.).

### Room Reservation
- Users can reserve rooms for specific dates and times.
- Reservations cannot overlap with other reservations.
- The minimum duration of a reservation is 30 minutes, and the maximum is 4 hours.

### Reservation Viewing
- Users can only view their own reservations.
- Users can check room availability to make new reservations.

### Reservation Cancellation
- Users can cancel their reservations up to 1 hour before the start time.
