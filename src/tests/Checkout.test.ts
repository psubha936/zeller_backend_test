import { Checkout } from "../services/Checkout";
import { PricingRules, threeForTwoAppleTV, bulkDiscountIPad } from "../services/PricingRules";
import { Product } from "../models/Product";

describe("Checkout System", () => {
  const products: Product[] = [
    { sku: "ipd", name: "Super iPad", price: 549.99 },
    { sku: "mbp", name: "MacBook Pro", price: 1399.99 },
    { sku: "atv", name: "Apple TV", price: 109.50 },
    { sku: "vga", name: "VGA adapter", price: 30.00 },
  ];

  let pricingRules: PricingRules;
  let checkout: Checkout;

  beforeEach(() => {
    pricingRules = new PricingRules();
    pricingRules.addRule(threeForTwoAppleTV);
    pricingRules.addRule(bulkDiscountIPad);
    checkout = new Checkout(pricingRules);
  });

  test("SKUs Scanned: atv, atv, atv, vga - Total expected: $249.00", () => {
    checkout.scan(products[2]); 
    checkout.scan(products[2]); 
    checkout.scan(products[2]); 
    checkout.scan(products[3]); 
    const total = checkout.total();
    expect(total).toBeCloseTo(249.00, 2);
  });

  test("SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd - Total expected: $2718.95", () => {
    checkout.scan(products[2]); 
    checkout.scan(products[0]); 
    checkout.scan(products[0]); 
    checkout.scan(products[2]);
    checkout.scan(products[0]); 
    checkout.scan(products[0]); 
    checkout.scan(products[0]); 
    const total = checkout.total();
    expect(total).toBeCloseTo(2718.95, 2);
  });
});
