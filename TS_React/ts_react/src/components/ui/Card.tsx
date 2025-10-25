import { IconPlus } from "../../icons/PlusIcon";
import { ShareIconBtn } from "../../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export const CardComp = ({ title, link, type }: CardProps) => {
  return (
    <div>
      <div className=" bg-white rounded-md shadow-lg border-gray-200 p-3 max-w-72 border min-w-72 min-h-80 cursor-grab hover:bg-violet-200 transition-all duration-500">
        <div className="flex justify-between">
          <div className="flex items-center">
            <span className="text-gray-600">
              <IconPlus size="lg" />
            </span>
            <span className="pl-3 text-black font-bold">{title}</span>
          </div>
          <div className="flex">
            <span className="pr-4 text-gray-600">
              <a href={link} target="_blank">
                <ShareIconBtn size="lg" />
              </a>
            </span>
            <span className="text-gray-600">
              <a href={link} target="_blank">
                <ShareIconBtn size="lg" />
              </a>
            </span>
          </div>
        </div>
        <div className="pt-5">
          {type == "youtube" && (
            <iframe
              className="w-full"
              src={link.replace("watch", "embed").replace("?v=", "/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          {type == "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
};
