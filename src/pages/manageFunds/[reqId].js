import { useRouter } from "next/router";
import React from "react";

function ReqId() {
  const {
    query: { reqId },
  } = useRouter();

  console.log("reqId", reqId);
  return <div className="ReqId">haha lol</div>;
}

export default ReqId;
