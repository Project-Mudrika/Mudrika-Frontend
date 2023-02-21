import styles from "../styles/Home.module.scss";
import LoginCard from "./components/LoginCard";
// import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar";
import UserDetails from "../helpers/UserDetails";

import { useWeb3 } from "@3rdweb/hooks";

import { useStoreState, useStoreActions } from "easy-peasy";

import { useEffect } from "react";
import Router from "next/router";

export default function Home() {
  const { address, connectWallet } = useWeb3();

  const web3login = async () => {
    console.log("Sign in");
    connectWallet("injected");
  };

  const userDetails = new UserDetails();

  const userData = useStoreState((state) => state.userData);
  const updataUserData = useStoreActions((actions) => actions.updateData);

  useEffect(() => {
    // Testing state management
    console.log("User Data Store Content: ", userData);

    // Random user data
    updataUserData({
      walletId: "0x5f6372254fc0a0f71ba3eccc678c85cd37e95d50",
      type: "authority",
      data: {
        text: "random text",
      },
    });

    if (address) {
      console.log("Address present", address);

      // userDetails.fetchUserData(address).then((response) => {
      //   const userData = response.data.data;
      //   if (userData.length > 0) {
      //     console.log("Address exists and valid");
      //     Router.push("/dashboard");
      //   } else {
      //     console.log("Address exists but invalid");
      //     alert("Unregistered user. Please register first");
      //   }
      // });

      // Router.push("/dashboard");

      // API-less testing

      if (userData.type) {
        console.log("Address exists and valid");
        Router.push("/dashboard");
      } else {
        console.log("Address exists but invalid");
        alert("Unregistered user. Please register first");
      }
    }
  }, [address]);

  return (
    <div className={styles.home}>
      <NavBar loginPage={true} />
      <LoginCard login={web3login} />
    </div>
  );
}
