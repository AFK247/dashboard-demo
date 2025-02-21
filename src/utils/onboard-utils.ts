export const planTypes = [
  { value: "pay_as_you_go", label: "Pay As You Go" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

export const additionValues = [
  "refundable",
  "on_demand",
  "negotiable",
] as const;

export const additionOptions = [
  { label: "Refundable", value: "refundable" },
  { label: "On Demand", value: "on_demand" },
  { label: "Negotiable", value: "negotiable" },
];
