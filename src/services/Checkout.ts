import { Product } from "../models/Product";
import { PricingRules } from "./PricingRules";

export class Checkout {
  private items: Product[] = [];
  private pricingRules: PricingRules;

  constructor(pricingRules: PricingRules) {
    this.pricingRules = pricingRules;
  }

  scan(item: Product): void {
    this.items.push(item);
  }

  total(): number {
    const basePrice = this.items.reduce((total, item) => total + item.price, 0);
    const discount = this.pricingRules.applyRules(this.items);
    return basePrice - discount;
  }
}
