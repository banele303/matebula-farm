import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categoryData = [
    {
      name: "Eggs",
      slug: "eggs",
      description: "Farm fresh A-grade eggs gathered daily.",
      products: {
        create: [
          {
            name: "A-Grade Table Eggs (Tray of 30)",
            slug: "a-grade-table-eggs-tray",
            shortDescription: "Fresh free-range eggs collected within 24 hours.",
            description:
              "Our signature product from over 5,000 healthy layers. Rich yolks, clean shells, and consistent sizing.",
            priceInCents: 8500,
            compareAtPriceCents: 9500,
            stock: 240,
            unit: "Tray",
            isFeatured: true,
            images: {
              create: [
                { url: "/eggs5.jpg", altText: "Tray of A-grade eggs", position: 0 },
                { url: "/eggs4.jpg", altText: "Fresh brown eggs", position: 1 },
              ],
            },
          },
          {
            name: "Jumbo Free-Range Eggs (12 Pack)",
            slug: "jumbo-free-range-eggs",
            shortDescription: "Extra-large brown eggs for baking and hearty breakfasts.",
            description:
              "Free-range jumbo eggs with protein-rich whites and deep golden yolks. Perfect for restaurants and home chefs.",
            priceInCents: 6200,
            stock: 120,
            unit: "Box",
            isFeatured: true,
            images: {
              create: [
                { url: "/eggegs.jpg", altText: "Jumbo eggs", position: 0 },
              ],
            },
          },
        ],
      },
    },
    {
      name: "Vegetables",
      slug: "vegetables",
      description: "Seasonal and sustainable produce from our fields.",
      products: {
        create: [
          {
            name: "Spinach Bunch",
            slug: "spinach-bunch",
            shortDescription: "Crisp, nutrient-rich spinach harvested at dawn.",
            description:
              "Dark green leaves packed with vitamins A, C, and K. Ideal for smoothies, sautés, and salads.",
            priceInCents: 2800,
            stock: 180,
            unit: "Bunch",
            images: {
              create: [
                { url: "/spinash3.jpg", altText: "Fresh spinach", position: 0 },
              ],
            },
          },
          {
            name: "Rainbow Bell Peppers",
            slug: "rainbow-bell-peppers",
            shortDescription: "Colourful peppers full of flavour and crunch.",
            description:
              "A trio of red, yellow, and green bell peppers. Hand-picked to guarantee sweetness and vibrant colour.",
            priceInCents: 4500,
            stock: 90,
            unit: "Pack",
            images: {
              create: [
                {
                  url: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=900&q=80",
                  altText: "Bell peppers",
                  position: 0,
                },
              ],
            },
          },
        ],
      },
    },
  ];

  // Seed admin users
  const adminUser1 = await prisma.user.upsert({
    where: { email: "Alexsouthflow@gmail.com" },
    update: {
      role: "ADMIN",
    },
    create: {
      kindeId: "admin_seed_user_1", // Temporary - will be updated on first Kinde login
      email: "Alexsouthflow@gmail.com",
      name: "Alex Admin",
      role: "ADMIN",
    },
  });

  const adminUser2 = await prisma.user.upsert({
    where: { email: "zifa@mathebulafarm.co.za" },
    update: {
      role: "ADMIN",
    },
    create: {
      kindeId: "admin_seed_user_2", // Temporary - will be updated on first Kinde login
      email: "zifa@mathebulafarm.co.za",
      name: "Zifa Admin",
      role: "ADMIN",
    },
  });

  console.log("✅ Admin users seeded:", adminUser1.email, adminUser2.email);

  // Seed product categories
  for (const category of categoryData) {
    await prisma.productCategory.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  console.log("✅ Database seeded successfully.");

  // Seed demo customers and orders if dataset is small
  const existingOrders = await prisma.order.count();
  if (existingOrders < 60) {
    console.log("ℹ️ Seeding additional customers and orders for richer analytics...");

    const seedPeople = [
      { email: "customer1@example.com", name: "Lebo M" },
      { email: "customer2@example.com", name: "Sipho K" },
      { email: "customer3@example.com", name: "Thandi N" },
      { email: "customer4@example.com", name: "Kagiso P" },
      { email: "customer5@example.com", name: "Anele D" },
      { email: "customer6@example.com", name: "Zinhle S" },
      { email: "customer7@example.com", name: "Sibusiso T" },
      { email: "customer8@example.com", name: "Nandi H" },
      { email: "customer9@example.com", name: "Karabo R" },
      { email: "customer10@example.com", name: "Nomsa G" },
      { email: "customer11@example.com", name: "Musa J" },
      { email: "customer12@example.com", name: "Ayanda B" },
    ];

    const customers = await Promise.all(
      seedPeople.map((u) =>
        prisma.user.upsert({
          where: { email: u.email },
          update: {},
          create: {
            kindeId: `seed_${u.email}`,
            email: u.email,
            name: u.name,
            role: "CUSTOMER",
          },
        })
      )
    );

    // Diverse addresses across SA
    const locations = [
      { city: "Johannesburg", province: "Gauteng", postalCode: "2000" },
      { city: "Pretoria", province: "Gauteng", postalCode: "0002" },
      { city: "Cape Town", province: "Western Cape", postalCode: "8001" },
      { city: "Durban", province: "KwaZulu-Natal", postalCode: "4001" },
      { city: "Gqeberha", province: "Eastern Cape", postalCode: "6001" },
      { city: "Bloemfontein", province: "Free State", postalCode: "9301" },
      { city: "Polokwane", province: "Limpopo", postalCode: "0700" },
      { city: "Nelspruit", province: "Mpumalanga", postalCode: "1200" },
      { city: "Kimberley", province: "Northern Cape", postalCode: "8301" },
      { city: "Mahikeng", province: "North West", postalCode: "2745" },
    ];

    const addresses = await Promise.all(
      customers.map((c, i) => {
        const loc = locations[i % locations.length];
        return prisma.address.upsert({
          where: {
            // Composite uniqueness is not defined; use a synthetic unique via user default home label
            id: `${c.id}_seed_home`,
          },
          update: {},
          create: {
            id: `${c.id}_seed_home`,
            userId: c.id,
            label: "Home",
            recipient: c.name || "Customer",
            line1: `${100 + i} Market Street`,
            city: loc.city,
            province: loc.province,
            postalCode: loc.postalCode,
            country: "South Africa",
            isDefault: true,
          },
        });
      })
    );

    // Ensure we have products
    const products = await prisma.product.findMany({ take: 6 });
    if (products.length === 0) {
      console.warn("⚠️ No products available to create demo orders.");
      return;
    }

    // Helper to random pick
    const rand = (n: number) => Math.floor(Math.random() * n);

    // Create ~80 orders over last 90 days, weighted towards recent days and business hours
    const targetOrders = 80 - existingOrders;
    const now = new Date();
    for (let i = 0; i < targetOrders; i++) {
      const user = customers[rand(customers.length)];
      const address = addresses.find((a) => a.userId === user.id)!;

      // Skewed day offset: quadratic bias towards recent days
      const r = Math.random();
      const daysBack = Math.floor((1 - Math.sqrt(r)) * 90);
      const placedAt = new Date(now);
      placedAt.setDate(now.getDate() - daysBack);

      // Randomize time of day with business-hours bias
      const business = Math.random() < 0.7; // 70% in 8:00-19:00
      const hour = business ? 8 + rand(12) : rand(24);
      const minute = rand(60);
      const second = rand(60);
      placedAt.setHours(hour, minute, second, 0);

      const lineCount = 1 + (Math.random() < 0.35 ? 1 : 0);
      const chosen = Array.from({ length: lineCount }, () => products[rand(products.length)]);
      let subtotal = 0;
      const items = chosen.map((p) => {
        const qty = 1 + rand(3);
        subtotal += p.priceInCents * qty;
        return {
          productId: p.id,
          productName: p.name,
          quantity: qty,
          unitPriceInCents: p.priceInCents,
        };
      });
      const shipping = 0;
      const total = subtotal + shipping;

      // Status distribution favoring PAID and FULFILLED
      const sr = Math.random();
      const status = sr < 0.05 ? "CANCELLED" : sr < 0.25 ? "PENDING" : sr < 0.65 ? "PAID" : "FULFILLED";

      await prisma.order.create({
        data: {
          userId: user.id,
          addressId: address.id,
          status,
          subtotalInCents: subtotal,
          shippingInCents: shipping,
          totalInCents: total,
          notes: null,
          placedAt,
          items: { create: items },
        },
      });
    }

    console.log("✅ Additional demo orders and customers seeded.");
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
