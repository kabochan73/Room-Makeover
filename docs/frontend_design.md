# フロントエンド ファイル設計

house1は Laravel Breeze標準の「Pages / Components / Layouts / stores / hooks / constants」という機能横断的な分け方で、`Components/`配下に認証系UI（`Checkbox.jsx`）と3Dシーン（`RoomCanvas.jsx`）が混在していた。今回は **機能（ドメイン）別** に再編成する。

## 命名の方針
Laravel Breeze標準の `resources/js/Layouts/`（ページの外枠コンポーネント）と、このアプリのドメイン概念「保存した部屋のレイアウト」が名前として衝突するため、ドメイン側（部屋の配置データ）を指す際は **`RoomDesign`** という呼び方に統一する（DB設計の`layouts`/`layout_items`テーブル名はそのまま）。

## ディレクトリ構成

```
resources/js/
  Pages/                          # Inertiaのページ（ルーティング単位）。中身は薄く、features/ に委譲する
    Welcome.jsx
    Auth/
      Login.jsx
      Register.jsx
    Dashboard.jsx
    RoomDesigns/
      Create.jsx                  # 部屋選択
      Edit.jsx                    # 家具配置（編集ページ本体）
    Share.jsx
    Profile/
      Edit.jsx

  features/                       # ドメイン（画面の塊）ごとにcomponents/hooks/storeをまとめる
    auth/
      components/
        Checkbox.jsx
    dashboard/
      components/
        RoomDesignCard.jsx
    room-picker/
      components/
        RoomTemplateCard.jsx
    room-editor/
      components/
        Scene/
          RoomCanvas.jsx          # <Canvas>・カメラ・ライト等のルート
          RoomModel.jsx           # 部屋テンプレートの壁・床（テンプレートごとに切り替え表示）
          FurnitureInstance.jsx   # 配置済み家具1つ（GLTF読み込み＋TransformControls）
        FurnitureCatalogPanel.jsx # サイドバー：カテゴリー別の家具選択
        EditorSidebar.jsx         # Edit.jsxのサイドバーJSXを切り出したもの
      store/
        useEditorStore.js         # Zustand：配置済み家具リスト・選択中アイテム・現在の部屋テンプレート
      hooks/
        useCaptureThumbnail.js    # 保存時にcanvasをPNG化するhook

  shared/                         # 複数のfeatureで使う共通部品
    ui/
      Button.jsx                  # variant="primary|secondary|danger" でPrimary/Secondary/DangerButtonを統合
      TextInput.jsx
      InputLabel.jsx
      InputError.jsx
      Modal.jsx
    layouts/
      AuthenticatedLayout.jsx     # ヘッダー（ロゴ＋ログアウト）付きの枠
      GuestLayout.jsx             # トップ/ログイン画面用の枠
      AuthenticatedHeader.jsx
      PublicHeader.jsx

  app.jsx                         # Inertiaエントリーポイント

public/
  models/furniture/                # Kenney Furniture KitのGLTF/GLBファイル（DBのmodel_pathが指す先）
  storage/thumbnails/               # 保存されたRoomDesignのサムネイルPNG（symlink経由）
```

## 補足
- 部屋テンプレートの一覧はフロント側の定数（house1の`constants/roomTemplates.js`）を廃止し、`RoomDesignController@create` から Inertia props として渡す（単一のソース・オブ・トゥルースはバックエンドの`App\Enums\RoomTemplate`）。
- 家具カタログ（`furniture_catalog`テーブル）のデータは、Controllerから各Inertiaページに props として渡す（例：編集ページに渡し、`FurnitureCatalogPanel`で表示）。
- `useEditorStore`（Zustand）は`RoomDesigns/Edit.jsx`内でのみ使うローカルな編集状態。保存時にstoreの内容をInertiaの`router.put`でLaravelに送信する。
- `Pages/*.jsx` は Inertia のルーティング単位としてそのまま残すが、内部のUIロジックは極力 `features/*/components` に切り出し、ページコンポーネント自体はレイアウトの組み立て役に留める。
