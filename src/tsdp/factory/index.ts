/**
 * @file Factory Pattern
 * @description オブジェクトの生成処理をカプセル化し、クライアントコードと具象クラスを分離します。
 */

// 共通のインターフェースを定義（名前をAppNotificationに変更）
interface AppNotification {
  send(message: string): void;
}

// 具象クラス1: Email通知
class EmailNotification implements AppNotification {
  public send(message: string): void {
    console.log(`Sending Email: "${message}"`);
  }
}

// 具象クラス2: SMS通知
class SMSNotification implements AppNotification {
  public send(message: string): void {
    console.log(`Sending SMS: "${message}"`);
  }
}

// 具象クラス3: Push通知
class PushNotification implements AppNotification {
  public send(message: string): void {
    console.log(`Sending Push Notification: "${message}"`);
  }
}

// 通知の種類を定義する型
type NotificationType = 'email' | 'sms' | 'push';

// Factoryクラス
// オブジェクトの生成ロジックをこのクラスに集約
class NotificationFactory {
  /**
   * 指定されたタイプの通知インスタンスを生成します。
   * @param type - 生成したい通知のタイプ
   * @returns AppNotificationインターフェースを実装したインスタンス
   */
  public static createNotification(type: NotificationType): AppNotification {
    switch (type) {
      case 'email':
        return new EmailNotification();
      case 'sms':
        return new SMSNotification();
      case 'push':
        return new PushNotification();
      default:
        // 型システムにより、ここに来ることはないが、念のためエラーハンドリング
        throw new Error('Invalid notification type specified.');
    }
  }
}

// --- 実行コード ---
function main() {
  console.log('--- Factory Pattern Example ---');

  // Factoryを使ってEmail通知インスタンスを生成
  const emailNotifier = NotificationFactory.createNotification('email');
  emailNotifier.send('Hello, this is a test email.');

  // Factoryを使ってSMS通知インスタンスを生成
  const smsNotifier = NotificationFactory.createNotification('sms');
  smsNotifier.send('Your verification code is 12345.');
  
  // Factoryを使ってPush通知インスタンスを生成
  const pushNotifier = NotificationFactory.createNotification('push');
  pushNotifier.send('New article has been published!');

  console.log('\nClient code does not depend on concrete classes like EmailNotification or SMSNotification.');
}

main();
