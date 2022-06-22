import Mudrika from '../contracts/mudrika.json';
import Web3 from 'web3';

class Authority {

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
            this.Mudrika.defaultChain = 4;

        } catch (e) {
            alert(e)
            console.log("constructor " + e);
        }
    }

    constructor() {
        this.contractAbi = Mudrika.abi;
        // this.contractAddress = process.env.NEXT_PUBLIC_Contract_ID;
        this.contractAddress = "0xAd6f2348CC0780E8c71b5c976e5958b6EFc8dc97";

    }

    async approveRequest(requestId) {
        await this.fetchAccount();
        await this.Mudrika.methods.approveRequest(requestId).send();
    }

    async requestFunds(amount, description) {
        await this.fetchAccount();
        await this.Mudrika.methods.requestFunds(amount, description).send();
    }

    async fetchRequests() {
        await this.fetchAccount();
        var myAccount = await window.ethereum.enable();
        const requestsList = [];
        const total = await this.Mudrika.methods.requestCount().call();
        for (var i = 0; i <= total; i++) {
            const request = await this.Mudrika.methods.requestsReceived(i).call();
            if (request.to.toUpperCase() == myAccount[0].toUpperCase()) {
                requestsList.push({
                    req_id: request.requestId,
                    req_address: request.to,
                    req_authority: request.from,
                    req_amount: request.fund,
                    req_desc: request.description,
                });
            }

        }

        return requestsList;
    }
}

export default Authority;