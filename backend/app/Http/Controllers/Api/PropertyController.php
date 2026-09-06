<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PropertyResource;
use App\Models\Property;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    // GET /api/properties?type=&location=&purpose=&min_price=&max_price=&featured=1
    public function index(Request $request)
    {
        $query = Property::query()->with('agent')->filter($request->only([
            'type', 'location', 'purpose', 'min_price', 'max_price',
        ]));

        if ($request->boolean('featured')) {
            $query->featured();
        }

        $properties = $query->latest()->paginate($request->integer('per_page', 12));

        return PropertyResource::collection($properties);
    }

    // GET /api/properties/{slug}
    public function show(string $slug)
    {
        $property = Property::where('slug', $slug)->with('agent')->firstOrFail();

        return new PropertyResource($property);
    }

    // GET /api/properties/{slug}/similar
    public function similar(string $slug)
    {
        $property = Property::where('slug', $slug)->firstOrFail();

        $similar = Property::where('slug', '!=', $slug)
            ->where('type', $property->type)
            ->with('agent')
            ->limit(3)
            ->get();

        return PropertyResource::collection($similar);
    }
}
