import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../Config/firebase-config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [userC, setUserC] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			setUserC(authUser);
		});

		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ userC }}>{children}</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
