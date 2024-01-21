import LoadingAnimation from "@/components/ui/LoadingAnimation";

export default function Loading() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <div className="flex flex-row items-center font-mono gap-2">
        {"Loading"} <LoadingAnimation />
      </div>
    </div>
  )
}