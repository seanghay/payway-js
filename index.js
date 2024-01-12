const format = require("date-fns/format");
const { createHmac } = require('node:crypto');
const axios = require('axios').default;
const { FormData } = require("formdata-node");

exports.trim = function trim(value) {
  if (typeof value === 'string') return value.trim()
  return value
}

class PayWayClient {

  constructor(base_url, merchant_id, api_key, client_factory) {
    this.base_url = base_url;
    this.merchant_id = merchant_id;
    this.api_key = api_key;

    if (typeof client_factory === 'function') {
      this._client = client_factory(this);
    } else {
      this._client = axios.create({
        baseURL: base_url,
        headers: { "Content-Type": "multipart/form-data" }
      });
    }
  }

  /**
   * @param {string[]} values 
   * @returns {string}
   */
  create_hash(values) {
    const data = values.join("")
    return createHmac("sha512", this.api_key)
      .update(data)
      .digest('base64');
  }

  create_payload(body = {}, date = new Date()) {
    body = Object.fromEntries(
      Object.entries(body)
        .filter(([k, v]) => v != null)
    );

    const req_time = format(date, 'yyyyMMddHHmmss');
    const merchant_id = this.merchant_id;
    const formData = new FormData();
    const entries = Object.entries(body);

    const hash = this.create_hash([
      req_time,
      merchant_id,
      ...Object.values(body)
    ]);

    formData.append("req_time", req_time);
    formData.append("merchant_id", merchant_id);

    for (const [key, value] of entries) {
      formData.append(key, value);
    }

    formData.append("hash", hash);
    return formData;
  }

  async create_transaction({
    tran_id,
    payment_option,
    amount,
    currency,
    return_url,
    return_deeplink,
    continue_success_url,
    pwt,
    firstname,
    lastname,
    email,
    phone
  } = {}) {

    function base64(d) {
      return Buffer.from(d).toString('base64');
    }

    if (typeof return_url === 'string') return_url = base64(return_url);
    if (typeof return_deeplink === 'string') return_deeplink = base64(return_deeplink);
    if (typeof return_deeplink === 'object' && return_deeplink != null) return_deeplink = base64(JSON.stringify(return_deeplink));

    const response = await this._client.post(
      "/api/payment-gateway/v1/payments/purchase",
      // order matters here
      this.create_payload({
        tran_id,
        amount,
        pwt,
        firstname: trim(firstname),
        lastname: trim(lastname),
        email: trim(email),
        phone: trim(phone),
        payment_option,
        return_url,
        continue_success_url,
        return_deeplink,
        currency,
      })
    );

    return response.data;
  }

  async check_transaction(tran_id) {
    const response = await this._client.post(
      "/api/payment-gateway/v1/payments/check-transaction",
      // order matters here
      this.create_payload({ tran_id })
    );
    return response.data;
  }

  async transaction_list({
    from_date,
    to_date,
    from_amount,
    to_amount,
    status
  } = {}) {
    const response = await this._client.post(
      "/api/payment-gateway/v1/payments/transaction-list",
      this.create_payload({
        from_date,
        to_date,
        from_amount,
        to_amount,
        status
      })
    );
    return response.data;
  }
}

exports.PayWayClient = PayWayClient;