"use client";

import { createContext } from "react";

interface IAuthContext {
  token: string;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export { type IAuthContext, AuthContext };
export default AuthContext;
