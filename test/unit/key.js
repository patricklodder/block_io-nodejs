const test = require('tape');
const Key = require('../../lib/key');

const FIXTURES = require('./fixtures/key_ops');

test('ECKey extensions: deriving a pubkey from hex', t => {
  t.plan(2);

  let key;
  t.doesNotThrow(() => {
    key = Key.fromHex(FIXTURES.sign.private_hex);
    key.lowR = false;

    t.equal(key.pub.toString('hex'), FIXTURES.sign.public_hex, 'must return the correct pubkey');
  }, undefined, 'must not throw any Errors');

  test('ECKey extensions: signing hexdata', t => {
    t.plan(2);
    t.doesNotThrow(() => {
      const sd = key.signHex(FIXTURES.sign.hex_data);
      t.equal(sd, FIXTURES.sign.sig_high_r, 'must return the correct signature');
    }, undefined, 'must not throw any Errors');
  });

});

test('ECKey extensions: signing with low R', t => {
  t.plan(3);

  let key;
  t.doesNotThrow(() => {
    key = Key.fromHex(FIXTURES.sign.private_hex);
  }, undefined, 'must not throw any Errors');

  key.lowR = true;

  t.doesNotThrow(() => {
    const sd = key.signHex(FIXTURES.sign.hex_data);
    t.equal(sd, FIXTURES.sign.sig_low_r, 'must return the correct signature');
  }, undefined, 'must not throw any Errors');

});

test('ECKey extensions: deriving a pubkey from passphrase', t => {
  t.plan(3);

  let key;
  t.doesNotThrow(() => {
    key = Key.fromPassphrase(FIXTURES.key_derivation_passphrase.passphrase);
    t.equal(key.priv.toString('hex'), FIXTURES.key_derivation_passphrase.private_hex, 'must return the correct privkey');
    t.equal(key.pub.toString('hex'), FIXTURES.key_derivation_passphrase.public_hex, 'must return the correct pubkey');
  }, undefined, 'must not throw any Errors');

});
