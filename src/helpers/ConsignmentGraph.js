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

class ConsignmentGraph {
  NEXT_PUBLIC_API_URL =
    process.env.NEXT_PUBLIC_CONSIGNMENT_GRAPH_URL;

  constructor() {
    this.client = createClient({
      url: this.NEXT_PUBLIC_API_URL,
    });
  }

  async fetchConsignmentsByCaseId(caseId) {
    let query = `
            {
                consignmentAddeds(where: {consignment_requestId: "${caseId}"}) {
                    consignment_requestId
                    consignment_name
                    consignment_quantity
                    consignment_status
                    consignment_consignmentId
                    consignment_curr_holder
                    consignment_sender
                    consignment_receiver
                    blockTimestamp
                    transactionHash
                }
            }
        `;

    let data = await this.client.query(query).toPromise();

    const data_list = data.data.consignmentAddeds.map((item) => {
      return {
        consignment_consignmentId: item.consignment_consignmentId,
        consignment_curr_holder: Web3.utils.toChecksumAddress(item.consignment_curr_holder),
        consignment_name: item.consignment_name,
        consignment_quantity: item.consignment_quantity,
        consignment_requestId: item.consignment_requestId,
        consignment_sender: Web3.utils.toChecksumAddress(item.consignment_sender),
        consignment_status: item.consignment_status,
        consignment_receiver: Web3.utils.toChecksumAddress(item.consignment_receiver),
        timestamp: item.blockTimestamp,
        txn: item.transactionHash
      };
    });

    return data_list;
  }

  async fetchConsignmentsByHolder(address) {
    let query = `
            {
                consignmentAddeds(where: {consignment_curr_holder: "${address}"}) {
                    consignment_requestId
                    consignment_name
                    consignment_quantity
                    consignment_status
                    consignment_consignmentId
                    consignment_curr_holder
                    consignment_sender
                    transactionHash
                }
            }
        `;

    let data = await this.client.query(query).toPromise();

    const data_list = data.data.consignmentAddeds.map((item) => {
      return {
        consignment_consignmentId: item.consignment_consignmentId,
        consignment_curr_holder: Web3.utils.toChecksumAddress(item.consignment_curr_holder),
        consignment_name: item.consignment_name,
        consignment_quantity: item.consignment_quantity,
        consignment_requestId: item.consignment_requestId,
        consignment_sender: Web3.utils.toChecksumAddress(item.consignment_sender),
        consignment_status: item.consignment_status,
        txn: item.transactionHash
      };
    });

    return data_list;
  }

  async fetchConsignmentsByConsignmentId(consignmentId) {
    let query = `
            {
                consignmentAddeds(where: {consignment_consignmentId: "${consignmentId}"}) {
                    consignment_requestId
                    consignment_name
                    consignment_quantity
                    consignment_status
                    consignment_consignmentId
                    consignment_curr_holder
                    consignment_sender
                    transactionHash
                }
            }
        `;

    let data = await this.client.query(query).toPromise();

    const data_list = data.data.consignmentAddeds.map((item) => {
      return {
        consignment_consignmentId: item.consignment_consignmentId,
        consignment_curr_holder: item.consignment_curr_holder,
        consignment_name: item.consignment_name,
        consignment_quantity: item.consignment_quantity,
        consignment_requestId: item.consignment_requestId,
        consignment_sender: item.consignment_sender,
        consignment_status: item.consignment_status,
        txn: item.transactionHash
      };
    });

    return data_list;
  }

  async fetchConsignmentsAndLocationUpdatesById(consignmentId) {
    let query = `
      {
        consignmentAddeds(first: 1, where: {consignment_consignmentId: "${consignmentId}"}) {
          consignment_sender
          consignment_consignmentId
          consignment_curr_holder
          consignment_name
          consignment_receiver
          consignment_quantity
          consignment_requestId
          transactionHash
        }
        locationUpdateds(where: {consignmentId: "${consignmentId}"}) {
          consignmentId
          location
          updater
          transactionHash
        }
      }
    `;

    let data = await this.client.query(query).toPromise();

    const consignmentData = data.data.consignmentAddeds[0];
    const locationUpdates = data.data.locationUpdateds;

    const result = {
      consignment_sender: consignmentData.consignment_sender,
      consignment_consignmentId: consignmentData.consignment_consignmentId,
      consignment_curr_holder: consignmentData.consignment_curr_holder,
      consignment_name: consignmentData.consignment_name,
      consignment_receiver: consignmentData.consignment_receiver,
      consignment_quantity: consignmentData.consignment_quantity,
      consignment_requestId: consignmentData.consignment_requestId,
      txn: consignmentData.transactionHash,
      locationUpdates: locationUpdates.map((item) => ({
        consignmentId: item.consignmentId,
        location: item.location,
        updater: item.updater,
        txn: item.transactionHash
      }))
    };

    return result;
  }

}

export default ConsignmentGraph;
