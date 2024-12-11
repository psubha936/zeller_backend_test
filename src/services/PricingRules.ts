import { Product } from "../models/Product";

type PricingRule = (items: Product[]) => number;

export class PricingRules {
  private rules: PricingRule[] = [];

  addRule(rule: PricingRule): void {
    this.rules.push(rule);
  }

  applyRules(items: Product[]): number {
    return this.rules.reduce((totalDiscount, rule) => totalDiscount + rule(items), 0);
  }
}


export const threeForTwoAppleTV = (items: Product[]): number => {
  const atvItems = items.filter((item) => item.sku === "atv");
  const discountCount = Math.floor(atvItems.length / 3);
  return discountCount * (atvItems[0]?.price || 0);
};

export const bulkDiscountIPad = (items: Product[]): number => {
  const ipdItems = items.filter((item) => item.sku === "ipd");
  if (ipdItems.length > 4) {
    const discountPerItem = (ipdItems[0]?.price || 0) - 499.99;
    return discountPerItem * ipdItems.length;
  }
  return 0;
};
