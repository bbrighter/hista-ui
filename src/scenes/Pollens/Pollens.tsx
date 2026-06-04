/// <reference types="vite-plugin-svgr/client" />
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";

import { actions } from "../../actions";
import { usePiidEffect } from "../../hooks/usePiidEffect";
import { selectIsLoadingAny } from "../../store";
import useHista from "../../store/store";
import { Loading } from "../components";
import PollenHeader from "./components/PollenHeader";
import PollenRow from "./components/PollenRow";

export default function PollenView() {
	const pollens = useHista((state) => state.pollens);
	const isLoading = useHista(selectIsLoadingAny(["pollens"]));

	usePiidEffect(() => {
		actions.pollens.list();
	}, []);

	return (
		<Loading show={isLoading}>
			<Container sx={{ padding: 2 }}>
				<PollenHeader />
				<Divider />
				<List>
					{pollens.map((pollen, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: No better idea. TODO: Improve
						<PollenRow key={i} pollen={pollen} />
					))}
				</List>
			</Container>
		</Loading>
	);
}
