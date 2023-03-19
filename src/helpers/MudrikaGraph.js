/* 
    example useage in frontend code 

    let grp = new MudrikaGraph();
    let grp2 = new ConsignmentGraph();

    let grpp = await grp.fetchFundTransfersToDepartment("0x4a1f47a15831a5f4cf627414bf57145b0b47de1a");
    let grpp2 = await grp2.fetchConsignmentsByCaseId(1);

    console.log(grpp);
    console.log(grpp2);

*/

import { createClient } from 'urql'

class MudrikaGraph {

    API_URL = "https://api.studio.thegraph.com/query/43448/mudrika_test/v0.0.1"

    constructor() {
        this.client = createClient({
            url: this.API_URL,
        })
    }

    // for now only "to" works as contract doesn't have a from field, will modify later
    async fetchFundTransfersToDepartment(address) {
        let query = `
                {
                    fundTransferreds(
                    first: 5
                    where: {to: "${address}"}
                    ) {
                    id
                    requestId
                    amount
                    to
                    }
                }
        `

        let data = await this.client.query(query).toPromise()

        const data_list = data.data.fundTransferreds.map(item => ({
            id: item.id,
            amount: item.amount,
            requestId: item.requestId,
            to: item.to
        }));

        return data_list
    }
}

export default MudrikaGraph;