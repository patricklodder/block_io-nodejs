const Bitcoin = require('bitcoinjs-lib');
const networks = require('./networks');

function MultisigAddress (required, keys, networkName) {
  this.keys = Array.isArray(keys) ? keys : [];
  this.required = required;
  this.network = networks.getNetwork(networkName);

  this.redeem = Bitcoin.payments.p2ms({ m: this.required, pubkeys: this.keys, network: this.network });
  this.p2sh = Bitcoin.payments.p2sh({ redeem: this.redeem, network: this.network });

  Object.defineProperty(this, 'redeemscript', {
    get: () => this.redeem.output,
    enumerable: true
  });

  Object.defineProperty(this, 'address', {
    get: () => this.p2sh.address,
    enumerable: true
  });
}

// create a multisig address from known private keys
MultisigAddress.fromPrivKeys = function (required, privkeys, network) {
  const pubkeys = privkeys.map(key => key.pub);
  return new MultisigAddress(required, pubkeys, network);
}

module.exports = MultisigAddress;
