<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'title_fa' => $this->title_fa,
            'title_en' => $this->title_en,
            'type' => $this->type,
            'location_fa' => $this->location_fa,
            'location_en' => $this->location_en,
            'price' => $this->price,
            'priceOnRequest' => (bool) $this->price_on_request,
            'areaSqm' => $this->area_sqm,
            'bedrooms' => $this->bedrooms,
            'parkingSpaces' => $this->parking_spaces,
            'floor' => $this->floor,
            'yearBuilt' => $this->year_built,
            'amenities_fa' => $this->amenities_fa ?? [],
            'amenities_en' => $this->amenities_en ?? [],
            'documentStatus_fa' => $this->document_status_fa,
            'documentStatus_en' => $this->document_status_en,
            'projectStatus' => $this->project_status,
            'purposeFit' => $this->purpose_fit,
            'featured' => (bool) $this->featured,
            'architecturalNotes_fa' => $this->architectural_notes_fa,
            'architecturalNotes_en' => $this->architectural_notes_en,
            'description_fa' => $this->description_fa,
            'description_en' => $this->description_en,
            'images' => collect($this->images ?? [])
                ->map(fn ($path) => str_starts_with($path, 'http') ? $path : asset('storage/'.$path))
                ->all(),
            'lat' => $this->lat,
            'lng' => $this->lng,
            'agent' => new AgentResource($this->whenLoaded('agent')),
        ];
    }
}
