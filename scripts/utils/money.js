export function formatCurrency (priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
};

/* THE CODE BELOW IS AN EXAMPLE OF A DEFAULT EXPORT */
// THE DEFAULT EXPORT IS USED ONLY WHEN YOU WANT TO EXPORT ONLY ONE THING FROM A FILE
export default formatCurrency; 