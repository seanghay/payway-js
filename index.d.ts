import type { FormData } from 'formdata-node';

export declare class PayWayClient {

  public readonly base_url: string;
  public readonly merchant_id: string;
  public readonly api_key: string;

  constructor(
    base_url: string,
    merchant_id: string,
    api_key: string
  );

  public create_hash(values: string[]): string;

  public create_payload(body?: any): FormData;

  public create_transaction(args: Partial<{
    tran_id: string,
    payment_option: string,
    amount: number | string,
    currency: "USD" | "KHR",
    return_url: string,
  }>): Promise<any>;

  public check_transaction(tran_id: string): Promise<any>;

  public transaction_list(args: Partial<{
    from_date: string,
    to_date: string,
    from_amount: string | number,
    to_amount: string | number,
    status: string,
  }>): Promise<any>

}