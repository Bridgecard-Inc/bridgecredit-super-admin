/* Pagination Helpers */
import React from "react";

export const getPagesCount = (totalSize, sizePerPage) => {
	return Math.ceil(totalSize / sizePerPage);
};

export const getPages = (page, pagesCount, paginationSize) => {
	const result = [];
	if (!page) {
		return result;
	}

	if (pagesCount === 1) {
		result.push(1);
		return result;
	}

	if (pagesCount < page) {
		return result;
	}

	if (pagesCount < paginationSize + 1) {
		for (let i = 1; i < pagesCount + 1; i++) {
			result.push(i);
		}
		return result;
	}

	if (page === 1) {
		for (let i = 1; i < paginationSize + 1; i++) {
			if (i < pagesCount) {
				result.push(i);
			}
		}
		return result;
	}

	if (page === pagesCount) {
		for (let i = pagesCount - paginationSize + 1; i <= pagesCount; i++) {
			if (i <= pagesCount) {
				result.push(i);
			}
		}
		return result;
	}

	const shiftCount = Math.floor(paginationSize / 2);
	if (shiftCount < 1) {
		result.push(page);
		return result;
	}

	//
	if (page < shiftCount + 2) {
		for (let i = 1; i < paginationSize + 1; i++) {
			result.push(i);
		}
		return result;
	}

	if (pagesCount - page < shiftCount + 2) {
		for (let i = pagesCount - paginationSize; i < pagesCount + 1; i++) {
			result.push(i);
		}
		return result;
	}

	for (let i = page - shiftCount; i < page; i++) {
		if (i > 0) {
			result.push(i);
		}
	}
	result.push(page);
	for (let i = page + 1; i < page + shiftCount + 1; i++) {
		if (i <= pagesCount) {
			result.push(i);
		}
	}

	return result;
};

export function getHandlerTableChange(setQueryParams) {
	return (type, { page, sizePerPage, sortField, sortOrder, data }) => {
		const pageNumber = page || 1;
		setQueryParams(prev =>
			type === "sort"
				? { ...prev, sortOrder, sortField }
				: type === "pagination"
				? { ...prev, pageNumber, pageSize: sizePerPage }
				: prev
		);
	};
}

export function PleaseWaitMessage({ entities, isLoading }) {
	return (
		<>
			{entities === null && isLoading && (
				<div
					className="d-flex flex-column justify-content-center align-items-center h-100"
					style={{
						minHeight: "155px",
					}}
				>
					<div className="">Please wait...</div>
				</div>
			)}
		</>
	);
}

export function NoRecordsFoundMessage({ entities, isLoading }) {
	return (
		<>
			{entities === null && !isLoading && (
				<div
					className="d-flex flex-column justify-content-center align-items-center h-100"
					style={{
						minHeight: "155px",
					}}
				>
					No records found
				</div>
			)}
		</>
	);
}
