import AdvanceStepButton from "@/components/ui/AdvanceStepButton";
import Title from "@/components/ui/Title";

export default async function Fail() {

  return (
    <>
      <Title>
        Error
      </Title>
      <div className="text-center">
        {"Something went wrong and your Axiom query was not fulfilled."}
      </div>
      <AdvanceStepButton
        label="Try again"
        href="/"
      />
    </>
  )
}
