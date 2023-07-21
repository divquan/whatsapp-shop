import db from '../config'; 
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

export const  getAllProducts = async () =>{
  let documentsData;
  const collectionRef = collection(db, "products"); // Specify the collection from which you want to fetch documents

  /* Fetch all documents in the collection*/
  try {
    const querySnapshot = await getDocs(collectionRef);

    documentsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
  return documentsData;
}


export async function getProducts() {
  const productsRef = collection(db, 'products');
  const snapshot = await getDocs(productsRef);
  const products = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    views: doc.data().views || 0,
  }));
  return products;
}


/*Each product object has an id and the id of a product can be passed 
into this function as a parameter and this function will get all the various attribute of 
the product object
 */

export const getProduct = async (id) => {
  let docRef = doc(db, "products", id);

  try {
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const documentData = docSnapshot.data();
      return {
        id, // Include the id in the returned data object
        ...documentData
      };
    } else {
      console.log("Document does not exist");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return null;
  }
};

// Function to sort products based on price
export const sortProductsByPrice = async (collectionName, sortOrder) => {
  try {
    // Get the collection reference
    const collectionRef = db.collection(collectionName);

    // Get all products from the collection
    const snapshot = await collectionRef.get();

    // Convert the products to an array and sort them based on price
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    products.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.discPrice - b.discPrice;
      } else if (sortOrder === 'desc') {
        return b.discPrice - a.discPrice;
      } else {
        // If the sortOrder is not 'asc' or 'desc', return the original array
        return 0;
      }
    });

    return products;
  } catch (error) {
    console.error('Error sorting products:', error);
    return [];
  }
}