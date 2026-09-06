<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\InvestmentOpportunity;

class InvestmentOpportunityController extends Controller
{
    public function index()
    {
        return InvestmentOpportunity::with('property')->latest()->get();
    }
}
