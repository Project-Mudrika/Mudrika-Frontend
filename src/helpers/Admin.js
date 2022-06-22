import Mudrika from '../contracts/mudrika.json';
import Web3 from 'web3';

class Admin {

    async fetchAccount() {
        try {
            var myAccount = await window.ethereum.enable();
            if (Array.isArray(myAccount)) {
                myAccount = myAccount[0]
            }

            this.web3 = new Web3(window.ethereum);

            this.Mudrika = new this.web3.eth.Contract(this.contractAbi, this.contractAddress);
            this.Mudrika.options.address = this.contractAddress;
            this.Mudrika.defaultAccount = myAccount;
            this.Mudrika.options.from = myAccount;
            this.Mudrika.defaultChain = 80001;

        } catch (e) {
            console.log("constructor " + e);
        }
    }

    constructor() {
        this.contractAbi = Mudrika.abi;
        this.contractAddress = process.env.REACT_APP_Contract_ID;
    }

    async addUser(account, name, userType) {
        await this.fetchAccount();
        await this.Mudrika.methods.addUser(account, userType, name).send();
    }

}

export default Admin;