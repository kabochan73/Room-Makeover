# DB設計

house1プロトタイプと同一スキーマ。変更なし。

## 方針
- 部屋テンプレートはDBテーブル化せず、バックエンドのPHP Enum（`App\Enums\RoomTemplate`）で定義し、`layouts.room_template` に文字列（Enumのvalue）で持たせる。
- 家具カタログ（カテゴリー×バリエーション）は、サイズ調整（`default_scale`補正値）が頻発する想定のため、テーブル化してDB側で管理する。

## テーブル定義

### users
| カラム | 型 | 備考 |
|---|---|---|
| id | bigint | PK |
| name | string | unique、ログインID代わり |
| password | string | hashed |
| created_at / updated_at | timestamp | |

### furniture_catalog
| カラム | 型 | 備考 |
|---|---|---|
| id | bigint | PK |
| category | string | 'sofa' / 'chair' / 'table' / 'bed' / 'desk' / 'bookcase' / 'plant' / 'rug' |
| name | string | 表示名 |
| model_path | string | Kenney Furniture Kit内のGLTF/GLBファイルパス |
| default_scale | float | 部屋に対する見た目バランス調整用のscale補正値（目視調整、手動管理のまま） |
| thumbnail | string | カタログ一覧表示用のアイコン画像パス |
| created_at / updated_at | timestamp | |

### layouts
| カラム | 型 | 備考 |
|---|---|---|
| id | bigint | PK |
| user_id | bigint | FK → users, cascade delete |
| room_template | string | `App\Enums\RoomTemplate` のvalue（例：'room_4x4'） |
| name | string | レイアウト名 |
| thumbnail | string | 保存時にcanvasをキャプチャしたPNGのパス |
| share_token | string(uuid) | unique, index。公開シェアURL用（連番idを晒さない） |
| created_at / updated_at | timestamp | |

### layout_items
| カラム | 型 | 備考 |
|---|---|---|
| id | bigint | PK |
| layout_id | bigint | FK → layouts, cascade delete |
| furniture_catalog_id | bigint | FK → furniture_catalog |
| position_x / position_y / position_z | float | 配置座標 |
| rotation_y | float | 回転角度 |
| created_at / updated_at | timestamp | |

## リレーション
- `users` 1 - N `layouts`
- `layouts` 1 - N `layout_items`
- `furniture_catalog` 1 - N `layout_items`

## 補足
- レイアウトの「コピー」機能：対象の`layouts`レコード＋紐づく`layout_items`を丸ごと複製し、新しい`user_id`・新しい`share_token`を割り振って保存する（`ShareController@copy`、トランザクション内で実行）。
- 公開シェアページ（`/share/{share_token}`）は`layouts.share_token`で検索し、ログイン不要で閲覧できるようにする。
- マイグレーション・シーダー（`FurnitureCatalogSeeder`含む）はhouse1のものをそのまま移植する。
