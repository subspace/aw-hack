import { ReactNode, useState } from "react";

interface Element {
  title: string;
  body: ReactNode;
}

interface TabsType {
  elements: Element[];
}

export default function Tabs({ elements }: TabsType) {
  const [openTab, setOpenTab] = useState(0);

  const titles = elements.map((element) => element.title);
  const bodies = elements.map((element) => element.body);

  return (
    <div>
      <div className="container mx-auto mt-4">
        <div className="flex flex-col items-center justify-center max-w-xl">
          <ul className="flex space-x-2">
            {titles.map((title, index) => (
              <li>
                <a
                  href="#"
                  onClick={() => setOpenTab(index)}
                  className={`inline-block px-4 py-2 rounded shadow ${
                    openTab === index
                      ? "bg-purple-600 text-white"
                      : "text-gray-600 bg-white"
                  } `}
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
          <div className="p-3 mt-6">
            {bodies.map((body, index) => (
              <div className={openTab === index ? "block" : "hidden"}>
                {body}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
