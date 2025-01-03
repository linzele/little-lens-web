import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import { db } from '@/firebase/firebase';
import { useEffect, useState } from "react";

export default function CompanyContact() {

    const [companyDetails, setCompanyDetails] = useState({});
    const [showModal, setShowModal] = useState(false); // State to toggle modal
    const [editDetails, setEditDetails] = useState({}); // State to hold editable data

    // Function to fetch company details
    async function getCompanyDetails() {
        try {
            const accountsCollection = collection(db, 'CompanyContact');
            const querySnapshot = await getDocs(accountsCollection);
            let temp = [];
            querySnapshot.forEach((doc) => {
                temp.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            setCompanyDetails(temp[0]); 
        } catch (error) {
            console.error("Error fetching company details:", error);
        }
    }

    useEffect(() => {
        getCompanyDetails();
    }, []);

    const handleEdit = () => {
        setEditDetails(companyDetails); 
        setShowModal(true); 
    };

    const handleCancel = () => {
        setShowModal(false); 
    };

    // Function to handle saving edited data back to Firebase
    const handleSave = async () => {
        try {
            const docRef = doc(db, 'CompanyContact', companyDetails.id);  

            // Update the document in Firestore with the edited details
            await updateDoc(docRef, {
                address: editDetails.address,
                email: editDetails.email,
                socials: editDetails.socials 
            });

            // Update the state with the new details and close the modal
            setCompanyDetails(editDetails);
            setShowModal(false);
        } catch (error) {
            console.error("Error updating company details:", error);
        }
    };

    return (
        <div className='w-full md:h-[50%] shadow-lg border-2 rounded-lg'>
            {(Object.keys(companyDetails).length !== 0) ? (
                <>
                    {/* HEADER */}
                    <div className='w-full flex flex-row p-4 pb-1 justify-between items-center'>
                        <h1 className='text-xl font-bold underline'>Company's Contact Details</h1>
                        <button onClick={handleEdit}>
                            <svg width="25" height="25" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M29.1429 27.5715H2.85714C2.22499 27.5715 1.71428 28.0822 1.71428 28.7144V30.0001C1.71428 30.1572 1.84285 30.2858 1.99999 30.2858H30C30.1571 30.2858 30.2857 30.1572 30.2857 30.0001V28.7144C30.2857 28.0822 29.775 27.5715 29.1429 27.5715ZM6.91785 24.5715C6.98928 24.5715 7.06071 24.5644 7.13214 24.5536L13.1393 23.5001C13.2107 23.4858 13.2786 23.4536 13.3286 23.4001L28.4679 8.26078C28.501 8.22774 28.5272 8.1885 28.5451 8.14529C28.5631 8.10209 28.5723 8.05577 28.5723 8.009C28.5723 7.96222 28.5631 7.91591 28.5451 7.8727C28.5272 7.8295 28.501 7.79025 28.4679 7.75721L22.5321 1.81793C22.4643 1.75007 22.375 1.71436 22.2786 1.71436C22.1821 1.71436 22.0929 1.75007 22.025 1.81793L6.88571 16.9572C6.83214 17.0108 6.79999 17.0751 6.78571 17.1465L5.73214 23.1536C5.69739 23.345 5.70981 23.5419 5.7683 23.7273C5.8268 23.9128 5.92962 24.0812 6.06785 24.2179C6.30357 24.4465 6.59999 24.5715 6.91785 24.5715Z" fill="black"/>
                            </svg>
                        </button>
                    </div>

                    <div className="w-full py-2 px-4">
                        <h1 className="font-medium tracking-wide text-lg leading-relaxed">Address: {companyDetails.address}</h1>
                        <h2 className="font-medium tracking-wider text-lg leading-relaxed">Email: {companyDetails.email}</h2>
                    </div>

                    <div className="flex flex-col gap-4 p-2 md:pl-5">
                        {companyDetails?.socials?.map((social, index) => (
                            <div key={index} className="flex flex-row w-full gap-4 items-center">
                                <a href={social.address} target="_blank" rel="noopener noreferrer">
                                    <img src={social.image} alt={"svg"} />
                                </a>
                                <a href={social.address}>{social.name}</a>
                            </div>
                        ))}
                    </div>

                    {/* Modal */}
                    {showModal && (
                        <div className="fixed inset-0 z-10 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                                <h2 className="text-xl font-bold mb-4">Edit Company Details</h2>
                                <label className="block mb-2">Address</label>
                                <input
                                    type="text"
                                    value={editDetails.address}
                                    onChange={(e) => setEditDetails({ ...editDetails, address: e.target.value })}
                                    className="w-full border p-2 mb-4"
                                />
                                <label className="block mb-2">Email</label>
                                <input
                                    type="email"
                                    value={editDetails.email}
                                    onChange={(e) => setEditDetails({ ...editDetails, email: e.target.value })}
                                    className="w-full border p-2 mb-4"
                                />

                                {/* Buttons */}
                                <div className="flex justify-end gap-4">
                                    <button
                                        onClick={handleCancel}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex items-center justify-center w-full h-full">
                    <h1 className="text-2xl font-bold">Loading...</h1>
                </div>
            )}
        </div>
    );
}
