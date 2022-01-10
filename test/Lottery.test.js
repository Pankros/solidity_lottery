const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile')

describe('Lottery', () => {
    let accounts;
    let inbox;

    beforeEach(async () => {
        //get a list of all accounts
        accounts =  await web3.eth.getAccounts();
        //use une of those accounts to deploy the contract
        lottery =  await new web3.eth.Contract(JSON.parse(interface))
                                    .deploy({
                                        data: bytecode
                                    })
                                    .send({
                                        from: accounts[0],
                                        gas: '1000000'
                                    });
    });

    it('deploys a contract', () => {
        assert.ok(lottery.options.address);
    });

});