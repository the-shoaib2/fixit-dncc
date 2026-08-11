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
