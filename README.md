# TypeScript で Result 型でのエラーハンドリングを通してモナドの世界を覗いてみる

アドベントカレンダー用の記事 [TypeScript で Result 型でのエラーハンドリングを通してモナドの世界を覗いてみる](https://qiita.com/shimopino/items/d194957599dd45e91a5f) のために用意した実験用リポジトリ

Result 型が提供する機能のうち、下記をサポートしている。

- 同期系
  - `map` : `A -> B` への変換
  - `andThen` : `A -> Result<B, E>` への変換
  - `mapErr` : `E -> F` への変換
  - `traverseA`
  - `traverseM`
  - `apply`
- 非同期系
  - `mapAsync` : 非同期的な `A -> B` 変換をサポートする
- 便利関数
  - `pipe` : 関数同士を合成する
  - `pipeWith` : 関数同士を合成し、その関数に対して初期値を適用する
  - `combine`
