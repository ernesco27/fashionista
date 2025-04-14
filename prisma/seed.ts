import { PrismaClient, ProductStatus } from "@prisma/client";

const prisma = new PrismaClient();

// Helper function to generate combinations
function generateCombinations(arrays: any[][]): any[][] {
  if (!arrays || arrays.length === 0) {
    return [[]];
  }
  const firstArray = arrays[0];
  const restCombinations = generateCombinations(arrays.slice(1));
  const combinations = [];
  for (const item of firstArray) {
    for (const combo of restCombinations) {
      combinations.push([item, ...combo]);
    }
  }
  return combinations;
}

async function main() {
  //SLIDES
  const slideData = [
    {
      title: "Summer Sale",
      description: "Get ready for the hottest deals of the season!",
      image: "/assets/womens-corset-top.png",
      link: "categories/womens-fashion/products",
      order: 1,
      name: "banner home",
      btn: "shop now",
      slug: "banner-home",
      subTitle: "UP TO 40% OFF",
      textColor: "#ffffff",
    },
    {
      title: "New Arrivals",
      description: "Explore the latest fashion trends!",
      image: "/assets/kente-dress.png",
      link: "categories/womens-fashion/products",
      order: 2,
      name: "banner-home-2",
      btn: "shop now",
      slug: "banner-home",
      subTitle: "Exclusive Classics",
      textColor: "#ffffff",
    },
    {
      title: "Men's Clothing",
      description: "Discover our most popular products!",
      image: "/assets/mens-kaftan.png",
      link: "categories/men-clothing/products",
      order: 3,
      name: "banner-home-3",
      btn: "shop now",
      slug: "banner-home",
    },
    {
      title: "Gift Ideas",
      description: "Find the perfect present for your loved ones!",
      image: "/assets/shopper.jpg",
      link: "gift-ideas",
      order: 4,
      name: "banner-home-3",
      btn: "shop now",
      slug: "banner-home",
    },
    {
      title: "Women's Fashion",
      image: "/assets/peplum-blouse.png",
      link: "categories/womens-fashion/products",
      order: 5,
      name: "top categories",
      btn: "shop now",
      slug: "top-categories-home",
    },
    {
      title: "Men's Fashion",
      image: "/assets/mens-embroidered-dashiki.png",
      link: "categories/mens-fashion/products",
      order: 6,
      name: "top categories",
      btn: "shop now",
      slug: "top-categories-home",
    },
    {
      title: "Kid's Fashion",
      image: "/assets/kids.jpg",
      link: "categories/kids-fashion/products",
      order: 7,
      name: "top categories",
      btn: "shop now",
      slug: "top-categories-home",
    },
    {
      title: "big sale",
      image: "/assets/cta-home.jpg",
      link: "categories/big-sale/products",
      order: 8,
      name: "cta home",
      btn: "shop now",
      slug: "cta-home",
    },
    {
      title: "deals of the month",
      description: "Modern ankara corset top with traditional prints",
      image: "/assets/womens-corset-top.png",
      link: "/products/womens-ankara-corset-top",
      order: 9,
      name: "cta home",
      btn: "shop now",
      slug: "cta-home-2",
    },
  ];

  await Promise.all(
    slideData.map((slide) => prisma.slide.create({ data: slide })),
  );

  // CATEGORY - Create categories and store their IDs
  const categories = await Promise.all(
    [
      {
        name: "Women's Fashion",
        link: "womens-fashion",
        slug: "womens-fashion",
        image:
          "https://res.cloudinary.com/dlm0ieiyt/image/upload/v1721648031/4vy12UtugCqB76AoWvy0cAHlzKb1HZsklmkOQ6hK_r0dyjn.jpg",
      },
      {
        name: "Hot Sale",
        link: "hot-sale",
        slug: "hot-sale",
        image:
          "https://res.cloudinary.com/dlm0ieiyt/image/upload/v1721648031/4vy12UtugCqB76AoWvy0cAHlzKb1HZsklmkOQ6hK_r0dyjn.jpg",
      },
      {
        name: "Men's Fashion",
        link: "mens-fashion",
        slug: "mens-fashion",
        image:
          "https://res.cloudinary.com/dlm0ieiyt/image/upload/v1721648031/4vy12UtugCqB76AoWvy0cAHlzKb1HZsklmkOQ6hK_r0dyjn.jpg",
      },
    ].map((category) => prisma.category.create({ data: category })),
  );

  // SUB CATEGORY - Use the actual category IDs
  const subCategoryData = [
    {
      name: "Corset",
      link: "corset",
      slug: "corset",
      categoryId: categories[0].id, // Women's Fashion
    },
    {
      name: "Straigt Dress",
      link: "straight-dress",
      slug: "straight-dress",
      categoryId: categories[0].id, // Women's Fashion
    },
    {
      name: "Jump Suits",
      link: "jump-suits",
      slug: "jump-suits",
      categoryId: categories[0].id, // Women's Fashion
    },
    {
      name: "T-Shirt",
      link: "t-shirt",
      slug: "t-shirt",
      categoryId: categories[2].id, // Men's Fashion
    },
  ];

  // Create subcategories
  const subcategories = await Promise.all(
    subCategoryData.map((subCategory) =>
      prisma.subcategory.create({ data: subCategory }),
    ),
  );

  // After creating subcategories, store them in a map for easy access
  const subcategoryMap = new Map(subcategories.map((sub) => [sub.name, sub]));

  // Helper function to safely get subcategory ID
  const getSubcategoryId = (name: string) => {
    const sub = subcategoryMap.get(name);
    if (!sub) throw new Error(`Subcategory ${name} not found`);
    return sub.id;
  };

  //PAGES
  const pages = await Promise.all(
    [
      {
        name: "Home",
        link: "/",
        slug: "home",
      },
      {
        name: "Store",
        link: "/products",
        slug: "store",
      },
      {
        name: "About",
        link: "/about",
        slug: "about",
      },
      {
        name: "Contact",
        link: "/contact",
        slug: "contact",
      },
      {
        name: "FAQ",
        link: "/faq",
        slug: "faq",
      },
      {
        name: "Terms",
        link: "/terms",
        slug: "terms",
      },
      {
        name: "Privacy",
        link: "/privacy",
        slug: "privacy",
      },
    ].map((page) => prisma.pages.create({ data: page })),
  );

  //SUB PAGES
  const subPageData = [
    {
      name: "Home",
      link: "/",
      slug: "home",
      pageId: pages[0].id, // Use the actual ID from the created Home page
    },
  ];

  // Create subpages
  const subpages = await Promise.all(
    subPageData.map((subPage) => prisma.subpage.create({ data: subPage })),
  );

  // Create sample users
  const users = await prisma.user.createMany({
    data: [
      {
        id: "user_2HNYXXXXXXXXXXX",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        isActive: true,
        emailVerified: true,
      },
      {
        id: "user_2HNYYYYYYYYYYYY",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        isActive: true,
        emailVerified: true,
      },
    ],
    skipDuplicates: true,
  });
  // First, create the brand
  const brand = await prisma.brand.create({
    data: {
      name: "AfriStyle",
      description: "Premium African Fashion Brand",
      logo: "/images/brands/afristyle-logo.png",
      link: "https://afristyle.com",
      slug: "afristyle",
    },
  });

  // Create some discounts
  const discounts = await prisma.discount.createMany({
    data: [
      {
        name: "SUMMER23",
        description: "Summer 2023 Discount",
        value: 20,
        type: "PERCENTAGE",
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        isActive: true,
      },
      {
        name: "NEWUSER",
        description: "New User Discount",
        value: 10,
        type: "PERCENTAGE",
        startDate: new Date(),
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
        isActive: true,
      },
    ],
  });

  // Store the created discount IDs
  const [summerDiscount] = await prisma.discount.findMany({
    where: { name: "SUMMER23" },
    select: { id: true },
  });

  // NOW create products

  const mensKentePrintShirtData = {
    name: "Men's Kente Print Shirt",
    link: "kente-print-shirt",
    slug: "kente-print-shirt",
    description:
      "Traditional Ghanaian kente-inspired print shirt in vibrant colors, perfect for special occasions",
    fullDescription:
      "This exquisite Men's Kente Print Shirt is crafted from premium cotton fabric with traditional Ghanaian kente-inspired patterns. The shirt features a classic fit with a button-down collar and long sleeves. The vibrant colors and intricate patterns make it perfect for special occasions, cultural events, or making a bold fashion statement. Care instructions: Machine wash cold, tumble dry low, iron on low heat. Made with 100% premium cotton for comfort and durability.",
    price: 89.99,
    sku: "MKS001-MAIN",
    status: ProductStatus.PUBLISHED,
    subcategoryId: getSubcategoryId("T-Shirt"),
    categoryId: categories[2].id,
    brandId: brand.id,
    isAvailable: true,
    materialType: "Cotton",

    // Add images
    images: {
      create: [
        {
          link: "/assets/kente-print-shirt.jpg",
          slug: "kente-print-shirt",
          altText: "Men's Kente Print Shirt - Front View",
          isPrimary: true,
        },
        {
          link: "/assets/kente-print-shirt-1.jpg",
          slug: "kente-print-shirt-1",
          altText: "Men's Kente Print Shirt - Back View",
          isPrimary: false,
        },
      ],
    },

    // Add variants (without price/stock/sku)
    variants: {
      create: [
        {
          name: "Size",
          link: "mens-kente-shirt-size",
          slug: "mens-kente-shirt-size",
        },
        {
          name: "Color",
          link: "mens-kente-shirt-color",
          slug: "mens-kente-shirt-color",
        },
      ],
    },

    // Connect tags
    tags: {
      create: [
        { name: "Kente" },
        { name: "Traditional" },
        { name: "Formal Wear" },
      ],
    },

    // Connect discounts
    discounts: {
      connect: [{ id: summerDiscount.id }],
    },

    // Add reviews (sample review)
    reviews: {
      create: [
        {
          rating: 5,
          comment: "Excellent quality and perfect fit!",
          userId: "user_2HNYXXXXXXXXXXX",
        },
      ],
    },

    likes: {
      create: [
        {
          userId: "user_2HNYXXXXXXXXXXX",
        },
      ],
    },
  };

  console.log(
    "Creating mensKentePrintShirt with data:",
    JSON.stringify(mensKentePrintShirtData, null, 2),
  );

  const mensKentePrintShirt = await prisma.products.create({
    data: mensKentePrintShirtData,
  });

  // --- Create ProductVariantValues (without price/qty/sku) ---
  const sizeVariantMKS = await prisma.productVariant.findFirst({
    where: { name: "Size", productId: mensKentePrintShirt.id },
  });
  const colorVariantMKS = await prisma.productVariant.findFirst({
    where: { name: "Color", productId: mensKentePrintShirt.id },
  });

  let sizeValuesMKS: any[] = [];
  if (sizeVariantMKS) {
    await prisma.productVariantValue.createMany({
      data: [
        { value: "S", variantId: sizeVariantMKS.id },
        { value: "M", variantId: sizeVariantMKS.id },
        { value: "L", variantId: sizeVariantMKS.id },
        { value: "XL", variantId: sizeVariantMKS.id },
      ],
    });
    sizeValuesMKS = await prisma.productVariantValue.findMany({
      where: { variantId: sizeVariantMKS.id },
    });
  }

  let colorValuesMKS: any[] = [];
  if (colorVariantMKS) {
    await prisma.productVariantValue.createMany({
      data: [
        { value: "Gold", hexCode: "#FFD700", variantId: colorVariantMKS.id },
        { value: "Green", hexCode: "#006400", variantId: colorVariantMKS.id },
        { value: "Red", hexCode: "#FF0000", variantId: colorVariantMKS.id },
      ],
    });
    colorValuesMKS = await prisma.productVariantValue.findMany({
      where: { variantId: colorVariantMKS.id },
    });
  }

  // --- Create ProductItems for Combinations ---
  const variantsWithOptionsMKS = [
    sizeValuesMKS.map((v) => ({ id: v.id, value: v.value, name: "Size" })),
    colorValuesMKS.map((v) => ({ id: v.id, value: v.value, name: "Color" })),
  ].filter((arr) => arr.length > 0);

  const combinationsMKS = generateCombinations(variantsWithOptionsMKS);

  for (const combo of combinationsMKS) {
    const sku = `MKS001-${combo.map((v) => v.value).join("-")}`;
    let price;
    let quantity;

    // Check for specific combinations to override price/quantity
    const isSize = (val: string) =>
      combo.some((v) => v.name === "Size" && v.value === val);
    const isColor = (val: string) =>
      combo.some((v) => v.name === "Color" && v.value === val);

    if (isSize("XL") && isColor("Red")) {
      quantity = 0; // Out of stock
      price = mensKentePrintShirt.salesPrice ?? mensKentePrintShirt.price ?? 0; // Use default price
    } else if (isSize("S") && isColor("Gold")) {
      quantity = 5;
      price = 92.5; // Specific price
    } else if (isSize("M") && isColor("Green")) {
      quantity = 15;
      price = 95.0; // Specific price
    } else {
      // Default values for other combinations
      quantity = 10;
      price = mensKentePrintShirt.salesPrice ?? mensKentePrintShirt.price ?? 0;
    }

    await prisma.productItem.create({
      data: {
        productId: mensKentePrintShirt.id,
        sku: sku,
        price: price, // Use the determined price
        quantity: quantity, // Use the determined quantity
        variantValues: {
          connect: combo.map((v) => ({ id: v.id })),
        },
      },
    });
  }

  const fuguSmock = await prisma.products.create({
    data: {
      name: "Men's Fugu Smock",
      link: "mens-fugu-smock",
      slug: "mens-fugu-smock",
      description:
        "Handwoven northern Ghana fugu smock with intricate embroidery patterns",
      fullDescription:
        "The Men's Fugu Smock is a traditional garment handwoven by skilled artisans in northern Ghana. Made from premium cotton fabric, this smock features intricate embroidery patterns that tell stories of the region's rich cultural heritage. The loose, comfortable fit makes it perfect for both casual and formal occasions. The smock includes a matching pair of trousers and comes with a detailed care guide. Hand wash only, dry flat, and iron on low heat. Each piece is unique due to the handcrafted nature of the embroidery.",
      price: 129.99,
      sku: "MFS002-MAIN",
      status: ProductStatus.PUBLISHED,
      subcategoryId: getSubcategoryId("T-Shirt"),
      categoryId: categories[2].id,
      brandId: brand.id,
      isAvailable: true,
      featured: false,
      materialType: "Cotton",

      images: {
        create: [
          {
            link: "/assets/mens-fugu-smock.png",
            slug: "mens-fugu-smock",
            altText: "Men's Fugu Smock - Front View",
            isPrimary: true,
          },
          {
            link: "/assets/mens-fugu-smock-1.png",
            slug: "mens-fugu-smock-1",
            altText: "Men's Fugu Smock - Side View",
            isPrimary: false,
          },
        ],
      },

      variants: {
        create: [
          {
            name: "Size",
            link: "mens-fugu-smock-size",
            slug: "mens-fugu-smock-size",
          },
          {
            name: "Color",
            link: "mens-fugu-smock-color",
            slug: "mens-fugu-smock-color",
          },
        ],
      },

      tags: {
        create: [{ name: "Casual" }, { name: "Handmade" }],
      },

      discounts: {
        connect: [{ id: summerDiscount.id }],
      },

      likes: {
        create: [{ userId: "user_2HNYXXXXXXXXXXX" }],
      },
    },
  });

  // Create fuguSmock Variant Values (Size, Color)
  const sizeVariantFugu = await prisma.productVariant.findFirst({
    where: { name: "Size", productId: fuguSmock.id },
  });
  const colorVariantFugu = await prisma.productVariant.findFirst({
    where: { name: "Color", productId: fuguSmock.id },
  });

  let sizeValuesFugu: any[] = [];
  if (sizeVariantFugu) {
    await prisma.productVariantValue.createMany({
      data: [
        { value: "S", variantId: sizeVariantFugu.id },
        { value: "M", variantId: sizeVariantFugu.id },
        { value: "L", variantId: sizeVariantFugu.id },
        { value: "XL", variantId: sizeVariantFugu.id },
      ],
    });
    sizeValuesFugu = await prisma.productVariantValue.findMany({
      where: { variantId: sizeVariantFugu.id },
    });
  }
  let colorValuesFugu: any[] = [];
  if (colorVariantFugu) {
    await prisma.productVariantValue.createMany({
      data: [
        {
          value: "Natural",
          hexCode: "#F5E6D3",
          variantId: colorVariantFugu.id,
        },
        { value: "Black", hexCode: "#000000", variantId: colorVariantFugu.id },
        { value: "Brown", hexCode: "#8B4513", variantId: colorVariantFugu.id },
      ],
    });
    colorValuesFugu = await prisma.productVariantValue.findMany({
      where: { variantId: colorVariantFugu.id },
    });
  }

  // Create fuguSmock ProductItems
  const variantsWithOptionsFugu = [
    sizeValuesFugu.map((v) => ({ id: v.id, value: v.value, name: "Size" })),
    colorValuesFugu.map((v) => ({ id: v.id, value: v.value, name: "Color" })),
  ].filter((arr) => arr.length > 0);
  const combinationsFugu = generateCombinations(variantsWithOptionsFugu);

  for (const combo of combinationsFugu) {
    const sku = `MFS002-${combo.map((v) => v.value).join("-")}`;
    const price = fuguSmock.price ?? 0;
    const quantity = 15; // Example quantity
    await prisma.productItem.create({
      data: {
        productId: fuguSmock.id,
        sku: sku,
        price: price,
        quantity: quantity,
        variantValues: { connect: combo.map((v) => ({ id: v.id })) },
      },
    });
  }

  const ankaraJumpsuit = await prisma.products.create({
    data: {
      name: "Women's Designer Ankara Jumpsuit",
      link: "womens-ankara-jumpsuit",
      slug: "womens-ankara-jumpsuit-001",
      description:
        "Modern ankara jumpsuit with bold prints, perfect for making a statement",
      fullDescription:
        "This stunning Women's Designer Ankara Jumpsuit features bold, vibrant prints on premium ankara fabric. The modern design includes a fitted bodice, wide-leg pants, and a flattering waistline. Perfect for making a statement at special events, parties, or cultural celebrations. The jumpsuit is lined for comfort and includes a hidden back zipper for easy wear. Made from 100% cotton ankara fabric with a comfortable stretch. Care instructions: Hand wash cold, line dry, iron on low heat. Available in various sizes to ensure the perfect fit.",
      price: 149.99,
      salesPrice: 100.0,
      sku: "WAJ001-MAIN",
      status: "PUBLISHED",
      subcategoryId: getSubcategoryId("Jump Suits"),
      categoryId: categories[0].id,
      brandId: brand.id,
      isAvailable: true,
      featured: true,
      materialType: "Cotton",
      images: {
        create: [
          {
            link: "/assets/ankara-jumpsuit.png",
            slug: "ankara-jumpsuit",
            altText: "Women's Ankara Jumpsuit - Front View",
            isPrimary: true,
          },
          {
            link: "/assets/ankara-jumpsuit-1.png",
            slug: "ankara-jumpsuit-1",
            altText: "Women's Ankara Jumpsuit - Side View",
            isPrimary: false,
          },
        ],
      },
      variants: {
        create: [
          {
            name: "Size",
            link: "ankara-jumpsuit-size",
            slug: "ankara-jumpsuit-size",
          },
        ],
      },
      tags: {
        create: [{ name: "Modern" }, { name: "Ankara" }],
      },
      discounts: {
        connect: [{ id: summerDiscount.id }],
      },
    },
  });

  // Create variant values for the ankaraJumpsuit product's size variant
  const sizeVariantAnkara = await prisma.productVariant.findFirst({
    where: {
      name: "Size",
      productId: ankaraJumpsuit.id,
    },
  });

  if (sizeVariantAnkara) {
    await prisma.productVariantValue.createMany({
      data: [
        { value: "S", variantId: sizeVariantAnkara.id },
        { value: "M", variantId: sizeVariantAnkara.id },
        { value: "L", variantId: sizeVariantAnkara.id },
        { value: "XL", variantId: sizeVariantAnkara.id },
      ],
    });
  }

  const kenteDress = await prisma.products.create({
    data: {
      name: "Women's Traditional Kente Dress",
      link: "womens-kente-dress",
      slug: "womens-kente-dress-001",
      description:
        "Elegant kente dress featuring traditional Ghanaian patterns, perfect for formal occasions",
      fullDescription:
        "The Women's Traditional Kente Dress is a masterpiece of Ghanaian craftsmanship, featuring authentic kente cloth patterns woven by master weavers. This elegant dress combines traditional design with modern tailoring for a perfect fit. The dress features a fitted bodice, flared skirt, and intricate kente patterns that tell stories of Ghanaian heritage. Made from premium cotton kente fabric with a silk lining for comfort. Perfect for weddings, cultural events, and formal occasions. Care instructions: Dry clean only. Each dress is unique due to the handwoven nature of the kente fabric.",
      price: 199.99,
      salesPrice: 149.99,
      sku: "WKD001-MAIN",
      status: "PUBLISHED",
      subcategoryId: getSubcategoryId("Straigt Dress"),
      categoryId: categories[0].id,
      brandId: brand.id,
      isAvailable: true,
      featured: true,
      materialType: "Silk",
      images: {
        create: [
          {
            link: "/assets/kente-dress.png",
            slug: "kente-dress",
            altText: "Women's Kente Dress - Front View",
            isPrimary: true,
          },
          {
            link: "/assets/kente-dress-1.png",
            slug: "kente-dress-1",
            altText: "Women's Kente Dress - Back View",
            isPrimary: false,
          },
        ],
      },
      variants: {
        create: [
          {
            name: "Size",
            link: "kente-dress-size",
            slug: "kente-dress-size",
          },
        ],
      },
      tags: {
        connectOrCreate: [
          { where: { name: "Formal Wear" }, create: { name: "Formal Wear" } },
          { where: { name: "Traditional" }, create: { name: "Traditional" } },
        ],
      },
      discounts: {
        connect: [{ id: summerDiscount.id }],
      },
    },
  });

  // Create variant values for the kenteDress product's size variant
  const sizeVariantKenteDress = await prisma.productVariant.findFirst({
    where: {
      name: "Size",
      productId: kenteDress.id,
    },
  });

  if (sizeVariantKenteDress) {
    await prisma.productVariantValue.createMany({
      data: [
        { value: "S", variantId: sizeVariantKenteDress.id },
        { value: "M", variantId: sizeVariantKenteDress.id },
        { value: "L", variantId: sizeVariantKenteDress.id },
        { value: "XL", variantId: sizeVariantKenteDress.id },
      ],
    });
  }

  const mensDashiki = await prisma.products.create({
    data: {
      name: "Men's Premium Embroidered Dashiki",
      link: "mens-embroidered-dashiki",
      slug: "mens-embroidered-dashiki",
      description: "Hand-embroidered dashiki shirt with intricate patterns",
      fullDescription:
        "This premium Men's Embroidered Dashiki is a work of art, featuring intricate hand-embroidery on premium cotton fabric. The dashiki includes traditional African patterns and symbols, each telling a unique story. The loose, comfortable fit makes it perfect for both casual and formal occasions. The shirt features a V-neck design with matching embroidery around the neckline and sleeves. Made from 100% premium cotton for breathability and comfort. Care instructions: Hand wash cold, line dry, iron on low heat. Each piece is unique due to the hand-embroidery process.",
      price: 119.99,
      salesPrice: 99.99,
      sku: "MED001-MAIN",
      status: "PUBLISHED",
      subcategoryId: getSubcategoryId("T-Shirt"),
      categoryId: categories[2].id,
      brandId: brand.id,
      isAvailable: true,
      featured: true,
      materialType: "Cotton",
      images: {
        create: [
          {
            link: "/assets/mens-embroidered-dashiki.png",
            slug: "mens-embroidered-dashiki",
            altText: "Men's Dashiki - Front View",
            isPrimary: true,
          },
          {
            link: "/assets/mens-embroidered-dashiki-1.png",
            slug: "mens-embroidered-dashiki-1",
            altText: "Men's Dashiki - Back View",
            isPrimary: false,
          },
        ],
      },
      variants: {
        create: [
          {
            name: "Size",
            link: "mens-dashiki-size",
            slug: "mens-dashiki-size",
          },
          {
            name: "Color",
            link: "mens-dashiki-color",
            slug: "mens-dashiki-color",
          },
        ],
      },
      tags: {
        connectOrCreate: [
          { where: { name: "Handmade" }, create: { name: "Handmade" } },
          { where: { name: "Traditional" }, create: { name: "Traditional" } },
        ],
      },
      discounts: {
        connect: [{ id: summerDiscount.id }],
      },
    },
  });

  // Create variant values for the mensDashiki product's size variant
  const sizeVariantDashiki = await prisma.productVariant.findFirst({
    where: {
      name: "Size",
      productId: mensDashiki.id,
    },
  });

  if (sizeVariantDashiki) {
    await prisma.productVariantValue.createMany({
      data: [
        { value: "S", variantId: sizeVariantDashiki.id },
        { value: "M", variantId: sizeVariantDashiki.id },
        { value: "L", variantId: sizeVariantDashiki.id },
        { value: "XL", variantId: sizeVariantDashiki.id },
      ],
    });
  }

  // Create variant values for the mensDashiki product's color variant
  const colorVariantDashiki = await prisma.productVariant.findFirst({
    where: {
      name: "Color",
      productId: mensDashiki.id,
    },
  });

  if (colorVariantDashiki) {
    await prisma.productVariantValue.createMany({
      data: [
        {
          value: "White",
          hexCode: "#FFFFFF",
          variantId: colorVariantDashiki.id,
        },
        {
          value: "Blue",
          hexCode: "#0000FF",
          variantId: colorVariantDashiki.id,
        },
        {
          value: "Gold",
          hexCode: "#FFD700",
          variantId: colorVariantDashiki.id,
        },
      ],
    });
  }

  const womensCorset = await prisma.products.create({
    data: {
      name: "Women's Ankara Corset Top",
      link: "womens-ankara-corset",
      slug: "womens-ankara-corset",
      description: "Modern ankara corset top with traditional prints",
      fullDescription:
        "The Women's Ankara Corset Top combines traditional African prints with modern corset styling. Made from premium ankara fabric, this top features a structured bodice with boning for support and a flattering silhouette. The vibrant patterns and colors make it perfect for both casual and formal occasions. The top includes adjustable lacing at the back for a custom fit. Made from 100% cotton ankara fabric with a comfortable stretch. Care instructions: Hand wash cold, line dry, iron on low heat. Available in various sizes to ensure the perfect fit.",
      price: 79.99,
      salesPrice: 49.99,
      sku: "WAC001-MAIN",
      status: "PUBLISHED",
      subcategoryId: getSubcategoryId("Corset"),
      categoryId: categories[0].id,
      brandId: brand.id,
      isAvailable: true,
      featured: true,
      materialType: "Cotton",
      images: {
        create: [
          {
            link: "/assets/womens-corset-top.png",
            slug: "womens-corset-top",
            altText: "Women's Corset - Front View",
            isPrimary: true,
          },
          {
            link: "/assets/womens-corset-top-1.png",
            slug: "womens-corset-top-1",
            altText: "Women's Corset - Back View",
            isPrimary: false,
          },
        ],
      },
      variants: {
        create: [
          {
            name: "Size",
            link: "womens-corset-size",
            slug: "womens-corset-size",
          },
        ],
      },
      tags: {
        connectOrCreate: [
          { where: { name: "Modern" }, create: { name: "Modern" } },
          { where: { name: "Ankara" }, create: { name: "Ankara" } },
        ],
      },
      discounts: {
        connect: [{ id: summerDiscount.id }],
      },
    },
  });

  // Create variant values for the womensCorset product's size variant
  const sizeVariantCorset = await prisma.productVariant.findFirst({
    where: {
      name: "Size",
      productId: womensCorset.id,
    },
  });

  if (sizeVariantCorset) {
    await prisma.productVariantValue.createMany({
      data: [
        { value: "S", variantId: sizeVariantCorset.id },
        { value: "M", variantId: sizeVariantCorset.id },
        { value: "L", variantId: sizeVariantCorset.id },
        { value: "XL", variantId: sizeVariantCorset.id },
      ],
    });
  }

  const mensAnkaraSuit = await prisma.products.create({
    data: {
      name: "Men's Ankara Suit",
      link: "mens-ankara-suit",
      slug: "mens-ankara-suit",
      description: "Contemporary two-piece ankara suit with modern cut",
      fullDescription:
        "This sophisticated Men's Ankara Suit features a contemporary two-piece design with modern tailoring. Made from premium ankara fabric, the suit includes a fitted jacket with notched lapels and matching trousers. The vibrant patterns and colors make it perfect for weddings, cultural events, and formal occasions. The suit is fully lined for comfort and includes functional pockets. Made from 100% cotton ankara fabric. Care instructions: Dry clean only. Available in various sizes to ensure the perfect fit.",
      price: 299.99,
      sku: "MAS001-MAIN",
      status: "PUBLISHED",
      subcategoryId: getSubcategoryId("T-Shirt"),
      categoryId: categories[2].id,
      brandId: brand.id,
      isAvailable: true,
      featured: false,
      materialType: "Cotton",
      images: {
        create: [
          {
            link: "/assets/mens-ankara-suit.png",
            slug: "mens-ankara-suit",
            altText: "Men's Suit - Front View",
            isPrimary: true,
          },
          {
            link: "/assets/mens-ankara-suit-1.png",
            slug: "mens-ankara-suit-1",
            altText: "Men's Suit - Side View",
            isPrimary: false,
          },
        ],
      },
      variants: {
        create: [
          {
            name: "Size",
            link: "mens-ankara-suit-size",
            slug: "mens-ankara-suit-size",
          },
        ],
      },
      tags: {
        connectOrCreate: [
          { where: { name: "Formal Wear" }, create: { name: "Formal Wear" } },
          { where: { name: "Modern" }, create: { name: "Modern" } },
        ],
      },
      discounts: {
        connect: [{ id: summerDiscount.id }],
      },
    },
  });

  // Create variant values for the mensAnkaraSuit product's size variant
  const sizeVariantSuit = await prisma.productVariant.findFirst({
    where: {
      name: "Size",
      productId: mensAnkaraSuit.id,
    },
  });

  if (sizeVariantSuit) {
    await prisma.productVariantValue.createMany({
      data: [
        { value: "S", variantId: sizeVariantSuit.id },
        { value: "M", variantId: sizeVariantSuit.id },
        { value: "L", variantId: sizeVariantSuit.id },
        { value: "XL", variantId: sizeVariantSuit.id },
      ],
    });
  }

  const womensStraightDress = await prisma.products.create({
    data: {
      name: "Women's Kente Straight Dress",
      link: "womens-kente-straight-dress",
      slug: "womens-kente-straight-dress",
      description: "Sophisticated straight-cut dress with kente accents",
      fullDescription:
        "The Women's Kente Straight Dress features a sophisticated straight-cut design with authentic kente cloth accents. Made from premium cotton fabric with kente detailing, this dress offers a modern silhouette while celebrating traditional Ghanaian craftsmanship. The dress includes a fitted bodice, straight skirt, and kente trim at the neckline and hem. Perfect for formal occasions, cultural events, and special celebrations. Made from 100% cotton with a silk lining for comfort. Care instructions: Dry clean only. Each dress is unique due to the handwoven kente accents.",
      price: 169.99,
      salesPrice: 149.99,
      sku: "WKS001-MAIN",
      status: "PUBLISHED",
      subcategoryId: getSubcategoryId("Straigt Dress"),
      categoryId: categories[0].id,
      brandId: brand.id,
      isAvailable: true,
      featured: true,
      materialType: "Cotton",
      images: {
        create: [
          {
            link: "/assets/kente-straight-dress.jpg",
            slug: "kente-straight-dress",
            altText: "Women's Straight Dress - Front View",
            isPrimary: true,
          },
          {
            link: "/assets/kente-straight-dress-1.png",
            slug: "kente-straight-dress-1",
            altText: "Women's Straight Dress - Back View",
            isPrimary: false,
          },
        ],
      },
      variants: {
        create: [
          {
            name: "Size",
            link: "kente-straight-dress-size",
            slug: "kente-straight-dress-size",
          },
        ],
      },
      tags: {
        connectOrCreate: [
          { where: { name: "Formal Wear" }, create: { name: "Formal Wear" } },
          { where: { name: "Traditional" }, create: { name: "Traditional" } },
        ],
      },
      discounts: {
        connect: [{ id: summerDiscount.id }],
      },
    },
  });

  // Create variant values for the womensStraightDress product's size variant
  const sizeVariantStraightDress = await prisma.productVariant.findFirst({
    where: {
      name: "Size",
      productId: womensStraightDress.id,
    },
  });

  if (sizeVariantStraightDress) {
    await prisma.productVariantValue.createMany({
      data: [
        { value: "S", variantId: sizeVariantStraightDress.id },
        { value: "M", variantId: sizeVariantStraightDress.id },
        { value: "L", variantId: sizeVariantStraightDress.id },
        { value: "XL", variantId: sizeVariantStraightDress.id },
      ],
    });
  }

  const mensKaftanSet = await prisma.products.create({
    data: {
      name: "Men's Embroidered Kaftan Set",
      link: "mens-kaftan-set",
      slug: "mens-kaftan-set",
      description: "Luxurious two-piece kaftan set with gold embroidery",
      fullDescription:
        "This luxurious Men's Embroidered Kaftan Set features a two-piece design with intricate gold embroidery. Made from premium cotton fabric, the set includes a long kaftan with matching trousers. The embroidery features traditional African patterns and symbols, each telling a unique story. The loose, comfortable fit makes it perfect for both casual and formal occasions. The set is fully lined for comfort and includes a matching belt. Made from 100% premium cotton. Care instructions: Hand wash cold, line dry, iron on low heat. Each piece is unique due to the hand-embroidery process.",
      price: 189.99,
      salesPrice: 169.99,
      sku: "MKS002-MAIN",
      status: "PUBLISHED",
      subcategoryId: getSubcategoryId("T-Shirt"),
      categoryId: categories[2].id,
      brandId: brand.id,
      isAvailable: true,
      featured: true,
      materialType: "Cotton",
      images: {
        create: [
          {
            link: "/assets/mens-kaftan.png",
            slug: "mens-kaftan",
            altText: "Men's Kaftan Set - Front View",
            isPrimary: true,
          },
          {
            link: "/assets/mens-kaftan-1.png",
            slug: "mens-kaftan-1",
            altText: "Men's Kaftan Set - Side View",
            isPrimary: false,
          },
        ],
      },
      variants: {
        create: [
          {
            name: "Size",
            link: "mens-kaftan-size",
            slug: "mens-kaftan-size",
          },
        ],
      },
      tags: {
        connectOrCreate: [
          { where: { name: "Traditional" }, create: { name: "Traditional" } },
          { where: { name: "Formal Wear" }, create: { name: "Formal Wear" } },
        ],
      },
      discounts: {
        connect: [{ id: summerDiscount.id }],
      },
    },
  });

  // Create variant values for the mensKaftanSet product's size variant
  const sizeVariantKaftan = await prisma.productVariant.findFirst({
    where: {
      name: "Size",
      productId: mensKaftanSet.id,
    },
  });

  if (sizeVariantKaftan) {
    await prisma.productVariantValue.createMany({
      data: [
        { value: "S", variantId: sizeVariantKaftan.id },
        { value: "M", variantId: sizeVariantKaftan.id },
        { value: "L", variantId: sizeVariantKaftan.id },
        { value: "XL", variantId: sizeVariantKaftan.id },
      ],
    });
  }

  const womensAnkaraBlouse = await prisma.products.create({
    data: {
      name: "Women's Ankara Peplum Blouse",
      link: "womens-ankara-peplum",
      slug: "womens-ankara-peplum",
      description: "Stylish peplum blouse with vibrant ankara prints",
      fullDescription:
        "The Women's Ankara Peplum Blouse features a stylish peplum design with vibrant ankara prints. Made from premium ankara fabric, this blouse includes a fitted bodice with a flared peplum hem. The vibrant patterns and colors make it perfect for both casual and formal occasions. The blouse features a round neckline and short sleeves for a modern look. Made from 100% cotton ankara fabric with a comfortable stretch. Care instructions: Hand wash cold, line dry, iron on low heat. Available in various sizes to ensure the perfect fit.",
      price: 89.99,
      salesPrice: 69.99,
      sku: "WAP001-MAIN",
      status: "PUBLISHED",
      subcategoryId: getSubcategoryId("Corset"),
      categoryId: categories[0].id,
      brandId: brand.id,
      isAvailable: true,
      featured: true,
      materialType: "Cotton",
      images: {
        create: [
          {
            link: "/assets/peplum-blouse.png",
            slug: "peplum-blouse",
            altText: "Women's Peplum Blouse - Front View",
            isPrimary: true,
          },
          {
            link: "/assets/peplum-blouse-1.png",
            slug: "peplum-blouse-1",
            altText: "Women's Peplum Blouse - Back View",
            isPrimary: false,
          },
        ],
      },
      variants: {
        create: [
          {
            name: "Size",
            link: "peplum-blouse-size",
            slug: "peplum-blouse-size",
          },
        ],
      },
      tags: {
        connectOrCreate: [
          { where: { name: "Modern" }, create: { name: "Modern" } },
          { where: { name: "Casual" }, create: { name: "Casual" } },
        ],
      },
      discounts: {
        connect: [{ id: summerDiscount.id }],
      },
    },
  });

  // Create variant values for the womensAnkaraBlouse product's size variant
  const sizeVariantBlouse = await prisma.productVariant.findFirst({
    where: {
      name: "Size",
      productId: womensAnkaraBlouse.id,
    },
  });

  if (sizeVariantBlouse) {
    await prisma.productVariantValue.createMany({
      data: [
        { value: "S", variantId: sizeVariantBlouse.id },
        { value: "M", variantId: sizeVariantBlouse.id },
        { value: "L", variantId: sizeVariantBlouse.id },
        { value: "XL", variantId: sizeVariantBlouse.id },
      ],
    });
  }

  // After creating all products, set up related products
  await prisma.products.update({
    where: { id: mensKentePrintShirt.id },
    data: {
      relatedProducts: {
        create: [
          {
            link: fuguSmock.link,
            slug: fuguSmock.slug,
            id: fuguSmock.id,
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
