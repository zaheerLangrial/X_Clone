"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { RecoilRoot } from "recoil";

type IProps = {
  children: ReactNode;
};

const SessionWrapper = ({ children }: IProps) => {
  return (
    <SessionProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </SessionProvider>
  );
};

export default SessionWrapper;
