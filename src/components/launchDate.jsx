import { useState, useEffect } from 'react';
import db from '@/firebase/config';
import { collection, addDoc, getDocs, setDoc, doc, query, where } from 'firebase/firestore';
import { nanoid } from 'nanoid';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function LaunchDate() {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState([]);
  const [secretCode, setSecretCode] = useState('');
  const [refCode, setRefCode] = useState('');
  const [currentDocId, setCurrentDocId] = useState('');
  const [leanMore, setLeanMore] = useState(false);

  function handleLeanMoreClick() {
    setLeanMore(!leanMore)
  }

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

  const contactRef = collection(db, 'waitlist_v2');

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

  const onSubmitContact = async (e) => {
    e.preventDefault();
    try {
      // Extract the referral code from the URL (assuming the referral code is a query parameter)
      const urlParams = new URLSearchParams(window.location.search);
      const referralCode = urlParams.get('referral');

      // Check if the user's phone number already exists in the collection
      const querySnapshot = await getDocs(query(collection(db, 'waitlist_v2'), where('phone', '==', phone)));

      if (!querySnapshot.empty) {
        // If a matching document is found, notify the user that they've already registered
        alert('You have already registered for the waitlist.');
        return;
      }

      // If the phone number is not already registered, proceed with adding the new document
      const docRef = await addDoc(contactRef, {
        name,
        phone,
        referralCode, // Store the referral code along with the user's information
      });

      setSubmitted(true);

      setCurrentDocId(docRef.id);
      const docId = docRef.id;
      // Getting the last
      const l = docId.length;
      // Getting the prev 3
      const p = docId.length - 3;
      const partOfId = docId.substring(p, l);
      setSecretCode(partOfId + (waitlistCount + 1));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="">
        {!submitted ? (
          <div className='flex flex-col gap-2'>
          <h1 className="flex justify-center text-lg font-bold">We're Launching Soon</h1>
        
          <div>
            <div className="flex gap-3 items-center justify-center">
              <div className="flex gap-1 flex-col items-center">
                <div className="rounded-full flex justify-center items-center">{timeLeft.hours}</div>
                <p className="text-xs">Hours</p>
              </div>
              <div className="flex gap-1 flex-col items-center">
                <div className="rounded-full flex justify-center items-center">{timeLeft.minutes}</div>
                <p className="text-xs">Minutes</p>
              </div>
              <div className="flex gap-1 flex-col items-center">
                <div className="rounded-full flex justify-center items-center">{timeLeft.seconds}</div>
                <p className="text-xs">Seconds</p>
              </div>
            </div>
          </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-8">
            <div className="flex flex-col justify-center items-center font-semibold mb-12">
              <h2>Thank You!</h2>
              <h2>We've added you to the queue.</h2>
            </div>
            <p className="bg-gray-200/60 rounded-md w-full p-2 text-xl font-semibold text-center">{waitlistCount} People ahead of you</p>
            <div className="flex flex-col items-center mt-8 text-center">
            <h2 className='font-semibold'>Interested in our <span className='text-orange-600'>
              <button onClick={handleLeanMoreClick}>loyalty program?</button>
              </span></h2>
            <p className='text-black/50 font-medium'>We are looking for <span className='text-black'>just 20 individuals</span> to join this unique program. Copy and share your referral link below with your friends to be part of it.<br /> <span className='text-orange-600 hover:underline underline-offset-4'>
              <button onClick={handleLeanMoreClick}>
                {leanMore ? <span className='underline underline-offset-4'>Hide</span> : <span className='underline underline-offset-4'>Learn more</span>}
              </button>
              </span></p>
              {leanMore && <p className='bg-white p-2'>These are the benefits of our loyalty program and how it works.</p>}
            <div className='flex flex-row mt-6'>
              <input
                type="text"
                value={`https://veliore.vercel.app/?referral=${secretCode}`} // Replace "example.com" with your actual domain
                readOnly
                className="block w-[250px] md:w-[300px] rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              />
              <button
                type="button"
                onClick={() => {
                  // Copy the referral link to the clipboard localhost:3000/?referral=Rp36
                  navigator.clipboard.writeText(`https://veliore.vercel.app/?referral=${secretCode}`); // Replace "example.com" with your actual domain
                  // alert('Referral link is copied to your clipboard!');
                }}
                className="bg-black text-white px-4 py-2 ml-2 rounded-md font-medium"
              >
                Copy
              </button>
            </div>
            </div>
          </div>
        )}
        {!submitted ? (
          <div className="flex flex-col justify-center items-center text-xl uppercase font-semibold mt-6">
            <h2>Register and get</h2>
            <h2 className="text-4xl tracking-widest font-extrabold text-orange-600">15% OFF</h2>
            <h2>Plus free delivery</h2>
            <p className="text-xs font-normal">Includes all purchases</p>
          </div>
        ) : (
          ''
        )}

        {!submitted ? (
          <form onSubmit={onSubmitContact} className="flex flex-col gap-1 mt-6">
            <div>
              {/* <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                Your first name
              </label> */}
              <div className="mt-2.5">
                <input
                  type="text"
                  placeholder='Your first name'
                  name="first-name"
                  id="first-name"
                  onChange={(e) => setName(e.target.value)}
                  required
                  // autoComplete="given-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              {/* <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                Your phone number
              </label> */}
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
                  placeholder='Your phone number'
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
            <button type="submit" className="w-full bg-black uppercase text-white py-3 text-sm font-medium mt-2">
              Register
            </button>
          </form>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
