import React, { useState, useEffect, useId } from "react";
import LoansTable from "./loan-table/LoansTable";
import axios from "axios";
import Select from "react-select";
import { callApiWithToken } from "../../../../_helpers/functions/callApi";
import { useSelector } from "react-redux";

export default function Loans() {
	const [filtered, setFiltered] = useState(false);
	const [companies, setCompanies] = useState([]);
	const [companyId, setCompanyId] = useState("");
	const [loading, setLoading] = useState(false);
	const { environment } = useSelector(state => state.app);

	const handleToggle = () => {
		setFiltered(prev => !prev);
	};

	const customStyles = {
		placeholder: () => ({
			fontSize: "16px",
			color: "#797979;",
		}),

		control: (base, state) => ({
			...base,
			border: state.isFocused ? "1px solid #ecc337" : "1px solid #ebebeb",
			// This line disable the blue border
			boxShadow: "none",
			borderRadius: "12px",
			minHeight: "62px",
			width: "300px",
		}),

		singleValue: (provided, state) => ({
			...provided,
			color: "#141416",
			fontSize: "16px",
		}),

		option: (provided, state) => ({
			...provided,
			color: state.isSelected ? "white" : "black",
			background: state.isSelected ? "#ecc337" : "white",
			fontSize: "16px",
		}),

		valueContainer: (provided, state) => ({
			...provided,
			minHeight: "62px",
			width: "300px",
			display: "flex",
			alignItems: "center",
			paddingLeft: "20px",
		}),
	};

	useEffect(() => {
		const fetchData = async token => {
			setLoading(true);
			try {
				const res = await axios.get(`hr_admin/all/${environment}`, {
					headers: {
						token: `Bearer ${token}`,
					},
				});
				console.log(res);
				setCompanies(res.data.data.hr_admins ? res.data.data.hr_admins : []);

				// setTotalCount(res.data.total_count);
			} catch (err) {
			} finally {
				setLoading(false);
			}
		};

		callApiWithToken(fetchData);
	}, [environment]);

	return (
		<React.Fragment>
			<div className="issued-cards-header">
				<h1 className="dashboard-title">Overdue Loans</h1>
				<div className="auth-input-container select-margin">
					<Select
						styles={customStyles}
						placeholder="Select Hr"
						options={companies}
						isSearchable={true}
						instanceId={useId()}
						onChange={e => setCompanyId(e?.value)}
					/>
				</div>
			</div>
			<div className="table-holder">
				{" "}
				<LoansTable companyId={companyId} />
			</div>
		</React.Fragment>
	);
}
