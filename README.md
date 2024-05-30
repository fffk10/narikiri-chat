## Overview

Narikiri Chat

[wiki](https://ja.wikipedia.org/wiki/%E3%81%AA%E3%82%8A%E3%81%8D%E3%82%8A)

## setup

1. パッケージインストール

```
$ pnpm install
```

2. backend起動

```
$ pnpm frontend:dev
```

3. frontend起動

```
$ pnpm backend:dev
```

## Tech

- client(Next.js/14 App Router)

  - TypeScript
  - shadcn/ui
  - storybook

- backend(NestJS)
  - TypeScript
  - prisma
  - postgresSQL

## packages

- packages/client
  フロントエンド用ワークスペース

- packages/server
  バックエンド用ワークスペース

- packages/database
  prisma型定義をフロント/バックで共有するためのワークスペース
