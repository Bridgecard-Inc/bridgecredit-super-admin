import React from "react";
import SVG from "react-inlinesvg";
import { useRouter } from "next/router";

export const AsideMenuLinks = () => {
	const router = useRouter();
	const { asPath } = router;

	const getActiveClass = path => {
		if (asPath.includes(path)) return "active";
		else return "";
	};

	const handleClick = path => {
		router.push(`/dashboard/${path}`);
	};

	const handleDashboard = () => {
		router.push(`/dashboard`);
	};

	return (
		<div className="aside-menu">
			<div className="aside-menu-links">
				{/*
				<div className="aside-menu-link">
					<SVG src={"../media/svg/menu-icons/balance.svg"} />
					<p className="menu--text">Balance</p>
					</div> */}
				<div
					className={
						asPath === "/dashboard/requests"
							? "aside-menu-link active"
							: "aside-menu-link"
					}
					onClick={() => {
						handleClick("requests");
					}}
				>
					{asPath === "/dashboard/requests" ? (
						<SVG src={"../../../media/svg/notifications.svg"} />
					) : (
						<SVG src={"../../../media/svg/notifications.svg"} />
					)}
					<p className="menu--text">Requests</p>
				</div>

				<div
					className={
						asPath === "/dashboard/card-requests"
							? "aside-menu-link active"
							: "aside-menu-link"
					}
					onClick={() => {
						handleClick("card-requests");
					}}
				>
					{asPath === "/dashboard/card-requests" ? (
						<SVG src={"../../../media/svg/menu-icons/User-notify.svg"} />
					) : (
						<SVG src={"../../../media/svg/menu-icons/User-notify-lte.svg"} />
					)}
					<p className="menu--text">Card requests</p>
				</div>

				<div
					className={
						asPath === "/dashboard/overdue-loans"
							? "aside-menu-link active"
							: "aside-menu-link"
					}
					onClick={() => {
						handleClick("overdue-loans");
					}}
				>
					{asPath === "/dashboard/overdue-loans" ? (
						<SVG src={"../../../media/svg/menu-icons/issued-cards-lte.svg"} />
					) : (
						<SVG src={"../../../media/svg/menu-icons/issued-cards.svg"} />
					)}
					<p className="menu--text">Overdue loans</p>
				</div>

				<div className="settings-menu">
					<div
						className={
							asPath === "/dashboard/settings"
								? "aside-menu-link active"
								: "aside-menu-link"
						}
						onClick={() => {
							handleClick("settings");
						}}
					>
						{asPath === "/dashboard/settings" ? (
							<SVG src={"../../../media/svg/menu-icons/settings-lte.svg"} />
						) : (
							<SVG src={"../../../media/svg/menu-icons/settings.svg"} />
						)}
						<p className="menu--text">Settings</p>
					</div>
				</div>
			</div>
		</div>
	);
};
