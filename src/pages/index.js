import styles from "../styles/Home.module.scss";
// import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";

import { useWeb3 } from "@3rdweb/hooks"
import { useEffect } from "react";

export default function Home() {
  const { address, connectWallet } = useWeb3();

  const web3login = () => {
    alert(address)
  }

  useEffect(() => {
    connectWallet("injected")
  }, [])

  return (
    <div className={styles.home}>
      <NavBar web3login={web3login} />
      <Dashboard />
    </div >
  );
}
