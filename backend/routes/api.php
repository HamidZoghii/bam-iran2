<?php

use App\Http\Controllers\Api\AgentController;
use App\Http\Controllers\Api\InvestmentOpportunityController;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\Api\VisitRequestController;
use Illuminate\Support\Facades\Route;

// Public, read-only — the Next.js frontend consumes these directly.
Route::get('/properties', [PropertyController::class, 'index']);
Route::get('/properties/{slug}', [PropertyController::class, 'show']);
Route::get('/properties/{slug}/similar', [PropertyController::class, 'similar']);

Route::get('/agents', [AgentController::class, 'index']);
Route::get('/agents/{slug}', [AgentController::class, 'show']);

Route::get('/investment-opportunities', [InvestmentOpportunityController::class, 'index']);

// Public write endpoints — no auth required to submit a lead, per the brief
// (browsing and inquiring shouldn't require an account in v1).
Route::post('/leads', [LeadController::class, 'store']);
Route::post('/visit-requests', [VisitRequestController::class, 'store']);

// Everything below this line is for the admin CMS panel and needs a
// Sanctum-authenticated agent/admin — add once the admin panel is built:
//
// Route::middleware('auth:sanctum')->group(function () {
//     Route::apiResource('admin/properties', Admin\PropertyController::class);
//     Route::apiResource('admin/agents', Admin\AgentController::class);
//     Route::get('admin/leads', [Admin\LeadController::class, 'index']);
// });
