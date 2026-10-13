import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flame,
  ShieldCheck,
  Zap,
  Layers,
  Settings,
  Truck,
  PhoneCall,
  CheckCircle2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Calculator,
  FileText,
  Sparkles,
  HelpCircle,
  Thermometer,
  RefreshCw,
  Cpu,
  Factory,
  Award,
  Clock,
  Download,
  Share2,
  Bot,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { STORE_ASSETS } from '../assets/images';
import { toPersianDigits } from '../utils/formatters';

// Custom lightweight IntersectionObserver Hook for zero-lag scroll animations
function useScrollReveal() {
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);
}

// Interface for Ceramic Products
interface IndustryProduct {
  id: string;
  name: string;
  code: string;
  subTitle: string;
  category: string;
  tempRating: string;
  inStock: boolean;
  image: string;
  badge?: string;
  specs: { label: string; value: string }[];
}

export const TileCeramicIndustryPage: React.FC = () => {
  const navigate = useNavigate();
  useScrollReveal();

  // Page Scroll Progress Indicator
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / totalHeight)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Kiln & Belt Calculator State
  const [kilnTemp, setKilnTemp] = useState<number>(1200);
  const [rollerDiameter, setRollerDiameter] = useState<number>(50); // mm
  const [lineSpeed, setLineSpeed] = useState<number>(18); // m/min
  const [selectedProductionCapacity, setSelectedProductionCapacity] = useState<'medium' | 'high' | 'ultra'>('high');

  // Active Line Stage Blueprint Tab
  const [activeStage, setActiveStage] = useState<number>(3); // Default to Kiln

  // Quick RFQ Modal or Toast
  const [rfqSubmitted, setRfqSubmitted] = useState(false);
  const [rfqName, setRfqName] = useState('');
  const [rfqPhone, setRfqPhone] = useState('');
  const [rfqPlantName, setRfqPlantName] = useState('');
  const [rfqItem, setRfqItem] = useState('رولرهای سرامیکی آلومینایی کوره پخت');

  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rfqPhone) return;
    setRfqSubmitted(true);
    setTimeout(() => {
      setRfqSubmitted(false);
      setRfqName('');
      setRfqPhone('');
      setRfqPlantName('');
    }, 4000);
  };

  // Products List Specific to Tile & Ceramic Industry
  const ceramicProducts: IndustryProduct[] = [
    {
      id: 'roller-al70',
      name: 'رولر سرامیکی آلومینایی کوره پخت کاشی (درجه AL70/AL80)',
      code: 'CER-ROL-1250',
      subTitle: 'مقاوم در برابر شوک حرارتی شدید تا ۱350 درجه سانتی‌گراد',
      category: 'رولر کوره',
      tempRating: '۱۳۵۰°C',
      inStock: true,
      image: STORE_ASSETS.products.ceramicRoller,
      badge: 'پرکاربردترین در میبد و یزد',
      specs: [
        { label: 'قطر خارجی', value: '۴۰ تا ۶۰ میلی‌متر' },
        { label: 'درصد آلومینا', value: '۷۰٪ - ۸۰٪ Al2O3' },
        { label: 'تحمل بار خمش', value: 'بسیار بالا (Ultra Flexural)' },
      ],
    },
    {
      id: 'belt-pvc-linatex',
      name: 'تسمه تایمینگ روکش‌دار لیناتکس و PU هدایت کاشی',
      code: 'BELT-TIM-LNX',
      subTitle: 'ضد سایش، بدون لغزش با گپ کاملاً دقیق در خطوط چاپ و لعاب',
      category: 'تسمه‌های صنعتی',
      tempRating: '۹۰°C',
      inStock: true,
      image: STORE_ASSETS.products.pvcBelt,
      badge: 'کیفیت اروپایی FORZA',
      specs: [
        { label: 'نوع روکش', value: 'لیناتکس قرمز / PU سبز' },
        { label: 'مقاومت سایش', value: 'ضریب سایش بسیار پایین' },
        { label: 'گام دنده', value: 'T10 / AT10 / HTD' },
      ],
    },
    {
      id: 'bearing-high-temp',
      name: 'بلبرینگ نسوز و یاتاقان سرامیکی کوره پخت (Series 6200-HT)',
      code: 'BRG-HT-6208',
      subTitle: 'با گریس مخصوص کلوبر نسوز و لقی C4 اختصاصی کوره',
      category: 'بلبرینگ و یاتاقان',
      tempRating: '۳۵۰°C',
      inStock: true,
      image: STORE_ASSETS.products.bearingNsk || STORE_ASSETS.products.bearing,
      badge: 'اصالت تضمینی SKF / NSK',
      specs: [
        { label: 'نوع روانکار', value: 'Klüber Asonic HT' },
        { label: 'کلاس لقی', value: 'C4 High Thermal Clearance' },
        { label: 'جنس ساچمه', value: 'فولاد نسوز یا سرامیک Si3N4' },
      ],
    },
    {
      id: 'pulley-taperlock-press',
      name: 'پولی دنده‌ای و فلکه چدنی سنگین خط پرس و میکسر',
      code: 'PUL-KILN-TL',
      subTitle: 'با بوش مخروطی قفل‌کننده (Taper Lock) جهت نصب و تعویض برق‌آسا',
      category: 'پولی و انتقال قدرت',
      tempRating: '۲۰۰°C',
      inStock: true,
      image: STORE_ASSETS.products.aluPulley,
      badge: 'استاندارد DIN 2211',
      specs: [
        { label: 'متریال', value: 'چدن خاکستری GG25' },
        { label: 'نوع بوش', value: 'Taper Lock Bushing' },
        { label: 'بالانس دینامیکی', value: 'Class Q 6.3' },
      ],
    },
    {
      id: 'chain-squaring-line',
      name: 'زنجیر صنعتی دوگانه و چرخ‌زنجیر خط گونیاسازی و سورتینگ',
      code: 'CHN-SQ-80B',
      subTitle: 'ضد زنگ و مقاوم در برابر پودر سرامیک و لعاب اسیدی',
      category: 'زنجیر و چرخ‌زنجیر',
      tempRating: '۲۵۰°C',
      inStock: true,
      image: STORE_ASSETS.categories.chains,
      badge: 'سختی سطحی ۵۸ HRC',
      specs: [
        { label: 'استاندارد', value: 'ISO / ANSI B29.1' },
        { label: 'پوشش محافظ', value: 'Galdur / Stainless' },
        { label: 'طول عمر', value: '۳ برابر زنجیرهای معمولی' },
      ],
    },
    {
      id: 'parts-spray-dryer',
      name: 'نازل‌های سرامیکی ضدسایش و قطعات اسپری درایر',
      code: 'NZL-SP-CER',
      subTitle: 'مقاوم در برابر خوردگی دوغاب و گرانول‌های داغ سرامیک',
      category: 'قطعات تخصصی سرامیک',
      tempRating: '۶۰۰°C',
      inStock: true,
      image: STORE_ASSETS.products.ceramicParts,
      badge: 'دقت ابعادی میکرونی',
      specs: [
        { label: 'مقاومت خوردگی', value: '۱۰۰٪ ضد اسید و باز' },
        { label: 'سختی متریال', value: '۹ Mohs hardness' },
        { label: 'کاربرد', value: 'اسپری درایر و پمپ پودر' },
      ],
    },
  ];

  // Tile Production Line Blueprint Steps
  const lineBlueprintStages = [
    {
      id: 1,
      title: '۱. میکسر و اسپری درایر',
      subtitle: 'Milling & Spray Dryer',
      desc: 'آماده‌سازی دوغاب و تبدیل به گرانول تحت فشار و دمای بالا.',
      keyParts: ['بلبرینگ‌های سنگین آسیاب', 'تسمه‌های V-Belt خطوط پمپ', 'نازل‌های سرامیکی اسپری'],
      icon: Factory,
      accentColor: 'from-amber-500 to-orange-600',
    },
    {
      id: 2,
      title: '۲. پرس سنگین هیدرولیک',
      subtitle: 'Hydraulic Press',
      desc: 'شکل‌دهی گرانول با فشارهای فوق‌سنگین تا ۷۰۰۰ تن.',
      keyParts: ['پولی و بوش Taper Lock', 'تسمه‌های قدرت انتقال گشتاور', 'سیل‌ها و پکینگ هیدرولیک'],
      icon: Settings,
      accentColor: 'from-blue-600 to-cyan-600',
    },
    {
      id: 3,
      title: '۳. کوره پخت رولری',
      subtitle: 'Roller Kiln Conveyor',
      desc: 'پخت بیسکویت و لعاب در دمای ۱۱۰۰ تا ۱۴۰۰ درجه سانتی‌گراد.',
      keyParts: ['رولرهای سرامیکی آلومینایی (AL70/80)', 'بلبرینگ نسوز C4', 'گیربکس و زنجیرهای حرارتی'],
      icon: Flame,
      accentColor: 'from-red-500 to-amber-600',
    },
    {
      id: 4,
      title: '۴. خط لعاب‌زنی و چاپ',
      subtitle: 'Glazing & Digital Print',
      desc: 'اعمال لعاب و چاپ دیجیتال روی کاشی با حرکت کاملاً یکنواخت.',
      keyParts: ['تسمه‌های روکش‌دار لیناتکس', 'تسمه‌های PU دنده‌ای', 'پولی‌های آلومینیومی دقیق'],
      icon: Layers,
      accentColor: 'from-emerald-500 to-teal-600',
    },
    {
      id: 5,
      title: '۵. گونیاسازی و سورتینگ',
      subtitle: 'Squaring & Auto Sorting',
      desc: 'کالیبراسیون ابعادی، برش، بسته‌بندی اتوماتیک و شیرینگ.',
      keyParts: ['زنجیرهای نقاله دوگانه', 'تسمه‌های نقاله PVC ضدسایش', 'یاتاقان‌های ضد گرد و غبار'],
      icon: CheckCircle2,
      accentColor: 'from-purple-600 to-indigo-600',
    },
  ];

  // Calculated Specs based on Calculator State
  const calculatedRollerGrade = kilnTemp > 1300 ? 'AL80 (80% Alumina)' : kilnTemp > 1150 ? 'AL70 (70% Alumina)' : 'Standard High Thermal';
  const calculatedFlexuralStress = (rollerDiameter * 0.85).toFixed(1);
  const calculatedThermalShockRes = kilnTemp > 1250 ? 'Ultra Shock Proof (فوق مقاوم)' : 'High Thermal Proof';

  return (
    <div className="w-full text-right font-sans pb-20 bg-[#F4F6F9] text-[#12203C] overflow-x-hidden relative">
      {/* Scroll Progress Bar (Glowing Orange Line) */}
      <div className="fixed top-0 right-0 z-50 w-1.5 h-full pointer-events-none bg-[#12203C]/10">
        <div
          className="w-full bg-gradient-to-b from-[#C95210] via-[#E06518] to-[#FF8C00] shadow-[0_0_12px_#E06518] transition-all duration-75"
          style={{ height: `${Math.round(scrollProgress * 100)}%` }}
        />
      </div>

      {/* Global Embedded Styles for Fluid CSS GPU Scroll Animations */}
      <style>{`
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(28px);
          will-change: transform, opacity;
          transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-active {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }

        @keyframes flamePulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-flame {
          animation: flamePulse 3s ease-in-out infinite;
        }
      `}</style>

      {/* ========================================================================= */}
      {/* 1. CINEMATIC HERO SECTION (کاور اختصاصی صنعت کاشی و سرامیک)                  */}
      {/* ========================================================================= */}
      <section className="relative min-h-[580px] lg:min-h-[640px] bg-[#0E182D] text-white flex items-center overflow-hidden border-b border-orange-500/20">
        {/* Dynamic Dark Industrial Background Image with Ceramic Kiln Vibe */}
        <div className="absolute inset-0 z-0">
          <img
            src={STORE_ASSETS.industries.ceramic}
            alt="صنعت کاشی و سرامیک صنعت‌پیش"
            className="w-full h-full object-cover object-center opacity-30 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E182D] via-[#0E182D]/85 to-transparent" />
          <div className="absolute inset-0 bg-radial-gradient from-orange-500/10 via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Right Column: High-Impact Typography & CTA */}
            <div className="lg:col-span-7 space-y-6">
              {/* Top Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/10 border border-orange-500/40 text-orange-400 text-xs font-bold shadow-lg backdrop-blur-md">
                <Flame className="w-4 h-4 text-orange-400 animate-flame" />
                <span>تأمین تخصصی قطعات خطوط تولید کاشی، سرامیک و پرسلان</span>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white">
                  تجهیزات و رولرهای سرامیکی <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#FF8C00] via-[#E06518] to-[#FF5500]">
                    کوره‌های پخت کاشی و سرامیک
                  </span>
                </h1>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal pt-2">
                  ارائه‌دهنده رولرهای سرامیکی آلومینایی، تسمه‌های خط لعاب، بلبرینگ‌های نسوز کوره و سیستم‌های حرکتی پرس برای کارخانجات کاشی یزد، میبد، اصفهان و سراسر کشور با تضمین عدم توقف خط تولید.
                </p>
              </div>

              {/* Industrial Key Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                    <Thermometer className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-semibold">تحمل دما</div>
                    <div className="text-sm font-bold text-white font-mono">تا ۱۴۵۰°C</div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-semibold">ضمانت کالا</div>
                    <div className="text-sm font-bold text-white">برگه آنالیز نسوز</div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm flex items-center gap-3 col-span-2 sm:col-span-1">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-semibold">تحویل اکسپرس</div>
                    <div className="text-sm font-bold text-white">ارسال ۲۴h به میبد</div>
                  </div>
                </div>
              </div>

              {/* Buttons Action Bar */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#rfq-quick-form"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E06518] to-[#C95210] hover:from-[#C95210] hover:to-[#A83D05] text-white font-bold text-sm shadow-xl shadow-orange-600/30 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <FileText className="w-4 h-4" />
                  <span>درخواست پیش‌فاکتور (RFQ) کوره</span>
                </a>

                <a
                  href="#calculator-section"
                  className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm backdrop-blur-md flex items-center gap-2 transition-all"
                >
                  <Calculator className="w-4 h-4 text-orange-400" />
                  <span>محاسبه‌گر فنی رولر و تسمه</span>
                </a>

                <a
                  href="tel:02133900000"
                  className="px-4 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-orange-400 font-bold text-sm flex items-center gap-2 transition-all ml-auto sm:ml-0"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span className="text-xs font-mono">مشاوره تلفنی</span>
                </a>
              </div>
            </div>

            {/* Left Column: Interactive Product Visual / Hero Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/15 p-2 backdrop-blur-xl shadow-2xl overflow-hidden group">
                <img
                  src={STORE_ASSETS.products.ceramicRoller}
                  alt="رولر سرامیکی آلومینایی کوره پخت کاشی"
                  className="w-full h-72 sm:h-80 object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlaid Live Stats Box */}
                <div className="absolute bottom-4 right-4 left-4 bg-[#0E182D]/90 border border-orange-500/30 rounded-xl p-3 backdrop-blur-md flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <div>
                      <div className="font-bold text-white">دپوی آماده ارسال در انبار</div>
                      <div className="text-slate-400 text-[11px]">+۲,۴۰۰ شاخه رولر آلومینایی AL70</div>
                    </div>
                  </div>
                  <span className="bg-orange-500/20 text-orange-400 font-mono font-bold px-2 py-1 rounded border border-orange-500/30">
                    Grade AL70
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. REGIONAL HUB & TRUST STATS BAR (قطب‌های کاشی ایران)                      */}
      {/* ========================================================================= */}
      <section className="bg-white border-b border-slate-200 py-6 shadow-sm relative z-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-orange-300 transition-colors">
              <div className="text-xl sm:text-2xl font-black text-[#E06518] font-mono">
                {toPersianDigits(120)}+
              </div>
              <div className="text-xs text-[#55565A] font-bold mt-1">کارخانه کاشی طرف قرارداد</div>
              <div className="text-[10px] text-slate-400 mt-0.5">یزد، میبد، اصفهان، قزوین</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-orange-300 transition-colors">
              <div className="text-xl sm:text-2xl font-black text-[#E06518] font-mono">
                {toPersianDigits(100)}٪
              </div>
              <div className="text-xs text-[#55565A] font-bold mt-1">ضمانت عدم شکست شوک حرارتی</div>
              <div className="text-[10px] text-slate-400 mt-0.5">برگه تست کوارتر مهندسی</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-orange-300 transition-colors">
              <div className="text-xl sm:text-2xl font-black text-[#E06518] font-mono">
                {toPersianDigits(24)}h
              </div>
              <div className="text-xs text-[#55565A] font-bold mt-1">ارسال اضطراری به شهرک‌های صنعتی</div>
              <div className="text-[10px] text-slate-400 mt-0.5">جلوگیری از توقف کوره‌ها</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-orange-300 transition-colors">
              <div className="text-xl sm:text-2xl font-black text-[#E06518] font-mono">
                {toPersianDigits(18000)}+
              </div>
              <div className="text-xs text-[#55565A] font-bold mt-1">پارت نامبر فنی موجود</div>
              <div className="text-[10px] text-slate-400 mt-0.5">انبار اختصاصی قطعات کاشی</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE LINE BLUEPRINT (آناتومی خط تولید کاشی و سرامیک)              */}
      {/* ========================================================================= */}
      <section className="py-12 lg:py-16 container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-[#E06518] text-xs font-bold">
            <Factory className="w-3.5 h-3.5" />
            <span>نقشه فنی خط تولید</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#12203C]">
            آناتومی جامع تجهیزات صنعت کاشی و سرامیک
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            تأمین تخصصی تمام ملزومات مکانیکی، حرارتی و حرکتی از ابتدا تا انتهای خط تولید کاشی
          </p>
        </div>

        {/* Horizontal Mobile Touch-Scrollable Stage Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 no-scrollbar reveal-on-scroll">
          {lineBlueprintStages.map((stg) => {
            const Icon = stg.icon;
            const isActive = activeStage === stg.id;
            return (
              <button
                key={stg.id}
                onClick={() => setActiveStage(stg.id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 border cursor-pointer ${
                  isActive
                    ? 'bg-[#12203C] text-white border-orange-500 shadow-lg shadow-navy-900/20 scale-[1.02]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isActive ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span>{stg.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Panel */}
        {(() => {
          const stage = lineBlueprintStages.find((s) => s.id === activeStage) || lineBlueprintStages[2];
          const StageIcon = stage.icon;
          return (
            <div className="mt-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-md reveal-on-scroll">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center shadow-md">
                      <StageIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#12203C]">{stage.title}</h3>
                      <p className="text-xs text-slate-400 font-mono">{stage.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">{stage.desc}</p>

                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-bold text-[#12203C] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-500" />
                      <span>قطعات حیاتی قابل تأمین صنعت‌پیش در این بخش:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {stage.keyParts.map((part, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 transition-colors"
                        >
                          {part}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 flex items-center gap-3">
                    <a
                      href="#rfq-quick-form"
                      onClick={() => setRfqItem(`استعلام قطعات ${stage.title}`)}
                      className="px-4 py-2.5 rounded-lg bg-[#E06518] hover:bg-[#C95210] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>استعلام قیمت قطعات این بخش</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 relative group h-56 sm:h-64">
                    <img
                      src={
                        activeStage === 3
                          ? STORE_ASSETS.products.ceramicRoller
                          : activeStage === 4
                          ? STORE_ASSETS.products.pvcBelt
                          : STORE_ASSETS.industries.ceramic
                      }
                      alt={stage.title}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    <div className="absolute bottom-3 right-3 left-3 text-white text-xs space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-orange-400">
                        <Award className="w-3.5 h-3.5" />
                        <span>استاندارد کارخانجات درجه یک کاشی</span>
                      </div>
                      <div className="text-[11px] text-slate-300">تحویل با برگه کنترل کیفیت مهندسی (QC Certificate)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* ========================================================================= */}
      {/* 4. TECHNICAL KILN & BELT CALCULATOR TOOL (محاسبه‌گر فنی رولر و تسمه)         */}
      {/* ========================================================================= */}
      <section id="calculator-section" className="py-12 bg-slate-900 text-white relative overflow-hidden my-6 border-y border-orange-500/20">
        <div className="absolute inset-0 bg-radial-gradient from-orange-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Right: Calculator Controls */}
            <div className="lg:col-span-6 space-y-6 reveal-on-scroll">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-bold">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>ابزار محاسباتی مهندسین مکانیک کارخانجات کاشی</span>
                </div>
                <h2 className="text-xl sm:text-3xl font-black">
                  محاسبه‌گر مشخصات رولر کوره و تسمه نقاله
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  دمای کوره و مشخصات خط تولید خود را وارد کنید تا گرید رولر سرامیکی و نوع تسمه پیشنهادی فورزا فوراً تحلیل شود.
                </p>
              </div>

              {/* Controls */}
              <div className="space-y-4 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 backdrop-blur-md">
                {/* 1. Temperature Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-200 flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-orange-400" />
                      <span>حداکثر دمای پخت کوره (°C):</span>
                    </label>
                    <span className="font-mono font-bold text-orange-400 bg-orange-500/20 px-2 py-0.5 rounded border border-orange-500/30 text-sm">
                      {toPersianDigits(kilnTemp)} °C
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="1400"
                    step="25"
                    value={kilnTemp}
                    onChange={(e) => setKilnTemp(Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>1000°C (پیش‌پخت)</span>
                    <span>1200°C (کاشی دیواری)</span>
                    <span>1400°C (پرسلان)</span>
                  </div>
                </div>

                {/* 2. Roller Diameter Slider */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-200">قطر خارجی رولر (میلی‌متر):</label>
                    <span className="font-mono font-bold text-orange-400 bg-slate-700 px-2 py-0.5 rounded text-sm">
                      {toPersianDigits(rollerDiameter)} mm
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="80"
                    step="5"
                    value={rollerDiameter}
                    onChange={(e) => setRollerDiameter(Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                  />
                </div>

                {/* 3. Line Speed Selector */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-200">سرعت خط کوره (متر بر دقیقه):</label>
                    <span className="font-mono font-bold text-orange-400 bg-slate-700 px-2 py-0.5 rounded text-sm">
                      {toPersianDigits(lineSpeed)} m/min
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="35"
                    step="1"
                    value={lineSpeed}
                    onChange={(e) => setLineSpeed(Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Left: Instant Calculation Results */}
            <div className="lg:col-span-6 reveal-on-scroll stagger-2">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-orange-500/40 rounded-2xl p-6 shadow-2xl space-y-5 relative">
                <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-orange-400" />
                    <h3 className="font-bold text-white text-base">نتیجه تحلیل مهندسی FORZA</h3>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full font-bold">
                    تضمین کیفیت ۱۰۰٪
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400">گرید پیشنهادی رولر سرامیکی:</span>
                    <span className="font-bold text-orange-400 text-sm font-mono">{calculatedRollerGrade}</span>
                  </div>

                  <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400">مقاومت در برابر شوک حرارتی:</span>
                    <span className="font-bold text-emerald-400">{calculatedThermalShockRes}</span>
                  </div>

                  <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400">استحکام خمشی تخمینی (Flexural Stress):</span>
                    <span className="font-bold text-white font-mono">{toPersianDigits(calculatedFlexuralStress)} MPa</span>
                  </div>

                  <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400">تسمه‌های پیشنهادی متناظر:</span>
                    <span className="font-bold text-amber-300">تسمه PU روکش لیناتکس + دنده‌ای T10</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#rfq-quick-form"
                    onClick={() => setRfqItem(`استعلام رولر گرید ${calculatedRollerGrade} دمای ${kilnTemp} درجه`)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    <span>ثبت سفارش بر اساس این محاسبه</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CERAMIC PRODUCTS CATALOG GRID (محصولات تخصصی صنعت کاشی)                 */}
      {/* ========================================================================= */}
      <section className="py-12 container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 reveal-on-scroll">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E06518] mb-1">
              <Layers className="w-4 h-4" />
              <span>کاتالوگ فنی محصولات کاشی و سرامیک</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#12203C]">
              قطعات پرکاربرد کارخانجات تولید کاشی
            </h2>
          </div>
          <Link
            to="/category/ceramic-tiles"
            className="text-xs font-bold text-[#E06518] hover:text-[#C95210] flex items-center gap-1 self-start md:self-auto bg-white px-4 py-2.5 rounded-xl border border-slate-200 hover:border-orange-300 transition-all shadow-sm"
          >
            <span>مشاهده کامل همه‌ی قطعات سرامیک</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ceramicProducts.map((prod, idx) => (
            <div
              key={prod.id}
              className={`bg-white rounded-2xl border border-slate-200/90 hover:border-orange-400/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group reveal-on-scroll stagger-${(idx % 4) + 1}`}
            >
              <div>
                {/* Product Image Header */}
                <div className="relative h-48 sm:h-52 bg-slate-100 overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  {/* Badge */}
                  {prod.badge && (
                    <span className="absolute top-3 right-3 bg-[#12203C]/90 text-orange-400 border border-orange-500/30 text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md">
                      {prod.badge}
                    </span>
                  )}

                  {/* Temp Rating Tag */}
                  <span className="absolute bottom-3 right-3 bg-red-600/90 text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded shadow">
                    {prod.tempRating}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>کد فنی: {prod.code}</span>
                    <span className="text-emerald-600 font-sans font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      موجود در انبار
                    </span>
                  </div>

                  <h3 className="font-bold text-[#12203C] text-sm leading-snug line-clamp-2 group-hover:text-[#E06518] transition-colors">
                    {prod.name}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {prod.subTitle}
                  </p>

                  {/* Specs Table */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1.5 text-xs">
                    {prod.specs.map((sp, i) => (
                      <div key={i} className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-500">{sp.label}:</span>
                        <span className="font-semibold text-slate-800">{sp.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-5 pt-0">
                <a
                  href="#rfq-quick-form"
                  onClick={() => setRfqItem(prod.name)}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#E06518] text-slate-700 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all border border-slate-200 hover:border-orange-500 group-hover:shadow-md cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>درخواست قیمت و مشخصات</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. WHY SANATPISH FOR TILE PLANTS (چرا صنعت‌پیش برای صنایع کاشی)              */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10 reveal-on-scroll">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E06518]">
              <Award className="w-4 h-4" />
              <span>ارزش افزوده مهندسی</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#12203C]">
              چرا صنعت‌پیش انتخاب اول مدیران فنی کاشی است؟
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-orange-300 transition-all space-y-3 reveal-on-scroll stagger-1">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#E06518] flex items-center justify-center font-bold">
                <Thermometer className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#12203C] text-base">تست کوارتر و شوک حرارتی</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                تمامی رولرهای کوره پیش از ارسال، تحت تست دقیق کوارتر خمشی و سنجش مقاومت در برابر شوک حرارتی قرار می‌گیرند تا از عدم تابیدگی در دمای بالا اطمینان حاصل شود.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-orange-300 transition-all space-y-3 reveal-on-scroll stagger-2">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#12203C] text-base">آپارات و روکش تخصصی تسمه‌ها</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                ارائه خدمات کامل آپارات تسمه‌های PVC و PU، برش دقیق عرضی و اعمال روکش‌های لیناتکس متناسب با ابعاد کاشی‌های سایز بزرگ (اسلب).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-orange-300 transition-all space-y-3 reveal-on-scroll stagger-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#12203C] text-base">دپو و تحویل ۲۴ ساعته در میبد و یزد</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                با داشتن خط ارسال اکسپرس، قطعات فوری خطوط کاشی کمتر از ۲۴ ساعت در محل کارخانه تحویل داده می‌شوند تا ریسک خواب کوره به صفر برسد.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. QUICK RFQ & CONSULTATION FORM (فرم استعلام سریع قیمت و مشاوره)          */}
      {/* ========================================================================= */}
      <section id="rfq-quick-form" className="py-12 container mx-auto px-4 lg:px-8 my-4">
        <div className="bg-gradient-to-br from-[#12203C] to-[#0E182D] rounded-3xl border border-orange-500/30 p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden reveal-on-scroll">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold border border-orange-500/30">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>ثبت استعلام فوری کارخانجات</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                درخواست پیش‌فاکتور و مشاوره تخصصی کاشی
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                اطلاعات تماس و قطعه مورد نیاز کارخانه خود را وارد کنید. کارشناسان ارشد فنی صنعت‌پیش ظرف کمتر از ۳۰ دقیقه با شما تماس خواهند گرفت.
              </p>

              <div className="space-y-2 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-400" />
                  <span>ارسال پیش‌فاکتور رسمی همراه با کد اقتصادی و شناسه ملی</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-400" />
                  <span>تطبیق ابعادی با نقشه‌های ساخت و کاتالوگ سازنده</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <form onSubmit={handleRfqSubmit} className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 sm:p-6 space-y-4">
                {rfqSubmitted ? (
                  <div className="text-center py-8 space-y-3 bg-emerald-500/20 rounded-xl border border-emerald-500/40 p-4">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                    <h3 className="text-lg font-bold text-white">استعلام شما با موفقیت ثبت شد</h3>
                    <p className="text-xs text-slate-200">
                      کارشناس بخش کاشی و سرامیک فورزا به‌زودی با شماره {toPersianDigits(rfqPhone)} تماس می‌گیرد.
                    </p>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">
                        قطعه یا تجهیز مورد نظر:
                      </label>
                      <input
                        type="text"
                        value={rfqItem}
                        onChange={(e) => setRfqItem(e.target.value)}
                        className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1">
                          نام و نام خانوادگی / سمت:
                        </label>
                        <input
                          type="text"
                          placeholder="مثلاً: مهندس رضایی"
                          value={rfqName}
                          onChange={(e) => setRfqName(e.target.value)}
                          className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1">
                          شماره تماس همراه:
                        </label>
                        <input
                          type="tel"
                          placeholder="۰۹۱۲..."
                          value={rfqPhone}
                          onChange={(e) => setRfqPhone(e.target.value)}
                          className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-orange-500 focus:outline-none font-mono text-right"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">
                        نام کارخانه کاشی و استان:
                      </label>
                      <input
                        type="text"
                        placeholder="مثلاً: کاشی میبد - استان یزد"
                        value={rfqPlantName}
                        onChange={(e) => setRfqPlantName(e.target.value)}
                        className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-orange-500 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E06518] to-[#C95210] hover:from-[#C95210] hover:to-[#A83D05] text-white font-bold text-xs shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <FileText className="w-4 h-4" />
                      <span>ثبت درخواست و دریافت پیش‌فاکتور</span>
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. MOBILE DEDICATED STICKY BOTTOM ACTION BAR (ویژه اندروید و موبایل)       */}
      {/* ========================================================================= */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#12203C]/95 border-t border-orange-500/30 p-3 backdrop-blur-lg flex items-center justify-between gap-2 shadow-2xl">
        <a
          href="#rfq-quick-form"
          className="flex-1 py-3 px-3 rounded-xl bg-gradient-to-r from-[#E06518] to-[#C95210] text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow-md"
        >
          <FileText className="w-4 h-4" />
          <span>استعلام سریع پیش‌فاکتور</span>
        </a>

        <a
          href="tel:02133900000"
          className="py-3 px-4 rounded-xl bg-slate-800 text-orange-400 border border-slate-700 font-bold text-xs flex items-center gap-1"
        >
          <PhoneCall className="w-4 h-4" />
          <span>تماس</span>
        </a>

        <Link
          to="/ai-consult"
          className="py-3 px-3 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/40 font-bold text-xs flex items-center gap-1"
        >
          <Bot className="w-4 h-4" />
          <span>چت AI</span>
        </Link>
      </div>
    </div>
  );
};
