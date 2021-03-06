const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../compile')

describe('Lottery', () => {
    let accounts;
    let lottery;

    beforeEach(async () => {
        //get a list of all accounts
        accounts =  await web3.eth.getAccounts();
        //use une of those accounts to deploy the contract
        lottery =  await new web3.eth.Contract(abi)
                                    .deploy({
                                        data: evm.bytecode.object
                                    })
                                    .send({
                                        from: accounts[0],
                                        gas: '1000000'
                                    });
    });

    it('deploys a contract', () => {
        assert.ok(lottery.options.address);
    });

    it('allows one account to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.011', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

    it('allows multiple accounts to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.011', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.011', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.011', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
    });

    it('requires a minimum amount of ether to enter', async () => {
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: web3.utils.toWei('0.001', 'ether')
            });
        } catch (err) {
            assert(err);
            return;
        }
        assert(false);
    });

    it('only manager can pick a winner', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.011', 'ether')
        });

        try {
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            });
        } catch (err) {
            assert(err);
            return;
        }
        assert(false);
         
    });

    it('sends money to the winner and reset the players array', async () => {
        const winner = accounts[1];

        await lottery.methods.enter().send({
            from: winner,
            value: web3.utils.toWei('2', 'ether')
        });
        
        const initialBalance = await web3.eth.getBalance(winner);
        await lottery.methods.pickWinner().send({from: accounts[0]});
        const finalBalance = await web3.eth.getBalance(winner);
        const difference = finalBalance - initialBalance;

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.ok(difference > web3.utils.toWei('1.8', 'ether'));
        assert.equal(0, players.length);

    });

});