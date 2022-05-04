import React, { createContext, useState } from "react";
import { Cookies, useCookies } from "react-cookie";

export const ImpactStore = createContext({});
export function ImpactStoreProvider({ children }) {
	const [user, setUser] = useState({
		admin: false,
		villageId: null,
		countyId: null,
		localityId: null,
		zoneRole: null,
		zoneRoleOn: null,
		
	});

	return (
		<ImpactStore.Provider value={{
			user,setUser
		}}>
			{children}
		</ImpactStore.Provider>
	)
} 