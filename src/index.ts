import { Checkout } from "./services/Checkout";
import { PricingRules, threeForTwoAppleTV, bulkDiscountIPad } from "./services/PricingRules";

const products = [
  { sku: "ipd", name: "Super iPad", price: 549.99 },
  { sku: "mbp", name: "MacBook Pro", price: 1399.99 },
  { sku: "atv", name: "Apple TV", price: 109.50 },
  { sku: "vga", name: "VGA adapter", price: 30.00 },
];

const pricingRules = new PricingRules();
pricingRules.addRule(threeForTwoAppleTV);
pricingRules.addRule(bulkDiscountIPad);


const co = new Checkout(pricingRules);

co.scan(products[2]);
co.scan(products[2]); 
co.scan(products[2]); 
co.scan(products[3]); 


const checkout = new Checkout(pricingRules);

checkout.scan(products[2]); 
checkout.scan(products[0]); 
checkout.scan(products[0]); 
checkout.scan(products[2]);
checkout.scan(products[0]); 
checkout.scan(products[0]); 
checkout.scan(products[0]); 

console.log(`Total: $${co.total().toFixed(2)}`);
console.log(`Total: $${checkout.total().toFixed(2)}`);


