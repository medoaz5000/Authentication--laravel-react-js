<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
    
});*/

Route::post('/login',[AuthController::class, 'login']);
Route::post('/register',[AuthController::class, 'register']);


Route::middleware(['auth:sanctum'])->group(function (){

    Route::get('/user', function (Request $request){
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);

});


Route::middleware(['auth:sanctum', 'is_admin'])->group(function () {

    Route::middleware('is_admin')->get('/admin', function (Request $request){
        return response()->json([
            'message' => 'Welcome Admin',
            'user' => $request->user()
        ]);
    });

    Route::post('/logout', [AuthController::class, 'logout']);


});


//Route::post('/logout',[AuthController::class, 'logout']);
//Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);