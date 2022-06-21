import styles from "../styles/Home.module.scss";
import LoginCard from "./components/LoginCard";
// import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar";

import { useWeb3 } from "@3rdweb/hooks"
import { useEffect } from "react";
import Router from 'next/router';

export default function Home() {
  const { address, connectWallet } = useWeb3();

  const web3login = async () => {
    connectWallet("injected")
  }

  useEffect(() => {
    if (address) {
      Router.push('/dashboard');
    }
  })

  return (
    <div className={styles.home}>
      <NavBar loginPage={true} />
      <LoginCard login={web3login} />
    </div>
  );
}
