# Room Makeover

ブラウザの中で部屋の模様替えができるアプリ。部屋を選んで、家具を置いて、雰囲気を確かめれる。気に入ったレイアウトは保存して、リンクで共有もできる。

three.js（React Three Fiber）を触ってみたくて作ったプロトタイプ。

スーモみたいな部屋探しサイトの部屋詳細ページで、写真+3Dモデルがあればいいなと思い、シェア機能をつけた。
不動産屋が実際の間取りを参考に作った部屋をシェア。そしてURLから自分のページにコピーし、自由に家具を配置しどんな感じか確かめられるのが理想。
3Dモデルで実際の施設の再現を簡単に作れるアプリがあれば、色々な施設のホームページに+αで使えるかもと思っている。2Dでの施設紹介でも問題はないが。

## デモ

URL

https://app-production-24780367.up.railway.app/

シェア機能のデモ

https://app-production-24780367.up.railway.app/share/4d1f3a34-ff47-4536-b372-5ada33195aeb

## ドキュメント

構想・DB設計・ルート設計・デザインガイドライン・インフラ構成など、詳細な設計は [docs/](docs) 以下を参照。

## 機能

1. **部屋を選ぶ** — 6種類の部屋テンプレートから選択
2. **家具を配置** — ソファ・椅子・テーブル・ベッド・デスク・本棚・観葉植物・ラグをドラッグで配置、回転・削除も可能
3. **保存** — レイアウトをダッシュボードに保存。シェア機能で公開URLを発行して誰でも閲覧でき、気に入ったレイアウトは自分のダッシュボードにコピーできる

## 技術スタック

- バックエンド：Laravel + Inertia.js
- フロントエンド：React + React Three Fiber（`@react-three/drei`）+ Zustand
- DB：PostgreSQL
- 認証：name + password の簡易ログイン
- インフラ：Docker、Railway（Postgres + Volumeでサムネイル永続化）
- CI/CD：GitHub Actions（テスト → `main`へのpushで自動デプロイ）

## ローカル開発

```bash
cp .env.example .env
docker compose up -d --build
docker compose exec app php artisan key:generate
docker compose exec app php artisan migrate --seed
```

http://localhost:8000 でアクセスできる。フロントの変更は `node` コンテナが `npm run dev` でHMRしている。

## テスト

```bash
php artisan test
```

## ディレクトリ構成（フロントエンド）

```
resources/js/
  Pages/        # Inertiaのページ（ルーティング単位、薄く保つ）
  features/     # 画面の塊ごとにcomponents/hooks/storeをまとめる（auth, dashboard, room-picker, room-editor, welcome）
  shared/       # 複数featureで使う共通UI・レイアウト
```

詳しくは [docs/frontend_design.md](docs/frontend_design.md) を参照。

## アセット

家具の3Dモデルは [Kenney.nl Furniture Kit](https://kenney.nl/assets/furniture-kit)（CC0ライセンス）を使用。
