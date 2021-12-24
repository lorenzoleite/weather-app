import React, { createContext, useContext, useState } from 'react';

type UserConfigContextProps = {
  userConfig: UserConfig;
  setUserConfig: any;
};

type UserConfigProviderProps = {
  children: React.ReactNode;
};

type UserConfig = {
  name: string;
  size: string;
};

const UserConfigContext = createContext({} as UserConfigContextProps);

export default function UserConfigProvider({ children }: UserConfigProviderProps) {
  const [userConfig, setUserConfig] = useState<UserConfig>({
    name: '',
    size: '',
  });

  return <UserConfigContext.Provider value={{ userConfig, setUserConfig }}>{children}</UserConfigContext.Provider>;
}

export function useUserConfig() {
  const context = useContext(UserConfigContext);
  const { userConfig, setUserConfig } = context;
  return { userConfig, setUserConfig };
}
