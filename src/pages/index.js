import styles from "../styles/Home.module.scss";
import LoginCard from "./components/LoginCard";
// import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar";

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
      <NavBar loginPage={true} />
      <LoginCard />
    </div>
  );
}
