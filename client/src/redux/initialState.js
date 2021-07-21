const initState = {
  user: null,
  scanningIP: [],  
  loader: false,
  rooms: { 
    items: [],
    isLoading: false,
    error: null,
  },
  devices: {
    items: [],
    isLoading: false,
    error: null,
  },
  scenarios: {
    items: [],
    isLoading: false,
    error: null,
  },
	allDevices: {
		items: [],
		isLoading: false,
		error: null,
	},
	sensors: {
		items: [],
		isLoading: false,
		error: null,
	},
  currentMarker: {
    items: {},
    isLoading: false,
    error: null,
  },
};

const getInitState = () => {
	const stateFromLS = JSON.parse(window.localStorage.getItem("redux"));
	return stateFromLS ? stateFromLS : initState;
};
export default getInitState;
