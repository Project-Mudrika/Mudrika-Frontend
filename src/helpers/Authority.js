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
        this.contractAddress = "0x39810FC9ED89Dd870006d74683052A52Bc98CF7D";

    }

    async fetchMyBalance() {
        await this.fetchAccount();
        var account = await this.web3.eth.getAccounts();
        return this.web3.eth.getBalance(account[0])
    }

    async fetchBalance() {
        await this.fetchAccount();
        return await this.Mudrika.methods.fundRemaining().call();
    }

    async approveRequest(requestId) {
        await this.fetchAccount();
        await this.Mudrika.methods.approveRequest(requestId).send();
    }

    async requestFunds(amount, to, description) {
        await this.fetchAccount();
        await this.Mudrika.methods.requestFunds(amount, to, description).send();
        return "Success";
    }

    async watchTransferEvent(address) {
        await this.fetchAccount();
        this.Mudrika.events.fundTransferred(function (error, result) {
            if (!error) {
                if (result.returnValues.to.toUpperCase() == address.toUpperCase()) {
                    alert(result.returnValues.amount + " transferred");
                }
            }
        });
    }

    async fetchRequests() {
        await this.fetchAccount();
        var myAccount = await window.ethereum.enable();
        const requestsList = [];
        const total = await this.Mudrika.methods.requestCount().call();
        for (var i = 0; i <= total; i++) {
            const request = await this.Mudrika.methods.requestsReceived(i).call();
            if (request.to.toUpperCase() == myAccount[0].toUpperCase() && request.approvalStatus == false) {
                requestsList.push({
                    req_id: request.requestId,
                    req_address: request.to,
                    req_authority: request.from,
                    req_amount: request.fund,
                    req_desc: request.description,
                    req_time: request.timestamp
                });
            }

        }

        return requestsList;
    }

    async fetchAllotments() {
        await this.fetchAccount();
        var myAccount = await window.ethereum.enable();
        const requestsList = [];
        const total = await this.Mudrika.methods.requestCount().call();
        for (var i = 0; i <= total; i++) {
            const request = await this.Mudrika.methods.requestsReceived(i).call();
            if (request.from.toUpperCase() == myAccount[0].toUpperCase() && request.approvalStatus == true) {
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

    async fetchRequestDetails(reqId) {
        await this.fetchAccount();
        const request = await this.Mudrika.methods.requestsReceived(reqId).call();
        return {
            req_id: request.requestId,
            req_address: request.to,
            req_authority: request.from,
            req_amount: request.fund,
            req_desc: request.description,
        }
    }
}

export default Authority;