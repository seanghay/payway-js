import test from 'ava'
import { PayWayClient } from './index.js'

test("should hash", t => {
  const client = new PayWayClient("http://example.com", "1", "1");
  const hash = client.create_hash([
    'a',
    'b',
    'c'
  ]);
  t.is(hash, 'JcTO3d5PoVoVRPIWjUg9bTRrSTpFhu9JXOLm+nLjrmDatGZuSz9eDv323DX05K1r/BYx60AQVZ+GOWbTS4XUvw==');
})

test("should create formdata", t => {
  const client = new PayWayClient("http://example.com", "1", "1");
  const date = new Date(0);
  const data = client.create_payload({
    a: 'a-value',
    b: 'b-value',
    c: null,
    d: undefined,
  }, date);
  t.true(data.has("req_time"))
  t.is(data.get("merchant_id"), "1")
  t.true(data.has("hash"));
  t.is(data.get("a"), 'a-value');
  t.is(data.get("b"), 'b-value');
  t.false(data.has('c'))
  t.false(data.has('d'))
});

test('client factory', t => {
  const client = new PayWayClient("http://example.com", "1", "1", (thisRef) => thisRef.base_url);
  t.is(client._client, "http://example.com");
})

test('default factory', t => {
  const client = new PayWayClient("http://example.com", "1", "1");
  t.true('get' in client._client);
  t.true('post' in client._client);  
})
