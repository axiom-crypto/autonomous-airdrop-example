import { classes } from "@/lib/utils"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={classes(
      "flex flex-col justify-center items-center min-h-[80vh] px-4",
      "w-full sm:w-[40rem] lg:w-[64rem]"
    )}
    >
      <div className={classes(
        "flex flex-col justify-center items-center w-full min-h-[40vh]",
        "mt-10 px-8 py-4 border-[1px] border-darkgrey gap-8 shadow-md",
      )}
      >
        {children}
      </div>
    </div>
  )
}