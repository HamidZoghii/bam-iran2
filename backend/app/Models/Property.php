<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Property extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'slug', 'title_fa', 'title_en', 'type', 'location_fa', 'location_en',
        'price', 'price_on_request', 'area_sqm', 'bedrooms', 'parking_spaces',
        'floor', 'year_built', 'amenities_fa', 'amenities_en',
        'document_status_fa', 'document_status_en', 'project_status',
        'purpose_fit', 'featured', 'architectural_notes_fa',
        'architectural_notes_en', 'description_fa', 'description_en',
        'images', 'lat', 'lng', 'agent_id',
    ];

    protected $casts = [
        'amenities_fa' => 'array',
        'amenities_en' => 'array',
        'images' => 'array',
        'price_on_request' => 'boolean',
        'featured' => 'boolean',
        'lat' => 'decimal:7',
        'lng' => 'decimal:7',
    ];

    public function agent(): BelongsTo
    {
        return $this->belongsTo(Agent::class);
    }

    public function leads(): HasMany
    {
        return $this->hasMany(Lead::class);
    }

    public function visitRequests(): HasMany
    {
        return $this->hasMany(VisitRequest::class);
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    public function scopeFilter($query, array $filters)
    {
        return $query
            ->when($filters['type'] ?? null, fn ($q, $type) => $q->where('type', $type))
            ->when($filters['purpose'] ?? null, fn ($q, $purpose) => $q->whereIn('purpose_fit', [$purpose, 'both']))
            ->when($filters['location'] ?? null, fn ($q, $loc) => $q->where(function ($q2) use ($loc) {
                $q2->where('location_fa', $loc)->orWhere('location_en', $loc);
            }))
            ->when($filters['min_price'] ?? null, fn ($q, $min) => $q->where(function ($q2) use ($min) {
                $q2->where('price', '>=', $min)->orWhere('price_on_request', true);
            }))
            ->when($filters['max_price'] ?? null, fn ($q, $max) => $q->where(function ($q2) use ($max) {
                $q2->where('price', '<=', $max)->orWhere('price_on_request', true);
            }));
    }
}
