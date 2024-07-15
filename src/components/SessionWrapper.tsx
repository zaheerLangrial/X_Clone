'use client'
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";


type IProps = {
    children: ReactNode
}

const SessionWrapper = ({children}: IProps) => {
    return <SessionProvider>
        {children}
    </SessionProvider>
};

export default SessionWrapper;