const test = require('tape');
const CryptoHelper = require('../../lib/helper');
const FIXTURES = require('./fixtures/crypto.json');

test('Deriving a PIN into an AES key', t => {
  t.plan(2);

  t.doesNotThrow(() => {
    const key = CryptoHelper.pinToKey(FIXTURES.key_derivation.pin);
    t.equal(key, FIXTURES.key_derivation.pin_key, 'must return the correct derived key');
  }, undefined, 'must not throw any Errors');

});

test('Encrypting some data', t => {
  t.plan(2);

  let enc;
  t.doesNotThrow(() => {
    enc = CryptoHelper.encrypt(FIXTURES.encryption.cleartext, FIXTURES.key_derivation.pin_key);
    t.equal(enc, FIXTURES.encryption.ciphertext, 'must return the correct ciphertext');
  }, undefined, 'does not throw any Errors');

  test('Decrypting the encrypted data', t => {
    t.plan(2);
    t.doesNotThrow(() => {
      const dec = CryptoHelper.decrypt(FIXTURES.encryption.ciphertext, FIXTURES.key_derivation.pin_key)
      t.equal(dec, FIXTURES.encryption.cleartext, 'must return the correct cleartext');
    }, undefined, 'does not throw any Errors');

  });

});
