import LinkButton from "@/components/ui/LinkButton";
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
      <LinkButton
        label="Try again"
        href="/"
      />
    </>
  )
}
