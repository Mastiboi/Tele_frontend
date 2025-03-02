import { useEffect } from "react";

export default function Verification() {
  useEffect(() => {
    if (window.Telegram) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
    }
  }, []);

  return (
    <div className="bg-[#212121] text-white h-screen flex flex-col items-center justify-start p-4 text-center">
      <div className="mt-5">
        <p className="text-3xl font-bold text-[#ffffff]">Human Verification</p>
        <p className="text-md font-bold text-[#ffffff] mt-2">
          Verify below to be granted entry
        </p>
        <div className="flex items-center justify-center w-full mt-3">
          <button
            className="w-full px-3 py-3 my-4 font-mono text-base rounded text-white bg-gradient-to-r 
            from-[#385446] via-[#366950] to-[#3c7659] 
            hover:bg-gradient-to-br shadow-lg"
            onClick={() => (window.location.href = "/premium")}
          >
            Click here
          </button>
        </div>
      </div>
    </div>
  );
}