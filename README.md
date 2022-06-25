# Next.js と Testing

## 環境構築

```bash
# https://nextjs.org/docs/testing#quickstart-2
npx create-next-app@latest --typescript --example with-jest nextjs-testing
npm install next@12.1.5
```

## スナップショットテスト

なぜスナップショットをおすすめしないのか、Justin Searls さんのツイートから見ていく。

1. スナップショップテストが落ちた場合、大抵その原因はわからない

   - 原因を特定するためのデバッグ作業という余分な作業が発生する
   - これは確かにそう

2. スナップショットテストは、コードからそのテストの目的を理解しずらい

   - 良いテストには開発者の意図が見えるもの

3. スナップショットテストが落ちた場合、新しく合格したファイルをコミットしがち

   - テストが失敗した場合にその原因を探ることが難しい
   - だからこと新しいスナップファイルで上書きしてしまうことはありそう
   - 参考程度に使うのがよいのかな

4. 偽陰性を引き起こす

   - 複数のサービスを統合した環境でおこなったり、ブラウザのバージョンや DB、API の変更などの副作用が存在する場合
   - 偽陰性（本番環境では問題ないけど、テストが失敗してしまう）が発生する可能性が上がる
   - その結果、バグを発見するためのテストに対する信頼性が失われる

- [Effective Snapshot Testing](https://kentcdodds.com/blog/effective-snapshot-testing)

## Data Fetching Strategy

- Static
- SG
- SSR
- CSR
- ISR
