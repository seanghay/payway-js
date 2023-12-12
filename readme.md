## Node.js Client for ABA PayWay

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
const data = await client.check_transaction({
  tran_id: "example_01",
});
```

### 3. List Transactions

```javascript
const data = await client.check_transaction({
  status: "PENDING"
});
```

--- 

### License

MIT
