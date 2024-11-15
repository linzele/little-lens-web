import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function PricingTable({ dataHeaders, prices, onEditClick, onDeleteClick }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {dataHeaders.map((header, index) => (
            <th key={index} className="px-6 py-3 border-b-2 text-left text-sm font-semibold text-gray-700">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {prices.map((price) => (
          <tr key={price.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-800">{price.product}</td>
            <td className="px-6 py-4 text-sm text-gray-800">{price.unit_amount}</td>
            <td className="px-6 py-4 text-sm text-gray-800">{price.recurring?.interval}</td>
            <td className="px-6 py-4 text-sm text-gray-800">{price.recurring?.interval_count}</td>
            <td className="px-6 py-4 text-sm flex space-x-2">
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function PricingPlansManagement() {
  const [prices, setPrices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editDetails, setEditDetails] = useState({});
  const [selectedPriceId, setSelectedPriceId] = useState(null);
  const [newPrice, setNewPrice] = useState({
    product: '',
    unit_amount: '',
    recurring: {
      interval: '',
      interval_count: '',
    },
  });

  const dataHeaders = ["Product Key", "Price ( In Cents )", "Interval", "Interval Count", ""];

  const subscriptionPlanId = "prod_R0zfOl6Hu8Teuy";  // Your document ID **important, any changes in ID, please change this too**

  const pricesCollectionRef = collection(db, "subscriptionPlans", subscriptionPlanId, "prices");

  const fetchPrices = async () => {
    try {
      const querySnapshot = await getDocs(pricesCollectionRef);
      const pricesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return pricesArray;
    } catch (error) {
      console.error("Error fetching prices: ", error);
    }
  };

  useEffect(() => {
    const fetchAndSetPrices = async () => {
      const pricesArray = await fetchPrices();
      setPrices(pricesArray);
    };

    fetchAndSetPrices();
  }, []);

  const handleEditClick = (price) => {
    setEditDetails(price);
    setSelectedPriceId(price.id);
    setShowModal(true);
  };

 

  const handleDelete = async (priceId) => { 
    try {
      const priceDocRef = doc(db, "subscriptionPlans", subscriptionPlanId, "prices", priceId);
      await deleteDoc(priceDocRef);

      setPrices((prevPrices) => prevPrices.filter((price) => price.id !== priceId));

      console.log("Price deleted successfully!");
    } catch (error) {
      console.error("Error deleting price:", error);
    }
  };

  return (
    <div className="md:col-span-2 border-2 w-full h-full p-4 bg-white shadow-xl rounded-lg flex flex-col">
      <div className="w-full h-[10%] border-b-2 p-4 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-800">Pricing Plans</h1>
        <Button
  onClick={() => {
    setSelectedPriceId(null);
    setShowModal(true);
    window.open('https://dashboard.stripe.com/dashboard', '_blank');
  }}
>
  Edit
</Button>
      </div>

      <PricingTable
        dataHeaders={dataHeaders}
        prices={prices}
        onEditClick={handleEditClick}
        onDeleteClick={handleDelete}
      />

      
    </div>
  );
}
