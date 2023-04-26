import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext();

export function useAuthContext() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [isCardRequestsModalVisible, setIsCardRequestsModalVisible] =
		useState(false);
	const [fetching, setFetching] = useState(false);
	const [userIdToken, setUserIdToken] = useState(null);
	const [userId, setUserId] = useState("");
	const [isRequestsModalVisible, setIsRequestsModalVisible] = useState(false);
	const [requestsRow, setRequestsRow] = useState({});
	const [hasCardChanged, setHasCardChanged] = useState(false);
	const [cardsRow, setCardsRow] = useState({});
	const [memberRow, setMemberRow] = useState({});

	const cardChanged = () => {
		setHasCardChanged(prev => !prev);
	};
	const setRequests = row => {
		setRequestsRow(row);
	};

	const setCardRow = row => {
		setCardsRow(row);
	};

	const signin = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	useEffect(() => {
		setFetching(true);
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user);
			if (user !== null) {
				setUserId(user.uid);
				user.getIdToken().then(idToken => {
					setUserIdToken(idToken);
				});
			}
		});

		return unsubscribe;
	}, [currentUser, userIdToken]);

	const value = {
		currentUser,
		userIdToken,
		signin,
		fetching,
		userId,

		isRequestsModalVisible,
		setIsRequestsModalVisible,
		requestsRow,
		setRequests,

		setCardRow,
		setIsCardRequestsModalVisible,
		isCardRequestsModalVisible,

		hasCardChanged,
		cardChanged,
		cardsRow,
		setCardRow,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
