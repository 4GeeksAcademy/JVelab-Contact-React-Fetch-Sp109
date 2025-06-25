import ContactList from "../components/ContactList.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

  const {store, dispatch} = useGlobalReducer()

	return (
		<div className="text-center mt-5">
			<ContactList/>
		</div>
	);
}; 