/**
 * @file Command Pattern
 * @description 操作をオブジェクトとしてカプセル化し、Undo/Redoや操作のキューイングを可能にします。
 */

// Commandインターフェース
interface Command {
  execute(): void;
  unexecute(): void; // Undo処理のため
}

// Receiver: 実際に操作を実行するクラス
class Calculator {
  private currentValue = 0;

  public add(value: number): void {
    this.currentValue += value;
    this.log();
  }

  public subtract(value: number): void {
    this.currentValue -= value;
    this.log();
  }

  private log(): void {
    console.log(`[Calculator] Current value: ${this.currentValue}`);
  }
}

// Concrete Command: 足し算コマンド
class AddCommand implements Command {
  constructor(private receiver: Calculator, private value: number) {}

  public execute(): void {
    this.receiver.add(this.value);
  }

  public unexecute(): void {
    this.receiver.subtract(this.value);
  }
}

// Concrete Command: 引き算コマンド
class SubtractCommand implements Command {
  constructor(private receiver: Calculator, private value: number) {}

  public execute(): void {
    this.receiver.subtract(this.value);
  }

  public unexecute(): void {
    this.receiver.add(this.value);
  }
}

// Invoker: コマンドの実行を管理し、履歴を保持するクラス
class CommandHistory {
  private history: Command[] = [];
  private redoStack: Command[] = [];

  public executeCommand(command: Command): void {
    command.execute();
    this.history.push(command);
    // 新しいコマンドが実行されたら、Redoスタックはクリアする
    this.redoStack = []; 
    console.log('[History] Command executed and logged.');
  }

  public undo(): void {
    const lastCommand = this.history.pop();
    if (lastCommand) {
      console.log('[History] Undoing last command...');
      lastCommand.unexecute();
      this.redoStack.push(lastCommand);
    } else {
      console.log('[History] Nothing to undo.');
    }
  }

  public redo(): void {
    const lastUndoneCommand = this.redoStack.pop();
    if (lastUndoneCommand) {
      console.log('[History] Redoing last undone command...');
      lastUndoneCommand.execute();
      this.history.push(lastUndoneCommand);
    } else {
      console.log('[History] Nothing to redo.');
    }
  }
}

// --- 実行コード ---
function main() {
  console.log('--- Command Pattern Example ---');

  const calculator = new Calculator();
  const history = new CommandHistory();

  // 操作を実行
  history.executeCommand(new AddCommand(calculator, 10)); // val=10
  history.executeCommand(new AddCommand(calculator, 5));  // val=15
  history.executeCommand(new SubtractCommand(calculator, 3)); // val=12
  
  console.log('\n' + '-'.repeat(30) + '\n');

  // Undo操作
  history.undo(); // val=15
  history.undo(); // val=10

  console.log('\n' + '-'.repeat(30) + '\n');

  // Redo操作
  history.redo(); // val=15

  console.log('\n' + '-'.repeat(30) + '\n');

  // 再度Undo
  history.undo(); // val=10
  history.undo(); // val=0
  history.undo(); // Nothing to undo
}

main();
// 仮）このファイルがモジュールとして扱われるように、空のexportを追加
export {};