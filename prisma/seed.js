const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding FixIt DNCC database...');

  // Create Default Admin
  const adminPassword = await bcrypt.hash('adminpassword123', 10);
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@dncc.gov.bd' },
    update: {},
    create: {
      email: 'admin@dncc.gov.bd',
      name: 'DNCC Control Room Admin',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('Created Admin:', admin.email);

  // Seed Categories
  const categoriesData = [
    {
      slug: 'street-waste',
      nameBn: 'রাস্তার ময়লা',
      nameEn: 'Street Waste',
      description: 'Uncollected trash on public streets and footpaths',
      icon: 'Trash2',
    },
    {
      slug: 'overflowing-bin',
      nameBn: 'ডাস্টবিন উপচে পড়া',
      nameEn: 'Overflowing Dumpster',
      description: 'Overflowing municipal waste bins and dumpsters',
      icon: 'Archive',
    },
    {
      slug: 'illegal-dumping',
      nameBn: 'অবৈধভাবে বর্জ্য ফেলা',
      nameEn: 'Illegal Dumping',
      description: 'Illegal waste accumulation in residential/commercial spots',
      icon: 'AlertTriangle',
    },
    {
      slug: 'construction-waste',
      nameBn: 'নির্মাণ বর্জ্য',
      nameEn: 'Construction Debris',
      description: 'Leftover building materials, bricks, and concrete waste',
      icon: 'Building2',
    },
    {
      slug: 'park-waste',
      nameBn: 'পার্ক বা উন্মুক্ত স্থানের বর্জ্য',
      nameEn: 'Park & Open Space Waste',
      description: 'Waste scattered in public parks, playgrounds, or greenery',
      icon: 'Trees',
    },
  ];

  const categories = [];
  for (const cat of categoriesData) {
    const created = await prisma.wasteCategory.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categories.push(created);
  }
  console.log(`Created ${categories.length} Categories.`);

  // Seed FAQs
  const faqs = [
    {
      questionBn: 'রিপোর্ট করতে কি অ্যাকাউন্ট লাগবে?',
      questionEn: 'Do I need an account to submit a report?',
      answerBn: 'না, সাধারণ রিপোর্ট অ্যাকাউন্ট ছাড়াই করা যাবে। শুধু ছবি, লোকেশন ও বিস্তারিত তথ্য দিয়ে সাবমিট করলেই হবে।',
      answerEn: 'No, citizens can submit waste reports directly without registering or logging in. Just upload a photo, select location, and submit.',
      order: 1,
    },
    {
      questionBn: 'রিপোর্ট করার পর কী হবে?',
      questionEn: 'What happens after I submit a report?',
      answerBn: 'DNCC টিম যাচাই করে ব্যবস্থা নেবে। যাচাইয়ের পর সংশ্লিষ্ট পরিচ্ছন্নতা কর্মীদের কাছে সমস্যাটি পাঠানো হয়।',
      answerEn: 'The DNCC administration team verifies the report and assigns it to local field cleaning workers for immediate cleanup action.',
      order: 2,
    },
    {
      questionBn: 'আমি কি রিপোর্টের অগ্রগতি দেখতে পারবো?',
      questionEn: 'Can I track the progress of my report?',
      answerBn: 'হ্যাঁ, রিপোর্ট আইডি বা মোবাইল নম্বর দিয়ে স্ট্যাটাস দেখা যাবে — গৃহীত হওয়া থেকে সমাধান পর্যন্ত সব ধাপ ট্র্যাক করা যায়।',
      answerEn: 'Yes, you can track real-time progress using your unique Report ID (e.g. FIX-2026-000123) or mobile number on the tracking page.',
      order: 3,
    },
  ];

  for (const faq of faqs) {
    const existingFaq = await prisma.faq.findFirst({
      where: { questionEn: faq.questionEn },
    });
    if (!existingFaq) {
      await prisma.faq.create({ data: faq });
    }
  }

  // Seed Sample Before & After Reports for Results Showcase
  const streetWasteCat = categories.find((c) => c.slug === 'street-waste') || categories[0];
  const binCat = categories.find((c) => c.slug === 'overflowing-bin') || categories[1];
  const illegalCat = categories.find((c) => c.slug === 'illegal-dumping') || categories[2];
  const constrCat = categories.find((c) => c.slug === 'construction-waste') || categories[3];
  const parkCat = categories.find((c) => c.slug === 'park-waste') || categories[4];

  const sampleReports = [
    {
      publicId: 'FIX-2026-001021',
      categoryId: streetWasteCat.id,
      description: 'গুলশান অ্যাভিনিউ ২ নম্বর সড়কের মুখে ফুটপাতে প্লাস্টিক ও ডাব ফেলে রাস্তা বন্ধ করে রাখা হয়েছিল।',
      locationAddress: 'গুলশান ২ নম্বর গোলচত্বর, ঢাকা',
      latitude: 23.7949,
      longitude: 90.4143,
      mobileNumber: '01711223344',
      status: 'RESOLVED',
      priority: 'HIGH',
      assignedTo: 'ডিএনসিসি জোন ৩ পরিচ্ছন্নতা স্কোয়াড',
      createdAt: new Date(Date.now() - 86400000 * 3),
      images: [
        { imageUrl: '/samples/waste-before.jpg', type: 'BEFORE' },
        { imageUrl: '/samples/waste-after.jpg', type: 'AFTER' },
      ],
      cleaningActivity: {
        cleanedBy: 'ডিএনসিসি পরিচ্ছন্নতা টিম ৩',
        notes: 'সম্পূর্ণ ময়লা অপসারিত এবং ব্লিচিং দিয়ে স্থানটি জীবাণুমুক্ত করা হয়েছে।',
        wasteVolumeKg: 180,
        afterImageUrl: '/samples/waste-after.jpg',
      },
      statusHistory: [
        { status: 'SUBMITTED', note: 'রিপোর্ট জমা দিয়েছেন নাগরিক' },
        { status: 'VERIFIED', note: 'টিম কর্তৃক এলাকা পরিদর্শন ও যাচাইকৃত' },
        { status: 'IN_PROGRESS', note: 'পরিচ্ছন্নতা কাজ চলমান' },
        { status: 'RESOLVED', note: 'বর্জ্য অপসারণ শেষ এবং ছবি সংযুক্ত করা হয়েছে' },
      ],
    },
    {
      publicId: 'FIX-2026-001022',
      categoryId: binCat.id,
      description: 'উত্তরা ৪ নম্বর সেক্টর লেক পাড়ে ডাস্টবিন উপচে ময়লা রাস্তায় পড়ে দুর্গন্ধ ছড়াচ্ছিল।',
      locationAddress: 'সেক্টর ৪ লেক ড্রাইভ রোড, উত্তরা, ঢাকা',
      latitude: 23.8703,
      longitude: 90.3956,
      mobileNumber: '01819887766',
      status: 'RESOLVED',
      priority: 'URGENT',
      assignedTo: 'ডিএনসিসি জোন ১ বর্জ্য ব্যবস্থাপনা দল',
      createdAt: new Date(Date.now() - 86400000 * 2),
      images: [
        { imageUrl: '/samples/waste-before.jpg', type: 'BEFORE' },
        { imageUrl: '/samples/waste-after.jpg', type: 'AFTER' },
      ],
      cleaningActivity: {
        cleanedBy: 'উত্তরা জোন ১ মোবাইল টিম',
        notes: 'উপচে পড়া কনটেইনার খালি করে চারপাশ ঝাড়ু দেওয়া হয়েছে।',
        wasteVolumeKg: 350,
        afterImageUrl: '/samples/waste-after.jpg',
      },
      statusHistory: [
        { status: 'SUBMITTED', note: 'রিপোর্ট সাবমিট করা হয়েছে' },
        { status: 'VERIFIED', note: 'জরুরি ভিত্তিতে অনুমোদন দেওয়া হয়েছে' },
        { status: 'RESOLVED', note: 'ডাস্টবিন খালি করা হয়েছে' },
      ],
    },
    {
      publicId: 'FIX-2026-001023',
      categoryId: illegalCat.id,
      description: 'বনানী সি ব্লকে আবাসিক ভবনের সামনে রাতে কে বা কারা অবৈধভাবে পলিথিন ও ময়লার স্তূপ রেখে যায়।',
      locationAddress: 'ব্লক সি, রোড ১১, বনানী, ঢাকা',
      latitude: 23.7937,
      longitude: 90.4066,
      mobileNumber: '01912345678',
      status: 'RESOLVED',
      priority: 'HIGH',
      assignedTo: 'বনানী রেপিড রেসপন্স টিম',
      createdAt: new Date(Date.now() - 86400000 * 4),
      images: [
        { imageUrl: '/samples/waste-before.jpg', type: 'BEFORE' },
        { imageUrl: '/samples/waste-after.jpg', type: 'AFTER' },
      ],
      cleaningActivity: {
        cleanedBy: 'বনানী পরিচ্ছন্নতা দল',
        notes: 'সকল প্লাস্টিক ও বর্জ্য ট্রাকে তুলে অপসারণ করা হয়েছে।',
        wasteVolumeKg: 220,
        afterImageUrl: '/samples/waste-after.jpg',
      },
      statusHistory: [
        { status: 'SUBMITTED', note: 'রিপোর্ট প্রাপ্তি স্বীকার' },
        { status: 'IN_PROGRESS', note: 'টিম স্থানে পৌঁছাল' },
        { status: 'RESOLVED', note: 'এলাকা পরিষ্কার সম্পন্ন' },
      ],
    },
    {
      publicId: 'FIX-2026-001024',
      categoryId: constrCat.id,
      description: 'মিরপুর ১০ নম্বর গোলচত্বরের কাছে ফুটপাতে ভাঙা ইট ও কনক্রিটের টুকরো পড়ে পথচারীদের চলাচলে বিঘ্ন ঘটাচ্ছিল।',
      locationAddress: 'মিরপুর ১০ মোড়, ঢাকা',
      latitude: 23.8069,
      longitude: 90.3687,
      mobileNumber: '01678901234',
      status: 'RESOLVED',
      priority: 'MEDIUM',
      assignedTo: 'মিরপুর জোন ৪ বর্জ্য টিম',
      createdAt: new Date(Date.now() - 86400000 * 5),
      images: [
        { imageUrl: '/samples/waste-before.jpg', type: 'BEFORE' },
        { imageUrl: '/samples/waste-after.jpg', type: 'AFTER' },
      ],
      cleaningActivity: {
        cleanedBy: 'মিরপুর কন্সট্রাকশন বর্জ্য অপসারণ ইউনিট',
        notes: 'কনক্রিটের ধ্বংসাবশেষ ট্রাকে লোড করে নির্ধারিত স্থানে নিয়ে যাওয়া হয়েছে।',
        wasteVolumeKg: 500,
        afterImageUrl: '/samples/waste-after.jpg',
      },
      statusHistory: [
        { status: 'SUBMITTED', note: 'রিপোর্ট জমা হয়েছে' },
        { status: 'RESOLVED', note: 'নির্মাণ বর্জ্য মুক্ত করা হয়েছে' },
      ],
    },
    {
      publicId: 'FIX-2026-001025',
      categoryId: parkCat.id,
      description: 'নিকুঞ্জ ২ পার্কে ওয়াটার বডি ও ঘাসের ওপর প্লাস্টিকের বোতল ও খাবারের প্যাকেট ছড়ানো ছিল।',
      locationAddress: 'নিকুঞ্জ ২ সেন্ট্রাল পার্ক, ঢাকা',
      latitude: 23.8335,
      longitude: 90.4167,
      mobileNumber: '01555443322',
      status: 'RESOLVED',
      priority: 'MEDIUM',
      assignedTo: 'পার্ক ও উন্মুক্ত স্থান টিম',
      createdAt: new Date(Date.now() - 86400000 * 1),
      images: [
        { imageUrl: '/samples/waste-before.jpg', type: 'BEFORE' },
        { imageUrl: '/samples/waste-after.jpg', type: 'AFTER' },
      ],
      cleaningActivity: {
        cleanedBy: 'নিকুঞ্জ পরিবেশ পরিচ্ছন্নতা টিম',
        notes: 'পার্কের পুরো এলাকা পরিষ্কার করে নতুন ডাস্টবিন স্থাপন করা হয়েছে।',
        wasteVolumeKg: 120,
        afterImageUrl: '/samples/waste-after.jpg',
      },
      statusHistory: [
        { status: 'SUBMITTED', note: 'রিপোর্ট জমা দেওয়া হয়েছে' },
        { status: 'RESOLVED', note: 'পার্ক সম্পূর্ণ পরিচ্ছন্ন' },
      ],
    }
  ];

  for (const rData of sampleReports) {
    const { images, cleaningActivity, statusHistory, ...reportFields } = rData;
    
    // Check if report already exists by publicId
    const existingReport = await prisma.report.findUnique({
      where: { publicId: reportFields.publicId },
    });

    if (!existingReport) {
      const createdReport = await prisma.report.create({
        data: {
          ...reportFields,
          images: {
            create: images,
          },
          statusHistory: {
            create: statusHistory,
          },
          cleaningActivity: {
            create: cleaningActivity,
          },
        },
      });
      console.log(`Created sample report: ${createdReport.publicId}`);
    }
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
