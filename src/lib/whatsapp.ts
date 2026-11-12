export function enquiryMessage(o: { product?: string; quality?: string; spec?: string; qty?: string; name?: string }) {
  const lines = ["Hello Jagruti Plastic, I would like a quotation."];
  if (o.product) lines.push(`Product: ${o.product}`);
  if (o.quality) lines.push(`Quality: ${o.quality}`);
  if (o.spec) lines.push(`Size/Specification: ${o.spec}`);
  if (o.qty) lines.push(`Quantity: ${o.qty} KG`);
  if (o.name) lines.push(`Name: ${o.name}`);
  return lines.join("\n");
}
export const waLink = (number: string, text: string) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
