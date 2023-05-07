import {
  EllipsisHorizontalIcon,
  ArrowPathIcon,
  HandThumbUpIcon,
  ShareIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";

import { TaskType, posts } from "./data";

export default function Task() {
  return (
    <div className="border-t-[1px] px-4 pt-3 pb-2 hover:bg-neutral-100 transition-colors duration-500 ease-out">
      <div className="grid grid-cols-[auto,1fr] gap-3">
        <div className="w-12 h-12 overflow-hidden rounded-full">
          <img src={posts[1].image} alt="" className="w-full" />
        </div>
        <div>
          <div className="flex gap-1 items-center">
            <h1 className="font-bold">Name</h1>
            <h2 className="text-neutral-500 hidden mobile:block">@username</h2>
            <span className="text-neutral-500">•</span>
            <h2 className="text-neutral-500">time</h2>
            <div className="p-2 hover:bg-sky-100 ml-auto rounded-full group cursor-pointer transition-colors duration-500 ease-out">
              <EllipsisHorizontalIcon className="w-4 h-4 text-neutral-400 group-hover:text-sky-500" />
            </div>
          </div>
          <p>{posts[1].caption}</p>
          {/* actions */}
          <div className="flex justify-between mt-3 max-w-md cursor-pointer">
            <div className="flex items-center group tablet:pr-4">
              <div className="group-hover:bg-sky-100 w-9 h-9 p-2 rounded-full hover-transition cursor-pointer">
                <ChatBubbleOvalLeftIcon />
              </div>
              <p className="text-xs group-hover:text-sky-500">
                {posts[1].replies}
              </p>
            </div>
            <div className="flex gap-1 items-center group tabletpx-4">
              <div className="group-hover:bg-sky-100 w-9 h-9 p-2 rounded-full hover-transition cursor-pointer">
                <ArrowPathIcon />
              </div>
              <p className="text-xs group-hover:text-green-500">
                {posts[1].retweets}
              </p>
            </div>
            <div className="flex gap-1 items-center group tabletpx-4">
              <div className="group-hover:bg-sky-100 w-9 h-9 p-2 rounded-full hover-transition cursor-pointer">
                <HandThumbUpIcon />
              </div>
              <p className="text-xs group-hover:text-rose-500">
                {posts[1].likes}
              </p>
            </div>
            <div className="flex gap-1 items-center group tabletpl-4">
              <div className="group-hover:bg-sky-100 w-9 h-9 p-2 rounded-full hover-transition cursor-pointer">
                <ShareIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
