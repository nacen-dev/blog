"use client";

import { useState } from "react";
import { Button } from "./button";

type CopyButtonProps = {
  text: string;
};

export const CopyButton = ({ text }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  };

  return (
    <Button disabled={isCopied} onClick={copy} variant={"ghost"}>
      {isCopied ? "Copied!" : "Copy"}
    </Button>
  );
};
