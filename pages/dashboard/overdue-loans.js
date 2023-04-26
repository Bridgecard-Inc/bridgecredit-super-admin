import React from "react";
import Loans from "../../app/modules/dashboard/loans/Loans";
import { TableUIProvider } from "../../_helpers/TableUIContext";

export default function OverdueLoans() {
	return (
		<React.Fragment>
			<TableUIProvider>
				<Loans />
			</TableUIProvider>
		</React.Fragment>
	);
}
