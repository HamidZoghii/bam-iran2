<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Models\Property;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    // POST /api/leads — the "درخواست مشاوره" (consultation request) form.
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:32'],
            'budget' => ['nullable', 'string', 'max:100'],
            'preferred_area' => ['nullable', 'string', 'max:255'],
            'purpose' => ['nullable', 'in:residence,investment'],
            'message' => ['nullable', 'string', 'max:2000'],
            'property_slug' => ['nullable', 'string', 'exists:properties,slug'],
        ]);

        if (! empty($data['property_slug'])) {
            $data['property_id'] = Property::where('slug', $data['property_slug'])->value('id');
        }
        unset($data['property_slug']);

        $lead = Lead::create($data);

        // TODO: dispatch a queued job here (Redis-backed) to notify the
        // assigned team via WhatsApp/SMS once that integration is wired up.

        return response()->json(['id' => $lead->id, 'status' => 'received'], 201);
    }
}
