export default function Decimals({
  decimals,
  children,
}: {
  decimals?: number,
  children: string,
}) {
  if (decimals === undefined) {
    decimals = 4;
  }
  const parts = children.split(".");
  if (parts.length === 1) {
    return children;
  }
  const integer = parts[0];
  const decimal = parts[1];
  if (decimal.length <= decimals) {
    return children;
  }
  return (
    <>
      {`${integer}.${decimal.slice(0, decimals)}`}
    </>
  )
}