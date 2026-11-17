# 技術スタック

house1プロトタイプと同一のスタックを採用する。バージョンは実装時に最新の安定版を確認して固定する。

## バックエンド
- PHP + Laravel（13系）
- Laravel Breeze（React + Inertiaスタック）で認証の雛形（name + passwordの簡易ログイン）
- Inertia.js（別途REST APIは用意せず、`routes/web.php` + Controllerで完結）
- DB：PostgreSQL

## フロントエンド
- React + Inertia Reactアダプタ
- Vite（Breeze標準のビルドツール）
- Tailwind CSS（スタイリング。[design_guidelines.md](design_guidelines.md)参照）
- React Three Fiber + `@react-three/drei`（3Dシーン・操作）
- Zustand（編集画面の状態管理）

## アセット
- Kenney.nl Furniture Kit（GLTF/GLBモデル、CC0ライセンス）— house1の`public/models/furniture/*.glb`をそのまま再利用。

## バージョン方針
| カテゴリ | 技術 | 備考 |
|---|---|---|
| 言語 | PHP | 8.3以上（house1は8.4で稼働） |
| フレームワーク | Laravel | 13.x |
| 認証 | Laravel Breeze | 最新版（`--stack=react`） |
| ブリッジ | Inertia.js | v2系 |
| DB | PostgreSQL | 16〜18系 |
| フロント | React | 18.x（`@react-three/fiber` 8系が対応する範囲） |
| ビルド | Vite | Breeze標準 |
| CSS | Tailwind CSS | house1と同じメジャーバージョンに揃える |
| 3D | @react-three/fiber | 8.18.x系 |
| 3D | @react-three/drei | 9.122.x系 |
| 3D | three | 0.180.x系 |
| 状態管理 | Zustand | 5.0.x系 |

実際のセットアップ時は `composer show <package>` / `npm view <package> version` で正確なバージョンを確認し、house1の`package.json`/`composer.json`と大きくずれないようにする。

## 構成上の補足
- 家具カタログ（`furniture_catalog`テーブル）はDB管理、部屋テンプレートはバックエンドのPHP Enum（`app/Enums/RoomTemplate.php`）で管理し、フロントには Inertia props 経由で渡す（house1ではJS側にも同じ定数を持っていたが、今回は一本化する。[frontend_design.md](frontend_design.md) 参照）。
- レイアウト保存時のサムネイルはcanvasキャプチャ（`gl.domElement.toDataURL('image/png')`）で生成し、PostgreSQLには画像パスを保存、実ファイルは`storage/app/public`配下に保存する。本番（Railway）ではこのディレクトリをVolumeでマウントして永続化する（[infra.md](infra.md) 参照）。
