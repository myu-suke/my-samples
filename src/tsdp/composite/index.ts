/**
 * @file Composite Pattern
 * @description 個別のオブジェクトと複合オブジェクトを同じように扱えるようにし、木構造を表現します。
 */

// Component: 葉と枝に共通のインターフェース
abstract class FileSystemComponent {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  // サブクラスで実装されるべき抽象メソッド
  public abstract getSize(): number;

  // 枝（Directory）でのみ意味を持つメソッド
  public add(component: FileSystemComponent): void {
    throw new Error('This operation is not supported.');
  }

  public remove(component: FileSystemComponent): void {
    throw new Error('This operation is not supported.');
  }
}

// Leaf: 個別のオブジェクト（ファイル）
class File extends FileSystemComponent {
  private size: number;

  constructor(name: string, size: number) {
    super(name);
    this.size = size;
  }

  public getSize(): number {
    return this.size;
  }
}

// Composite: 複合オブジェクト（ディレクトリ）
class Directory extends FileSystemComponent {
  private children: FileSystemComponent[] = [];

  constructor(name: string) {
    super(name);
  }

  public add(component: FileSystemComponent): void {
    this.children.push(component);
  }

  public remove(component: FileSystemComponent): void {
    const index = this.children.indexOf(component);
    if (index > -1) {
      this.children.splice(index, 1);
    }
  }

  public getSize(): number {
    // 再帰的に子要素のサイズを合計する
    return this.children.reduce((total, child) => total + child.getSize(), 0);
  }

  public list(indent: string = ''): void {
    console.log(`${indent}[${this.name}] (${this.getSize()} KB)`);
    for (const child of this.children) {
      if (child instanceof Directory) {
        child.list(indent + '  ');
      } else {
        console.log(`${indent}  - ${child.getName()} (${child.getSize()} KB)`);
      }
    }
  }
}

// --- 実行コード ---
function main() {
  console.log('--- Composite Pattern Example ---');

  // ファイルシステムの構築
  const root = new Directory('root');
  const documents = new Directory('documents');
  const pictures = new Directory('pictures');
  
  root.add(documents);
  root.add(pictures);

  const report = new File('report.docx', 120);
  const proposal = new File('proposal.pdf', 250);
  documents.add(report);
  documents.add(proposal);

  const photo1 = new File('photo1.jpg', 2048);
  const photo2 = new File('photo2.png', 1536);
  const vacation = new Directory('vacation');
  pictures.add(photo1);
  pictures.add(photo2);
  pictures.add(vacation);
  
  const beach = new File('beach.jpg', 3072);
  vacation.add(beach);

  // 全体の構造とサイズを表示
  root.list();

  console.log('\n' + '-'.repeat(30) + '\n');

  // クライアントコードは、個別のファイルもディレクトリも同じように扱える
  console.log(`Size of 'report.docx': ${report.getSize()} KB`);
  console.log(`Total size of 'documents' directory: ${documents.getSize()} KB`);
  console.log(`Total size of 'root' directory: ${root.getSize()} KB`);
}

main();
// 仮）このファイルがモジュールとして扱われるように、空のexportを追加
export {};