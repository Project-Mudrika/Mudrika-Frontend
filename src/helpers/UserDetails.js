import axios from "axios";

import { useStoreState } from "easy-peasy";
import { store } from "../features/userData"; // assuming your store is defined in ./store.js

import Router from "next/router";

class UserDetails {
  constructor() {
    this.walletId = "";
  }

  async initUserData(walletId) {
    this.walletId = walletId;
    console.log("Received wallet ID in initUserData", walletId);

    if (walletId) {
      try {
        let response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/fetch-user-data/`,
          {
            responseType: "json",
            params: {
              walletId: walletId,
            },
          }
        );

        let fetchedUserData = await response.data;

        console.log("FEtched User Data: ", fetchedUserData);

        await store.getActions().updateData(fetchedUserData);

        Router.push("/dashboard");
      } catch (error) {
        console.log(error);
      }
    }
  }
}

export default UserDetails;
