import axios from "axios";

class UserDetails {
  constructor() {
    this.walletId = "";
    this.userData = {};
  }

  async fetchUserData(walletId) {
    this.walletId = walletId;
    console.log("Received wallet ID", walletId);

    this.userData = axios
      .get("https://mudrika.herokuapp.com/api/fetch-user-data/?", {
        responseType: "json",
        params: {
          walletid: walletId,
        },
      })
      .catch((error) => {
        console.log(error);
      });

    return this.userData;
  }
}

export default UserDetails;
