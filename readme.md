## (Unofficial) Node.js Client for ABA PayWay

The implementation is based on https://www.payway.com.kh/developers/

[![test](https://github.com/seanghay/payway-js/actions/workflows/node-test.yml/badge.svg)](https://github.com/seanghay/payway-js/actions/workflows/node-test.yml)

```shell
npm install payway
```

### Get started

```javascript
import { PayWayClient } from 'payway';

const client = new PayWayClient(
  'https://checkout-sandbox.payway.com.kh/',
  'your_merchant_id',
  'your_api_key',
);
```

### 1. Create Transaction

```javascript
const data = await client.create_transaction({
  tran_id: "example_01",
  payment_option: "abapay_deeplink",
  amount: 1,
  currency: "USD",
  return_url: "https://example.com/callback",
});
```

### 2. Check Transaction

```javascript
const data = await client.check_transaction("example_01");
```

### 3. List Transactions

```javascript
const data = await client.list_transaction({
  status: "PENDING"
});
```

## Supported Features

- [x] Create Transaction
- [x] Check Transaction
- [x] List Transactions
- [ ] Refund Transaction
- [ ] Pre-Authorization
- [ ] Account-On-File (AOF)
- [ ] Card-On-File (COF)
- [ ] Create Payment Link

--- 

### License

MIT
