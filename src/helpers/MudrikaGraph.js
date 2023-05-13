/* 
    example useage in frontend code 

    let grp = new MudrikaGraph();
    let grp2 = new ConsignmentGraph();

    let grpp = await grp.fetchFundTransfersToDepartment("0x4a1f47a15831a5f4cf627414bf57145b0b47de1a");
    let grpp2 = await grp2.fetchConsignmentsByCaseId(1);

    console.log(grpp);
    console.log(grpp2);

*/

import { createClient } from "urql";
import Web3 from 'web3';

class MudrikaGraph {
  NEXT_PUBLIC_API_URL =
    process.env.NEXT_PUBLIC_MUDRIKA_GRAPH_URL;

  constructor() {
    this.client = createClient({
      url: this.NEXT_PUBLIC_API_URL,
    });
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
        `;

    let data = await this.client.query(query).toPromise();

    const data_list = data.data.fundTransferreds.map((item) => ({
      id: item.id,
      amount: item.amount,
      requestId: item.requestId,
      to: Web3.utils.toChecksumAddress(item.to),
      // from: Web3.utils.toChecksumAddress(item.by)
    }));

    return data_list;
  }

  // For search by caseID
  async fetchByCaseID(caseID) {
    console.log("reached");
    let query = `
        {
            fundTransferreds(where: {requestId: "${caseID}"}) {
              amount
              to
              blockTimestamp
            }
          }
        `;
    var data_list = []

    try {
      let data = await this.client.query(query).toPromise();
      data_list = data.data.fundTransferreds.map((item) => ({
        amount: item.amount,
        to: Web3.utils.toChecksumAddress(item.to),
        timestamp: item.blockTimestamp,
      }));
    } catch (error) {
      console.log(error);
      console.log("Graph is down")
    }

    console.log(data_list);
    return data_list;
  }
}

export default MudrikaGraph;
