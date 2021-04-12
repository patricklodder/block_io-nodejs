const Bitcoin = require('bitcoinjs-lib');

// make sure network data is extended
require('../data/networks');

const networks = module.exports = {};

// make Bitcoin testnet the default network
const DEFAULT_NETWORK = Bitcoin.networks.testnet;

const MAPPING = networks.MAPPING = {
  'BTC': 'bitcoin',
  'DOGE': 'dogecoin',
  'LTC': 'litecoin',
  'BTCTEST': 'testnet',
  'DOGETEST': 'dogecoin_testnet',
  'LTCTEST': 'litecoin_testnet'
};

networks.exists = function (net) {
  return Object.prototype.hasOwnProperty.call(MAPPING, net);
};

networks.getNetwork = function (net) {
  return networks.exists(net) ? Bitcoin.networks[MAPPING[net]] : DEFAULT_NETWORK;
};
