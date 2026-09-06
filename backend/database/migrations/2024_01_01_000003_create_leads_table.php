<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone');
            $table->string('budget')->nullable();
            $table->string('preferred_area')->nullable();
            $table->string('purpose')->nullable(); // residence | investment
            $table->text('message')->nullable();
            $table->foreignId('property_id')->nullable()->constrained('properties')->nullOnDelete();

            // new | in-progress | closed
            $table->string('status')->default('new');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
