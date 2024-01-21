import { classes } from "@/lib/utils";
import Link from "next/link";

export default function LinkButton({ label, href, selected, disabled }: {
  label: string,
  href: string,
  selected?: boolean,
  disabled?: boolean,
}) {
  return (
    <Link href={href} prefetch={false}>
      <div
        className="text-highlight text-md font-mono border-[1px] border-highlight bg-buttonbg px-4 py-2 hover:bg-buttonbg-hover hover:text-white duration-300 cursor-pointer"
      >
        {label}
      </div>
    </Link>
  )
}