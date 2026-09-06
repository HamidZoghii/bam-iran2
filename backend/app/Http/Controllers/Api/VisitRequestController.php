<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Models\VisitRequest;
use Illuminate\Http\Request;

class VisitRequestController extends Controller
{
    // POST /api/visit-requests — the "درخواست بازدید" form on a property page.
    public function store(Request $request)
    {
        $data = $request->validate([
            'property_slug' => ['required', 'string', 'exists:properties,slug'],
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:32'],
            'preferred_time' => ['nullable', 'string', 'max:255'],
        ]);

        $property = Property::where('slug', $data['property_slug'])->firstOrFail();

        $visit = VisitRequest::create([
            'property_id' => $property->id,
            'name' => $data['name'],
            'phone' => $data['phone'],
            'preferred_time' => $data['preferred_time'] ?? null,
        ]);

        return response()->json(['id' => $visit->id, 'status' => 'received'], 201);
    }
}
