import React from "react";
import Requests from "../../app/modules/dashboard/requests/Requests";
import { TableUIProvider } from "../../_helpers/TableUIContext";
import { RequestsDetailsModal } from "../../app/modules/dashboard/modals/webhook/RequestsDetailsModal";

export default function webhooks() {
	return (
		<React.Fragment>
			<TableUIProvider>
				<Requests />
			</TableUIProvider>
			<RequestsDetailsModal />
		</React.Fragment>
	);
}
