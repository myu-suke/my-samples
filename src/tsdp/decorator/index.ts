/**
 * @file Decorator Pattern
 * @description TypeScriptのデコレータ機能を用いて、クラスやメソッドの振る舞いを動的に拡張します。
 */

// --- メソッドデコレータの定義 ---
/**
 * メソッドの実行時間を計測し、コンソールに出力するデコレータ。
 */
function measureTime(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    console.log(`[MeasureTime] Starting execution of ${propertyKey}...`);
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    console.log(`[MeasureTime] ${propertyKey} executed in ${(end - start).toFixed(2)} ms.`);
    return result;
  };

  return descriptor;
}

/**
 * メソッドが非推奨であることを警告するデコレータ。
 */
function deprecated(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    console.warn(`[Deprecated] Method "${propertyKey}" is deprecated and will be removed in a future version.`);
    return originalMethod.apply(this, args);
  };

  return descriptor;
}


// --- デコレータを使用するクラス ---
class ReportGenerator {
  
  @measureTime
  public generateSalesReport(days: number): void {
    console.log(`Generating sales report for the last ${days} days...`);
    // 時間のかかる処理をシミュレート
    let sum = 0;
    for (let i = 0; i < 1e7; i++) {
        sum += i;
    }
    console.log('Sales report generated successfully.');
  }

  @deprecated
  @measureTime
  public generateOldReport(): void {
    console.log('Generating the old, inefficient report...');
    let sum = 0;
    for (let i = 0; i < 5e6; i++) {
        sum += i;
    }
    console.log('Old report generated.');
  }
}


// --- 実行コード ---
function main() {
  console.log('--- Decorator Pattern Example ---');
  
  const reportService = new ReportGenerator();

  console.log('\n' + '-'.repeat(30) + '\n');
  reportService.generateSalesReport(30);
  
  console.log('\n' + '-'.repeat(30) + '\n');
  // 複数のデコレータが適用されているメソッドを実行
  reportService.generateOldReport();
}

main();
// 仮）このファイルがモジュールとして扱われるように、空のexportを追加
export {};