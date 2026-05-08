<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Requests\Auth\LoginRequest;

use App\Http\Requests\RegisterRequest;


class AuthController extends Controller
{
    public function login(LoginRequest $request){
        /*$data = $request->validated();

        if(!Auth::attempt($data)){
            return response([
                'message' => 'email or mot de passe incorrect'
            ]);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);*/

        $data = $request->validated();

        if (!Auth::attempt($data)) {
            return response()->json([
                'message' => 'email or password are invalid '
            ], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
            'user_type' => $user->user_type
            
        ]);

    }

    public function register(RegisterRequest $request){
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ],200);

    }

    public function logout(Request $request){
        /*$user = $request->user();

        $user->currentAccessToken()->delete();

        return response('',204);*/

  
        if ($request->user() && $request->user()->currentAccessToken()) {
            $request->user()->currentAccessToken()->delete();
        }

        return response()->json([
            'message' => 'Logged out'
        ]);

    }
}
