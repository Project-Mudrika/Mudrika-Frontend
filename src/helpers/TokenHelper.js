import MudrikaToken from '../contracts/mdk.json';
import Web3 from 'web3';

class TokenHelper {

    async fetchAccount() {
        try {
            var myAccount = await window.ethereum.enable();
            if (Array.isArray(myAccount)) {
                myAccount = myAccount[0]
            }

            this.web3 = new Web3(window.ethereum);

            this.MudrikaToken = new this.web3.eth.Contract(this.contractAbi, this.contractAddress);
            this.MudrikaToken.options.address = this.contractAddress;
            this.MudrikaToken.defaultAccount = myAccount;
            this.MudrikaToken.options.from = myAccount;
            this.MudrikaToken.defaultChain = 80001;

        } catch (e) {
            console.log("constructor " + e);
        }
    }

    constructor() {
        this.contractAbi = MudrikaToken.abi;
        this.contractAddress = process.env.NEXT_PUBLIC_Token_Contract_ID;
    }

    async fetchBalance() {
        await this.fetchAccount();
        var account = await this.web3.eth.getAccounts();
        var balance = await this.MudrikaToken.methods.balanceOf(account[0]).call();
        return balance / (10 ** 18);
    }

    async mintTokens(toAddress, amount) {
        await this.fetchAccount();
        var amount_string = (amount * (10 ** 18)).toString();
        await this.MudrikaToken.methods.mint(toAddress, amount_string).send();
        return "Success"
    }

}

export default TokenHelper;