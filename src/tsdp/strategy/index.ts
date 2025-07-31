/**
 * @file Strategy Pattern
 * @description アルゴリズムをカプセル化し、動的に切り替えられるようにします。
 */

// 戦略のインターフェース
interface PaymentStrategy {
  pay(amount: number): void;
}

// 具体的な戦略1: クレジットカード決済
class CreditCardPayment implements PaymentStrategy {
  private name: string;
  private cardNumber: string;

  constructor(name: string, cardNumber: string) {
    this.name = name;
    this.cardNumber = cardNumber;
  }

  public pay(amount: number): void {
    console.log(`Paid ${amount} JPY with Credit Card.`);
    console.log(`Card Holder: ${this.name}, Card Number: ****-****-****-${this.cardNumber.slice(-4)}`);
  }
}

// 具体的な戦略2: PayPal決済
class PayPalPayment implements PaymentStrategy {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  public pay(amount: number): void {
    console.log(`Paid ${amount} JPY with PayPal.`);
    console.log(`PayPal Account: ${this.email}`);
  }
}

// 具体的な戦略3: コンビニ決済
class ConvenienceStorePayment implements PaymentStrategy {
  public pay(amount: number): void {
    const transactionId = Math.random().toString(36).substring(2, 12).toUpperCase();
    console.log(`Paid ${amount} JPY at a convenience store.`);
    console.log(`Transaction ID: ${transactionId}. Please pay at a nearby store.`);
  }
}

// コンテキストクラス: 決済処理を実行するクラス
class ShoppingCart {
  private paymentStrategy: PaymentStrategy;

  constructor(strategy: PaymentStrategy) {
    this.paymentStrategy = strategy;
  }

  // 実行中に戦略を変更することも可能
  public setPaymentStrategy(strategy: PaymentStrategy): void {
    this.paymentStrategy = strategy;
  }

  public checkout(amount: number): void {
    console.log(`--- Checking out with total amount: ${amount} JPY ---`);
    this.paymentStrategy.pay(amount);
  }
}

// --- 実行コード ---
function main() {
  console.log('--- Strategy Pattern Example ---');

  // クレジットカード決済戦略でショッピングカートを作成
  const creditCardStrategy = new CreditCardPayment('Taro Yamada', '1234567890123456');
  const cart1 = new ShoppingCart(creditCardStrategy);
  cart1.checkout(15000);

  console.log('\n' + '-'.repeat(30) + '\n');

  // PayPal決済戦略でショッピングカートを作成
  const payPalStrategy = new PayPalPayment('hanako@example.com');
  const cart2 = new ShoppingCart(payPalStrategy);
  cart2.checkout(8800);
  
  console.log('\n' + '-'.repeat(30) + '\n');

  // コンビニ決済に戦略を変更
  console.log('Switching payment strategy to Convenience Store Payment...');
  cart2.setPaymentStrategy(new ConvenienceStorePayment());
  cart2.checkout(3000);
}

main();
// 仮）このファイルがモジュールとして扱われるように、空のexportを追加
export {};