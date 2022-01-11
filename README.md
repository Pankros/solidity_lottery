# Ethereum and Solidity: [The Complete Developer's Guide](https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide)

## Section 3: Advanced Smart Contract

### Prerequisites

[Node](https://nodejs.org/es/)

### Install

`npm install`

### Compile

`node compile.js`

### Test

`npm run test`

### Deploy

- It is necessary to have your Ethereum account in order to use the Mnemonic. I used [Metamask](https://metamask.io/).
- This project uses infura to deploy the contract, so you will need an account. [You can create here](https://infura.io).

- Configure the env variable **MNEMONIC** with all the Mneminic words... obviusly.
- Configure the env variable **URL_NETWORK** with the network endpoint provided by infura, should look like this <https://rinkeby.infura.io/v3/a03d...> (this is for rinkeby network).

Now we can execute.

`node deploy.js`

Have fun.
