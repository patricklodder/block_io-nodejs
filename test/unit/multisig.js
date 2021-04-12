const test = require('tape');
const Key = require('../../lib/key');
const MultisigAddress = require('../../lib/multisig');

const FIXTURES = require('./fixtures/multisig');

test('Multisig: create 2-of-2', t => {
  t.plan(4);

  let privkeys;
  t.doesNotThrow(() => {
    privkeys = [FIXTURES.create_2_of_2.key1, FIXTURES.create_2_of_2.key2]
               .map(hex => Key.fromHex(hex));
  });

  let multisig;
  t.doesNotThrow(() => {
    multisig = MultisigAddress.fromPrivKeys(2, privkeys, FIXTURES.create_2_of_2.network);
  });

  t.equal(multisig.redeemscript.toString('hex'), FIXTURES.create_2_of_2.redeemscript, "must return the correct redeemscript");
  t.equal(multisig.address, FIXTURES.create_2_of_2.address, "must return the correct P2SH address");
});
