import { createContext, useContext, useEffect, useState } from "react";

const translations = {
  en: {
    languageButton: "العربية",

    messages: {
      welcomeBack: "Welcome back to Antique Shop.",
      accountCreated: "Account created successfully.",
      guestMode: "Continuing as guest.",
      loggedOut: "Logged out successfully.",
      addedToCart: "added to cart.",
      removedFromCart: "Item removed from cart.",
      cartCleared: "Cart cleared.",
      emptyCart: "Your cart is empty.",
      checkoutDone: "Checkout completed successfully.",
      orderPlaced:
        "Order placed successfully. Your antique pieces are being prepared with special care.",
      messageSent: "Message sent successfully. We will contact you soon.",
      passwordRecovery: "Password recovery is not connected yet.",
    },

    nav: {
      home: "Home",
      collections: "Collections",
      products: "Products",
      story: "Story",
      contact: "Contact",
      cart: "Cart",
      logout: "Logout",
      hi: "Hi",
    },

    auth: {
      brandName: "Antique Shop",
      tagline: "Timeless treasures, lasting value",
      market: "Premium Antique Marketplace",
      title: "Rare Pieces. Real Stories.",
      description:
        "Discover handpicked vintage furniture, fragile decor, porcelain sets, classic wall pieces, and collectible treasures curated for elegant homes.",
      curatedItems: "Curated Items",
      rareFinds: "Rare Finds",
      support: "Support",
      featuredPiece: "Featured Piece",
      woodenChair: "Vintage Wooden Chair",
      furnitureText: "Oak Wood • Classic Furniture",
      fragileItem: "Fragile Item",
      glassVase: "Antique Glass Vase",
      packaging: "Special care packaging",
      login: "Login",
      signup: "Sign Up",
      welcomeBack: "Welcome Back",
      loginTitle: "Login to your account",
      loginText: "Access your cart, saved items, and antique collections.",
      joinCollection: "Join The Collection",
      signupTitle: "Create your account",
      signupText: "Start exploring rare pieces and premium antique products.",
      email: "Email Address",
      password: "Password",
      fullName: "Full Name",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password?",
      loginNow: "Login Now",
      createAccount: "Create Account",
      guest: "Continue as Guest",
      noAccount: "Don't have an account?",
      haveAccount: "Already have an account?",
    },

    home: {
      label: "Classic • Curated • Rare",
      title: "Antique Pieces That Bring History Into Your Home",
      description:
        "A premium marketplace for vintage furniture, fragile decor, porcelain sets, classic clocks, and timeless handmade treasures.",
      shopNow: "Shop Now",
      exploreCollections: "Explore Collections",
      antiqueItems: "Antique Items",
      rarePieces: "Rare Pieces",
      carefulDelivery: "Careful Delivery",
      newArrival: "New Arrival",
      classicClock: "Classic Wall Clock",
      fragileCare: "Fragile Care",
      protectedPackaging: "Protected Packaging",
    },

    collections: {
      label: "Curated Categories",
      title: "Explore Antique Collections",
      description: "Browse by category and discover pieces that match your home style.",
      allCollection: "View the full collection",
      browse: "Browse",
    },

    products: {
      label: "Available Pieces",
      title: "Featured Antique Items",
      description: "Search, sort, inspect details, and add pieces to your collection.",
      search: "Search antique products...",
      featured: "Featured",
      priceLow: "Price: Low to High",
      priceHigh: "Price: High to Low",
      fragileFirst: "Fragile First",
      material: "Material",
      stock: "Stock",
      fragile: "Fragile",
      viewDetails: "View Details",
      addToCart: "Add to Cart",
      empty: "No products found. Try another search or category.",
      notFound: "Product not found or still loading.",
      backProducts: "Back to products",
      productDetails: "Product Details",
      inspect: "Inspect the piece details before adding it to your collection.",
      detailText: "This antique piece is made from",
      available: "It is currently in stock with",
      availableItems: "available item(s).",
      fragileWarning: "Fragile item: needs special handling and careful packaging.",
    },

    story: {
      label: "Our Story",
      title: "Every antique piece carries a memory.",
      description:
        "Antique Shop focuses on rare, elegant, and carefully selected pieces. Fragile items are marked clearly, and each product is presented with its material, category, stock, and care level.",
      browsePieces: "Browse Pieces",
      authenticity: "Authenticity",
      authenticityText: "Selected classic pieces",
      fragileCare: "Fragile Care",
      fragileCareText: "Special packing for delicate items",
      premiumFeel: "Premium Feel",
      premiumFeelText: "Elegant shopping interface",
      checkout: "Simple Checkout",
      checkoutText: "Fast cart and order flow",
    },

    contact: {
      label: "Contact",
      title: "Ask About A Piece",
      description:
        "Send a message if you need help choosing, reserving, or handling a fragile item.",
      name: "Your name",
      email: "Your email",
      message: "Your message",
      send: "Send Message",
    },

    cart: {
      label: "Your Cart",
      title: "Selected Antique Pieces",
      description: "Review your items before checkout.",
      empty: "Your cart is empty.",
      goProducts: "Go to products",
      total: "Total",
      clear: "Clear Cart",
      checkout: "Checkout",
      remove: "Remove",
      continueShopping: "Continue shopping",
      orderSummary: "Order Summary",
    },

    footer: "© 2026 Antique Shop. Timeless treasures, lasting value.",
  },

  ar: {
    languageButton: "English",

    messages: {
      welcomeBack: "أهلًا بعودتك في Antique Shop.",
      accountCreated: "تم إنشاء الحساب بنجاح.",
      guestMode: "تم الدخول كزائر.",
      loggedOut: "تم تسجيل الخروج بنجاح.",
      addedToCart: "تمت إضافته إلى السلة.",
      removedFromCart: "تم حذف المنتج من السلة.",
      cartCleared: "تم تفريغ السلة.",
      emptyCart: "السلة فارغة.",
      checkoutDone: "تم إتمام الطلب بنجاح.",
      orderPlaced:
        "تم تأكيد الطلب بنجاح. يتم تجهيز قطع الأنتيك بعناية خاصة.",
      messageSent: "تم إرسال الرسالة بنجاح. سنتواصل معك قريبًا.",
      passwordRecovery: "استرجاع كلمة المرور غير متصل حاليًا.",
    },

    nav: {
      home: "الرئيسية",
      collections: "الأقسام",
      products: "المنتجات",
      story: "قصتنا",
      contact: "تواصل معنا",
      cart: "السلة",
      logout: "تسجيل الخروج",
      hi: "أهلًا",
    },

    auth: {
      brandName: "Antique Shop",
      tagline: "قطع فريدة بقيمة تدوم",
      market: "متجر أنتيكات فاخر",
      title: "قطع نادرة. قصص حقيقية.",
      description:
        "اكتشف أثاثًا كلاسيكيًا، ديكورات قابلة للكسر، أطقم بورسلين، ساعات قديمة، ومقتنيات فريدة مختارة بعناية للبيوت الراقية.",
      curatedItems: "قطعة مختارة",
      rareFinds: "قطعة نادرة",
      support: "دعم",
      featuredPiece: "قطعة مميزة",
      woodenChair: "كرسي خشبي كلاسيكي",
      furnitureText: "خشب بلوط • أثاث كلاسيكي",
      fragileItem: "قطعة قابلة للكسر",
      glassVase: "فازة زجاج أنتيك",
      packaging: "تغليف بعناية خاصة",
      login: "تسجيل الدخول",
      signup: "إنشاء حساب",
      welcomeBack: "أهلًا بعودتك",
      loginTitle: "سجّل الدخول لحسابك",
      loginText: "ادخل إلى السلة والمنتجات والمقتنيات المحفوظة.",
      joinCollection: "ابدأ رحلتك",
      signupTitle: "أنشئ حساب جديد",
      signupText: "ابدأ في استكشاف قطع أنتيك نادرة وفاخرة.",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      fullName: "الاسم بالكامل",
      rememberMe: "تذكرني",
      forgotPassword: "نسيت كلمة المرور؟",
      loginNow: "تسجيل الدخول",
      createAccount: "إنشاء الحساب",
      guest: "الدخول كزائر",
      noAccount: "ليس لديك حساب؟",
      haveAccount: "لديك حساب بالفعل؟",
    },

    home: {
      label: "كلاسيكي • مختار • نادر",
      title: "قطع أنتيك تضيف التاريخ والأناقة إلى منزلك",
      description:
        "متجر فاخر للأثاث الكلاسيكي، الديكورات القابلة للكسر، أطقم البورسلين، الساعات القديمة، والقطع اليدوية النادرة.",
      shopNow: "تسوق الآن",
      exploreCollections: "استكشف الأقسام",
      antiqueItems: "قطعة أنتيك",
      rarePieces: "قطعة نادرة",
      carefulDelivery: "توصيل بعناية",
      newArrival: "وصل حديثًا",
      classicClock: "ساعة حائط كلاسيكية",
      fragileCare: "عناية للقطع الحساسة",
      protectedPackaging: "تغليف آمن",
    },

    collections: {
      label: "أقسام مختارة",
      title: "استكشف أقسام الأنتيكات",
      description: "تصفح حسب القسم واختر القطع المناسبة لستايل منزلك.",
      allCollection: "عرض كل المنتجات",
      browse: "تصفح",
    },

    products: {
      label: "القطع المتاحة",
      title: "منتجات أنتيك مميزة",
      description: "ابحث، رتّب، شاهد التفاصيل، وأضف القطع إلى سلتك.",
      search: "ابحث عن منتج أنتيك...",
      featured: "المميزة",
      priceLow: "السعر: من الأقل للأعلى",
      priceHigh: "السعر: من الأعلى للأقل",
      fragileFirst: "القابلة للكسر أولًا",
      material: "الخامة",
      stock: "المخزون",
      fragile: "قابل للكسر",
      viewDetails: "عرض التفاصيل",
      addToCart: "أضف للسلة",
      empty: "لا توجد منتجات. جرّب بحث أو قسم آخر.",
      notFound: "المنتج غير موجود أو ما زال يتم تحميله.",
      backProducts: "العودة للمنتجات",
      productDetails: "تفاصيل المنتج",
      inspect: "راجع تفاصيل القطعة قبل إضافتها إلى السلة.",
      detailText: "هذه القطعة مصنوعة من",
      available: "ومتاح حاليًا منها",
      availableItems: "قطعة.",
      fragileWarning: "قطعة قابلة للكسر: تحتاج إلى تعامل وتغليف خاص.",
    },

    story: {
      label: "قصتنا",
      title: "كل قطعة أنتيك تحمل ذكرى وقصة.",
      description:
        "يركز Antique Shop على القطع النادرة والأنيقة والمختارة بعناية. يتم توضيح القطع القابلة للكسر بوضوح، وكل منتج يظهر بخامته وقسمه ومخزونه ومستوى العناية المطلوبة.",
      browsePieces: "تصفح القطع",
      authenticity: "الأصالة",
      authenticityText: "قطع كلاسيكية مختارة",
      fragileCare: "عناية خاصة",
      fragileCareText: "تغليف مخصص للقطع الحساسة",
      premiumFeel: "تجربة فاخرة",
      premiumFeelText: "واجهة استخدام راقية",
      checkout: "شراء بسيط",
      checkoutText: "سلة وطلب سريع وسهل",
    },

    contact: {
      label: "تواصل معنا",
      title: "اسأل عن قطعة",
      description:
        "أرسل رسالة لو محتاج مساعدة في اختيار أو حجز أو التعامل مع قطعة قابلة للكسر.",
      name: "اسمك",
      email: "بريدك الإلكتروني",
      message: "رسالتك",
      send: "إرسال الرسالة",
    },

    cart: {
      label: "سلتك",
      title: "قطع الأنتيك المختارة",
      description: "راجع المنتجات قبل إتمام الطلب.",
      empty: "السلة فارغة.",
      goProducts: "اذهب للمنتجات",
      total: "الإجمالي",
      clear: "تفريغ السلة",
      checkout: "إتمام الطلب",
      remove: "حذف",
      continueShopping: "متابعة التسوق",
      orderSummary: "ملخص الطلب",
    },

    footer: "© 2026 Antique Shop. قطع فريدة بقيمة تدوم.",
  },
};

const productTranslations = {
  en: {
    names: {
      "Vintage Wooden Chair": "Vintage Wooden Chair",
      "Antique Glass Vase": "Antique Glass Vase",
      "Classic Wall Clock": "Classic Wall Clock",
      "Porcelain Tea Set": "Porcelain Tea Set",
      "Antique Wooden Table": "Antique Wooden Table",
    },
    categories: {
      All: "All",
      Furniture: "Furniture",
      Decor: "Decor",
      Kitchenware: "Kitchenware",
    },
    materials: {
      "Oak Wood": "Oak Wood",
      Glass: "Glass",
      "Wood and Metal": "Wood and Metal",
      Porcelain: "Porcelain",
      "Mahogany Wood": "Mahogany Wood",
    },
  },

  ar: {
    names: {
      "Vintage Wooden Chair": "كرسي خشبي كلاسيكي",
      "Antique Glass Vase": "فازة زجاج أنتيك",
      "Classic Wall Clock": "ساعة حائط كلاسيكية",
      "Porcelain Tea Set": "طقم شاي بورسلين",
      "Antique Wooden Table": "ترابيزة خشب أنتيك",
    },
    categories: {
      All: "الكل",
      Furniture: "أثاث",
      Decor: "ديكور",
      Kitchenware: "أدوات مطبخ",
    },
    materials: {
      "Oak Wood": "خشب بلوط",
      Glass: "زجاج",
      "Wood and Metal": "خشب ومعدن",
      Porcelain: "بورسلين",
      "Mahogany Wood": "خشب ماهوجني",
    },
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("siteLanguage") || "en"
  );

  const isArabic = language === "ar";
  const t = translations[language];

  useEffect(() => {
    localStorage.setItem("siteLanguage", language);
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [language, isArabic]);

  function toggleLanguage() {
    setLanguage((currentLanguage) => (currentLanguage === "en" ? "ar" : "en"));
  }

  function productName(name) {
    return productTranslations[language].names[name] || name;
  }

  function categoryName(category) {
    return productTranslations[language].categories[category] || category;
  }

  function materialName(material) {
    return productTranslations[language].materials[material] || material;
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        isArabic,
        t,
        toggleLanguage,
        productName,
        categoryName,
        materialName,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}