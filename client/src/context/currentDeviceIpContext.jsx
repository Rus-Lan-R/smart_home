import { createContext, useContext, useState } from "react";

const currentDeviceIpContext = createContext();

export const CurrentDeviceIpContextProvider = ({ children }) => {
	const [deviceIP, setDeviceIP] = useState({});
	return (
		<currentDeviceIpContext.Provider value={{ deviceIP, setDeviceIP }}>
			{children}
		</currentDeviceIpContext.Provider>
	);
};

export const useCurrentDeviceIpContext = () => useContext(currentDeviceIpContext);
