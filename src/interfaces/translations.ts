export interface Translations {
  navbar: {
    specialOffers: string;
    whyUs: string;
    menu: string;
    login: string;
  };
  hero: {
    heart: string;
    title: string;
    description: string;
    orderNow: string;
    learnMore: string;
  };
  offers: {
    title: string;
    description: string;
    noOffers: string;
    checkBackLater: string;
  };
  services: {
    title: string[];
    description: string;
    items: {
      onlineOrder: string;
      preReservation: string;
      organizedPlace: string;
      service24: string;
      superChef: string;
      cleanKitchen: string;
    };
  };
  menu: {
    title: string[];
  };
  appSection: {
    title: string;
    description: string;
  };
  footer: {
    about: {
      title: string;
      about: string;
      service: string;
      contact: string;
      company: string;
    };
    company: {
      title: string;
      partnership: string;
      terms: string;
      privacy: string;
      sitemap: string;
    };
    getInTouch: {
      title: string;
      description: string;
      subscribe: string;
      emailPlaceholder: string;
    };
  };
  validation: {
    required: string;
    invalidEmail: string;
    passwordMin: string;
    passwordsNotMatch: string;
    passwordMax: string;
    nameMin: string;
    phone: string;
    postalCode: string;
  };
  errors: {
    emailExists: string;
    invalidCredentials: string;
    somethingWentWrong: string;
    unauthorized: string;
    name: string;
    description: string;
    price: string;
    category: string;
    image: string;
    sizes: string;
    extras: string;
  };
  messages: {
    loginSuccess: string;
    registerSuccess: string;
    logoutSuccess: string;
    updateSuccess: string;
    deleteSuccess: string;
    productCreated: string;
  };
  labels: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    rememberMe: string;
    login: string;
    register: string;
    title: string;
    description: string;
    image: string;
    changeImage: string;
    basePrice: string;
    category: string;
    sizeName: string;
    sizePrice: string;
    extraName: string;
    extraPrice: string;
    addSize: string;
    addExtra: string;
    size: string;
    extra: string;
  };
  placeholders: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    streetAddress: string;
    postalCode: string;
    city: string;
    country: string;
    title: string;
    description: string;
    image: string;
    basePrice: string;
    category: string;
    sizeName: string;
    sizePrice: string;
    extraName: string;
    extraPrice: string;
  };
  authPrompt: {
    haveAccount: string;
    noAccount: string;
    goToLogin: string;
    goToRegister: string;
    login: string;
    register: string;
  };
  profileMenu: {
    open: string;
    myAccount: string;
    profile: string;
    dashboard: string;
    logout: string;
    shortcuts: {
      profile: string;
      logout: string;
    };
  };
  fields: {
    name: string;
    email: string;
    image: string;
    phone: string;
    streetAddress: string;
    postalCode: string;
    city: string;
    country: string;
  };
  dashboard: {
    nav: {
      users: string;
      allUsers: string;
      createUser: string;

      items: string;
      products: string;
      createProduct: string;

      categories: string;
      allCategories: string;
      createCategory: string;
    };
  };
}
