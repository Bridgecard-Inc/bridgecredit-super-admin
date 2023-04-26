import React from "react";
import { TableUIProvider } from "../../_helpers/TableUIContext";
import CardRequests from "../../app/modules/dashboard/webhooks/CardRequests";
import { CardRequestsDetailsModal } from "../../app/modules/dashboard/modals/cards/CardDetailsModal";

export default function administrators() {
	return (
		<React.Fragment>
			<TableUIProvider>
				<CardRequests />
				<CardRequestsDetailsModal />
			</TableUIProvider>
		</React.Fragment>
	);
}
