# インフラ構成（Docker / Railway）

## ローカル開発（docker-compose）

| サービス | 内容 |
|---|---|
| `app` | Laravelコンテナ（PHP + CLIサーバー）。ソースはボリュームマウントしてホットリロード |
| `db` | PostgreSQLコンテナ。データはボリュームで永続化 |
| `node` | Viteの開発サーバー用コンテナ（`npm run dev`、HMR用にポート開放） |

house1の`docker-compose.yml` / `Dockerfile` / `docker/entrypoint.sh` をそのまま移植する。

## Dockerfile（マルチステージ）

本番用（Railwayデプロイ用）とローカル用を共通のDockerfileで管理する。

1. **フロントビルドステージ**：`node:alpine` で `npm ci && npm run build`（Viteの本番ビルド、`public/build`を生成）
2. **PHPステージ**：`php:cli` ベース（Apache/FPMは使わず`php artisan serve`で配信、シンプルさ重視）
   - `pdo_pgsql`拡張を追加
   - Composerをインストールし、`composer install --no-dev --optimize-autoloader`
   - ステージ1でビルドした`public/build`をコピー

## Railwayへのデプロイ

- RailwayはリポジトリのDockerfileを検出し、そのままビルド・デプロイできる（Dockerfileデプロイ方式）。GitHub連携は必須ではなく、`railway up` でローカルディレクトリから直接デプロイする。
- DBはRailwayのPostgresプラグインを使用。

### データベース接続（house1の反省点）
house1は `config/database.php` の `pgsql.url` に `DB_URL` を見るようになっているが、RailwayのPostgresプラグインが自動付与する変数は `DATABASE_URL` という名前のため、そのままでは繋がらない。
今回は変数名変換をせず、Laravelアプリ側のサービスにPostgresサービスの個別変数を**参照変数**として直接渡す方式にする（`config/database.php`のデフォルトがそのまま読む`DB_HOST`等の名前に合わせる）。

Railway側で設定する変数（Postgresサービスの変数を参照）：
```
DB_CONNECTION=pgsql
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_DATABASE=${{Postgres.PGDATABASE}}
DB_USERNAME=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}
```

### サムネイル画像の永続化（house1の反省点）
house1は `storage/app/public/thumbnails` にPNGを保存しているが、Railwayのコンテナストレージは再デプロイで消える（Volumeなしだと保存した画像がデプロイごとに失われる）。
今回は Railway Volume を作成し、コンテナの `/var/www/html/storage/app/public` にマウントして永続化する。

### その他の環境変数（Railway側で設定）
```
APP_KEY=（`php artisan key:generate --show` で生成した値）
APP_ENV=production
APP_DEBUG=false
APP_URL=（Railwayが発行するドメイン）
```

- Railwayは`$PORT`環境変数でリスニングポートを動的に指定してくるため、起動コマンドをこれに対応させる
  - 例：`php artisan serve --host=0.0.0.0 --port=$PORT`
- 起動時のフロー：`php artisan migrate --force` を実行 → （`public/storage`が無ければ）`php artisan storage:link` → サーバー起動
  - `docker/entrypoint.sh` でこの順に実行する（house1と同じ）
