/**
 * @file Singleton Pattern
 * @description クラスのインスタンスが1つしか存在しないことを保証します。
 */

class ConfigService {
  // 唯一のインスタンスを保持する静的プロパティ
  private static instance: ConfigService;

  // 設定データを保持するプロパティ
  private config: Record<string, any>;

  /**
   * コンストラクタをprivateにすることで、外部からの`new`によるインスタンス化を防ぐ。
   */
  private constructor() {
    console.log('Initializing ConfigService...');
    // ここで設定ファイルを読み込むなどの初期化処理を行う
    this.config = {
      apiUrl: 'https://example.com',
      timeout: 5000,
      version: '1.0.0',
    };
    console.log('ConfigService initialized successfully.');
  }

  /**
   * 唯一のインスタンスを取得するための静的メソッド。
   * @returns ConfigServiceの唯一のインスタンス
   */
  public static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }

  /**
   * 設定値を取得するメソッド。
   * @param key - 取得したい設定のキー
   * @returns 設定値
   */
  public get(key: string): any {
    return this.config[key];
  }

  /**
   * 設定値をセットするメソッド。
   * @param key - 設定するキー
   * @param value - 設定する値
   */
  public set(key: string, value: any): void {
    this.config[key] = value;
  }
}

// --- 実行コード ---
function main() {
  console.log('--- Singleton Pattern Example ---');

  // getInstance() を通じてインスタンスを取得
  const config1 = ConfigService.getInstance();
  const config2 = ConfigService.getInstance();

  // 2つのインスタンスが同一であるかを確認
  if (config1 === config2) {
    console.log('config1 and config2 are the same instance. Singleton works!');
  } else {
    console.log('Singleton failed, variables contain different instances.');
  }

  // 設定値の取得と変更
  console.log(`\nInitial API URL: ${config1.get('apiUrl')}`);
  
  // config2から設定を変更する
  config2.set('apiUrl', 'https://example.com');

  // config1から再度取得すると、変更が反映されている
  console.log(`New API URL from config1: ${config1.get('apiUrl')}`);
}

main();
// 仮）このファイルがモジュールとして扱われるように、空のexportを追加
export {};