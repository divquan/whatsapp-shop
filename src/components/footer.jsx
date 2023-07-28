import Form from "./form";

export default function Footer() {
  return (
    <footer className="bg-gray-950 py-8 px-6">
      <div className=" text-white flex justify-between flex-col lg:flex-row gap-20 align-center lg:w-[1000px] m-auto">
        <div className="left flex flex-col gap-5">
          <h3>OUR MISSION:</h3>
          <p>To build long-lasting relationships with our customers based on trust, transparency and mutual respect</p>
        </div>
        <div className="right flex flex-col gap-5">
          <h3>JOIN THE FLEEK FAMILY</h3>
          <h4>Keep up with the latest products releases, restocks, offers and more</h4>
          <Form/>
         
          <div>
            <p>Send us "hi"</p>
            <div className="socials flex gap-4 text-sm">
              <a className="underline" href="#">WhatsApp</a>
              <a className="underline" href="#">Instagram</a>
            </div>
          </div>

        </div>
      </div>
      <div className="text-white text-center mt-10">
          Copyright &copy; 2023 fleekytrends. All rights reserved.
      </div>
    </footer>
  );
};