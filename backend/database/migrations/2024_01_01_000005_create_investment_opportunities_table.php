<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('investment_opportunities', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title_fa');
            $table->string('title_en');
            $table->text('summary_fa');
            $table->text('summary_en');

            // Display label only — e.g. "فرصت ویژه" / "Private Opportunity".
            // Never "حراج" / "sale" / "discount": that language is off-brand.
            $table->string('tag_fa');
            $table->string('tag_en');

            $table->foreignId('property_id')->nullable()->constrained('properties')->nullOnDelete();
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('investment_opportunities');
    }
};
