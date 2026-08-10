import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

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

  // Seed Sample Reports
  const sampleReports = [
    {
      publicId: 'FIX-2026-000101',
      categoryId: categories[1].id,
      description: 'মিরপুর ১০ গোলচত্বরের পূর্ব পাশে ডাস্টবিন উপচে পচা বর্জ্য রাস্তায় ছড়িয়ে পড়েছে।',
      locationAddress: 'Mirpur 10 Circle, Section 10, Mirpur, Dhaka',
      latitude: 23.8069,
      longitude: 90.3687,
      mobileNumber: '01711223344',
      status: 'RESOLVED',
      priority: 'HIGH',
    },
    {
      publicId: 'FIX-2026-000102',
      categoryId: categories[0].id,
      description: 'উত্তরা ৩ নম্বর সেক্টর ৭ নম্বর রোডে প্লাস্টিকের বোতল ও ময়লা জমা হয়ে ড্রেন বন্ধ।',
      locationAddress: 'Road 7, Sector 3, Uttara, Dhaka',
      latitude: 23.8644,
      longitude: 90.3986,
      mobileNumber: '01811998877',
      status: 'IN_PROGRESS',
      priority: 'MEDIUM',
    },
    {
      publicId: 'FIX-2026-000103',
      categoryId: categories[2].id,
      description: 'গুলশান ২ কাঁচাবাজারের পেছনে বড় অবৈধ বর্জ্য স্তূপ তৈরি হয়েছে।',
      locationAddress: 'Gulshan 2 Market Area, Gulshan, Dhaka',
      latitude: 23.7949,
      longitude: 90.4143,
      mobileNumber: '01912345678',
      status: 'UNDER_VERIFICATION',
      priority: 'HIGH',
    },
    {
      publicId: 'FIX-2026-000104',
      categoryId: categories[3].id,
      description: 'ধানমন্ডি ২৭ পুরাতন রোডের কোণায় পরিত্যক্ত ইটের ভাঙা টুকরো জমা আছে।',
      locationAddress: 'Dhanmondi Road 27, Dhaka',
      latitude: 23.7540,
      longitude: 90.3768,
      mobileNumber: '01555667788',
      status: 'SUBMITTED',
      priority: 'LOW',
    },
    {
      publicId: 'FIX-2026-000105',
      categoryId: categories[4].id,
      description: 'বনানী খেলার মাঠের কাছে প্লাস্টিকের বর্জ্য পড়ে আর্বজনা তৈরি হয়েছে।',
      locationAddress: 'Banani Block F Park Area, Banani, Dhaka',
      latitude: 23.7937,
      longitude: 90.4066,
      mobileNumber: '01611224455',
      status: 'RESOLVED',
      priority: 'MEDIUM',
    },
  ];

  for (const r of sampleReports) {
    const report = await prisma.report.upsert({
      where: { publicId: r.publicId },
      update: {},
      create: {
        ...r,
        images: {
          create: [
            {
              imageUrl: '/samples/waste-before.jpg',
              type: 'BEFORE',
            },
          ],
        },
        statusHistory: {
          create: [
            {
              status: 'SUBMITTED',
              note: 'Report submitted by citizen',
            },
            ...(r.status !== 'SUBMITTED'
              ? [
                  {
                    status: r.status,
                    note: `Status updated to ${r.status} by Admin`,
                    createdBy: admin.name,
                  },
                ]
              : []),
          ],
        },
        ...(r.status === 'RESOLVED'
          ? {
              cleaningActivity: {
                create: {
                  cleanedBy: 'Zone-3 Sanitation Team',
                  notes: 'Waste collected and area sanitized thoroughly.',
                  wasteVolumeKg: 250,
                  afterImageUrl: '/samples/waste-after.jpg',
                },
              },
            }
          : {}),
      },
    });
    console.log('Seeded Report:', report.publicId);
  }

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
    await prisma.faq.create({ data: faq });
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
