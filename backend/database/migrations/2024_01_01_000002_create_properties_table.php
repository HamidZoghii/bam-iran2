<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();

            $table->string('title_fa');
            $table->string('title_en');

            // villa | penthouse | apartment | tower | residential-complex
            $table->string('type');

            $table->string('location_fa');
            $table->string('location_en');

            // Stored in Toman. Nullable + price_on_request for ultra-luxury
            // listings that are quoted privately rather than published.
            $table->unsignedBigInteger('price')->nullable();
            $table->boolean('price_on_request')->default(false);

            $table->unsignedInteger('area_sqm');
            $table->unsignedTinyInteger('bedrooms');
            $table->unsignedTinyInteger('parking_spaces');
            $table->smallInteger('floor')->nullable();
            $table->smallInteger('year_built')->nullable();

            $table->json('amenities_fa')->nullable();
            $table->json('amenities_en')->nullable();

            $table->string('document_status_fa')->nullable();
            $table->string('document_status_en')->nullable();

            // ready | under-construction
            $table->string('project_status')->default('ready');

            // residence | investment | both
            $table->string('purpose_fit')->default('both');

            $table->boolean('featured')->default(false);

            $table->text('architectural_notes_fa')->nullable();
            $table->text('architectural_notes_en')->nullable();
            $table->text('description_fa');
            $table->text('description_en');

            // Array of storage paths/URLs; managed via Laravel Storage.
            $table->json('images')->nullable();

            $table->decimal('lat', 10, 7)->nullable();
            $table->decimal('lng', 10, 7)->nullable();

            $table->foreignId('agent_id')->nullable()->constrained('agents')->nullOnDelete();

            $table->timestamps();
            $table->softDeletes(); // archive instead of hard delete, per the CMS requirement

            $table->index(['type', 'project_status', 'purpose_fit']);
            $table->index('featured');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
