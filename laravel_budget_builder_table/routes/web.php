<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BudgetController;
use App\Models\Budgets;

//Route::get('/', [HomeController::class, 'home']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/', [BudgetController::class, 'index']);
Route::post('/save_Table', [BudgetController::class, 'saveTable']);
//Route::get('/api/view-table', [BudgetController::class, 'show_Table']);

require __DIR__.'/auth.php';