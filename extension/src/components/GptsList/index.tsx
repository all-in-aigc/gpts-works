import type { Gpts } from "~types/gpts"

interface Props {
  gpts: Gpts[]
}

export default ({ gpts }: Props) => {
  return (
    <ul className="menu overflow-auto text-base-content">
      {gpts.length > 0 &&
        gpts.map((item: Gpts, idx: number) => {
          return (
            <>
              {item.avatar_url && item.author_name && (
                <li key={idx} className="max-w-[480px] overflow-hidden">
                  <a
                    href={item.visit_url}
                    className="flex items-center rounded-none  border-t border-gray-100 px-2 py-4 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-transparent">
                    <img
                      src={item.avatar_url}
                      className="h-10 w-10 rounded-full"
                      alt="GPT"
                    />
                    <div className="max-w-[200px] flex-1 ml-2 mr-24">
                      <h3 className="text-md font-semibold truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm line-clamp-2 truncate">
                        {item.description}
                      </p>
                    </div>
                    <div className="text-sm text-token-text-tertiary text-left truncate">
                      By {item.author_name || "-"}
                    </div>
                  </a>
                </li>
              )}
            </>
          )
        })}
    </ul>
  )
}
