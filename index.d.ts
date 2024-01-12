import type { FormData } from 'formdata-node';

export declare function trim<T = string | null | undefined>(value: T): T

export declare type TransactionStatus =
  | "APPROVED"
  | "DECLINED"
  | "PENDING"
  | "PRE-AUTH"
  | "CANCELLED"
  | "REFUNDED"
  | string & {}

export declare type PaymentOption =
  | "cards"
  | "abapay"
  | "abapay_deeplink"
  | "abapay_khqr_deeplink"
  | "wechat"
  | "alipay"
  | "bakong"
  | string & {}

export declare class PayWayClient {

  public readonly base_url: string;
  public readonly merchant_id: string;
  public readonly api_key: string;

  constructor(
    base_url: string,
    merchant_id: string,
    api_key: string,
    client_factory?: (thisRef: PayWayClient) => any,
  );

  public create_hash(values: string[]): string;

  public create_payload(body?: any, date?: Date): FormData;

  public create_transaction(args: Partial<{
    tran_id: string,
    payment_option: PaymentOption,
    amount: number | string,
    currency: "USD" | "KHR",
    return_deeplink: string | { android_scheme: string, ios_scheme: string },
    continue_success_url: string,
    return_url: string,
    pwt: string,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
  }>): Promise<any>;

  public check_transaction(tran_id: string): Promise<any>;

  public transaction_list(args?: Partial<{
    from_date: string,
    to_date: string,
    from_amount: string | number,
    to_amount: string | number,
    status: TransactionStatus,
  }>): Promise<any>

}