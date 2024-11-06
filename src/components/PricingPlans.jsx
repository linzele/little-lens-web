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
              <Button variant="primary" onClick={() => onEditClick(price)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => onDeleteClick(price.id)}>
                Delete
              </Button>
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

  const handleCancel = () => {
    setEditDetails({});
    setSelectedPriceId(null);
    setShowModal(false);
    setNewPrice({
      product: '',
      unit_amount: '',
      recurring: {
        interval: '',
        interval_count: '',
      },
    });
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

  const handleCreate = async () => {
    try {
      const newPriceRef = await addDoc(pricesCollectionRef, {
        product: newPrice.product,
        unit_amount: newPrice.unit_amount,
        recurring: {
          interval: newPrice.recurring.interval,
          interval_count: newPrice.recurring.interval_count,
        },
      });

      setPrices((prevPrices) => [
        ...prevPrices,
        { id: newPriceRef.id, ...newPrice },
      ]);

      setNewPrice({
        product: '',
        unit_amount: '',
        recurring: {
          interval: '',
          interval_count: '',
        },
      });

      setShowModal(false);
      console.log("Price created successfully!");
    } catch (error) {
      console.error("Error creating price:", error);
    }
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
        <Button onClick={() => {
          setSelectedPriceId(null);
          setShowModal(true);
        }}>Create</Button>
      </div>

      <PricingTable
        dataHeaders={dataHeaders}
        prices={prices}
        onEditClick={handleEditClick}
        onDeleteClick={handleDelete}
      />

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-center mb-4">{selectedPriceId ? 'Edit' : 'Create'} Price</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product</label>
                <Input
                  type="text"
                  value={selectedPriceId ? editDetails.product : newPrice.product}
                  onChange={(e) => selectedPriceId
                    ? setEditDetails({ ...editDetails, product: e.target.value })
                    : setNewPrice({ ...newPrice, product: e.target.value })
                  }
                  className="mt-1 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <Input
                  type="number"
                  value={selectedPriceId ? editDetails.unit_amount : newPrice.unit_amount}
                  onChange={(e) => selectedPriceId
                    ? setEditDetails({ ...editDetails, unit_amount: e.target.value })
                    : setNewPrice({ ...newPrice, unit_amount: e.target.value })
                  }
                  className="mt-1 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Interval</label>
                <Input
                  type="text"
                  value={selectedPriceId ? editDetails.recurring?.interval : newPrice.recurring.interval}
                  onChange={(e) => selectedPriceId
                    ? setEditDetails({
                        ...editDetails,
                        recurring: {
                          ...editDetails.recurring,
                          interval: e.target.value,
                        },
                      })
                    : setNewPrice({
                        ...newPrice,
                        recurring: {
                          ...newPrice.recurring,
                          interval: e.target.value,
                        },
                      })
                  }
                  className="mt-1 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Interval Count</label>
                <Input
                  type="number"
                  value={selectedPriceId ? editDetails.recurring?.interval_count : newPrice.recurring.interval_count}
                  onChange={(e) => selectedPriceId
                    ? setEditDetails({
                        ...editDetails,
                        recurring: {
                          ...editDetails.recurring,
                          interval_count: e.target.value,
                        },
                      })
                    : setNewPrice({
                        ...newPrice,
                        recurring: {
                          ...newPrice.recurring,
                          interval_count: e.target.value,
                        },
                      })
                  }
                  className="mt-1 w-full"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCancel} className="px-4 py-2">Cancel</Button>
              <Button variant="primary" onClick={selectedPriceId ? handleSave : handleCreate} className="px-4 py-2">
                {selectedPriceId ? 'Save' : 'Create'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
