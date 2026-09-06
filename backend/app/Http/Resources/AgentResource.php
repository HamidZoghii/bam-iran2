<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AgentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'name_fa' => $this->name_fa,
            'name_en' => $this->name_en,
            'title_fa' => $this->title_fa,
            'title_en' => $this->title_en,
            'bio_fa' => $this->bio_fa,
            'bio_en' => $this->bio_en,
            'photo' => $this->photo_path ? asset('storage/'.$this->photo_path) : null,
            'phone' => $this->phone,
            'whatsapp' => $this->whatsapp,
        ];
    }
}
