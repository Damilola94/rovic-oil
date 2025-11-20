export const paymentTypes = ["Full Payment", "Part Payment", "On Credit"];

export const repaymentDurations = ["1 week", "2 weeks", "1 month"];

export const paymentTypeKeyMap: Record<string, string> = {
  "Full Payment": "FullPayment",
  "Part Payment": "PartPayment",
  "On Credit": "OnCredit",
};

export const repaymentDurationsKeyMap: Record<string, string> = {
  "1 week": "OneWeek",
  "2 weeks": "TwoWeeks",
  "1 month": "OneMonth",
};
