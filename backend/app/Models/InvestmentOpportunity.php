<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InvestmentOpportunity extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug', 'title_fa', 'title_en', 'summary_fa', 'summary_en',
        'tag_fa', 'tag_en', 'property_id', 'image',
    ];

    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }
}
