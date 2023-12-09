import {
  getGptsTools,
  getGptsWelcomeMessage,
  gptGptsPromptStarters,
} from "@/app/services/gpts";

import { Gpts } from "@/app/types/gpts";

interface Props {
  gpts: Gpts;
}

export default ({ gpts }: Props) => {
  const promptStarters = gptGptsPromptStarters(gpts);
  const welcomeMessage = getGptsWelcomeMessage(gpts);
  const toolss = getGptsTools(gpts);
  console.log("toos", toolss);
  return (
    <div className="w-full text-center h-full relative">
      <div className="mx-auto mt-12">
        <img
          className="mx-auto w-16 h-16 rounded-full"
          src={gpts.avatar_url}
          alt={gpts.name}
        />
        <h2 className="mt-2 text-center text-2xl font-medium">
          Preview {gpts.name}
        </h2>
        {/* <p className="mx-10 mt-2 text-center text-xl font-normal text-token-text-secondary">
          {gpts.description}
        </p> */}
        {/* <p className="mt-2 text-sm text-token-text-tertiary">
          By {gpts.author_name}
        </p> */}
      </div>

      <div className="px-8 py-8">
        {welcomeMessage && (
          <div className="hidden md:flex">
            <p className="bg-white px-4 py-2 text-sm rounded-xl truncate">
              {welcomeMessage}
            </p>
            <div className="flex-1"></div>
          </div>
        )}
      </div>

      <div className="absolute bottom-20 w-full px-8">
        {promptStarters && (
          <div className="flex items-center flex-wrap">
            <h2 className="text-md my-2">Prompt Starters of {gpts.name}</h2>

            {promptStarters.map((v: string, idx: number) => {
              return (
                <div key={idx} className="w-full md:w-1/1 px-0 py-1">
                  <p className="rounded-xl text-left text-gray-700 border border-gray-50 px-2 py-1 bg-white text-sm truncate">
                    {v}
                  </p>
                </div>
              );
            })}
          </div>
        )}
        <input
          type="text"
          disabled
          placeholder={`Message to ${gpts.name}`}
          className="w-full mt-4 text-sm bg-white border border-primary rounded-xl px-4 py-2"
        />
      </div>
    </div>
  );
};
