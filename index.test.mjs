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
  t.is(data.get("req_time"), '19700101070000')
  t.is(data.get("merchant_id"), "1")
  t.is(data.get("hash"), 'yVxHUIQLg8cnRK6T9NnWfP28RKypeNkRZ+HEP/rlmfFw0B9Sc0q2jiilUki9H0NGTJGo2WdsPFJO4XC31w1Nsw==');
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
