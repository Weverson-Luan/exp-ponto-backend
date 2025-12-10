# 💎 Comandos Prisma cli

1.  Gera o cliente Prisma a partir do schema.prisma

```
npx prisma generate
```

2.  Cria uma nova migration com um nome descritivo

```
yarn prisma migrate dev --name nome_da_migration
```

3. Executa as migrations em produção

```
npx prisma migrate deploy
```

4. Abre o Studio (interface gráfica para o banco)

```
npx prisma studio
```

5. Cria/atualiza o banco baseado no schema, sem gerar migration

```
npx prisma db push
```

6. Reseta o banco e roda as migrations novamente (útil para dev)

```
npx prisma migrate reset
```

7. Executa o seed configurado no schema

```
npx prisma db seed
```
