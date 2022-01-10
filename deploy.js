//MNEMONIC='<MNEMONIC>' URL_NETWORK='<https://rinkeby.infura.io/v3/a...>' node deploy.js
//or
//export MNEMONIC='<MNEMONIC>'
//export URL_NETWORK='<URL_NETWORK>'
//node deploy.js
const MNEMONIC = process.env.MNEMONIC;
const URL_NETWORK = process.env.URL_NETWORK;

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(MNEMONIC, URL_NETWORK);
const web3 = new Web3(provider);

const diffInMillis = (d1, d2) => Math.abs((d2.getTime() - d1.getTime()));
const log = (...params) => console.log(new Date(), ...params)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    log('Attempting to deploy from account', account);

    const start = new Date();
    const result = await new web3.eth.Contract(JSON.parse(interface))
                                .deploy({
                                    data: bytecode
                                })
                                .send({
                                    from: account,
                                    gas: '1000000'
                                });
    const end = new Date();
    //console.log(result);
    //console.log('Contract deployed to', result.options.address)
    log('Contract deployed to', result.options.address);
    log('Contract deployed in', diffInMillis(start, end), 'ms');
    provider.engine.stop();
};

deploy();