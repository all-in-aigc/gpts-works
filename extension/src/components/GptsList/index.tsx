import { LazyLoadImage } from "react-lazy-load-image-component"

import type { Gpts } from "~types/gpts"

interface Props {
  gpts: Gpts[]
  loading: boolean
}

export default ({ gpts, loading }: Props) => {
  return (
    <>
      {loading ? (
        <div className="text-center mx-auto">loading...</div>
      ) : (
        <ul className="menu text-base-content">
          {gpts.length > 0 &&
            gpts.map((item: Gpts, idx: number) => {
              if (!item.name || !item.avatar_url || !item.author_name) {
                return
              }

              return (
                <li key={idx} className="w-[360px] overflow-hidden">
                  <a
                    href={item.visit_url}
                    className="rounded-none border-t border-gray-100 px-4 py-4 hover:bg-gray-100">
                    <div className="flex items-start">
                      <LazyLoadImage
                        src={item.avatar_url}
                        alt=""
                        className="mr-2 inline-block h-10 w-10 object-cover rounded-full"
                      />

                      <div className="flex-1">
                        <h3 className="text-sm font-semibold max-w-[200px] truncate">
                          {item.name}
                        </h3>
                        <p className="my-1 text-xs truncate">
                          by {item.author_name || "-"}
                        </p>
                        <p className="text-xs">{item.description}</p>
                      </div>
                    </div>
                  </a>
                </li>
              )
            })}
        </ul>
      )}
    </>
  )
}
