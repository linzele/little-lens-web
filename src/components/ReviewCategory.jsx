import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from '@/firebase/firebase';
import { useEffect, useState } from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ReviewCategoryManagement() {
    const [reviewCategories, setReviewCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editCategories, setEditCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');

    async function getReviewCategories() {
        try {
            const docRef = doc(db, 'reviewCategories', 'categories');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setReviewCategories(docSnap.data().names);
                setEditCategories(docSnap.data().names); 
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error("Error fetching review categories:", error);
        }
    }

    useEffect(() => {
        getReviewCategories();
    }, []);

    const handleCancel = () => {
        setEditCategories(reviewCategories); 
        setShowModal(false); 
        setNewCategory('');
    };

    const handleSave = async () => {
        const docRef = doc(db, 'reviewCategories', 'categories');
        try {
            await updateDoc(docRef, {
                names: editCategories
            });
            setReviewCategories(editCategories);
            setShowModal(false); 
            console.log("Review categories updated successfully!");
        } catch (error) {
            console.error("Error updating review categories:", error);
        }
    };

    const handleDelete = async (index) => {
        const docRef = doc(db, 'reviewCategories', 'categories');
        try {
            const updatedCategories = [...editCategories];
            updatedCategories.splice(index, 1);
            await updateDoc(docRef, {
                names: updatedCategories
            });
            setReviewCategories(updatedCategories);
            setEditCategories(updatedCategories);
            console.log("Review category deleted successfully!");
        } catch (error) {
            console.error("Error deleting review category:", error);
        }
    };

    const handleCreate = async () => {
        if (newCategory.trim() !== '') {
            const docRef = doc(db, 'reviewCategories', 'categories');
            try {
                await updateDoc(docRef, {
                    names: arrayUnion(newCategory.trim())
                });
                setReviewCategories([...reviewCategories, newCategory.trim()]);
                setEditCategories([...editCategories, newCategory.trim()]);
                setNewCategory('');
                console.log("Review category created successfully!");
            } catch (error) {
                console.error("Error creating review category:", error);
            }
        }
    };

    return (
        <div className='w-full h-[50%] rounded-lg shadow-lg border-2'>
            {reviewCategories.length > 0 ? (
                <>
                    <div className='w-full flex flex-row p-4 pb-1 justify-between items-center'>
                        <h1 className='text-xl font-bold underline'>Review Categories</h1>
                        <div className="flex items-center gap-2">
                        <button onClick={() => setShowModal(true)} className="focus:outline-none">
    <svg width="25" height="25" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M29.1429 27.5715H2.85714C2.22499 27.5715 1.71428 28.0822 1.71428 28.7144V30.0001C1.71428 30.1572 1.84285 30.2858 1.99999 30.2858H30C30.1571 30.2858 30.2857 30.1572 30.2857 30.0001V28.7144C30.2857 28.0822 29.775 27.5715 29.1429 27.5715ZM6.91785 24.5715C6.98928 24.5715 7.06071 24.5644 7.13214 24.5536L13.1393 23.5001C13.2107 23.4858 13.2786 23.4536 13.3286 23.4001L28.4679 8.26078C28.501 8.22774 28.5272 8.1885 28.5451 8.14529C28.5631 8.10209 28.5723 8.05577 28.5723 8.009C28.5723 7.96222 28.5631 7.91591 28.5451 7.8727C28.5272 7.8295 28.501 7.79025 28.4679 7.75721L22.5321 1.81793C22.4643 1.75007 22.375 1.71436 22.2786 1.71436C22.1821 1.71436 22.0929 1.75007 22.025 1.81793L6.88571 16.9572C6.83214 17.0108 6.79999 17.0751 6.78571 17.1465L5.73214 23.1536C5.69739 23.345 5.70981 23.5419 5.7683 23.7273C5.8268 23.9128 5.92962 24.0812 6.06785 24.2179C6.30357 24.4465 6.59999 24.5715 6.91785 24.5715Z" fill="black"/>
    </svg>
</button>
                        </div>
                    </div>
        
                    <ul className="list-disc pl-14">
                        {reviewCategories.map((name, index) => (
                            <li key={index} className="text-2xl mt-2 flex justify-between items-center">
                                {name}
                                <Button variant="danger" onClick={() => handleDelete(index)}>Delete</Button>
                            </li>
                        ))}
                    </ul>

                    {showModal && (
                        <div className="fixed inset-0 z-10 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                                <h2 className="text-xl font-bold mb-4">Edit Review Categories</h2>
                                {editCategories.map((category, index) => (
                                    <div key={index} className="flex items-center justify-between mb-4">
                                        <Input
                                            type="text"
                                            value={editCategories[index]}
                                            onChange={(e) => {
                                                const updatedCategories = [...editCategories];
                                                updatedCategories[index] = e.target.value;
                                                setEditCategories(updatedCategories);
                                            }}
                                            className="w-full"
                                        />
                                        <Button variant="danger" onClick={() => handleDelete(index)}>Delete</Button>
                                    </div>
                                ))}
                                <div className="flex items-center mb-4">
                                    <Input
                                        type="text"
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
                                        className="w-full"
                                        placeholder="New Category"
                                    />
                                    <Button onClick={handleCreate}>Create</Button>
                                </div>
                                <div className="flex justify-end gap-4">
                                    <Button variant="secondary" onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSave}>
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <h1 className="text-2xl font-bold">Loading...</h1>
                </div>
            )}
        </div>
    );
}