import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) {
        return;
      }

      setLoading(true);

      const collectionRef = await collection(db, docCollection);

      try {
        let q;

          //busca
          //dashboard
          if(search){
            //como as tags são arrays, coloquei fn do firebase array-contains para busca-los 
            q = await query(
              collectionRef, 
              where("tags", "array-contains", search), 
              orderBy("createdAt", "desc")
              );

          } else if (uid) {
            //busca por uid que é id do usuario no firebase
            q = await query(
              collectionRef, 
              where("uid", "==", uid), 
              orderBy("createdAt", "desc")
              );

          }else {
            //buscando por ordem de criação e descendente (mais novo para o mais velho)
            q = await query(
              collectionRef, 
              orderBy("createdAt", "desc")
              );
          }
          
        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });
      } catch (error) {
        console.log(error);
        setError(error.message);

      }
      setLoading(false);
    }

    loadData();
  }, [docCollection, search, uid, cancelled]);

  console.log(documents);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
};
