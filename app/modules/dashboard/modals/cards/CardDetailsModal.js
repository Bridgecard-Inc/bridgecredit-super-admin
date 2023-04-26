import React, { useState, useEffect } from "react";
import styles from "./CardsModal.module.scss";
import Select from "react-select";
import { motion } from "framer-motion";
import { ThreeDots } from "react-loader-spinner";
import { formatEpoch } from "../../../../../_helpers/functions/formatDate";
import SVG from "react-inlinesvg";
import { useAuthContext } from "../../../../firebase/AuthContext";
import { useSelector } from "react-redux";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { callApiWithToken } from "../../../../../_helpers/functions/callApi";

export const CardRequestsDetailsModal = () => {
	const context = useAuthContext();
	const [status, setStatus] = useState("");
	const [deliveryStat, setDeliveryStat] = useState("");
	const [updateStatus, setUpdateStatus] = useState(false);
	const [updateDelivery, setUpdateDelivery] = useState(false);
	const [updateCourier, setUpdateCourier] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [message, setMessage] = useState("");
	const {
		isCardRequestsModalVisible,
		setIsCardRequestsModalVisible,
		cardsRow,
	} = context;
	const { environment } = useSelector(state => state.app);
	console.log("object :>> ", cardsRow);
	const closeModal = () => {
		setIsCardRequestsModalVisible(false);
	};
	const containerVariants = {
		hidden: {
			y: "-200px",
			opacity: 0,
		},
		visible: {
			y: 0,
			opacity: 1,
			transition: { delay: 0, duration: 0.5 },
		},
		exit: {
			y: "-200px",
			opacity: 0,
			transition: { ease: "easeInOut" },
		},
	};

	const currency = [{ label: "PROCESSING", value: "PROCESSING" }];

	const deliveryStatus = [
		{ label: "ASSIGNED TO DISPATCH", value: "ASSIGNED_TO_DISPATCH" },
		{ label: "ARRIVING TODAY", value: "ARRIVING_TODAY" },
		{ label: "DELIVERED", value: "DELIVERED" },
	];
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
			display: "flex",
			alignItems: "center",
			paddingLeft: "20px",
		}),
	};

	const getStatus = obj => {
		let statusArr = Object.values(obj);
		return statusArr[statusArr.length - 1].request_status;
	};

	const initialValues = {
		card_type: "",
		card_brand: "",
		card_currency: "",
	};

	const validationSchema = Yup.object().shape({
		card_type: Yup.string().required("This a required field"),
		card_brand: Yup.string().required("This is a required field"),
		card_currency: Yup.string().required("This is a required field"),
	});

	const formik = useFormik({
		initialValues,
		validationSchema: validationSchema,
		onSubmit: async values => {
			setUpdateCourier(true);
			const createCard = async () => {
				setIsSubmitting(true);
				try {
					const res = await axios.post(
						`card_request/${cardsRow.card_request_id}/assign-courier/${environment}`,
						values,
						{
							headers: {
								Token: `Bearer ${token}`,
							},
						}
					);

					closeModal();
				} catch (err) {
					setError(true);
					setMessage(err.response?.data?.message);
				} finally {
					setUpdateCourier(false);
					setTimeout(() => {
						setError(false);
					}, 4000);
				}
			};

			createCard();
		},
	});

	const updateCardStatus = async token => {
		setUpdateStatus(true);
		try {
			const res = await axios.patch(
				`card_request/${cardsRow.card_request_id}/status/${status}/${environment}`,
				{},
				{
					headers: {
						Token: `Bearer ${token}`,
					},
				}
			);
		} catch (err) {
			console.log(err);
		} finally {
			setUpdateStatus(false);
		}
	};

	const updateDeliveryStatus = async token => {
		setUpdateDelivery(true);
		try {
			const res = await axios.patch(
				`card_request/${cardsRow.card_request_id}/delivery-status/${deliveryStat}/${environment}`,
				{},
				{
					headers: {
						Token: `Bearer ${token}`,
					},
				}
			);
		} catch (err) {
			console.log(err);
		} finally {
			setUpdateDelivery(false);
		}
	};

	return (
		isCardRequestsModalVisible && (
			<motion.div className={styles.modalWrapper}>
				<motion.div
					className={styles.modalCard}
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<div className={styles.modalHeader}>
						<h3>Card request details</h3>
						<div className={styles.cancel} onClick={closeModal}>
							{" "}
							<SVG src={"../media/svg/send/cancel.svg"} />
						</div>
					</div>

					<div className={styles.modalBody}>
						<React.Fragment>
							<div className={styles.modalDeets}>
								<div className={styles.deets}>
									<h4>BVN</h4>
									<p>{cardsRow?.banking_details.bank_verification_number}</p>
								</div>
								<div className={styles.deets}>
									<h4>Card request id</h4>
									<p>{cardsRow?.card_request_id}</p>
								</div>
								<div className={styles.deets}>
									<h4>Employee account id</h4>
									<span>{cardsRow?.employee_account_id}</span>
								</div>
								<div className={styles.deets}>
									<h4>Hr account id</h4>
									<span>{cardsRow?.hr_admin_account_id}</span>
								</div>
								<div className={styles.deets}>
									<h4>Request date</h4>
									<span>{formatEpoch(cardsRow?.request_created_at)}</span>
								</div>

								<div className={styles.deets}>
									<h4>Status</h4>
									<span>
										{getStatus(cardsRow.request_status_update_history)}
									</span>
								</div>
							</div>
							<div className={styles.modalData}>
								<div className={styles.deets}>
									<span>Update card request status</span>
								</div>
								<div className="auth-input-container">
									<Select
										styles={customStyles}
										placeholder="Card request status"
										options={currency}
										isSearchable={false}
										onChange={e => {
											setStatus(e.value);
										}}
										instanceId={1}
									/>
								</div>

								<button
									className="delete-btn"
									type="button"
									onClick={() => callApiWithToken(updateCardStatus)}
								>
									{" "}
									{updateStatus ? (
										<ThreeDots color="#141416" height={40} width={40} />
									) : (
										"Update status"
									)}
								</button>
							</div>

							<div className={styles.modalData}>
								<div className={styles.deets}>
									<span>Update delivery status</span>
								</div>
								<div className="auth-input-container">
									<Select
										styles={customStyles}
										placeholder="Delivery status"
										options={deliveryStatus}
										isSearchable={false}
										onChange={e => {
											setDeliveryStat(e.value);
										}}
										instanceId={2}
									/>
								</div>

								<button
									className="delete-btn"
									type="button"
									onClick={() => callApiWithToken(updateDeliveryStatus)}
								>
									{" "}
									{updateDelivery ? (
										<ThreeDots color="#141416" height={40} width={40} />
									) : (
										"Update status"
									)}
								</button>
							</div>

							<div className={styles.modalData}>
								<div className={styles.deets}>
									<span>Assign to dispatch</span>
								</div>
								<div className="auth-input-container">
									<input
										type="number"
										className={
											formik.touched.id_no && formik.errors.id_no
												? "auth-input error-input"
												: "auth-input"
										}
										placeholder="Courier phone"
										{...formik.getFieldProps("courier_phone")}
									/>
									{formik.touched.courier_phone &&
										formik.errors.courier_phone && (
											<p className="error-m">{formik.errors.courier_phone}</p>
										)}
								</div>

								<div className="auth-input-container">
									<input
										type="number"
										className={
											formik.touched.courier_name && formik.errors.courier_name
												? "auth-input error-input"
												: "auth-input"
										}
										placeholder="Courier name"
										{...formik.getFieldProps("courier_name")}
									/>
									{formik.touched.courier_name &&
										formik.errors.courier_name && (
											<p className="error-m">{formik.errors.courier_name}</p>
										)}
								</div>

								<button className="delete-btn" type="button">
									{" "}
									{updateCourier ? (
										<ThreeDots color="#141416" height={40} width={40} />
									) : (
										"Assign to dispatch"
									)}
								</button>
							</div>
						</React.Fragment>
					</div>
				</motion.div>
			</motion.div>
		)
	);
};
