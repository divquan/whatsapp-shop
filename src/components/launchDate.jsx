import { useState, useEffect } from 'react';
import db from '@/firebase/config';
import { collection, addDoc, getDocs, setDoc, doc, query, where } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { toast } from 'react-hot-toast';


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
    const eventDate = new Date('2023-08-25'); // Replace this with your target date
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
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col ring-1 ring-black ring-opacity-5`}
          >
            <div className="f p-4">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {phone} already has a spot in the waitlist.
                  </p>
                  <p className="mt-1 text-sm text-black/50">
                  Your referral link will be sent to you on SMS or WhatsApp.
                  </p>
                </div>
                
              </div>
            </div>
            {/* <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full p-4 flex items-center justify-center text-sm font-medium text-black hover:text-black ring-black/50 ring-1 rounded-b-md focus:outline-none focus:ring-2 focus:ring-black"
              >
                Close
              </button>
            </div> */}
          </div>
        ))
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
          <div className="flex flex-col items-center justify-center mt-4 text-[#86868b]">
            <div className="flex flex-col justify-center items-center font-semibold mb-8">
              <h2>Thank you for joining!</h2>
              {/* <h2>We've added you to the queue.</h2> */}
            </div>
            <p className="bg-gray-200/60 rounded-md w-full p-2 text-lg font-semibold text-center">{waitlistCount} People ahead of you</p>
            <div className="flex flex-col items-center mt-8 text-center">
            {leanMore ? <h2 className='font-semibold mb-1 text-black'>Benefits of our <span className='text-orange-600'>
              <button onClick={handleLeanMoreClick}>loyalty program</button>
              </span></h2> : <h2 className='font-semibold mb-1 text-black'>Interested in our <span className='text-orange-600'>
              <button onClick={handleLeanMoreClick}>loyalty program?</button>
              </span></h2>}
            {!leanMore && <p className='font-medium'>We are looking for <span className='text-black'>just 20 individuals</span> to join this unique program. Copy and share your referral link below with your friends to be part of it.</p> }<div className='flex gap-1 items-center text-orange-600 hover:underline underline-offset-4'>
              <button onClick={handleLeanMoreClick}>
                {leanMore ? 
                <span className='underline underline-offset-4'>Hide</span> : <span className='underline underline-offset-4'>See benefits</span>}
              </button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
              </div>
              {leanMore && 
                <div className='flex flex-col gap-2 items-start w-full bg-white p-2 mt-1 rounded-md max-h-80 overflow-auto'>
                  <div className='w-full flex flex-col items-start'>
                    <h3 className='font-semibold text-lg text-black'>What Awaits You</h3>
                    <ul className='list-decimal list-inside text-left'>
                      <li><span className='text-black'>🚚 Say goodbye to delivery fees:</span> Enjoy seamless shopping with free delivery on all your purchases, <span className='text-black'>forever.</span> No more extra costs.</li>
                      <li className=''><span className='text-black'>💳 Installment Payment Option:</span> Soon, you'll have the chance to pay in convenient installments, making your shopping experience even more flexible and hassle-free.</li>
                      <li className='text-black/50'><span className='text-black'>📣 First Glimpse of Promos and Exclusives:</span> Stay ahead of the curve and be the first to know about our exciting promotions and exclusive product updates. You'll <span className='text-black'>be the very first to hear</span> about our super fun deals and special new arivals.</li>
                      <li className='text-black/50'><span className='text-black'>✨ And More Delights to Discover!</span> We're dedicated to pampering our loyal members with surprises and exclusive privileges.</li>
                    </ul>
                  </div>
                  <div className='w-full flex flex-col items-start'>
                    <h3 className='font-semibold text-lg text-black'>How the Program Works</h3>
                    <p className='text-left'><span className='text-black'>Invite your friends</span> to join this elite circle. Simply share your unique referral link with them, and <span className='text-black'>when 10 of them register through your link, you automatically become a member of our loyalty program.</span></p>
                  </div>
                </div>
              }
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
                  toast.success('Successfully copied!')
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
            <h2>Early access get</h2>
            <h2 className="text-4xl tracking-widest font-extrabold text-orange-600">15% OFF</h2>
            {/* <h2>Plus free delivery</h2> */}
            <p className="text-xs font-normal">Includes all purchases</p>
          </div>
        ) : (
          ''
        )}

        {!submitted ? (
          <form onSubmit={onSubmitContact} className="flex flex-col gap-1 mt-6">
            <div>
              <div className="mt-2.5">
                <input
                  type="text"
                  placeholder='Your first name'
                  name="first-name"
                  id="first-name"
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <div className="relative mt-2.5">
                <input
                  type="tel"
                  placeholder='Your phone number'
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  name="phone-number"
                  id="phone-number"
                  autoComplete="tel"
                  required
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <button type="submit" className="w-full bg-black rounded-md uppercase text-white py-3 text-sm font-medium mt-2">
              Get early access
            </button>
          </form>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
