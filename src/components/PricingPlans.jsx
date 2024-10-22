import { useState, useEffect } from 'react';
import PricingTable from './dashboard_components/PricingTable';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

export default function PricingPlans() {
  const [prices, setPrices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editDetails, setEditDetails] = useState({});
  const [selectedPriceId, setSelectedPriceId] = useState(null);

  const dataHeaders = ["Product Key", "Price", "Interval", "Interval Count", ""];

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

  const handleCancel = () => {
      setEditDetails({}); 
      setShowModal(false); 
  };

  const handleSave = async () => {
      if (!selectedPriceId) return;

      try {
          const docRef = doc(db, "subscriptionPlans", subscriptionPlanId, "prices", selectedPriceId);

          await updateDoc(docRef, {
              product: editDetails.product,
              unit_amount: editDetails.unit_amount,
              recurring: {
                  interval: editDetails.recurring.interval,
                  interval_count: editDetails.recurring.interval_count,
              },
          });

          setPrices((prevPrices) =>
              prevPrices.map((price) =>
                  price.id === selectedPriceId ? editDetails : price
              )
          );
          setShowModal(false);
      } catch (error) {
          console.error("Error updating price:", error);
      }
  };

  return (
      <div className="md:col-span-2 border-2 w-full h-full p-2 bg-white shadow-xl rounded-lg flex flex-col">
          <div className="w-full h-[10%] border-b-2 p-2 self-center flex items-center justify-center">
              <h1 className="text-4xl">Pricing Plans</h1>
          </div>

          <PricingTable
              dataHeaders={dataHeaders}
              prices={prices}
              onEditClick={handleEditClick}
          />

          {/* Edit Modal */}
          {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                  <div className="bg-white p-6 rounded-md w-1/3">
                      <h2 className="text-xl font-semibold mb-4">Edit Price Details</h2>

                      {/* Form for editing price details */}
                      <div className="mb-4">
  <label className="block text-sm font-medium">Product</label>
  <input
      type="text"
      className="border p-2 w-full"
      value={editDetails.product || ''}
      onChange={(e) => setEditDetails({ ...editDetails, product: e.target.value })}
  />
</div>

<div className="mb-4">
  <label className="block text-sm font-medium">Price</label>
  <input
      type="number"
      className="border p-2 w-full"
      value={editDetails.unit_amount || ''}
      onChange={(e) => setEditDetails({ ...editDetails, unit_amount: e.target.value })}
  />
</div>

<div className="mb-4">
  <label className="block text-sm font-medium">Interval</label>
  <input
      type="text"
      className="border p-2 w-full"
      value={editDetails.recurring?.interval || ''}
      onChange={(e) =>
          setEditDetails({
              ...editDetails,
              recurring: {
                  ...editDetails.recurring,
                  interval: e.target.value,
              },
          })
      }
  />
</div>

<div className="mb-4">
  <label className="block text-sm font-medium">Interval Count</label>
  <input
      type="number"
      className="border p-2 w-full"
      value={editDetails.recurring?.interval_count || ''}
      onChange={(e) =>
          setEditDetails({
              ...editDetails,
              recurring: {
                  ...editDetails.recurring,
                  interval_count: e.target.value,
              },
          })
      }
  />
</div>


                      {/* Modal Actions */}
                      <div className="flex justify-end">
                          <button
                              className="bg-gray-300 px-4 py-2 mr-2 rounded"
                              onClick={handleCancel}
                          >
                              Cancel
                          </button>
                          <button
                              className="bg-blue-500 text-white px-4 py-2 rounded"
                              onClick={handleSave} 
                          >
                              Save
                          </button>
                      </div>
                  </div>
              </div>
          )}
      </div>
  );
}
