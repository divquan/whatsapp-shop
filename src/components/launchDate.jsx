import { useState, useEffect } from 'react';
import db from '@/firebase/config';
import { collection, addDoc, getDocs, setDoc, doc, query, where } from 'firebase/firestore'; 

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { data } from 'autoprefixer';

export default function LaunchDate() {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState([]);
  const [secretCode, setSecretCode] = useState('');
  const [refCode, setRefCode] = useState('')
  const [currentDocId, setCurrentDocId] = useState('')


  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const eventDate = new Date('2023-08-10'); // Replace this with your target date
    const now = new Date();
    const difference = eventDate - now;

    if (difference > 0) {
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    } else {
      setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
    }
  };

  useEffect(() => {
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const contactRef = collection(db, 'waitlist');

  useEffect(() => {
    const fetchWaitlistCount = async () => {
      try {
        const querySnapshot = await getDocs(contactRef);
        setWaitlistCount(querySnapshot.size);
      } catch (err) {
        console.log(err);
      }
    };
    fetchWaitlistCount();
  }, []);

  const onSubmitRefcode = async (e) => {
    e.preventDefault();
    try {
      // Get the document ID from the currentDocId state
      const docId = currentDocId;

          // Check if the refCode already exists in any document using a Firestore query
      const querySnapshot = await getDocs(query(collection(db, 'waitlist'), where('refCode', '==', refCode)));

      if (!querySnapshot.empty) {
        // If matching document(s) are found, extract the name field from the first matching document
        const existingDocName = querySnapshot.docs[0].data().name;
        alert(`This referral code has already been used by ${existingDocName}.`);
        return; // Stop execution since the referral code already exists
      }

      // // Check if the refCode already exist in the any document
      // const querySnapshot = await getDocs(contactRef);
      // const matchingDocs = querySnapshot.docs.filter((doc) => doc.data().refCode === refCode)

      // if (matchingDocs > 0) {
      //   // If a matching document is found, extract its name field
      //   const existingDocName = matchingDocs[0].data().name;
      //   alert(`This referral code has already been used by ${existingDocName}.`)
      //   return // Stop execution since referral code already exist
      // }

      // Prepare the data to update the document
      const dataToUpdate = {
        refCode,
        name, // Include the name field
        phone // Include the phone field
      }
  
      // Update the document with the 'refCode' field and its value
      await setDoc(doc(contactRef, docId), dataToUpdate);
  
      // Clear the input field
      setName(''); // Set to an empty string to clear the input field
      setPhone(''); // Set to an empty string to clear the input field
      setRefCode('');
  
      // Optionally, you can add a message to indicate that the refCode has been added successfully.
      console.log('Referral code submitted successfully.');
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmitContact = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(contactRef, {
        name, name,
        phone: phone,
      });
      setSubmitted(true);
      
      setCurrentDocId(docRef.id)
      const docId = docRef.id
        // Getting the last
        const l = docId.length;
        // Getting the prev 3
        const p = docId.length - 3;
        const partOfId = docId.substring(p, l)
        setSecretCode(partOfId + (waitlistCount + 1))
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="">
        {!submitted ? (
          <h1 className="flex justify-center text-lg my-4 font-bold">
            We're Launching Soon
          </h1>
        ) : (
          <div className='flex flex-col justify-center gap-4 items-center font-semibold mb-2'>
            <h2>Thank You!</h2>
            <h2>We have added you to the queue.</h2>
          </div>
        )}

        {!submitted ? (
          <div>
            <div className="flex gap-3 items-center justify-center">
              <div className="flex gap-1 flex-col items-center">
                <div className="rounded-full flex justify-center items-center">
                  {timeLeft.hours}
                </div>
                <p className="text-xs">Hours</p>
              </div>
              <div className="flex gap-1 flex-col items-center">
                <div className="rounded-full flex justify-center items-center">
                  {timeLeft.minutes}
                </div>
                <p className="text-xs">Minutes</p>
              </div>
              <div className="flex gap-1 flex-col items-center">
                <div className="rounded-full flex justify-center items-center">
                  {timeLeft.seconds}
                </div>
                <p className="text-xs">Seconds</p>
              </div>
            </div>
          </div>
        ) : (
          ''
          // <div className='flex flex-col items-center justify-center mt-8'>
          //   {/* <p className='bg-gray-100 w-full p-2 text-xl font-semibold text-center'>{waitlistCount} People ahead of you</p> */}
          //   {/* <p>Your secret code: {secretCode}</p> */}
            
          // </div>
        )}
        {!submitted && <div className='flex flex-col justify-center items-center text-xl uppercase font-semibold mt-12'>
          <h2>Register and get</h2>
          <h2 className='text-4xl tracking-widest font-extrabold text-orange-400'>15% OFF</h2>
          <h2>Plus free delivery</h2>
          <p className='text-xs font-normal'>Includes all purchases</p>
        </div> 
        // :
        // <div className='flex flex-col items-center text-center mt-8'>
        //     <h2 className='text-lg font-semibold'>Interested in a bigger discount?</h2>
        //     <p className='text-base'>Recommend to a friend and both of you gets 30% OFF on your first purchase. This applies only if you’re both among the first 100 people.<br /> So hurry up!</p>
        // </div>
        }

        {!submitted ? (
          <form onSubmit={onSubmitContact} className="flex flex-col gap-1 mt-12">
            <div>
                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                Your name
                </label>
                <div className="mt-2.5">
                <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                Your phone number
              </label>
              <div className="relative mt-2.5">
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <label htmlFor="country" className="sr-only">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-4 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-400 sm:text-sm"
                  >
                    <option>GH</option>
                  </select>
                </div>
                <input
                  type="tel"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  name="phone-number"
                  id="phone-number"
                  autoComplete="tel"
                  required
                  className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-black uppercase text-white py-3 text-sm font-medium mt-2"
            >
              Register
            </button>
          </form>
        ) : (
          <div>
            {/* <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="uppercase" onClick={() => {console.log('sending...');}}>
                        Recommend to a friend
                    </AccordionTrigger>
                    <AccordionContent>
                        <div
                          onClick={() => {
                            // Copy secret code to clipboard
                            navigator.clipboard.writeText(secretCode).then(() => {
                              // show an alert indicating that the code has been copied
                              alert('Secret code is copied to your clipboard!')
                            }).catch((err) => {
                              // Show an alert if there was an error copying the code
                              alert('Failed to copy secret code to clipboard.');
                              console.log(err);
                            })
                          }} 
                          style={{cursor: 'pointer'}}
                          className='flex flex-col items-center bg-gray-100 p-2'>
                            <p className='text-lg'>Your secret code: {secretCode}</p>
                            <p className='text-sm'>Tap to copy</p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="uppercase" onClick={() => {console.log('sending...');}}>
                        Has a referral code?
                    </AccordionTrigger>
                    <AccordionContent>
                        <form onSubmit={onSubmitRefcode} className="flex flex-col gap-1">
                            <div className="sm:col-span-2">
                            <label htmlFor="referral-code" className="block text-sm font-semibold leading-6 text-gray-900">
                                Referral code
                            </label>
                            <div className="relative mt-2.5">
                                <div className="absolute inset-y-0 left-0 flex items-center">
                                </div>
                                <input
                                type="text"
                                onChange={(e) => setRefCode(e.target.value)}
                                value={refCode}
                                name="referral-code"
                                id="referral-code"
                                required
                                className="block w-full rounded-md border-0 px-3.5 py-2 pl-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                />
                            </div>
                            </div>
                            <button
                            type="submit"
                            className="w-full bg-black uppercase text-white py-3 text-sm font-medium mt-2"
                            >
                            Submit
                            </button>
                        </form>
                    </AccordionContent>
                </AccordionItem>
            </Accordion> */}
          </div>
        )}
      </div>
    </>
  );
}
