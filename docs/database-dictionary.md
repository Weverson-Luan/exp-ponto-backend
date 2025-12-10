# 📘 Data Dictionary — Sistema de Marcação de Ponto

Documento oficial contendo todas as tabelas, campos, relações e regras de negócio do banco de dados do Sistema de Registro de Ponto Corporativo.

## 📑 Sumário

1. [Tabela: roles](#tabela-roles)
2. [Tabela: users](#tabela-users)
3. [Tabela: companies](#tabela-companies)
4. [Tabela: point_marking](#tabela-point_marking)
5. [Tabela: journeys](#tabela-journeys)
6. [Tabela: company_rules](#tabela-company_rules)
7. [Tabela: authorized_devices](#tabela-authorized_devices)

---

## 🗂️ Tabela: roles

### Descrição

Tabela que define os papéis e permissões dos usuários do sistema.

### Campos

| Campo       | Tipo     | Descrição                          |
| ----------- | -------- | ---------------------------------- |
| id          | string   | Identificador único do papel       |
| ativo       | boolean  | Define se o papel está ativo       |
| name        | string   | Nome do papel (ex.: admin, gestor) |
| description | string   | Descrição detalhada da função      |
| create_at   | datetime | Data/hora de criação               |
| update_at   | datetime | Última atualização                 |

### Relacionamentos

- 1 papel pode estar ligado a vários usuários (1:N)

---

## 🗂️ Tabela: users

### Descrição

Tabela de usuários gerais da plataforma (Funcionários, Gestores, Administradores).

### Campos

| Campo      | Tipo              | Descrição                  |
| ---------- | ----------------- | ---------------------      |
| id         | string (PK)       | Identificador único        |
| role_id    | FK → roles.id     | Papel do usuário           |
| company_id | FK → companies.id | Empresa vinculada          |
| ativo      | boolean           | Usuário ativo/inativo      |
| name       | string            | Nome completo              |
| email      | string (unique)   | E-mail de acesso           |
| password   | string \| null    | Senha hashada              |
| birth_date | datetime          | Data de nascimento         |
| phone      | string (unique)   | Telefone                   |
| document   | string (unique)   | Documento de identificação |
| rg         | string            | RG                         | 
| naturalness | string           | Naturalidade               |
| father_name | string           | Nome do pai                |
| mother_name | string           | Nome da mãe                |
| matriculation | string         | Matricula                  |
| admission_date | datetime      | Data de admissão           |
| dismissal_date | datetime      | Data de admissão           |
| create_at  | datetime          | Data de criação            |
| update_at  | datetime          | Última atualização         |

### Relacionamentos

- 1 usuário pertence a 1 empresa
- 1 usuário possui 1 role
- 1 usuário possui várias marcações de ponto
- 1 usuário possui várias jornadas
- 1 usuário possui várias dispositivos autorizados

---

## 🗂️ Tabela: companies

### Descrição

Tabela contendo as empresas clientes que utilizam o sistema.

### Campos

| Campo          | Tipo                | Descrição                         |
| -------------- | ------------------- | --------------------------        |
| id             | string (PK)         | Identificador único               |
| company_name   | string              | Nome fantasia                     |
| company_name_fatasia | string        | Documento (CNPJ ou Tax ID)        |
| document       | string              | Documento de identificação        |
| lat            | float               | Latitude                          |
| lgn            | float               | Longitude                         |
| create_at      | datetime            | Criado em                         |
| update_at      | datetime            | Atualizado em                     |

### Relacionamentos

- 1 empresa possui muitos usuários
- 1 empresa possui suas próprias regras (company_rules)

---

## 🗂️ Tabela: company_rules

### Descrição

Regras de jornada definidas por cada empresa.

### Campos

| Campo             | Tipo     | Descrição                               |
| ----------------- | -------- | --------------------------------------- |
| id                | string   | Identificador único                     |
| company_id        | FK       | Empresa                                 |
| daily_workload    | number   | Carga diária em segundos                |
| late_tolerance    | number   | Tolerância de atraso (segundos)         |
| start_time        | datetime | Início do expediente                    |
| end_time          | datetime | Fim do expediente                       |
| minimum_interval  | number   | Intervalo mínimo obrigatório (segundos) |
| max_extra_per_day | int      | Máx. horas extras                       |
| rounding_method   | string   | Arredondamento (none, 5min, 10min)      |
| break_required    | boolean  | Indica se o intervalo é obrigatório     |
| create_at         | datetime | Criado em                               |
| update_at         | datetime | Atualizado em                           |

### Relacionamentos

- Muitas regras para 1 empresa (N:1)

---

## 🗂️ Tabela: point_marking

### Descrição

Registra **todas** as marcações de ponto realizadas.

### Campos

| Campo       | Tipo           | Descrição                                         |
| ----------- | -------------- | ------------------------------------------------- |
| id          | string (PK)    | Identificador da marcação                         |
| official_id | FK → users.id  | Usuário que marcou o ponto                        |
| type        | string         | Tipo (input, output_interval, return_interval...) |
| data_hours  | datetime       | Data/hora da marcação                             |
| lat         | number \| null | Latitude                                          |
| lng         | number \| null | Longitude                                         |
| origin      | string         | Origem (mobile, web, qr, admin)                   |
| create_at   | datetime       | Criado em                                         |
| update_at   | datetime       | Atualizado em                                     |

### Regras de Negócio

- Cada registro representa uma marcação individual
- Alimenta o cálculo das jornadas

---

## 🗂️ Tabela: journeys

### Descrição

Tabela consolidada da jornada diária do funcionário.

### Campos

| Campo          | Tipo             | Descrição                    |
| -------------- | ---------------- | ---------------------------- |
| id             | string (PK)      | Identificador da jornada     |
| official_id    | FK → users.id    | Funcionário vinculado        |
| entry_time     | datetime \| null | Horário de entrada           |
| departure_time | datetime \| null | Horário de saída             |
| total_hours    | float            | Total de horas (em segundos) |
| absences       | number           | Número de faltas             |
| extras         | float            | Horas extras (em segundos)   |
| create_at      | datetime         | Criado em                    |
| update_at      | datetime         | Atualizado em                |

### Regras

- Calculado automaticamente com base em point_marking
- Atualizado ao final do dia

---


## 🗂️ Tabela: authorized_devices

### Descrição

Lista dispositivos autorizados para registrar ponto (antifraude).

### Campos

| Campo         | Tipo          | Descrição                    |
| ------------- | ------------- | ---------------------------- |
| id            | string (PK)   | Identificador do dispositivo |
| official_id   | FK → users.id | Funcionário autorizado       |
| device_id     | string        | ID único do aparelho         |
| name          | string        | Nome amigável                |
| authorized_in | datetime      | Data de autorização          |
| create_at     | datetime      | Criado em                    |
| update_at     | datetime      | Atualizado em                |
