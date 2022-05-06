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
	const [feedDialog, setFeedDialog] = useState(false);

	return (
		<ImpactStore.Provider value={{
			user,setUser,
			feedDialog, setFeedDialog
		}}>
			{children}
		</ImpactStore.Provider>
	)
} 