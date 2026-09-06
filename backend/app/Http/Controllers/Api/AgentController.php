<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AgentResource;
use App\Models\Agent;

class AgentController extends Controller
{
    public function index()
    {
        return AgentResource::collection(Agent::all());
    }

    public function show(string $slug)
    {
        $agent = Agent::where('slug', $slug)->firstOrFail();

        return new AgentResource($agent);
    }
}
