import CheckUniTransferTx from "@/components/check/CheckUniTransferTx";
import Title from "@/components/ui/Title";

export default async function Check() {
  return (
    <>
      <Title>
        Check eligibility
      </Title>
      <CheckUniTransferTx />
    </>
  )
}
