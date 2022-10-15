import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Styled from 'styled-components'
import { selectUser } from '../features/UserSlice';
import db from '../firebase';
import { loadStripe } from "@stripe/stripe-js";

const Plans = () => {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        db.collection("customers").doc(user.uid).collection("subscriptions").get().then((querySnapshot) => {
            querySnapshot.forEach(async (subscription) => {
                setSubscription({
                    role: subscription.data().role,
                    current_plan_end: subscription.data().current_period_end.seconds,
                    current_plan_start: subscription.data().current_period_start.seconds,
                });
            });
        });
    }, [user.uid]);

    useEffect(() => {
        db.collection('products').where("active", '==', true).get().then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection("prices").get();
                priceSnap.docs.forEach((price) => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data(),
                    };
                });
            });
            setProducts(products);
        });
    }, []);

    // console.log(subscription);

    const loadCheckout = async (priceId) => {
        const docRef = await db.collection('customers').doc(user.uid).collection("checkout_sessions").add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });

        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data();
            if (error) {
                //shows ans error to your customer and inspect our Cloud function logs in the firebase consoleControl
                alert(`An error occuered: ${error.message}`);
            }
            if (sessionId) {
                //We have a session, Let's redirect to checkout 
                const stripe = await loadStripe('pk_test_51LpwZiSGN8qM18vXuYePrbIs2UrhTdKVMZvQzaXTp8gR3DS3UEjJDN12ed5QhfBcGn2rVvgChVkva2sGXHddaffr00NPxLy6JU');
                stripe.redirectToCheckout({ sessionId });
            }
        });
    };

    // console.log(products);
    return (
        <PlanStyle>
            <br />
            {subscription && (

                <p>Renewal Date: {" "}
                    {new Date(subscription?.current_plan_end * 1000).toLocaleDateString()}
                </p>
            )}
            {Object.entries(products).map(([productId, productData]) => {
                //add the login to check if the user's subscribption is activebutton

                const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);
                return (
                    <div className={`${isCurrentPackage && "plans__plan--disabled"} plans__plan`} key={productId}>
                        <div className="plans__info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() => isCurrentPackage && loadCheckout(productData.prices.priceId)}>
                            {isCurrentPackage ? "Current Package" : "Subscribe"}
                        </button>
                    </div>
                )
            })}
        </PlanStyle>
    )
}

export default Plans;

const PlanStyle = Styled.div`
    .plans__plan {
        display:flex;
        justify-content:space-between;
        align-items:center;
        opacity:0.8;
        padding:15px;
        &:hover{
            opacity:1;
        }
        button{
            padding:10px  20px;
            font-size:1rem;
            color:#fff;
            background:#e50914;
            font-weight:600;
            border:none;
            cursor:pointer;
        }
    }
    .plans__plan--disabled{
        button{
            background:gray;
            opacity: 1;
        }
    }
`;