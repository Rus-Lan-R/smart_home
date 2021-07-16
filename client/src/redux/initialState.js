const initState = {
	user: null,
	scanningIP: [],
	loader: false,
};

const getInitState = () => {
	const stateFromLS = JSON.parse(window.localStorage.getItem("redux"));
	return stateFromLS ? stateFromLS : initState;
};
export default getInitState;
