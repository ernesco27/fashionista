import { PrismaClient, ProductStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //SLIDES
  const slideData = [
    {
      title: "Summer Sale",
      description: "Get ready for the hottest deals of the season!",
      image: "womens-corset-top.png",
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
      image: "kente-dress.png",
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
      image: "mens-kaftan.png",
      link: "categories/men-clothing/products",
      order: 3,
      name: "banner-home-3",
      btn: "shop now",
      slug: "banner-home",
    },
    {
      title: "Gift Ideas",
      description: "Find the perfect present for your loved ones!",
      image: "shopper.jpg",
      link: "gift-ideas",
      order: 4,
      name: "banner-home-3",
      btn: "shop now",
      slug: "banner-home",
    },
    {
      title: "Women's Fashion",
      image: "peplum-blouse.png",
      link: "categories/womens-fashion/products",
      order: 5,
      name: "top categories",
      btn: "shop now",
      slug: "top-categories-home",
    },
    {
      title: "Men's Fashion",
      image: "mens-embroidered-dashiki.png",
      link: "categories/mens-fashion/products",
      order: 6,
      name: "top categories",
      btn: "shop now",
      slug: "top-categories-home",
    },
    {
      title: "Kid's Fashion",
      image: "kids.jpg",
      link: "categories/kids-fashion/products",
      order: 7,
      name: "top categories",
      btn: "shop now",
      slug: "top-categories-home",
    },
    {
      title: "big sale",
      image: "cta-home.jpg",
      link: "categories/big-sale/products",
      order: 8,
      name: "cta home",
      btn: "shop now",
      slug: "cta-home",
    },
    {
      title: "deals of the month",
      description: "Modern ankara corset top with traditional prints",
      image: "womens-corset-top.png",
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
        id: "user_2HNYXXXXXXXXXXX", // Changed from 01 to 2 to ensure new unique ID
        firstName: "John",
        lastName: "Doe",
      },
      {
        id: "user_2HNYYYYYYYYYYYY", // Changed from 01 to 2 to ensure new unique ID
        firstName: "Jane",
        lastName: "Smith",
      },
    ],
    skipDuplicates: true, // Add this to skip any duplicate entries
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

  // Create tags
  // const tags = await prisma.productTag.createMany({
  //   data: [
  //     { name: "Kente" },
  //     { name: "Traditional" },
  //     { name: "Modern" },
  //     { name: "Ankara" },
  //      { name: "Formal Wear" },
  //      { name: "Casual" },
  //      { name: "Handmade" },
  //    ],
  //  });

  // NOW create products

  const mensKentePrintShirtData = {
    name: "Men's Kente Print Shirt",
    link: "kente-print-shirt",
    slug: "kente-print-shirt",
    description:
      "Traditional Ghanaian kente-inspired print shirt in vibrant colors, perfect for special occasions",
    price: 89.99,
    sku: "MKS001-MAIN",
    status: ProductStatus.PUBLISHED,
    subcategoryId: getSubcategoryId("T-Shirt"),
    categoryId: categories[2].id,
    brandId: brand.id,
    isAvailable: true,

    // Add images
    images: {
      create: [
        {
          link: "kente-print-shirt.jpg",
          slug: "kente-print-shirt",
          altText: "Men's Kente Print Shirt - Front View",
          isPrimary: true,
        },
        {
          link: "kente-print-shirt-1.jpg",
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

  // Create variant values for the first product's size variant with price/quantity/sku
  const sizeVariant = await prisma.productVariant.findFirst({
    where: {
      name: "Size",
      productId: mensKentePrintShirt.id,
    },
  });

  if (sizeVariant) {
    await prisma.productVariantValue.createMany({
      data: [
        {
          value: "S",
          variantId: sizeVariant.id,
          price: 89.99,
          quantity: 10,
          sku: "MKS001-SIZE-S",
        },
        {
          value: "M",
          variantId: sizeVariant.id,
          price: 95.0,
          quantity: 20,
          sku: "MKS001-SIZE-M",
        },
        {
          value: "L",
          variantId: sizeVariant.id,
          price: 100.0,
          quantity: 25,
          sku: "MKS001-SIZE-L",
        },
        {
          value: "XL",
          variantId: sizeVariant.id,
          price: 110.0,
          quantity: 0,
          sku: "MKS001-SIZE-XL",
        },
      ],
    });
  }

  // Create variant values for the first product's color variant with price/quantity/sku
  const colorVariant = await prisma.productVariant.findFirst({
    where: {
      name: "Color",
      productId: mensKentePrintShirt.id,
    },
  });

  if (colorVariant) {
    await prisma.productVariantValue.createMany({
      data: [
        {
          value: "Gold/Blue",
          hexCode: "#FFD700",
          variantId: colorVariant.id,
          price: 89.99,
          quantity: 25,
          sku: "MKS001-COLOR-GDBL",
        },
        {
          value: "Green/Black",
          hexCode: "#006400",
          variantId: colorVariant.id,
          price: 89.99,
          quantity: 25,
          sku: "MKS001-COLOR-GRBL",
        },
        {
          value: "Red/Yellow",
          hexCode: "#FF0000",
          variantId: colorVariant.id,
          price: 89.99,
          quantity: 25,
          sku: "MKS001-COLOR-RDYL",
        },
      ],
    });
  }

  const fuguSmock = await prisma.products.create({
    data: {
      name: "Men's Fugu Smock",
      link: "mens-fugu-smock",
      slug: "mens-fugu-smock",
      description:
        "Handwoven northern Ghana fugu smock with intricate embroidery patterns",
      price: 129.99,
      sku: "MFS002-MAIN",
      status: "PUBLISHED",
      subcategoryId: getSubcategoryId("T-Shirt"),
      categoryId: categories[2].id,
      brandId: brand.id,
      isAvailable: true,
      featured: false,

      images: {
        create: [
          {
            link: "mens-fugu-smock.png",
            slug: "mens-fugu-smock",
            altText: "Men's Fugu Smock - Front View",
            isPrimary: true,
          },
          {
            link: "mens-fugu-smock-1.png",
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

  // Create variant values for the fuguSmock product's size variant
  const fuguSmockSizeVariant = await prisma.productVariant.findFirst({
    where: {
      name: "Size",
      productId: fuguSmock.id,
    },
  });

  if (fuguSmockSizeVariant) {
    await prisma.productVariantValue.createMany({
      data: [
        {
          value: "S",
          variantId: fuguSmockSizeVariant.id,
          price: 129.99,
          quantity: 25,
          sku: "MFS002-SIZE-S",
        },
        {
          value: "M",
          variantId: fuguSmockSizeVariant.id,
          price: 129.99,
          quantity: 25,
          sku: "MFS002-SIZE-M",
        },
        {
          value: "L",
          variantId: fuguSmockSizeVariant.id,
          price: 129.99,
          quantity: 25,
          sku: "MFS002-SIZE-L",
        },
        {
          value: "XL",
          variantId: fuguSmockSizeVariant.id,
          price: 129.99,
          quantity: 25,
          sku: "MFS002-SIZE-XL",
        },
      ],
    });
  }

  // Create variant values for the fuguSmock product's color variant
  const fuguSmockColorVariant = await prisma.productVariant.findFirst({
    where: {
      name: "Color",
      productId: fuguSmock.id,
    },
  });

  if (fuguSmockColorVariant) {
    await prisma.productVariantValue.createMany({
      data: [
        {
          value: "Natural",
          hexCode: "#F5E6D3",
          variantId: fuguSmockColorVariant.id,
          price: 129.99,
          quantity: 25,
          sku: "MFS002-COLOR-NAT",
        },
        {
          value: "Black",
          hexCode: "#000000",
          variantId: fuguSmockColorVariant.id,
          price: 129.99,
          quantity: 25,
          sku: "MFS002-COLOR-BLK",
        },
        {
          value: "Brown",
          hexCode: "#8B4513",
          variantId: fuguSmockColorVariant.id,
          price: 129.99,
          quantity: 25,
          sku: "MFS002-COLOR-BRN",
        },
      ],
    });
  }

  const ankaraJumpsuit = await prisma.products.create({
    data: {
      name: "Women's Designer Ankara Jumpsuit",
      link: "womens-ankara-jumpsuit",
      slug: "womens-ankara-jumpsuit-001",
      description:
        "Modern ankara jumpsuit with bold prints, perfect for making a statement",
      price: 149.99,
      salesPrice: 100.0,
      sku: "WAJ001-MAIN",
      status: "PUBLISHED",
      subcategoryId: getSubcategoryId("Jump Suits"),
      categoryId: categories[0].id,
      brandId: brand.id,
      isAvailable: true,
      featured: true,
      images: {
        create: [
          {
            link: "ankara-jumpsuit.png",
            slug: "ankara-jumpsuit",
            altText: "Women's Ankara Jumpsuit - Front View",
            isPrimary: true,
          },
          {
            link: "ankara-jumpsuit-1.png",
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
  const ankaraJumpsuitSizeVariant = await prisma.productVariant.findFirst({
    where: {
      name: "Size",
      productId: ankaraJumpsuit.id,
    },
  });

  if (ankaraJumpsuitSizeVariant) {
    await prisma.productVariantValue.createMany({
      data: [
        {
          value: "S",
          variantId: ankaraJumpsuitSizeVariant.id,
          price: 149.99,
          quantity: 25,
          sku: "WAJ001-SIZE-S",
        },
        {
          value: "M",
          variantId: ankaraJumpsuitSizeVariant.id,
          price: 149.99,
          quantity: 25,
          sku: "WAJ001-SIZE-M",
        },
        {
          value: "L",
          variantId: ankaraJumpsuitSizeVariant.id,
          price: 149.99,
          quantity: 25,
          sku: "WAJ001-SIZE-L",
        },
        {
          value: "XL",
          variantId: ankaraJumpsuitSizeVariant.id,
          price: 149.99,
          quantity: 25,
          sku: "WAJ001-SIZE-XL",
        },
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
      price: 199.99,
      salesPrice: 149.99,
      sku: "WKD001-MAIN",
      status: "PUBLISHED",
      subcategoryId: getSubcategoryId("Straigt Dress"),
      categoryId: categories[0].id,
      brandId: brand.id,
      isAvailable: true,
      featured: true,
      images: {
        create: [
          {
            link: "kente-dress.png",
            slug: "kente-dress",
            altText: "Women's Kente Dress - Front View",
            isPrimary: true,
          },
          {
            link: "kente-dress-1.png",
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
  const kenteDressSizeVariant = await prisma.productVariant.findFirst({
    where: {
      name: "Size",
      productId: kenteDress.id,
    },
  });

  if (kenteDressSizeVariant) {
    await prisma.productVariantValue.createMany({
      data: [
        {
          value: "S",
          variantId: kenteDressSizeVariant.id,
          price: 199.99,
          quantity: 25,
          sku: "WKD001-SIZE-S",
        },
        {
          value: "M",
          variantId: kenteDressSizeVariant.id,
          price: 199.99,
          quantity: 25,
          sku: "WKD001-SIZE-M",
        },
        {
          value: "L",
          variantId: kenteDressSizeVariant.id,
          price: 199.99,
          quantity: 25,
          sku: "WKD001-SIZE-L",
        },
        {
          value: "XL",
          variantId: kenteDressSizeVariant.id,
          price: 199.99,
          quantity: 25,
          sku: "WKD001-SIZE-XL",
        },
      ],
    });
  }

  const mensDashiki = await prisma.products.create({
    data: {
      name: "Men's Premium Embroidered Dashiki",
      link: "mens-embroidered-dashiki",
      slug: "mens-embroidered-dashiki",
      description: "Hand-embroidered dashiki shirt with intricate patterns",
      price: 119.99,
      salesPrice: 99.99,
      sku: "MED001-MAIN",
      status: "PUBLISHED",
      subcategoryId: getSubcategoryId("T-Shirt"),
      categoryId: categories[2].id,
      brandId: brand.id,
      isAvailable: true,
      featured: true,
      images: {
        create: [
          {
            link: "mens-embroidered-dashiki.png",
            slug: "mens-embroidered-dashiki",
            altText: "Men's Dashiki - Front View",
            isPrimary: true,
          },
          {
            link: "mens-embroidered-dashiki-1.png",
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
  const mensDashikiSizeVariant = await prisma.productVariant.findFirst({
    where: {
      name: "Size",
      productId: mensDashiki.id,
    },
  });

  if (mensDashikiSizeVariant) {
    await prisma.productVariantValue.createMany({
      data: [
        {
          value: "S",
          variantId: mensDashikiSizeVariant.id,
          price: 119.99,
          quantity: 25,
          sku: "MED001-SIZE-S",
        },
        {
          value: "M",
          variantId: mensDashikiSizeVariant.id,
          price: 119.99,
          quantity: 25,
          sku: "MED001-SIZE-M",
        },
        {
          value: "L",
          variantId: mensDashikiSizeVariant.id,
          price: 119.99,
          quantity: 25,
          sku: "MED001-SIZE-L",
        },
        {
          value: "XL",
          variantId: mensDashikiSizeVariant.id,
          price: 119.99,
          quantity: 25,
          sku: "MED001-SIZE-XL",
        },
      ],
    });
  }

  // Create variant values for the mensDashiki product's color variant
  const mensDashikiColorVariant = await prisma.productVariant.findFirst({
    where: {
      name: "Color",
      productId: mensDashiki.id,
    },
  });

  if (mensDashikiColorVariant) {
    await prisma.productVariantValue.createMany({
      data: [
        {
          value: "White",
          hexCode: "#FFFFFF",
          variantId: mensDashikiColorVariant.id,
          price: 119.99,
          quantity: 25,
          sku: "MED001-COLOR-WHT",
        },
        {
          value: "Blue",
          hexCode: "#0000FF",
          variantId: mensDashikiColorVariant.id,
          price: 119.99,
          quantity: 25,
          sku: "MED001-COLOR-BLU",
        },
        {
          value: "Gold",
          hexCode: "#FFD700",
          variantId: mensDashikiColorVariant.id,
          price: 119.99,
          quantity: 25,
          sku: "MED001-COLOR-GLD",
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
      price: 79.99,
      salesPrice: 49.99,
      sku: "WAC001-MAIN",
      status: "PUBLISHED",
      subcategoryId: getSubcategoryId("Corset"),
      categoryId: categories[0].id,
      brandId: brand.id,
      isAvailable: true,
      featured: true,
      images: {
        create: [
          {
            link: "womens-corset-top.png",
            slug: "womens-corset-top",
            altText: "Women's Corset - Front View",
            isPrimary: true,
          },
          {
            link: "womens-corset-top-1.png",
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
  const womensCorsetSizeVariant = await prisma.productVariant.findFirst({
    where: {
      name: "Size",
      productId: womensCorset.id,
    },
  });

  if (womensCorsetSizeVariant) {
    await prisma.productVariantValue.createMany({
      data: [
        {
          value: "S",
          variantId: womensCorsetSizeVariant.id,
          price: 79.99,
          quantity: 25,
          sku: "WAC001-SIZE-S",
        },
        {
          value: "M",
          variantId: womensCorsetSizeVariant.id,
          price: 79.99,
          quantity: 25,
          sku: "WAC001-SIZE-M",
        },
        {
          value: "L",
          variantId: womensCorsetSizeVariant.id,
          price: 79.99,
          quantity: 25,
          sku: "WAC001-SIZE-L",
        },
        {
          value: "XL",
          variantId: womensCorsetSizeVariant.id,
          price: 79.99,
          quantity: 25,
          sku: "WAC001-SIZE-XL",
        },
      ],
    });
  }

  const mensAnkaraSuit = await prisma.products.create({
    data: {
      name: "Men's Ankara Suit",
      link: "mens-ankara-suit",
      slug: "mens-ankara-suit",
      description: "Contemporary two-piece ankara suit with modern cut",
      price: 299.99,
      sku: "MAS001-MAIN",
      status: "PUBLISHED",
      subcategoryId: getSubcategoryId("T-Shirt"),
      categoryId: categories[2].id,
      brandId: brand.id,
      isAvailable: true,
      featured: false,
      images: {
        create: [
          {
            link: "mens-ankara-suit.png",
            slug: "mens-ankara-suit",
            altText: "Men's Suit - Front View",
            isPrimary: true,
          },
          {
            link: "mens-ankara-suit-1.png",
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
  const mensAnkaraSuitSizeVariant = await prisma.productVariant.findFirst({
    where: {
      name: "Size",
      productId: mensAnkaraSuit.id,
    },
  });

  if (mensAnkaraSuitSizeVariant) {
    await prisma.productVariantValue.createMany({
      data: [
        {
          value: "S",
          variantId: mensAnkaraSuitSizeVariant.id,
          price: 299.99,
          quantity: 25,
          sku: "MAS001-SIZE-S",
        },
        {
          value: "M",
          variantId: mensAnkaraSuitSizeVariant.id,
          price: 299.99,
          quantity: 25,
          sku: "MAS001-SIZE-M",
        },
        {
          value: "L",
          variantId: mensAnkaraSuitSizeVariant.id,
          price: 299.99,
          quantity: 25,
          sku: "MAS001-SIZE-L",
        },
        {
          value: "XL",
          variantId: mensAnkaraSuitSizeVariant.id,
          price: 299.99,
          quantity: 25,
          sku: "MAS001-SIZE-XL",
        },
      ],
    });
  }

  const womensStraightDress = await prisma.products.create({
    data: {
      name: "Women's Kente Straight Dress",
      link: "womens-kente-straight-dress",
      slug: "womens-kente-straight-dress",
      description: "Sophisticated straight-cut dress with kente accents",
      price: 169.99,
      salesPrice: 149.99,
      sku: "WKS001-MAIN",
      status: "PUBLISHED",
      subcategoryId: getSubcategoryId("Straigt Dress"),
      categoryId: categories[0].id,
      brandId: brand.id,
      isAvailable: true,
      featured: true,
      images: {
        create: [
          {
            link: "kente-straight-dress.jpg",
            slug: "kente-straight-dress",
            altText: "Women's Straight Dress - Front View",
            isPrimary: true,
          },
          {
            link: "kente-straight-dress-1.png",
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
  const womensStraightDressSizeVariant = await prisma.productVariant.findFirst({
    where: {
      name: "Size",
      productId: womensStraightDress.id,
    },
  });

  if (womensStraightDressSizeVariant) {
    await prisma.productVariantValue.createMany({
      data: [
        {
          value: "S",
          variantId: womensStraightDressSizeVariant.id,
          price: 169.99,
          quantity: 25,
          sku: "WKS001-SIZE-S",
        },
        {
          value: "M",
          variantId: womensStraightDressSizeVariant.id,
          price: 169.99,
          quantity: 25,
          sku: "WKS001-SIZE-M",
        },
        {
          value: "L",
          variantId: womensStraightDressSizeVariant.id,
          price: 169.99,
          quantity: 25,
          sku: "WKS001-SIZE-L",
        },
        {
          value: "XL",
          variantId: womensStraightDressSizeVariant.id,
          price: 169.99,
          quantity: 25,
          sku: "WKS001-SIZE-XL",
        },
      ],
    });
  }

  const mensKaftanSet = await prisma.products.create({
    data: {
      name: "Men's Embroidered Kaftan Set",
      link: "mens-kaftan-set",
      slug: "mens-kaftan-set",
      description: "Luxurious two-piece kaftan set with gold embroidery",
      price: 189.99,
      salesPrice: 169.99,
      sku: "MKS002-MAIN",
      status: "PUBLISHED",
      subcategoryId: getSubcategoryId("T-Shirt"),
      categoryId: categories[2].id,
      brandId: brand.id,
      isAvailable: true,
      featured: true,
      images: {
        create: [
          {
            link: "mens-kaftan.png",
            slug: "mens-kaftan",
            altText: "Men's Kaftan Set - Front View",
            isPrimary: true,
          },
          {
            link: "mens-kaftan-1.png",
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
  const mensKaftanSetSizeVariant = await prisma.productVariant.findFirst({
    where: {
      name: "Size",
      productId: mensKaftanSet.id,
    },
  });

  if (mensKaftanSetSizeVariant) {
    await prisma.productVariantValue.createMany({
      data: [
        {
          value: "S",
          variantId: mensKaftanSetSizeVariant.id,
          price: 189.99,
          quantity: 25,
          sku: "MKS002-SIZE-S",
        },
        {
          value: "M",
          variantId: mensKaftanSetSizeVariant.id,
          price: 189.99,
          quantity: 25,
          sku: "MKS002-SIZE-M",
        },
        {
          value: "L",
          variantId: mensKaftanSetSizeVariant.id,
          price: 189.99,
          quantity: 25,
          sku: "MKS002-SIZE-L",
        },
        {
          value: "XL",
          variantId: mensKaftanSetSizeVariant.id,
          price: 189.99,
          quantity: 25,
          sku: "MKS002-SIZE-XL",
        },
      ],
    });
  }

  const womensAnkaraBlouse = await prisma.products.create({
    data: {
      name: "Women's Ankara Peplum Blouse",
      link: "womens-ankara-peplum",
      slug: "womens-ankara-peplum",
      description: "Stylish peplum blouse with vibrant ankara prints",
      price: 89.99,
      salesPrice: 69.99,
      sku: "WAP001-MAIN",
      status: "PUBLISHED",
      subcategoryId: getSubcategoryId("Corset"),
      categoryId: categories[0].id,
      brandId: brand.id,
      isAvailable: true,
      featured: true,
      images: {
        create: [
          {
            link: "peplum-blouse.png",
            slug: "peplum-blouse",
            altText: "Women's Peplum Blouse - Front View",
            isPrimary: true,
          },
          {
            link: "peplum-blouse-1.png",
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
  const womensAnkaraBlouseSizeVariant = await prisma.productVariant.findFirst({
    where: {
      name: "Size",
      productId: womensAnkaraBlouse.id,
    },
  });

  if (womensAnkaraBlouseSizeVariant) {
    await prisma.productVariantValue.createMany({
      data: [
        {
          value: "S",
          variantId: womensAnkaraBlouseSizeVariant.id,
          price: 89.99,
          quantity: 25,
          sku: "WAP001-SIZE-S",
        },
        {
          value: "M",
          variantId: womensAnkaraBlouseSizeVariant.id,
          price: 89.99,
          quantity: 25,
          sku: "WAP001-SIZE-M",
        },
        {
          value: "L",
          variantId: womensAnkaraBlouseSizeVariant.id,
          price: 89.99,
          quantity: 25,
          sku: "WAP001-SIZE-L",
        },
        {
          value: "XL",
          variantId: womensAnkaraBlouseSizeVariant.id,
          price: 89.99,
          quantity: 25,
          sku: "WAP001-SIZE-XL",
        },
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
