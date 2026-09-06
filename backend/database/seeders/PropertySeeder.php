<?php

namespace Database\Seeders;

use App\Models\Agent;
use App\Models\InvestmentOpportunity;
use App\Models\Property;
use Illuminate\Database\Seeder;

// Mirrors the sample data in frontend/lib/properties.ts so the API and the
// static frontend mock data agree while the two are being wired together.
// Replace with real listings before launch.
class PropertySeeder extends Seeder
{
    public function run(): void
    {
        $shirin = Agent::create([
            'slug' => 'shirin-moradi',
            'name_fa' => 'شیرین مرادی', 'name_en' => 'Shirin Moradi',
            'title_fa' => 'مشاور ارشد املاک لوکس', 'title_en' => 'Senior Luxury Property Consultant',
            'bio_fa' => 'بیش از ۱۲ سال تجربه در معاملات املاک لوکس تهران و شمال کشور.',
            'bio_en' => '12+ years advising on luxury property transactions in Tehran and northern Iran.',
            'phone' => '+98 21 0000 0000', 'whatsapp' => '+98 900 000 0000',
        ]);

        $kaveh = Agent::create([
            'slug' => 'kaveh-ahmadi',
            'name_fa' => 'کاوه احمدی', 'name_en' => 'Kaveh Ahmadi',
            'title_fa' => 'مشاور سرمایه‌گذاری ملکی', 'title_en' => 'Real Estate Investment Advisor',
            'bio_fa' => 'تمرکز بر فرصت‌های سرمایه‌گذاری و همکاری با سازندگان پروژه‌های لوکس.',
            'bio_en' => 'Focused on investment opportunities and partnerships with luxury developers.',
            'phone' => '+98 21 0000 0001', 'whatsapp' => '+98 900 000 0001',
        ]);

        $villa = Property::create([
            'slug' => 'villa-zafaranieh-118',
            'title_fa' => 'ویلای معماری زعفرانیه', 'title_en' => 'Zafaranieh Architectural Villa',
            'type' => 'villa',
            'location_fa' => 'زعفرانیه، تهران', 'location_en' => 'Zafaranieh, Tehran',
            'price' => 285_000_000_000, 'area_sqm' => 620, 'bedrooms' => 5, 'parking_spaces' => 4,
            'year_built' => 2022,
            'amenities_fa' => ['استخر سرپوشیده', 'سونا و جکوزی', 'هوشمندسازی کامل'],
            'amenities_en' => ['Indoor pool', 'Sauna & jacuzzi', 'Full home automation'],
            'document_status_fa' => 'تک‌برگ، سند قطعی', 'document_status_en' => 'Clean single-deed title',
            'project_status' => 'ready', 'purpose_fit' => 'both', 'featured' => true,
            'description_fa' => 'ویلایی خاص در قلب زعفرانیه با معماری معاصر.',
            'description_en' => 'A distinctive contemporary villa in the heart of Zafaranieh.',
            'images' => [
                'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop',
            ],
            'agent_id' => $shirin->id,
        ]);

        Property::create([
            'slug' => 'penthouse-elahieh-sky',
            'title_fa' => 'پنت‌هاوس الهیه', 'title_en' => 'Elahieh Sky Penthouse',
            'type' => 'penthouse',
            'location_fa' => 'الهیه، تهران', 'location_en' => 'Elahieh, Tehran',
            'price' => 410_000_000_000, 'area_sqm' => 480, 'bedrooms' => 4, 'parking_spaces' => 3,
            'floor' => 18, 'year_built' => 2023,
            'amenities_fa' => ['روف‌گاردن اختصاصی', 'ویو کامل شهر'],
            'amenities_en' => ['Private roof garden', 'Full city view'],
            'document_status_fa' => 'تک‌برگ', 'document_status_en' => 'Single-deed title',
            'project_status' => 'ready', 'purpose_fit' => 'investment', 'featured' => true,
            'description_fa' => 'پنت‌هاوسی در بالاترین طبقه یکی از برج‌های منتخب الهیه.',
            'description_en' => 'A top-floor penthouse in one of Elahieh\'s most select towers.',
            'images' => [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
            ],
            'agent_id' => $kaveh->id,
        ]);

        InvestmentOpportunity::create([
            'slug' => 'niavaran-collectors-pick',
            'title_fa' => 'منتخب بام ایران: نیاوران', 'title_en' => 'Bam Iran Selection — Niavaran',
            'summary_fa' => 'ملکی کمیاب که به‌ندرت در بازار املاک لوکس تهران عرضه می‌شود.',
            'summary_en' => 'A rare address that seldom appears on Tehran\'s luxury market.',
            'tag_fa' => 'منتخب بام ایران', 'tag_en' => 'Bam Iran Selection',
            'property_id' => $villa->id,
            'image' => 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1200&auto=format&fit=crop',
        ]);
    }
}
