<?php

namespace App\Http\Controllers;

use DB;
use App\Officer;
use Illuminate\Http\Request;

class PagesController extends Controller
{
    public function home()
    {
      $President = DB::table('officers')->where('position', 'President')->first();
      $VicePres = DB::table('officers')->where('position', 'Vice President')->first();
      $Treasurer = DB::table('officers')->where('position', 'Treasurer')->first();
      $EventMan = DB::table('officers')->where('position', 'Event Manager')->first();
      $Industry = DB::table('officers')->where('position', 'Industry Liaison')->first();
      $WebMan = DB::table('officers')->where('position', 'Website Manager')->first();
      $SocialMan = DB:: table('officers')->where('position', 'Social Media Manager')->first();
      $officers = array('President'=>$President, 'Vice President'=>$VicePres, 'Treasurer'=>$Treasurer,
      'Event Manager'=>$EventMan, 'Industry Liaison'=>$Industry, 'Website Manager'=>$WebMan, 'Social Media Manager'=>$SocialMan);
      return view('about', compact('officers'));
    }
}
