import axios from 'axios'
import React, { useState } from 'react';
import './css/AddToCart.css';
import WSppiner from '../../common/WSppiner';
import rainbowImage from '../ClientFolder/Images/logo1.png';
import { getDateFormat } from '../sharedModuls/Utils/Utils';
import { Redirect, Link, useHistory } from 'react-router-dom';

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}


const razorPayMode = document.domain === 'localhost' ? process.env.REACT_APP_RAZORPAY_TEST_MODE_KEY_ID : process.env.REACT_APP_RAZORPAY_LIVE_MODE_KEY_ID;

function RozePay(props) {
	const history = useHistory();
	console.log(razorPayMode);
	const [isLoading, setIsLoading] = useState(false);
	//console.log("All Data is ",props.allData)
	const orderConfirm = () => {
		setIsLoading(true);
		axios.post(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/orderConfirm`,
			{
				emailId: props.email,
				allData: props.allData,
				delAddressID: props.delAddressID,
				customerID: props.customerID,
				deliveryDate: getDateFormat(props.deliveryDate)
			}, { headers: { 'x-access-token': localStorage.getItem("accessToken") } })
			.then(response => {

				console.log("After Plan Updated ", response.data);

				if (response.data == "insertSucessfully") {
					setIsLoading(false);
					console.log("hahha")
					history.push("/OrderConfirmed", { orderData: props });
				}
				else {
					setIsLoading(false);
					console.log("fails")
				}

			}).then(error => {

				setIsLoading(false);
				console.log("Plan not updated ");

			})
	}

	let data = "";
	const sendData = {

		mobile: props.mobile,
		email: props.email,
		amount: props.amount
	}


	const [name, setName] = useState(props.clientName)

	async function displayRazorpay() {



		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
		console.log("response is : ", res)
		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		// const data = await fetch('https://clientback.wematter.co.in/razorpay',
		// {

		// const data = await fetch('https://backend.we-matter.net/razorpay',
		// {


		const data = await fetch(`${process.env.REACT_APP_API_URL_BACKEND_CALL}/razorpay`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-access-token': localStorage.getItem("accessToken") 
				},
				body: JSON.stringify(sendData)

			}).then((t) =>
				t.json()
			)

		const options = {
			key: 'rzp_live_gnghsAiTf0I79b',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: `Rainbow Cart`,
			description: 'Thank you for nothing. Please give us some money',
			image: rainbowImage,
			handler: function (response) {
				// alert(response.razorpay_payment_id)
				// alert(response.razorpay_order_id)
				// alert(response.razorpay_signature)
				if (response.razorpay_payment_id != null && response.razorpay_payment_id != undefined && response.razorpay_payment_id != "") {

					orderConfirm();
				}
			},
			prefill: {
				name,
				rainbowImage,
				email: props.email,
				phone_number: props.mobile
			}
		}

		const paymentObject = new window.Razorpay(options)
		paymentObject.open()

	}

	return (
		<div >
			{isLoading && <WSppiner isLoading={isLoading} />}
			<a
				className="App-link"
				onClick={displayRazorpay}
				target="_blank"
				rel="noopener noreferrer"
			>
				<button className="deliverhere">Pay Online</button>
			</a>

		</div>
	)
}





export default RozePay;