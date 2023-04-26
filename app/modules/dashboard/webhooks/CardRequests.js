import React from "react";
import CardRequestsTable from "./cardrequests-table/CardRequestsTable";

export default function CardRequests() {
	return (
		<React.Fragment>
			<div className="issued-cards-header">
				<h1 className="dashboard-title">Clients Webhooks</h1>
			</div>
			<div className="table-holder">
				{" "}
				<CardRequestsTable />
			</div>
		</React.Fragment>
	);
}
