import React, { useMemo, useEffect, useState, useId } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import * as uiHelpers from "../../../../../_helpers/TableUIHelpers";
import paginationFactory, {
	PaginationProvider,
} from "react-bootstrap-table2-paginator";

import {
	getHandlerTableChange,
	NoRecordsFoundMessage,
	PleaseWaitMessage,
} from "../../../../../_helpers/TablePaginationHelpers";
import { callApiWithToken } from "../../../../../_helpers/functions/callApi";
import { Pagination } from "../../../../../_helpers/pagination/index";
import { useTableUIContext } from "../../../../../_helpers/TableUIContext";
import { useSelector } from "react-redux";
import axios from "axios";
import { DateColumnFormatter } from "./column-formatters/DateColumnFormatter";
import Box from "../../../../utils/Box";
import { Text } from "../../../../utils/primitives";
import { useAuthContext } from "../../../../firebase/AuthContext";

export default function RequestsTable({ days }) {
	const [loading, setLoading] = useState(false);
	const [totalCount, setTotalCount] = useState(0);
	const [requests, setRequestsDeets] = useState(null);
	const { admindetails, environment } = useSelector(state => state.app);
	let id = useId();
	const tableUIContext = useTableUIContext();
	const tableUIProps = useMemo(() => {
		return {
			ids: tableUIContext.ids,
			setIds: tableUIContext.setIds,
			queryParams: tableUIContext.queryParams,
			setQueryParams: tableUIContext.setQueryParams,
		};
	}, [tableUIContext]);

	const context = useAuthContext();
	const { setRequests, setIsRequestsModalVisible } = context;

	const openModal = row => {
		setIsRequestsModalVisible(true);
		setRequests(row);
	};

	function ResponseColumnFormatter(_cellContent, row, _rowIndex) {
		return (
			<Box className="d-flex align-items-center">
				<Box ml="0">
					<Box
						className="pointer"
						cursor="pointer"
						color="#3374FF"
						fontSize="14px"
						fontWeight="300"
						m="0"
						fontFamily="Montserrat"
					>
						<a href={row.webhook_url} target="_blank" rel="noreferrer">
							{row.webhook_url}
						</a>
					</Box>
				</Box>
			</Box>
		);
	}

	function TimeColumnFormatter(_cellContent, row, _rowIndex) {
		return (
			<Box className="d-flex align-items-center">
				<Box ml="0">
					<Text
						as="p"
						fontSize="12px"
						fontWeight="300"
						m="0"
						fontFamily="Montserrat"
					>
						{row?.response_time?.toFixed(2)} secs
					</Text>
				</Box>
			</Box>
		);
	}

	function ViewColumnFormatter(_cellContent, row, _rowIndex, { openModal }) {
		return (
			<Box className="d-flex align-items-center pointer">
				<Box ml="0">
					<Text
						onClick={() => {
							openModal(row);
						}}
						as="p"
						color={"#AA8401"}
						fontSize="14px"
						fontWeight="300"
						m="0"
						fontFamily="Montserrat"
					>
						View
					</Text>
				</Box>
			</Box>
		);
	}

	const columns = [
		{
			dataField: "hr_admin_account_id",
			text: "Account id",
			style: {
				minWidth: "150px",
			},
		},
		{
			dataField: "access_request_created_at",
			text: "Request date",
			formatter: DateColumnFormatter,
			style: {
				minWidth: "100px",
			},
		},

		{
			dataField: "",
			text: "",
			formatter: ViewColumnFormatter,
			formatExtraData: { openModal },
			style: {
				minWidth: "80px",
			},
		},
	];
	const paginationOptions = {
		custom: true,
		totalSize: totalCount,
		sizePerPage: 20,
		page: tableUIProps.queryParams.pageNumber,
	};

	useEffect(() => {
		const fetchData = async token => {
			setLoading(true);
			try {
				const res = await axios.get(
					`hr_admin/access/requests/${environment}/${tableUIProps.queryParams.pageNumber}`,
					{
						headers: {
							token: `Bearer ${token}`,
						},
					}
				);
				console.log("resss", res);
				setRequestsDeets(res.data.data.data ? res.data.data.data : null);

				setTotalCount(res.data.meta.total);

				// setTotalCount(res.data.total_count);
			} catch (err) {
			} finally {
				setLoading(false);
			}
		};

		callApiWithToken(fetchData);
	}, [tableUIProps.queryParams.pageNumber, environment]);

	return (
		<React.Fragment>
			<PaginationProvider pagination={paginationFactory(paginationOptions)}>
				{({ paginationProps, paginationTableProps }) => {
					return (
						<Pagination isLoading={loading} paginationProps={paginationProps}>
							<div className="table-responsive table-wrapper-scroll-y custom-scrollbar">
								<BootstrapTable
									wrapperClasses="table-responsive "
									classes="table table-head-custom table-vertical-center overflow-hidden table-head-solid"
									bootstrap4
									bordered={false}
									remote
									keyField={id}
									data={requests === null ? [] : requests}
									columns={columns}
									defaultSorted={uiHelpers.defaultSorted}
									onTableChange={getHandlerTableChange(
										tableUIProps.setQueryParams
									)}
									{...paginationTableProps}
								/>
								<PleaseWaitMessage entities={requests} isLoading={loading} />
								<NoRecordsFoundMessage
									entities={requests}
									isLoading={loading}
								/>
							</div>
						</Pagination>
					);
				}}
			</PaginationProvider>
		</React.Fragment>
	);
}
