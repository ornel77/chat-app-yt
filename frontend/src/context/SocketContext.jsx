import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from './AuthContext';
import io from 'socket.io-client';

export const SocketContext = createContext();

// create the hooks that we can use everywhere
// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
  return useContext(SocketContext)
}


export const SocketContextProvider = ({ children }) => {
  // socket connection
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      // create connection if a user is co
      const socket = io('http://localhost:5000', {
        query: {
          userId: authUser._id
        }
      });
      setSocket(socket);

      // see who is or not online
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users)
      })
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
