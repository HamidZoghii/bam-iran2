<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Agent extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug', 'name_fa', 'name_en', 'title_fa', 'title_en',
        'bio_fa', 'bio_en', 'photo_path', 'phone', 'whatsapp',
    ];

    public function properties(): HasMany
    {
        return $this->hasMany(Property::class);
    }
}
