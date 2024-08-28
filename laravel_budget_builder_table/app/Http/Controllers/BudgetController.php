<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Budgets;

class BudgetController extends Controller
{
    public function index()
    {
        $data = Budgets::all();
        return view('home.index', compact('data'));
    }

    public function saveTable(Request $request) {
        $months = $request->input('months');
        $categories = $request->input('categories');
        $amounts = $request->input('amounts');
    
        foreach ($months as $index => $month) {
            foreach ($categories as $row => $category) {
                $amount = isset($amounts[$row][$index]) ? $amounts[$row][$index] : null;

                if ($amount !== null && trim($amount) !== '') {
                    $budget = new Budgets();
                    $budget->month = $month;
                    $budget->category = $category;
                    $budget->amount = $amount;
                    $budget->save();
                }
            }
        }
    
        $closingBalance = isset($amounts[37][1]) ? $amounts[37][1] : null;
        
        if ($closingBalance !== null && trim($closingBalance) !== '') {
            $closingBalanceBudget = new Budgets();
            $closingBalanceBudget->month = $months[1];
            $closingBalanceBudget->category = 'Closing Balance';
            $closingBalanceBudget->amount = $closingBalance;
            $closingBalanceBudget->save();
        }
    
        return redirect()->back();
    }

}
