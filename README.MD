# Roomie

Sistema de reserva de salas para reunião.

## Sobre

O objetivo desse projeto é criar uma API com arquitetura bem definida e desacoplada, utilizando DDD e Clean Architecture para fazer distribuição de responsabilidade de camadas, seguindo os pricípios do SOLID.

## Funcionalidades

- Cadastro de usuários
- Gerenciamento de salas
- Reserva de salas
- Visualização de reservas
- Cancelamento de reservas

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
