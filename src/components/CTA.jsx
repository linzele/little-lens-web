import React, { useState, useEffect } from 'react';
import styles from '../style';
import PricingTable from './dashboard_components/PricingTable';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

const CTA = () => {
  const [prices, setPrices] = useState([]);
  const subscriptionPlanId = 'prod_R0zfOl6Hu8Teuy'; // Your document ID, **** WILL CRASH IF DOCUMENT NAME CHANGES TAKE NOTE !!!!!!!!!!!
  const pricesCollectionRef = collection(db, 'subscriptionPlans', subscriptionPlanId, 'prices');

  const fetchPrices = async () => {
    try {
      const querySnapshot = await getDocs(pricesCollectionRef);
      const pricesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(pricesArray);
      return pricesArray;
    } catch (error) {
      console.error('Error fetching prices: ', error);
    }
  };

  useEffect(() => {
    const fetchAndSetPrices = async () => {
      const pricesArray = await fetchPrices();
      setPrices(pricesArray);
    };

    fetchAndSetPrices();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Pricing Section */}
      <section
        className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}
      >
        <div className="flex-1 flex flex-col">
          <h2 className={styles.heading2}>Ready to get premium?</h2>
          <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
            Subscribe to our premium features starting from only @$14.99! Take pictures in style!
          </p>
        </div>
        <div className={`${styles.flexCenter} sm:ml-10 ml-0`}>
        </div>
      </section>

      {/* Pricing Cards */}
      <div className="w-full bg-black-gradient-2 rounded-lg py-8">
        <h1 className="text-3xl text-white text-center border-b-2 pb-4">Pricing</h1>
        {prices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 mt-8">
            {prices.map((price, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 text-center transition duration-300 transform hover:scale-105"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  ${(price.unit_amount * 0.01).toFixed(2)} {price.currency}
                </h2>
                <p className="text-gray-600 mb-4">Billed Every {price.interval}</p>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-white text-center p-4">
            <h1>Loading...Please Login as Admin to see full functions..</h1>
          </div>
        )}
      </div>

      {/* Comparison Table */}
      <div className="w-full bg-black-gradient-2 rounded-lg py-8 mt-8">
        <h1 className="text-3xl text-white text-center border-b-2 pb-4">Plan Comparison</h1>
        <div className="overflow-x-auto px-8">
          <table className="w-full text-white border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="text-lg font-bold text-left">Features</th>
                <th className="text-lg font-bold text-center">Basic Plan</th>
                <th className="text-lg font-bold text-center">Premium Plan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-4">General Object Detection and Description</td>
                <td className="text-center">✔️</td>
                <td className="text-center">✔️</td>
              </tr>
              <tr>
                <td className="py-4">Interactive Quizzes</td>
                <td className="text-center">✔️</td>
                <td className="text-center">✔️</td>
              </tr>
              <tr>
                <td className="py-4">Dictionary of General Objects Scanned</td>
                <td className="text-center">✔️</td>
                <td className="text-center">✔️</td>
              </tr>
              <tr>
                <td className="py-4">Realistic Text to Speech for Pictures Taken</td>
                <td className="text-center">✔️</td>
                <td className="text-center">✔️</td>
              </tr>
              <tr>
                <td className="py-4">Visualization of Learning Progress</td>
                <td className="text-center">✔️</td>
                <td className="text-center">✔️</td>
              </tr>
              <tr>
                <td className="py-4">Customised Story Generation</td>
                <td className="text-center">❌</td>
                <td className="text-center">✔️</td>
              </tr>
              <tr>
                <td className="py-4">Realistic Text to Speech Support for Stories</td>
                <td className="text-center">❌</td>
                <td className="text-center">✔️</td>
              </tr>
              <tr>
                <td className="py-4">Landmark Detection in Photos and Educational Fun Facts</td>
                <td className="text-center">❌</td>
                <td className="text-center">✔️</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CTA;
