import { Category } from '../types';
import { getProductImageUrl } from '../assets/imagesproducts';
import { USER_PRODUCTS } from './userProducts';

export interface EnhancedCategory extends Category {
  image?: string;
  catalogPages?: string;
  topModels?: string[];
  brands?: string[];
  featuredBadge?: string;
}

// Compute accurate dynamic counts based on subcategories in USER_PRODUCTS
const countsBySubcategory: Record<string, number> = {};
USER_PRODUCTS.forEach(p => {
  if (p.subcategory) {
    countsBySubcategory[p.subcategory] = (countsBySubcategory[p.subcategory] || 0) + 1;
  }
});

const sumCounts = (subs: string[]) => {
  return subs.reduce((acc, sub) => acc + (countsBySubcategory[sub] || 0), 0);
};

export const CATEGORIES: EnhancedCategory[] = [
  // 1. تسمه‌های صنعتی، تایمینگ و جوشی
  {
    id: 1,
    slug: 'belts-timing',
    name: 'تسمه‌های صنعتی، تایمینگ و جوشی',
    nameEn: 'Industrial V-Belts, Timing & PU Belts',
    description: 'تسمه‌های V-Belt ساده و دنده‌ای، تسمه‌های تایمینگ صنعتی با گام میلیمتری و اینچی، و تسمه‌های جوشی گرد و V شکل پلی‌یورتان',
    subcategories: [
      'تسمه V-Belt ساده و دنده‌ای',
      'تسمه تایمینگ صنعتی',
      'تسمه جوشی پلی‌یورتان'
    ],
    catalogPages: 'صفحات ۱۹، ۲۰، ۹۹ و ۱۰۰ کاتالوگ',
    topModels: ['1000 0 1', '1000 0 2', '1000 0 3', '1000 49 1', '1000 49 2', 'B105', 'SPB 2500', '50AT10'],
    brands: ['فورزا (FORZA)', 'SWR آلمان', 'MEGADYNE', 'BANDO'],
    featuredBadge: 'استاندارد DIN 2215 و گام میلیمتری',
    icon: 'Layers',
    count: sumCounts(['تسمه V-Belt ساده و دنده‌ای', 'تسمه تایمینگ صنعتی', 'تسمه جوشی پلی‌یورتان']) || 70,
    image: getProductImageUrl('e(001).png'),
  },

  // 2. پروفیل‌های آلومینیوم و ریل هدایت
  {
    id: 2,
    slug: 'profiles-rails',
    name: 'پروفیل‌های آلومینیوم و ریل هدایت',
    nameEn: 'Aluminum Profiles & Guide Rails',
    description: 'پروفیل‌های آلومینیومی اختصاصی خطوط تولید و کانوایر، ریل‌های زیر تسمه و شاسی‌های هدایت گالوانیزه',
    subcategories: [
      'پروفیل‌های خطوط تولید و کانوایر',
      'ریل و شاسی هدایت تسمه'
    ],
    catalogPages: 'صفحات ۲۶ الی ۳۲ کاتالوگ (کدهای ۱۰۰۰ ۱ و ۱۰۰۰ ۲)',
    topModels: ['1000 1 1', '1000 1 2', '1000 1 3', '1000 2 1', '1000 2 2', '1000 2 3'],
    brands: ['فورزا (FORZA)', 'اطلس صنعت'],
    featuredBadge: 'آلیاژ ۶۰۶۳ مهندسی و ریل گالوانیزه',
    icon: 'Package',
    count: sumCounts(['پروفیل‌های خطوط تولید و کانوایر', 'ریل و شاسی هدایت تسمه']) || 144,
    image: getProductImageUrl('e(026).png'),
  },

  // 3. قطعات خط لعاب، چاپ و برس‌های صنعتی
  {
    id: 3,
    slug: 'glaze-brushes',
    name: 'قطعات خط لعاب، چاپ و برس‌های صنعتی',
    nameEn: 'Glaze Line Parts, Printing & Brushes',
    description: 'قطعات اختصاصی خط لعاب و چاپ، برس‌های مویی و تمیزکننده‌های رولری و تسمه‌ای خطوط کاشی و سرامیک',
    subcategories: [
      'قطعات خط لعاب و چاپ',
      'برس و تمیزکننده‌های خطوط کاشی'
    ],
    catalogPages: 'صفحات ۳۳ الی ۳۴ و ۳۹ الی ۴۱ کاتالوگ (کدهای ۱۰۰۰ ۳، ۴ و ۷)',
    topModels: ['1000 3 1', '1000 3 2', '1000 4 1', '1000 7 1', '1000 7 2', '1000 7 3'],
    brands: ['فورزا (FORZA)', 'اطلس صنعت'],
    featuredBadge: 'مقاوم به سایش و لعاب',
    icon: 'Grid',
    count: sumCounts(['قطعات خط لعاب و چاپ', 'برس و تمیزکننده‌های خطوط کاشی']) || 54,
    image: getProductImageUrl('e(098).png'),
  },

  // 4. پولی، فولی تفلونی و چرخ‌های پلی‌یورتان
  {
    id: 4,
    slug: 'pulleys-idlers',
    name: 'پولی، فولی تفلونی و چرخ‌های پلی‌یورتان',
    nameEn: 'Pulleys, Teflon Idlers & PU Wheels',
    description: 'فولی‌ها و هرزگردهای تفلونی ضدسایش، چرخ‌ها و هرزگردهای پلی‌یورتان خطوط کانوایر و ماشین‌آلات',
    subcategories: [
      'فولی و هرزگرد تفلونی',
      'چرخ‌ها و هرزگردهای پلی‌یورتان'
    ],
    catalogPages: 'صفحات ۳۵ الی ۳۸ و ۵۶ الی ۵۸ کاتالوگ (کدهای ۱۰۰۰ ۹ و ۱۷)',
    topModels: ['1000 9 1', '1000 9 2', '1000 9 3', '1000 17 1', '1000 17 2', '1000 17 3'],
    brands: ['فورزا (FORZA)', 'SWR آلمان'],
    featuredBadge: 'ماشین‌کاری تفلون ضدسایش و PU',
    icon: 'CircleDot',
    count: sumCounts(['فولی و هرزگرد تفلونی', 'چرخ‌ها و هرزگردهای پلی‌یورتان']) || 144,
    image: getProductImageUrl('e(102).png'),
  },

  // 5. ساپورت‌ها، پایه‌های رگلاژ و اهرم نگهدارنده
  {
    id: 5,
    slug: 'supports-brackets',
    name: 'ساپورت‌ها، پایه‌های رگلاژ و اهرم نگهدارنده',
    nameEn: 'Supports, Leveling Mounts & Arms',
    description: 'ساپورت‌ها و پایه‌های خط لعاب، اهرم‌ها و بازوهای نگهدارنده، و پایه‌های رگلاژ و تنظیم ارتفاع خطوط انتقال',
    subcategories: [
      'ساپورت و پایه‌های خط لعاب',
      'اهرم و بازوهای نگهدارنده',
      'پایه‌های رگلاژ'
    ],
    catalogPages: 'صفحات ۴۲ الی ۴۴، ۴۶ و ۵۳ الی ۵۴ کاتالوگ (کدهای ۱۰۰۰ ۵، ۱۱ و ۱۴)',
    topModels: ['1000 5 1', '1000 5 2', '1000 11 1', '1000 11 2', '1000 14 1', '1000 15 1'],
    brands: ['فورزا (FORZA)', 'اطلس صنعت'],
    featuredBadge: 'استحکام مکانیکی بالا و تنظیم دقیق',
    icon: 'ShieldCheck',
    count: sumCounts(['ساپورت و پایه‌های خط لعاب', 'اهرم و بازوهای نگهدارنده', 'پایه‌های رگلاژ']) || 106,
    image: getProductImageUrl('e(169).png'),
  },

  // 6. پروانه همزن لعاب و قطعات پمپ دیافراگمی
  {
    id: 6,
    slug: 'impellers-pumps',
    name: 'پروانه همزن لعاب و قطعات پمپ دیافراگمی',
    nameEn: 'Glaze Impellers & Diaphragm Pumps',
    description: 'پروانه‌های همزن لعاب و دوغاب استیل و پلیمر، دیافراگم‌های لاستیکی و تفلونی پمپ‌های دوغاب و مواد شیمیایی',
    subcategories: [
      'پروانه و همزن‌های لعاب',
      'قطعات پمپ دیافراگمی'
    ],
    catalogPages: 'صفحات ۴۷ الی ۴۹ و ۶۷ الی ۷۱ کاتالوگ (کدهای ۱۰۰۰ ۱۲ و ۲۱)',
    topModels: ['1000 12 1', '1000 12 2', '1000 12 3', '1000 21 1', '1000 21 2', '1000 21 3'],
    brands: ['فورزا (FORZA)', 'اطلس صنعت'],
    featuredBadge: 'پروانه‌های استیل و دیافراگم ضداسید',
    icon: 'Flame',
    count: sumCounts(['پروانه و همزن‌های لعاب', 'قطعات پمپ دیافراگمی']) || 97,
    image: getProductImageUrl('e(220).png'),
  },

  // 7. لاستیک‌های مکنده، وکیوم و تسمه پاک‌کن
  {
    id: 7,
    slug: 'vacuum-cleaners',
    name: 'لاستیک‌های مکنده، وکیوم و تسمه پاک‌کن',
    nameEn: 'Suction Cups, Vacuum Rubbers & Belt Scrapers',
    description: 'لاستیک‌های مکنده و وکیوم استکر کاشی، لاستیک‌های ضربه‌گیر پروانه‌ای، و لقمه‌های تسمه پاک‌کن پلی‌یورتان',
    subcategories: [
      'لاستیک‌های وکیوم و مکنده',
      'تسمه پاک کن خطوط لعاب'
    ],
    catalogPages: 'صفحات ۵۹ الی ۶۷ کاتالوگ (کدهای ۱۰۰۰ ۱۸ و ۱۹)',
    topModels: ['1000 18 1', '1000 18 2', '1000 19 1', '1000 19 2', '1000 19 3'],
    brands: ['فورزا (FORZA)', 'اطلس صنعت'],
    featuredBadge: 'وکیوم استکر کاشی و تمیزکننده PU',
    icon: 'Shield',
    count: sumCounts(['لاستیک‌های وکیوم و مکنده', 'تسمه پاک کن خطوط لعاب']) || 69,
    image: getProductImageUrl('e(345).png'),
  },

  // 8. بلبرینگ، پایه یاتاقان و بوش‌های رولیک
  {
    id: 8,
    slug: 'bearings-bushings',
    name: 'بلبرینگ، پایه یاتاقان و بوش‌های رولیک',
    nameEn: 'Bearings, Pillow Blocks & Roller Bushings',
    description: 'بلبرینگ‌های شیار عمیق دور بالا، پایه‌های یاتاقان و هوزینگ خطوط کانوایر، و بوش‌های داخل بلبرینگ سر رولیک',
    subcategories: [
      'پایه یاتاقان و هوزینگ',
      'بوش‌های سر رولیک',
      'بلبرینگ‌های شیار عمیق'
    ],
    catalogPages: 'صفحات ۴۵، ۸۹ الی ۹۰ و ۱۰۴ کاتالوگ (کدهای ۱۰۰۰ ۱۰، ۶۶ و BRG)',
    topModels: ['1000 10 1', '1000 10 2', '1000 66 1', '1000 66 2', '6000 2RS', '6200 2RS'],
    brands: ['فورزا (FORZA)', 'SKF', 'FAG', 'NSK'],
    featuredBadge: 'تحمل بار و دور بالا',
    icon: 'Cpu',
    count: sumCounts(['پایه یاتاقان و هوزینگ', 'بوش‌های سر رولیک', 'بلبرینگ‌های شیار عمیق']) || 49,
    image: getProductImageUrl('e(198).png'),
  },

  // 9. قطعات کوره رولری و پین‌های نسوز
  {
    id: 9,
    slug: 'kiln-roller-pins',
    name: 'قطعات کوره رولری و پین‌های نسوز',
    nameEn: 'Roller Kiln Parts & Drive Pins',
    description: 'تجهیزات تخصصی کوره رولری پخت کاشی، پین‌های نسوز سر رولر، فنر و واسطه‌های محرک مقاوم به حرارت',
    subcategories: [
      'قطعات کوره رولری',
      'پین و واسطه‌های محرک'
    ],
    catalogPages: 'صفحات ۵۵ و ۱۰۶ کاتالوگ (کدهای ۱۰۰۰ ۱۶ و سری PIN)',
    topModels: ['1000 16 1', '1000 16 2', 'PIN-39373', 'PIN-90156', 'PIN-37770'],
    brands: ['فورزا (FORZA)', 'SACMI', 'SYSTEM CERAMICS'],
    featuredBadge: 'تحمل دمای پخت کوره رولری',
    icon: 'Flame',
    count: sumCounts(['قطعات کوره رولری', 'پین و واسطه‌های محرک']) || 52,
    image: getProductImageUrl('e(303).png'),
  },

  // 10. کوپلینگ‌ها، بوش و اتصالات الاستومری
  {
    id: 10,
    slug: 'couplings-elastomers',
    name: 'کوپلینگ‌ها، بوش و اتصالات الاستومری',
    nameEn: 'Couplings & Elastomeric Bushings',
    description: 'کوپلینگ‌های خاری روتکس و لاستیک ستاره‌ای، بوش‌ها و ضربه‌گیرهای الاستومری و مهارکننده‌های صنعتی',
    subcategories: [
      'بوش و اتصالات الاستومری',
      'کوپلینگ و اتصالات'
    ],
    catalogPages: 'صفحات ۵۰ الی ۵۲ و ۸۶ کاتالوگ (کدهای ۱۰۰۰ ۱۳ و ۳۹)',
    topModels: ['1000 13 1', '1000 13 2', '1000 39 1', '1000 39 2', 'ROTEX 95'],
    brands: ['فورزا (FORZA)', 'KTR آلمان', 'SWR'],
    featuredBadge: 'جذب ارتعاش و کوپلینگ ROTEX',
    icon: 'Link',
    count: sumCounts(['بوش و اتصالات الاستومری', 'کوپلینگ و اتصالات']) || 79,
    image: getProductImageUrl('e(253).png'),
  },

  // -------------------------------------------------------------
  // Aliases for Backward Compatibility with existing URLs
  // -------------------------------------------------------------
  {
    id: 11,
    slug: 'industrial-belts',
    name: 'تسمه‌های صنعتی و تایمینگ',
    nameEn: 'Industrial Belts',
    description: 'تسمه‌های V-Belt، تایمینگ و جوشی کاتالوگ اطلس',
    subcategories: [
      'تسمه V-Belt ساده و دنده‌ای',
      'تسمه تایمینگ صنعتی',
      'تسمه جوشی پلی‌یورتان'
    ],
    catalogPages: 'صفحات ۱۹، ۲۰، ۹۹ و ۱۰۰ کاتالوگ',
    topModels: ['1000 0 1', 'B105', 'SPB 2500'],
    brands: ['فورزا (FORZA)', 'SWR'],
    icon: 'Layers',
    count: 70,
    image: getProductImageUrl('e(001).png'),
  },
  {
    id: 12,
    slug: 'ceramic-tiles',
    name: 'قطعات خطوط کاشی و سرامیک',
    nameEn: 'Ceramic & Tile Machinery Parts',
    description: 'قطعات و تجهیزات خطوط تولید کاشی، سرامیک و کوره‌های رولری کاتالوگ اطلس',
    subcategories: [
      'پروفیل‌های خطوط تولید و کانوایر',
      'قطعات خط لعاب و چاپ',
      'برس و تمیزکننده‌های خطوط کاشی',
      'ساپورت و پایه‌های خط لعاب',
      'پروانه و همزن‌های لعاب',
      'قطعات کوره رولری'
    ],
    catalogPages: 'صفحات ۲۶ الی ۷۱ کاتالوگ جامع اطلس',
    topModels: ['1000 1 1', '1000 7 1', '1000 12 1', '1000 16 1'],
    brands: ['فورزا (FORZA)', 'اطلس صنعت'],
    icon: 'Grid',
    count: 524,
    image: getProductImageUrl('e(026).png'),
  },
  {
    id: 13,
    slug: 'power-transmission',
    name: 'سیستم‌های انتقال قدرت و اتصالات',
    nameEn: 'Power Transmission & Couplings',
    description: 'کوپلینگ‌های لاستیکی، شفت‌ها، دنده‌ها و مهارکننده‌های صنعتی',
    subcategories: [
      'بوش و اتصالات الاستومری',
      'اهرم و بازوهای نگهدارنده',
      'کوپلینگ و اتصالات'
    ],
    catalogPages: 'صفحات ۴۶، ۵۰ الی ۵۲ و ۸۶ کاتالوگ',
    topModels: ['1000 11 1', '1000 13 1', '1000 39 1'],
    brands: ['فورزا (FORZA)', 'KTR'],
    icon: 'Cpu',
    count: 99,
    image: getProductImageUrl('e(253).png'),
  },
  {
    id: 14,
    slug: 'swr-forza-exclusive',
    name: 'برندهای انحصاری SWR و FORZA',
    nameEn: 'SWR Germany & FORZA Italy Official',
    description: 'محصولات رسمی برندهای انحصاری بازرگانی اطلس؛ FORZA ایتالیا و SWR آلمان با تأییدیه اصالت',
    subcategories: [
      'تسمه V-Belt ساده و دنده‌ای',
      'تسمه تایمینگ صنعتی',
      'فولی و هرزگرد تفلونی',
      'کوپلینگ و اتصالات'
    ],
    catalogPages: 'سرتاسر کاتالوگ جامع ۱۴۰۴-۱۴۰۵ بازرگانی اطلس',
    topModels: ['FORZA 1000 0 1', 'FORZA 1000 17 5', 'SWR SPB 2500'],
    brands: ['فورزا (FORZA)', 'SWR آلمان'],
    icon: 'Award',
    count: 864,
    image: getProductImageUrl('e(001).png'),
  },
  {
    id: 15,
    slug: 'v-belts',
    name: 'تسمه‌های V-Belt (وی‌بلت) صنعتی',
    nameEn: 'Classical & Cogged V-Belts',
    description: 'انواع تسمه‌های ساده کلاسیک و دندانه‌دار قالبی',
    subcategories: ['تسمه V-Belt ساده و دنده‌ای'],
    catalogPages: 'صفحات ۱۹ و ۲۰ کاتالوگ',
    topModels: ['1000 0 1', 'B105', 'SPB 2500'],
    brands: ['فورزا (FORZA)', 'SWR'],
    icon: 'Layers',
    count: 30,
    image: getProductImageUrl('e(001).png'),
  },
  {
    id: 16,
    slug: 'timing-belts',
    name: 'تسمه‌های تایمینگ صنعتی',
    nameEn: 'Industrial Timing Belts',
    description: 'تسمه‌های تایمینگ گام اینچی و میلیمتری HTD',
    subcategories: ['تسمه تایمینگ صنعتی'],
    catalogPages: 'کاتالوگ رسمی اطلس',
    topModels: ['50AT10', '8M*1120'],
    brands: ['فورزا (FORZA)', 'SWR'],
    icon: 'Cpu',
    count: 20,
    image: getProductImageUrl('e(001).png'),
  }
];

// Export only the primary 10 catalog categories for the Mega Menu
export const PRIMARY_CATALOG_CATEGORIES = CATEGORIES.filter(c => c.id <= 10);
