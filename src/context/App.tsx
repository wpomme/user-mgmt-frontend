import { createContext, useContext, FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router'

interface AppContextProps {
  accessToken: string | null
}

export const AppContext = createContext<AppContextProps>({
  accessToken: null
});

export const AppProvider: FC = ({children}) => {
  const router = useRouter()
  const [accessToken, setAccessToken] = useState("")

  useEffect(() => {
    const storageToken = sessionStorage.getItem('accessToken')
    if (!storageToken){
      router.push('/login')
    } else {
      setAccessToken(storageToken)
    }
  }, [router])

  return (
    <AppContext.Provider value={{ accessToken }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
