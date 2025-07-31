/**
 * @file Observer Pattern
 * @description 1対多の依存関係を定義し、オブジェクトの状態変化を他のオブジェクトに通知します。
 */

// 観察者（Observer）のインターフェース
interface Observer<T> {
  update(data: T): void;
}

// 被験者（Subject）のクラス
// ジェネリクス<T>を使い、任意の型のデータを扱えるようにする
class Subject<T> {
  private observers: Observer<T>[] = [];

  /**
   * 観察者（Observer）を購読リストに追加します。
   * @param observer - 追加する観察者
   */
  public subscribe(observer: Observer<T>): void {
    this.observers.push(observer);
    console.log(`[Subject] New observer subscribed. Total: ${this.observers.length}`);
  }

  /**
   * 観察者（Observer）を購読リストから削除します。
   * @param observer - 削除する観察者
   */
  public unsubscribe(observer: Observer<T>): void {
    this.observers = this.observers.filter(obs => obs !== observer);
    console.log(`[Subject] An observer unsubscribed. Total: ${this.observers.length}`);
  }

  /**
   * 購読している全ての観察者にデータを通知します。
   * @param data - 通知するデータ
   */
  public notify(data: T): void {
    console.log(`[Subject] Notifying ${this.observers.length} observers...`);
    for (const observer of this.observers) {
      observer.update(data);
    }
  }
}

// 具体的な観察者1: 新着記事をコンソールに表示する
class NewsReader implements Observer<string> {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public update(articleTitle: string): void {
    console.log(`[${this.name}] Received new article: "${articleTitle}"`);
  }
}

// 具体的な観察者2: 新着記事をメールで送信するシミュレーション
class EmailNotifier implements Observer<string> {
  public update(articleTitle: string): void {
    console.log(`[Email Notifier] Simulating sending email for new article: "${articleTitle}"`);
  }
}

// --- 実行コード ---
function main() {
  console.log('--- Observer Pattern Example ---');

  // 新聞社（被験者）を作成
  const newsPublisher = new Subject<string>();

  // 読者（観察者）を作成
  const readerA = new NewsReader('Reader A');
  const readerB = new NewsReader('Reader B');
  const emailSystem = new EmailNotifier();

  // 読者を新聞社の購読リストに追加
  newsPublisher.subscribe(readerA);
  newsPublisher.subscribe(readerB);
  newsPublisher.subscribe(emailSystem);

  console.log('\n' + '-'.repeat(30) + '\n');

  // 新しい記事を公開（通知を発行）
  newsPublisher.notify('TypeScript Design Patterns Released!');

  console.log('\n' + '-'.repeat(30) + '\n');

  // 読者Bが購読を解除
  newsPublisher.unsubscribe(readerB);

  console.log('\n' + '-'.repeat(30) + '\n');

  // 別の新しい記事を公開
  newsPublisher.notify('The Power of Generics in TypeScript');
}

main();
// 仮）このファイルがモジュールとして扱われるように、空のexportを追加
export {};